// Genera una entrada de la wiki con Gemini a partir de un prompt (Telegram).
//
// Flujo:
//  1. Inyecta al modelo las plantillas (specs/plantillas), los enums y los
//     slugs existentes, leídos del repo — el prompt no lleva el schema
//     hardcodeado, así no se desincroniza de src/lib/content/esquemas.ts.
//  2. Pide JSON {coleccion, slug, contenido} — la colección, la categoría y
//     los tags los decide el modelo entre los enums inyectados — y escribe
//     content/<coleccion>/<slug>.md.
//  3. Valida con validarContenido(); si hay errores o la API falla, reintenta
//     esperando 30 s y alternando dos modelos (3.8 → 3.6 → 3.8 → 3.6),
//     alimentando al modelo con lo que falló. Si se agotan los intentos,
//     deja la frase del último error en ERROR_FILE (para la notificación de
//     Telegram), aborta con error y el job no hace push (main queda intacto).
//
// Requiere GEMINI_API_KEY y el prompt en argv[2] o en la env PROMPT.
// Escribe `ruta=`, `coleccion=`, `slug=` y `categoria=` en GITHUB_OUTPUT si existe.
import {
  appendFile,
  access,
  mkdir,
  readFile,
  readdir,
  unlink,
  writeFile,
} from "node:fs/promises";
import type { Dirent } from "node:fs";
import { join } from "node:path";
import {
  CATEGORIAS,
  COLECCIONES,
  ETIQUETAS,
  SECCIONES_OBLIGATORIAS,
} from "../src/lib/content/esquemas.ts";
import { CATALOGO } from "../src/lib/content/catalogo.ts";
import { validarContenido } from "./validate-content.ts";

/** Modelos alternados en cada intento */
const MODELOS = ["gemini-3.8-flash", "gemini-3.6-flash"];
const MAX_INTENTOS = MODELOS.length * 2;
/** Espera entre intentos; los tests la bajan con la env ESPERA_REINTENTO_MS. */
const ESPERA_REINTENTO_MS = 30 * 1000;

interface EntradaGenerada {
  coleccion: string;
  slug: string;
  contenido: string;
}

interface RespuestaGemini {
  candidates?: Array<{
    content?: { parts?: Array<{ text?: string; thought?: boolean }> };
  }>;
}

/** Espera `ms` milisegundos (entre intentos, para no saturar la API). */
function dormir(ms: number): Promise<void> {
  return new Promise((resolver) => setTimeout(resolver, ms));
}

/** Frase con el code, message y status del error de la API (o el cuerpo). */
async function describirError(res: Response): Promise<string> {
  const cuerpo = await res.text();
  try {
    const dato = JSON.parse(cuerpo) as {
      error?: { code?: number; message?: string; status?: string };
    };
    const detalle = dato.error;
    if (detalle?.message) {
      const codigo = detalle.code ?? res.status;
      const estado = detalle.status ? ` (${detalle.status})` : "";
      return `Gemini respondió ${codigo}${estado}: ${detalle.message}`;
    }
  } catch {
    // Cuerpo que no es JSON: se describe con el estado y el texto crudo.
  }
  return `Gemini respondió ${res.status}: ${cuerpo}`;
}

/** Llama a la API de Gemini y devuelve el texto (sin pensamientos). */
export async function llamarGemini(
  apiKey: string,
  system: string,
  usuario: string,
  modelo = MODELOS[0],
): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: system }] },
      contents: [{ role: "user", parts: [{ text: usuario }] }],
      generationConfig: {
        temperature: 0.4,
        responseMimeType: "application/json",
        thinkingConfig: { thinkingBudget: 0 },
        maxOutputTokens: 16384,
      },
    }),
  });
  if (!res.ok) {
    throw new Error(await describirError(res));
  }
  const data = (await res.json()) as RespuestaGemini;
  const partes = data.candidates?.[0]?.content?.parts ?? [];
  const texto = partes.find((p) => !p.thought && p.text)?.text;
  if (!texto) throw new Error("Gemini devolvió una respuesta vacía");
  return texto;
}

/** Parsea la respuesta del modelo, aceptando también bloques ```json. */
export function parsearSalida(texto: string): EntradaGenerada {
  const limpio = texto
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "");
  const dato = JSON.parse(limpio) as Partial<EntradaGenerada>;
  if (
    typeof dato.coleccion !== "string" ||
    typeof dato.slug !== "string" ||
    typeof dato.contenido !== "string"
  ) {
    throw new Error(
      "La respuesta no tiene el formato {coleccion, slug, contenido}",
    );
  }
  return {
    coleccion: dato.coleccion,
    slug: dato.slug,
    contenido: dato.contenido,
  };
}

/** Slugs (nombre de archivo sin .md) de una colección, recursivo. */
export async function slugsDe(dir: string): Promise<string[]> {
  let items: Dirent[];
  try {
    items = await readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }
  const slugs: string[] = [];
  for (const item of items) {
    const ruta = join(dir, item.name);
    if (item.isDirectory()) {
      slugs.push(...(await slugsDe(ruta)));
    } else if (item.name.endsWith(".md")) {
      slugs.push(item.name.replace(/\.md$/, ""));
    }
  }
  return slugs;
}

/** Ensambla el system prompt con plantillas, enums y slugs del repo. */
export async function construirSystem(raiz = "."): Promise<string> {
  const plantillas: string[] = [];
  for (const coleccion of COLECCIONES) {
    const texto = await readFile(
      join(raiz, "specs", "plantillas", CATALOGO[coleccion].plantilla),
      "utf8",
    );
    const secciones = SECCIONES_OBLIGATORIAS[coleccion]
      .map((s) => `## ${s}`)
      .join(", ");
    plantillas.push(
      `<${coleccion}>\nSecciones obligatorias: ${secciones}\nPlantilla:\n${texto}\n</${coleccion}>`,
    );
  }

  const existentes: string[] = [];
  for (const coleccion of COLECCIONES) {
    for (const slug of await slugsDe(join(raiz, "content", coleccion))) {
      existentes.push(`${coleccion}/${slug}`);
    }
  }

  return `Eres el redactor de entradas de una wiki técnica hecha con Astro (Markdown con frontmatter YAML, en español). Genera UNA sola entrada completa a partir de la petición del usuario.

## Colecciones disponibles (elige exactamente una; la eliges tú)
${plantillas.join("\n\n")}

## Cómo eliges la colección, la categoría y los tags
Las plantillas de arriba son solo estructura: sus valores de ejemplo (categoria, tags, web, npm...) NO son fijos por colección. Decide según la petición:
- glosario: término o concepto que se explica por sí solo (closure, CI/CD, hidratación).
- tecnologias: tecnología o producto que existe fuera de un paquete: lenguaje, framework, plataforma o servicio (React, Astro, GitHub Pages).
- paquetes: paquete instalable de npm (vite, zod).
- comparativas: la petición compara dos o más entradas existentes (Astro frente a Next.js).
- patrones: solución reutilizable a un problema recurrente, con estructura y ejemplo (Singleton, Observer, repositorio).
- ia: modelos, agentes, prompts o técnicas de inteligencia artificial (LLM, agente, RAG, prompt engineering).
- testing: herramientas, técnicas o conceptos de pruebas (cobertura, tests E2E, tests de carga).
- No elijas glosario por defecto: si la petición nombra un producto, un framework o un paquete concreto, va en tecnologias o paquetes; si describe cómo se resuelve un problema repetido, en patrones; si es de IA o de pruebas, en ia o testing.
- categoria: exactamente uno de: ${CATEGORIAS.join(", ")}. Elige la que mejor describa la entrada (framework para un framework, herramienta para un paquete, despliegue para un servicio de hosting, lenguaje para un lenguaje, concepto para un término del glosario); no te limites a la de la plantilla.
- tags: 1-3 de: ${ETIQUETAS.join(", ")} que describan de verdad la entrada. Usa [] solo si ninguna aplica.

## Reglas del frontmatter
- titulo: título de la entrada.
- resumen: máximo 200 caracteres, descripción concisa.
- categoria y tags: los que hayas elegido en la sección anterior.
- alias: array de sinónimos (puede ser []).
- relacionados: array con máximo 4 slugs de los existentes (puede ser []).
- fuentes: array de URLs http(s) reales; si no tienes fuentes fiables, [].
- autoenlace: true
- glosario: campo extra "terminoEn" opcional (idioma del término).
- tecnologias y paquetes: campo extra "alternativas" (slugs existentes) y "web" opcional (URL oficial).
- comparativas: campos extra "entidades" (mínimo 2 slugs existentes) y "contexto" (obligatorio, texto).

## Reglas del cuerpo
- Secciones obligatorias de la colección elegida, todas con contenido real (nada de secciones vacías).
- NO escribas "## Relacionados" ni "## Mencionado en": los genera el layout.
- Ejemplos de código con fences (\`\`\`js, \`\`\`python, ...).
- Español técnico y claro, tono de wiki de referencia.
- No dupliques ni divagues sobre entradas ya existentes.

## Entradas existentes (no las dupliques; solo de aquí salen relacionados/entidades/alternativas)
${existentes.join("\n")}

## Salida
Devuelve SOLO un JSON válido con exactamente esta forma, sin markdown ni comentarios:
{"coleccion":"paquetes","slug":"vite","contenido":"---\\n...frontmatter...\\n---\\n\\n## Qué es\\n..."}
- "coleccion" es la que hayas elegido; "contenido" es el archivo completo: frontmatter entre --- y cuerpo Markdown.
- slug en kebab-case minúsculas y sin acentos (ej: "static-site-generation").`;
}

/** Comprueba coleccion y slug (la existencia del archivo, main). */
export function comprobar(entrada: EntradaGenerada): string | null {
  if (!(COLECCIONES as readonly string[]).includes(entrada.coleccion)) {
    return `Colección "${entrada.coleccion}" no existe; usa una de: ${COLECCIONES.join(", ")}`;
  }
  if (
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entrada.slug) ||
    entrada.slug.length > 64
  ) {
    return `Slug "${entrada.slug}" inválido: usa kebab-case minúsculas (letras, dígitos y guiones)`;
  }
  return null;
}

/** Valor de `categoria:` del frontmatter (entre los --- iniciales) del contenido. */
function categoriaDe(contenido: string): string {
  const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---/.exec(contenido)?.[1] ?? "";
  const valor = /^categoria:\s*(.+)$/m.exec(frontmatter)?.[1] ?? "";
  return valor.trim().replace(/^["']|["']$/g, "");
}

/** Genera, valida y escribe la entrada bajo `raiz` (repo; por defecto "."). */
export async function main(raiz = "."): Promise<void> {
  const apiKey = process.env.GEMINI_API_KEY;
  const prompt = process.argv[2] ?? process.env.PROMPT;
  if (!apiKey) throw new Error("Falta la env GEMINI_API_KEY");
  if (!prompt) throw new Error("Falta el prompt (argv[2] o env PROMPT)");

  const contentDir = join(raiz, "content");
  const system = await construirSystem(raiz);
  let feedback = "";
  const esperaMs = Number(
    process.env.ESPERA_REINTENTO_MS ?? ESPERA_REINTENTO_MS,
  );

  for (let intento = 1; intento <= MAX_INTENTOS; intento++) {
    // Espera entre intentos: los 503 de "alta demanda" suelen ser transitorios.
    if (intento > 1) await dormir(esperaMs);
    const modelo = MODELOS[(intento - 1) % MODELOS.length];
    const usuario =
      intento === 1
        ? `Entrada solicitada: ${prompt}`
        : `Entrada solicitada: ${prompt}\n\nTu intento anterior no pasó la validación. Corrígelo:\n${feedback}`;

    // Tanto errores de API como respuestas ilegibles se reintentan con
    // feedback; si se agotan los intentos, main lanza y el job no hace push.
    let salida: EntradaGenerada;
    try {
      salida = parsearSalida(
        await llamarGemini(apiKey, system, usuario, modelo),
      );
    } catch (error) {
      feedback = `No se pudo generar: ${error instanceof Error ? error.message : String(error)}`;
      console.error(`Intento ${intento} (${modelo}): ${feedback}`);
      continue;
    }
    console.log(`Intento ${intento}: ${salida.coleccion}/${salida.slug}`);

    const problema = comprobar(salida);
    if (problema) {
      feedback = problema;
      continue;
    }

    const ruta = join(contentDir, salida.coleccion, `${salida.slug}.md`);
    // Nunca sobrescribir una entrada existente: el validador no la marcaría
    // como duplicada (mismo nombre de archivo) y se perdería contenido.
    try {
      await access(ruta);
      feedback = `La entrada "${ruta}" ya existe. Elige otro slug más específico para el concepto solicitado.`;
      continue;
    } catch {
      // No existe: es el caso esperado.
    }
    await mkdir(join(contentDir, salida.coleccion), { recursive: true });
    await writeFile(ruta, salida.contenido, "utf8");

    const { errores } = await validarContenido(contentDir);
    const mios = errores.filter((e) => e.includes(ruta));
    if (mios.length === 0) {
      if (process.env.GITHUB_OUTPUT) {
        await appendFile(
          process.env.GITHUB_OUTPUT,
          `ruta=${ruta}\ncoleccion=${salida.coleccion}\nslug=${salida.slug}\ncategoria=${categoriaDe(salida.contenido)}\n`,
        );
      }
      console.log(`Entrada generada y validada: ${ruta}`);
      return;
    }

    await unlink(ruta); // no dejar contenido inválido en el árbol
    feedback = mios.join("\n");
    console.error(`Validación fallida:\n${feedback}`);
  }

  throw new Error(
    `No se pudo generar una entrada válida tras ${MAX_INTENTOS} intentos.\n${feedback}`,
  );
}

/**
 * Deja la frase del último error en ERROR_FILE para que el workflow la
 * incluya en la notificación de Telegram (una sola línea, sin saltos).
 */
export async function guardarError(error: unknown): Promise<void> {
  const ruta = process.env.ERROR_FILE;
  if (!ruta) return;
  const frase = (error instanceof Error ? error.message : String(error))
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 600);
  await writeFile(ruta, frase, "utf8");
}

// Ejecución directa (patrón de validate-content.ts): al importar el módulo
// desde los tests no se lanza ningún trabajo.
const esEjecucionDirecta =
  process.argv[1] !== undefined &&
  import.meta.url ===
    new URL(`file://${process.argv[1].replace(/\\/g, "/")}`).href;

if (esEjecucionDirecta) {
  try {
    await main();
  } catch (error) {
    await guardarError(error);
    throw error;
  }
}
