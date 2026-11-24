import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it, vi } from "vitest";
import { COLECCIONES } from "../src/lib/content/esquemas.ts";
import { validarContenido } from "./validate-content.ts";

/** Ruta del script con barras normales, como la compara su ejecución directa. */
const RUTA_SCRIPT = fileURLToPath(
  new URL("./validate-content.ts", import.meta.url),
).replace(/\\/g, "/");

const raices: string[] = [];

afterEach(async () => {
  vi.restoreAllMocks();
  await Promise.all(
    raices.map((raiz) => rm(raiz, { recursive: true, force: true })),
  );
  raices.length = 0;
});

async function raiz(): Promise<string> {
  const dir = await mkdtemp(join(tmpdir(), "wiki-validate-"));
  raices.push(dir);
  for (const coleccion of COLECCIONES) {
    await mkdir(join(dir, coleccion), { recursive: true });
  }
  await mkdir(join(dir, "telegrambot"), { recursive: true });
  return dir;
}

/** Raíz de trabajo con su carpeta `content/` para la ejecución directa. */
async function raizConContenido(): Promise<string> {
  const base = await mkdtemp(join(tmpdir(), "wiki-validate-directo-"));
  raices.push(base);
  await mkdir(join(base, "content", "glosario"), { recursive: true });
  return base;
}

async function escribir(
  dir: string,
  coleccion: string,
  slug: string,
  frontmatter: string,
  cuerpo: string,
): Promise<void> {
  await writeFile(
    join(dir, coleccion, `${slug}.md`),
    `---\n${frontmatter}\n---\n\n${cuerpo}\n`,
  );
}

const FM_GLOSARIO = "titulo: Término\nresumen: resumen\ncategoria: concepto";
const SECCIONES_GLOSARIO =
  "## Definición\nx\n\n## Por qué importa\nx\n\n## Ejemplo\nx\n\n## Se confunde con\nx";
const SECCIONES_TECNOLOGIA =
  "## Qué es\nx\n\n## Para qué sirve\nx\n\n## Cuándo usarla\nx\n\n## Cuándo no\nx\n\n## Alternativas\nx\n\n## Ejemplo\nx";

describe("validarContenido", () => {
  it("no reporta errores con contenido válido", async () => {
    const dir = await raiz();
    await escribir(dir, "glosario", "slug", FM_GLOSARIO, SECCIONES_GLOSARIO);
    const { errores } = await validarContenido(dir);
    expect(errores).toEqual([]);
  });

  it("no reporta errores si no hay contenido", async () => {
    const { errores, entradas } = await validarContenido("ruta/inventada");
    expect(errores).toEqual([]);
    expect(entradas).toEqual([]);
  });

  it("valida las páginas Markdown de TelegramBot", async () => {
    const dir = await raiz();
    await escribir(
      dir,
      "telegrambot",
      "funcional",
      "titulo: TelegramBot\nresumen: Guía funcional\napartado: funcional",
      "## Uso\nContenido",
    );
    const { errores, entradas } = await validarContenido(dir);
    expect(errores).toEqual([]);
    expect(entradas).toEqual([]);
  });

  it("detecta un apartado que no coincide con el nombre del archivo", async () => {
    const dir = await raiz();
    await escribir(
      dir,
      "telegrambot",
      "funcional",
      "titulo: TelegramBot\nresumen: Guía técnica\napartado: tecnico",
      "## Uso\nContenido",
    );
    const { errores } = await validarContenido(dir);
    expect(errores).toContain(
      `${join(dir, "telegrambot", "funcional.md")}: el apartado "tecnico" debe coincidir con el nombre del archivo`,
    );
  });

  it("detecta un esquema inválido en las páginas de TelegramBot", async () => {
    const dir = await raiz();
    await escribir(
      dir,
      "telegrambot",
      "funcional",
      "titulo: TelegramBot\nresumen: Guía\napartado: otro",
      "## Uso\nContenido",
    );
    const { errores, entradas } = await validarContenido(dir);
    expect(
      errores.some((e) => e.includes('esquema inválido en "apartado"')),
    ).toBe(true);
    expect(entradas).toEqual([]);
  });

  it("devuelve las entradas leídas con su slug y colección", async () => {
    const dir = await raiz();
    await escribir(dir, "glosario", "slug", FM_GLOSARIO, SECCIONES_GLOSARIO);
    const { entradas } = await validarContenido(dir);
    expect(entradas).toHaveLength(1);
    expect(entradas[0]).toMatchObject({ slug: "slug", coleccion: "glosario" });
  });

  it("detecta un esquema inválido", async () => {
    const dir = await raiz();
    await escribir(
      dir,
      "glosario",
      "x",
      "resumen: r\ncategoria: concepto",
      SECCIONES_GLOSARIO,
    );
    const { errores } = await validarContenido(dir);
    expect(errores.some((e) => e.includes("esquema inválido"))).toBe(true);
  });

  it("detecta slugs duplicados globalmente", async () => {
    const dir = await raiz();
    await escribir(dir, "glosario", "dup", FM_GLOSARIO, SECCIONES_GLOSARIO);
    await escribir(
      dir,
      "tecnologias",
      "dup",
      FM_GLOSARIO,
      SECCIONES_TECNOLOGIA,
    );
    const { errores } = await validarContenido(dir);
    expect(errores.some((e) => e.includes('slug duplicado "dup"'))).toBe(true);
  });

  it("detecta alias en conflicto entre entradas", async () => {
    const dir = await raiz();
    await escribir(
      dir,
      "glosario",
      "uno",
      `${FM_GLOSARIO}\nalias:\n  - Foo`,
      SECCIONES_GLOSARIO,
    );
    await escribir(dir, "glosario", "dos", FM_GLOSARIO, SECCIONES_GLOSARIO);
    await escribir(
      dir,
      "glosario",
      "tres",
      "titulo: Otra\nalias:\n  - Foo",
      SECCIONES_GLOSARIO,
    );
    const { errores } = await validarContenido(dir);
    expect(errores.some((e) => e.includes('la clave "Foo" ya la usa'))).toBe(
      true,
    );
  });

  it("detecta un alias que choca con un slug", async () => {
    const dir = await raiz();
    await escribir(dir, "glosario", "foo", "titulo: Uno", SECCIONES_GLOSARIO);
    await escribir(
      dir,
      "glosario",
      "dos",
      "titulo: Dos\nalias:\n  - foo",
      SECCIONES_GLOSARIO,
    );
    const { errores } = await validarContenido(dir);
    expect(errores.some((e) => e.includes('la clave "foo" ya la usa'))).toBe(
      true,
    );
  });

  it("ignora los alias que no son texto", async () => {
    const dir = await raiz();
    await escribir(
      dir,
      "glosario",
      "x",
      `${FM_GLOSARIO}\nalias:\n  - 42`,
      SECCIONES_GLOSARIO,
    );
    const { errores } = await validarContenido(dir);
    expect(errores.some((e) => e.includes('esquema inválido en "alias'))).toBe(
      true,
    );
    expect(errores.some((e) => e.includes("la clave"))).toBe(false);
  });

  it("detecta referencias a entradas inexistentes", async () => {
    const dir = await raiz();
    await escribir(
      dir,
      "tecnologias",
      "x",
      "titulo: X\nrelacionados:\n  - noexiste",
      SECCIONES_TECNOLOGIA,
    );
    const { errores } = await validarContenido(dir);
    expect(errores.some((e) => e.includes('referencia a "noexiste"'))).toBe(
      true,
    );
  });

  it("ignora las referencias que no son texto", async () => {
    const dir = await raiz();
    await escribir(
      dir,
      "tecnologias",
      "x",
      "titulo: X\nrelacionados:\n  - 42",
      SECCIONES_TECNOLOGIA,
    );
    const { errores } = await validarContenido(dir);
    expect(errores.some((e) => e.includes("referencia a"))).toBe(false);
  });

  it("detecta una sección obligatoria ausente", async () => {
    const dir = await raiz();
    await escribir(dir, "glosario", "x", FM_GLOSARIO, "## Definición\nx");
    const { errores } = await validarContenido(dir);
    expect(
      errores.some((e) =>
        e.includes('falta la sección obligatoria "## Por qué importa"'),
      ),
    ).toBe(true);
  });

  it("detecta secciones reservadas escritas a mano", async () => {
    const dir = await raiz();
    await escribir(
      dir,
      "glosario",
      "x",
      FM_GLOSARIO,
      `${SECCIONES_GLOSARIO}\n\n## Relacionados\nx`,
    );
    const { errores } = await validarContenido(dir);
    expect(errores.some((e) => e.includes('"## Relacionados"'))).toBe(true);
  });

  it("detecta enlaces internos rotos, con base y con .\\/", async () => {
    const dir = await raiz();
    await escribir(
      dir,
      "glosario",
      "x",
      FM_GLOSARIO,
      `${SECCIONES_GLOSARIO}\n\n[ver](/glosario/noexiste)\n[v](./glosario/otro)`,
    );
    const { errores } = await validarContenido(dir);
    expect(errores.some((e) => e.includes("enlace interno roto"))).toBe(true);
    expect(
      errores.filter((e) => e.includes("enlace interno roto")),
    ).toHaveLength(2);
  });

  it("ignora enlaces a páginas conocidas y enlaces externos", async () => {
    const dir = await raiz();
    await escribir(
      dir,
      "glosario",
      "x",
      FM_GLOSARIO,
      `${SECCIONES_GLOSARIO}\n\n[g](/glosario)\n[t](/tecnologias/)\n[e](https://x.dev)`,
    );
    const { errores } = await validarContenido(dir);
    expect(errores).toEqual([]);
  });

  it("acepta enlaces a la raíz y a entradas existentes", async () => {
    const dir = await raiz();
    await escribir(
      dir,
      "glosario",
      "uno",
      FM_GLOSARIO,
      `${SECCIONES_GLOSARIO}\n\n[inicio](/)\n[ver](/glosario/uno)`,
    );
    const { errores } = await validarContenido(dir);
    expect(errores).toEqual([]);
  });

  it("ignora encabezados dentro de bloques de código", async () => {
    const dir = await raiz();
    const cuerpo = `${SECCIONES_GLOSARIO}\n\n\`\`\`text\n## Relacionados\n\`\`\``;
    await escribir(dir, "glosario", "x", FM_GLOSARIO, cuerpo);
    const { errores } = await validarContenido(dir);
    expect(errores).toEqual([]);
  });

  it("lee el contenido de subdirectorios y omite archivos que no son .md", async () => {
    const dir = await raiz();
    await mkdir(join(dir, "glosario", "sub"), { recursive: true });
    await writeFile(
      join(dir, "glosario", "sub", "anidado.md"),
      `---\n${FM_GLOSARIO}\n---\n\n${SECCIONES_GLOSARIO}\n`,
    );
    await writeFile(join(dir, "glosario", "notas.txt"), "ignorado");
    const { entradas, errores } = await validarContenido(dir);
    expect(errores).toEqual([]);
    expect(entradas.map((e) => e.slug)).toEqual(["anidado"]);
  });
});

describe("ejecución directa", () => {
  it("informa de los errores y sale con código 1", async () => {
    const base = await raizConContenido();
    await writeFile(
      join(base, "content", "glosario", "x.md"),
      `---\nresumen: r\ncategoria: concepto\n---\n\n${SECCIONES_GLOSARIO}\n`,
    );
    const salir = vi
      .spyOn(process, "exit")
      .mockImplementation(
        (() => undefined) as (codigo?: string | number | null) => never,
      );
    const errores = vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(console, "log").mockImplementation(() => {});

    await ejecutarScript(base);

    expect(salir).toHaveBeenCalledWith(1);
    expect(errores).toHaveBeenCalledWith(
      expect.stringContaining("problema(s)"),
    );
  });

  it("confirma el contenido válido sin salir con error", async () => {
    const base = await raizConContenido();
    await writeFile(
      join(base, "content", "glosario", "x.md"),
      `---\n${FM_GLOSARIO}\n---\n\n${SECCIONES_GLOSARIO}\n`,
    );
    const salir = vi
      .spyOn(process, "exit")
      .mockImplementation(
        (() => undefined) as (codigo?: string | number | null) => never,
      );
    vi.spyOn(console, "error").mockImplementation(() => {});
    const log = vi.spyOn(console, "log").mockImplementation(() => {});

    await ejecutarScript(base);

    expect(salir).not.toHaveBeenCalled();
    expect(log).toHaveBeenCalledWith("Validación de contenido: todo correcto.");
  });
});

/**
 * Importa el script como si se ejecutara desde la terminal: `argv[1]` es su
 * ruta y el directorio actual contiene el `content/` que debe validar.
 */
async function ejecutarScript(base: string): Promise<void> {
  const argv = [...process.argv];
  const cwd = process.cwd();
  process.argv[1] = RUTA_SCRIPT;
  process.chdir(base);
  try {
    vi.resetModules();
    await import("./validate-content.ts");
  } finally {
    process.chdir(cwd);
    process.argv = argv;
  }
}
