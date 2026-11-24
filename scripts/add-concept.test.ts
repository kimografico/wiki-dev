import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  comprobar,
  construirSystem,
  guardarError,
  llamarGemini,
  main,
  parsearSalida,
  slugsDe,
} from "./add-concept.ts";
import { COLECCIONES } from "../src/lib/content/esquemas.ts";
import { CATALOGO } from "../src/lib/content/catalogo.ts";

const CONTENIDO_VALIDO = `---
titulo: Closure
resumen: Función que recuerda su ámbito léxico.
categoria: concepto
tags: []
alias: []
relacionados: []
fuentes: []
autoenlace: true
---

## Definición

Función junto con su entorno léxico.

## Por qué importa

Permite estado privado sin clases.

## Ejemplo

\`\`\`js
function contador() {
  let n = 0;
  return () => ++n;
}
\`\`\`

## Se confunde con

No es lo mismo que un ámbito global.
`;

const CONTENIDO_SIN_SECCIONES = `---
titulo: Closure
resumen: Función que recuerda su ámbito léxico.
categoria: concepto
tags: []
alias: []
relacionados: []
fuentes: []
autoenlace: true
---

## Definición

Solo trae una sección.
`;

/**
 * Entrada válida con el frontmatter en JSON (`---json`): gray-matter lo
 * interpreta, pero el extractor de `categoria` solo entiende YAML.
 */
const CONTENIDO_FRONTMATTER_JSON = `---json
${JSON.stringify({
  titulo: "Closure",
  resumen: "Función que recuerda su ámbito léxico.",
  categoria: "concepto",
  tags: [],
  alias: [],
  relacionados: [],
  fuentes: [],
  autoenlace: true,
})}
---

## Definición

Función junto con su entorno léxico.

## Por qué importa

Permite estado privado sin clases.

## Ejemplo

\`\`\`js
let n = 0;
\`\`\`

## Se confunde con

No es un ámbito global.
`;

/** Ruta del script con barras normales, como la compara su ejecución directa. */
const RUTA_SCRIPT = fileURLToPath(
  new URL("./add-concept.ts", import.meta.url),
).replace(/\\/g, "/");

/**
 * Crea un repo mínimo: `specs/plantillas` con la plantilla de cada colección
 * y sus carpetas de `content`. Se deriva de `COLECCIONES` y del catálogo para
 * que una colección nueva no rompa la suite.
 */
async function crearRepo(): Promise<string> {
  const raiz = await mkdtemp(join(tmpdir(), "wiki-add-concept-"));
  const dirs = [
    "specs/plantillas",
    ...COLECCIONES.map((coleccion) => `content/${coleccion}`),
  ];
  for (const dir of dirs) await mkdir(join(raiz, dir), { recursive: true });
  for (const coleccion of COLECCIONES) {
    const plantilla = CATALOGO[coleccion].plantilla;
    await writeFile(
      join(raiz, "specs", "plantillas", plantilla),
      `# Plantilla ${plantilla}\n`,
    );
  }
  return raiz;
}

/** Respuesta falsa de la API de Gemini con el texto indicado. */
function respuesta(texto: string): Response {
  return {
    ok: true,
    json: async () => ({
      candidates: [{ content: { parts: [{ text: texto }] } }],
    }),
  } as Response;
}

/** Respuesta de Gemini con un objeto ya serializado como JSON. */
function respuestaJson(valor: unknown): Response {
  return respuesta(JSON.stringify(valor));
}

function stubFetch(respuestas: Response[]) {
  const fn = vi.fn((...args: [string | URL | Request, RequestInit?]) => {
    void args; // solo se registran para las aserciones de las llamadas
    return Promise.resolve(respuestas.shift()!);
  });
  vi.stubGlobal("fetch", fn);
  return fn;
}

/** Modelo usado en una llamada a la API (segmento de la URL). */
function modeloDe(entrada: unknown): string {
  return /models\/([^:]+):/.exec(String(entrada))?.[1] ?? "";
}

const raices: string[] = [];

beforeEach(() => {
  vi.stubEnv("GEMINI_API_KEY", "clave-de-prueba");
  vi.stubEnv("PROMPT", "prueba de prompt");
  vi.stubEnv("GITHUB_OUTPUT", "");
  // Sin espera entre intentos: los tests no deben tardar 30 s cada uno.
  vi.stubEnv("ESPERA_REINTENTO_MS", "0");
  vi.spyOn(console, "log").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
  // main prioriza argv[2] sobre PROMPT: fuera los argumentos del runner.
  process.argv = process.argv.slice(0, 2);
});

afterEach(async () => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  for (const raiz of raices.splice(0)) {
    await rm(raiz, { recursive: true, force: true });
  }
});

describe("parsearSalida", () => {
  it("parsea un JSON plano", () => {
    expect(
      parsearSalida('{"coleccion":"glosario","slug":"x","contenido":"y"}'),
    ).toEqual({
      coleccion: "glosario",
      slug: "x",
      contenido: "y",
    });
  });

  it("acepta un bloque rodeado de ```json", () => {
    const bloque =
      '```json\n{"coleccion":"paquetes","slug":"z","contenido":"c"}\n```';
    expect(parsearSalida(bloque).coleccion).toBe("paquetes");
  });

  it("lanza si faltan campos", () => {
    expect(() => parsearSalida('{"coleccion":"glosario"}')).toThrow(
      "La respuesta no tiene el formato",
    );
  });

  it("lanza si el JSON es inválido", () => {
    expect(() => parsearSalida("esto no es json")).toThrow();
  });
});

describe("comprobar", () => {
  it("acepta una colección y un slug válidos", () => {
    expect(
      comprobar({ coleccion: "glosario", slug: "closure", contenido: "" }),
    ).toBeNull();
  });

  it("rechaza una colección desconocida", () => {
    expect(
      comprobar({ coleccion: "podcast", slug: "x", contenido: "" }),
    ).toContain("no existe");
  });

  it("rechaza un slug con mayúsculas o espacios", () => {
    expect(
      comprobar({ coleccion: "glosario", slug: "Mi Slug", contenido: "" }),
    ).toContain("Slug");
  });

  it("rechaza un slug más largo de 64 caracteres", () => {
    expect(
      comprobar({ coleccion: "glosario", slug: "a".repeat(65), contenido: "" }),
    ).toContain("Slug");
  });
});

describe("llamarGemini", () => {
  it("devuelve el texto de la primera parte que no sea pensamiento", async () => {
    stubFetch([
      {
        ok: true,
        json: async () => ({
          candidates: [
            {
              content: {
                parts: [
                  { text: "pensamiento", thought: true },
                  { text: "real" },
                ],
              },
            },
          ],
        }),
      } as Response,
    ]);
    await expect(llamarGemini("k", "s", "u")).resolves.toBe("real");
  });

  it("envía la clave, el modelo y la configuración JSON", async () => {
    const fn = stubFetch([respuesta("ok")]);
    await llamarGemini("mi-clave", "sistema", "usuario");
    const llamada = fn.mock.calls[0]!;
    expect(String(llamada[0])).toContain("gemini-3.8-flash");
    const init = llamada[1]!;
    expect((init.headers as Record<string, string>)["x-goog-api-key"]).toBe(
      "mi-clave",
    );
    const cuerpo = JSON.parse(init.body as string) as {
      generationConfig: { responseMimeType: string };
      systemInstruction: { parts: Array<{ text: string }> };
    };
    expect(cuerpo.generationConfig.responseMimeType).toBe("application/json");
    expect(cuerpo.systemInstruction.parts[0]!.text).toBe("sistema");
  });

  it("lanza si la API responde con error", async () => {
    stubFetch([
      { ok: false, status: 429, text: async () => "rate limited" } as Response,
    ]);
    await expect(llamarGemini("k", "s", "u")).rejects.toThrow(
      "Gemini respondió 429",
    );
  });

  it("resume el error del JSON con code, message y status", async () => {
    stubFetch([
      {
        ok: false,
        status: 503,
        text: async () =>
          JSON.stringify({
            error: {
              code: 503,
              message: "This model is currently experiencing high demand.",
              status: "UNAVAILABLE",
            },
          }),
      } as Response,
    ]);
    await expect(llamarGemini("k", "s", "u")).rejects.toThrow(
      "Gemini respondió 503 (UNAVAILABLE): This model is currently experiencing high demand.",
    );
  });

  it("describe el error aunque el JSON no lleve code ni status", async () => {
    stubFetch([
      {
        ok: false,
        status: 400,
        text: async () =>
          JSON.stringify({ error: { message: "Solicitud inválida" } }),
      } as Response,
    ]);
    await expect(llamarGemini("k", "s", "u")).rejects.toThrow(
      "Gemini respondió 400: Solicitud inválida",
    );
  });

  it("usa el modelo que se le indique", async () => {
    const fn = stubFetch([respuesta("ok")]);
    await llamarGemini("k", "s", "u", "gemini-3.6-flash");
    expect(modeloDe(fn.mock.calls[0]![0])).toBe("gemini-3.6-flash");
  });

  it("lanza si no hay texto utilizable", async () => {
    stubFetch([
      {
        ok: true,
        json: async () => ({ candidates: [{ content: { parts: [] } }] }),
      } as Response,
    ]);
    await expect(llamarGemini("k", "s", "u")).rejects.toThrow(
      "Gemini devolvió una respuesta vacía",
    );
  });

  it("lanza si la respuesta no trae candidatos", async () => {
    stubFetch([{ ok: true, json: async () => ({}) } as Response]);
    await expect(llamarGemini("k", "s", "u")).rejects.toThrow(
      "Gemini devolvió una respuesta vacía",
    );
  });
});

describe("slugsDe", () => {
  it("lista los .md en recursión e ignora otros archivos", async () => {
    const raiz = await mkdtemp(join(tmpdir(), "wiki-slugs-"));
    raices.push(raiz);
    await mkdir(join(raiz, "sub"), { recursive: true });
    await writeFile(join(raiz, "a.md"), "");
    await writeFile(join(raiz, "sub", "b.md"), "");
    await writeFile(join(raiz, "nota.txt"), "");
    expect(await slugsDe(raiz)).toEqual(["a", "b"]);
  });

  it("devuelve una lista vacía si el directorio no existe", async () => {
    expect(await slugsDe(join(tmpdir(), "no-existe-nunca"))).toEqual([]);
  });
});

describe("construirSystem", () => {
  it("inyecta secciones, plantillas, enums y slugs existentes", async () => {
    const raiz = await crearRepo();
    raices.push(raiz);
    await writeFile(join(raiz, "content", "glosario", "termino-nuevo.md"), "x");
    const system = await construirSystem(raiz);
    expect(system).toContain("## Definición"); // secciones obligatorias
    expect(system).toContain("# Plantilla glosario.md"); // plantilla del repo
    expect(system).toContain("datos-api"); // enum CATEGORIAS
    expect(system).toContain("glosario/termino-nuevo"); // slugs existentes
  });
});

describe("main", () => {
  it("genera, valida y escribe la entrada con su GITHUB_OUTPUT", async () => {
    const raiz = await crearRepo();
    raices.push(raiz);
    const salida = join(raiz, "salida.txt");
    vi.stubEnv("GITHUB_OUTPUT", salida);
    const fetchM = stubFetch([
      respuestaJson({
        coleccion: "glosario",
        slug: "closure",
        contenido: CONTENIDO_VALIDO,
      }),
    ]);

    await main(raiz);

    const ruta = join(raiz, "content", "glosario", "closure.md");
    expect(await readFile(ruta, "utf8")).toBe(CONTENIDO_VALIDO);
    const output = await readFile(salida, "utf8");
    expect(output).toContain(`ruta=${ruta}`);
    expect(output).toContain("coleccion=glosario");
    expect(output).toContain("slug=closure");
    expect(fetchM).toHaveBeenCalledTimes(1);
  });

  it("reintenta con los errores de validación del primer intento", async () => {
    const raiz = await crearRepo();
    raices.push(raiz);
    const fetchM = stubFetch([
      respuestaJson({
        coleccion: "glosario",
        slug: "closure",
        contenido: CONTENIDO_SIN_SECCIONES,
      }),
      respuestaJson({
        coleccion: "glosario",
        slug: "closure",
        contenido: CONTENIDO_VALIDO,
      }),
    ]);

    await main(raiz);

    expect(fetchM).toHaveBeenCalledTimes(2);
    const cuerpo = JSON.parse(fetchM.mock.calls[1]![1]!.body as string) as {
      contents: Array<{ parts: Array<{ text: string }> }>;
    };
    expect(cuerpo.contents[0]!.parts[0]!.text).toContain(
      "falta la sección obligatoria",
    );
    expect(
      await readFile(join(raiz, "content", "glosario", "closure.md"), "utf8"),
    ).toBe(CONTENIDO_VALIDO);
  });

  it("reintenta cuando la API falla en el primer intento", async () => {
    const raiz = await crearRepo();
    raices.push(raiz);
    const fetchM = stubFetch([
      { ok: false, status: 429, text: async () => "rate" } as Response,
      respuestaJson({
        coleccion: "glosario",
        slug: "closure",
        contenido: CONTENIDO_VALIDO,
      }),
    ]);

    await main(raiz);

    expect(fetchM).toHaveBeenCalledTimes(2);
    const cuerpo = JSON.parse(fetchM.mock.calls[1]![1]!.body as string) as {
      contents: Array<{ parts: Array<{ text: string }> }>;
    };
    expect(cuerpo.contents[0]!.parts[0]!.text).toContain("No se pudo generar");
  });

  it("reintenta si el modelo elige una colección inexistente", async () => {
    const raiz = await crearRepo();
    raices.push(raiz);
    const fetchM = stubFetch([
      respuestaJson({
        coleccion: "podcast",
        slug: "x",
        contenido: CONTENIDO_VALIDO,
      }),
      respuestaJson({
        coleccion: "glosario",
        slug: "closure",
        contenido: CONTENIDO_VALIDO,
      }),
    ]);

    await main(raiz);

    expect(fetchM).toHaveBeenCalledTimes(2);
    const cuerpo = JSON.parse(fetchM.mock.calls[1]![1]!.body as string) as {
      contents: Array<{ parts: Array<{ text: string }> }>;
    };
    expect(cuerpo.contents[0]!.parts[0]!.text).toContain("no existe");
  });

  it("nunca sobrescribe una entrada existente", async () => {
    const raiz = await crearRepo();
    raices.push(raiz);
    const original = "contenido original\n";
    await writeFile(join(raiz, "content", "glosario", "closure.md"), original);
    stubFetch([
      respuestaJson({
        coleccion: "glosario",
        slug: "closure",
        contenido: CONTENIDO_VALIDO,
      }),
      respuestaJson({
        coleccion: "glosario",
        slug: "closure-avanzado",
        contenido: CONTENIDO_VALIDO,
      }),
    ]);

    await main(raiz);

    expect(
      await readFile(join(raiz, "content", "glosario", "closure.md"), "utf8"),
    ).toBe(original);
    expect(
      await readFile(
        join(raiz, "content", "glosario", "closure-avanzado.md"),
        "utf8",
      ),
    ).toBe(CONTENIDO_VALIDO);
  });

  it("agota los 4 intentos alternando modelos, lanza y no deja contenido", async () => {
    const raiz = await crearRepo();
    raices.push(raiz);
    const invalido = respuestaJson({
      coleccion: "glosario",
      slug: "closure",
      contenido: CONTENIDO_SIN_SECCIONES,
    });
    const fetchM = stubFetch([invalido, invalido, invalido, invalido]);

    await expect(main(raiz)).rejects.toThrow(
      "No se pudo generar una entrada válida",
    );

    expect(fetchM).toHaveBeenCalledTimes(4);
    expect(fetchM.mock.calls.map((c) => modeloDe(c[0]))).toEqual([
      "gemini-3.8-flash",
      "gemini-3.6-flash",
      "gemini-3.8-flash",
      "gemini-3.6-flash",
    ]);
    await expect(
      readFile(join(raiz, "content", "glosario", "closure.md"), "utf8"),
    ).rejects.toThrow();
  });

  it("espera el tiempo configurado entre intentos", async () => {
    vi.stubEnv("ESPERA_REINTENTO_MS", "50");
    const raiz = await crearRepo();
    raices.push(raiz);
    stubFetch([
      {
        ok: false,
        status: 503,
        text: async () => "demasiada demanda",
      } as Response,
      respuestaJson({
        coleccion: "glosario",
        slug: "closure",
        contenido: CONTENIDO_VALIDO,
      }),
    ]);

    const inicio = Date.now();
    await main(raiz);

    expect(Date.now() - inicio).toBeGreaterThanOrEqual(40);
  });

  it("falla sin GEMINI_API_KEY", async () => {
    const raiz = await crearRepo();
    raices.push(raiz);
    vi.stubEnv("GEMINI_API_KEY", "");
    await expect(main(raiz)).rejects.toThrow("GEMINI_API_KEY");
  });

  it("falla sin prompt", async () => {
    const raiz = await crearRepo();
    raices.push(raiz);
    vi.stubEnv("PROMPT", "");
    await expect(main(raiz)).rejects.toThrow("Falta el prompt");
  });

  it("escribe la categoría del frontmatter JSON aunque no pueda extraerla", async () => {
    const raiz = await crearRepo();
    raices.push(raiz);
    const salida = join(raiz, "salida.txt");
    vi.stubEnv("GITHUB_OUTPUT", salida);
    stubFetch([
      respuestaJson({
        coleccion: "glosario",
        slug: "closure",
        contenido: CONTENIDO_FRONTMATTER_JSON,
      }),
    ]);

    await main(raiz);

    const output = await readFile(salida, "utf8");
    expect(output).toContain("slug=closure");
    expect(output).toContain("categoria=\n");
  });

  it("usa la espera por defecto cuando ESPERA_REINTENTO_MS no está definida", async () => {
    vi.stubEnv("ESPERA_REINTENTO_MS", undefined);
    const raiz = await crearRepo();
    raices.push(raiz);
    // Éxito al primer intento: no llega a esperar los 30 s por defecto.
    stubFetch([
      respuestaJson({
        coleccion: "glosario",
        slug: "closure",
        contenido: CONTENIDO_VALIDO,
      }),
    ]);

    await main(raiz);

    expect(
      await readFile(join(raiz, "content", "glosario", "closure.md"), "utf8"),
    ).toBe(CONTENIDO_VALIDO);
  });

  it("reintenta cuando la API falla con algo que no es un Error", async () => {
    const raiz = await crearRepo();
    raices.push(raiz);
    const fetchM = vi
      .fn()
      .mockRejectedValueOnce("sin conexión")
      .mockResolvedValueOnce(
        respuestaJson({
          coleccion: "glosario",
          slug: "closure",
          contenido: CONTENIDO_VALIDO,
        }),
      );
    vi.stubGlobal("fetch", fetchM);

    await main(raiz);

    expect(fetchM).toHaveBeenCalledTimes(2);
    const cuerpo = JSON.parse(fetchM.mock.calls[1]![1]!.body as string) as {
      contents: Array<{ parts: Array<{ text: string }> }>;
    };
    expect(cuerpo.contents[0]!.parts[0]!.text).toContain(
      "No se pudo generar: sin conexión",
    );
  });
});

describe("ejecución directa", () => {
  it("lanza el error de main al importar el módulo como script", async () => {
    vi.resetModules();
    vi.stubEnv("GEMINI_API_KEY", "");
    const anterior = process.argv[1];
    process.argv[1] = RUTA_SCRIPT;
    try {
      await expect(import("./add-concept.ts")).rejects.toThrow(
        "GEMINI_API_KEY",
      );
    } finally {
      process.argv[1] = anterior;
    }
  });
});

describe("guardarError", () => {
  it("escribe el error como una sola línea en ERROR_FILE", async () => {
    const raiz = await mkdtemp(join(tmpdir(), "wiki-error-"));
    raices.push(raiz);
    const ruta = join(raiz, "error.txt");
    vi.stubEnv("ERROR_FILE", ruta);

    await guardarError(
      new Error(
        "No se pudo generar: Gemini respondió 503 (UNAVAILABLE): alta\ndemanda temporal",
      ),
    );

    expect(await readFile(ruta, "utf8")).toBe(
      "No se pudo generar: Gemini respondió 503 (UNAVAILABLE): alta demanda temporal",
    );
  });

  it("no hace nada si ERROR_FILE no está configurada", async () => {
    await expect(guardarError(new Error("nada"))).resolves.toBeUndefined();
  });

  it("acepta un error que no es instancia de Error", async () => {
    const raiz = await mkdtemp(join(tmpdir(), "wiki-error-"));
    raices.push(raiz);
    const ruta = join(raiz, "error.txt");
    vi.stubEnv("ERROR_FILE", ruta);

    await guardarError("algo\nraro");

    expect(await readFile(ruta, "utf8")).toBe("algo raro");
  });
});
