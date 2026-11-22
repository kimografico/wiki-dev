// Genera una entrada de la wiki con Gemini a partir de un prompt (Telegram).
//
// Flujo:
//  1. Inyecta al modelo las plantillas (specs/plantillas), los enums y los
//     slugs existentes, leídos del repo — el prompt no lleva el schema
//     hardcodeado, así no se desincroniza de src/lib/content/esquemas.ts.
//  2. Pide JSON {coleccion, slug, contenido} y escribe
//     content/<coleccion>/<slug>.md.
//  3. Valida con validarContenido(); si hay errores, reintenta una vez
//     alimentando al modelo con ellos. Si vuelve a fallar, aborta con error
//     y el job no hace push (main queda intacto).
//
// Requiere GEMINI_API_KEY y el prompt en argv[2] o en la env PROMPT.
// Escribe `ruta=`, `coleccion=` y `slug=` en GITHUB_OUTPUT si existe.
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
  type Coleccion,
} from "../src/lib/content/esquemas.ts";
import { validarContenido } from "./validate-content.ts";

/** Plantilla de cada colección en specs/plantillas (nombres en singular). */
const PLANTILLAS: Record<Coleccion, string> = {
  glosario: "glosario.md",
  tecnologias: "tecnologia.md",
  paquetes: "paquete.md",
  comparativas: "comparativa.md",
};

const MODELO = "gemini-2.5-flash";
const MAX_INTENTOS = 2;

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

/** Llama a la API de Gemini y devuelve el texto (sin pensamientos). */
async function llamarGemini(
  apiKey: string,
  system: string,
  usuario: string,
): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODELO}:generateContent`;
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
    throw new Error(`Gemini respondió ${res.status}: ${await res.text()}`);
  }
  const data = (await res.json()) as RespuestaGemini;
  const partes = data.candidates?.[0]?.content?.parts ?? [];
  const texto = partes.find((p) => !p.thought && p.text)?.text;
  if (!texto) throw new Error("Gemini devolvió una respuesta vacía");
  return texto;
}

/** Parsea la respuesta del modelo, aceptando también bloques ```json. */
function parsearSalida(texto: string): EntradaGenerada {
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
async function slugsDe(dir: string): Promise<string[]> {
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
async function construirSystem(): Promise<string> {
  const plantillas: string[] = [];
  for (const coleccion of COLECCIONES) {
    const texto = await readFile(
      join("specs", "plantillas", PLANTILLAS[coleccion]),
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
    for (const slug of await slugsDe(join("content", coleccion))) {
      existentes.push(`${coleccion}/${slug}`);
    }
  }

  return `Eres el redactor de entradas de una wiki técnica hecha con Astro (Markdown con frontmatter YAML, en español). Genera UNA sola entrada completa a partir de la petición del usuario.

## Colecciones disponibles (elige exactamente una)
${plantillas.join("\n\n")}

## Reglas del frontmatter
- titulo: título de la entrada.
- resumen: máximo 200 caracteres, descripción concisa.
- categoria: uno de: ${CATEGORIAS.join(", ")}
- tags: array con como máximo 3 valores de: ${ETIQUETAS.join(", ")} (usa [] si no aplica).
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
{"coleccion":"glosario","slug":"closure","contenido":"---\\n...frontmatter...\\n---\\n\\n## Definición\\n..."}
- "contenido" es el archivo completo: frontmatter entre --- y cuerpo Markdown.
- slug en kebab-case minúsculas y sin acentos (ej: "static-site-generation").`;
}

/** Comprueba coleccion, slug y que el archivo no exista ya. */
function comprobar(entrada: EntradaGenerada): string | null {
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

async function main(): Promise<void> {
  const apiKey = process.env.GEMINI_API_KEY;
  const prompt = process.argv[2] ?? process.env.PROMPT;
  if (!apiKey) throw new Error("Falta la env GEMINI_API_KEY");
  if (!prompt) throw new Error("Falta el prompt (argv[2] o env PROMPT)");

  const system = await construirSystem();
  let feedback = "";

  for (let intento = 1; intento <= MAX_INTENTOS; intento++) {
    const usuario =
      intento === 1
        ? `Concepto solicitado: ${prompt}`
        : `Concepto solicitado: ${prompt}\n\nTu intento anterior no pasó la validación. Corrígelo:\n${feedback}`;

    const salida = parsearSalida(await llamarGemini(apiKey, system, usuario));
    console.log(`Intento ${intento}: ${salida.coleccion}/${salida.slug}`);

    const problema = comprobar(salida);
    if (problema) {
      feedback = problema;
      continue;
    }

    const ruta = join("content", salida.coleccion, `${salida.slug}.md`);
    // Nunca sobrescribir una entrada existente: el validador no la marcaría
    // como duplicada (mismo nombre de archivo) y se perdería contenido.
    try {
      await access(ruta);
      feedback = `La entrada "${ruta}" ya existe. Elige otro slug más específico para el concepto solicitado.`;
      continue;
    } catch {
      // No existe: es el caso esperado.
    }
    await mkdir(join("content", salida.coleccion), { recursive: true });
    await writeFile(ruta, salida.contenido, "utf8");

    const { errores } = await validarContenido();
    const mios = errores.filter((e) => e.includes(ruta));
    if (mios.length === 0) {
      if (process.env.GITHUB_OUTPUT) {
        await appendFile(
          process.env.GITHUB_OUTPUT,
          `ruta=${ruta}\ncoleccion=${salida.coleccion}\nslug=${salida.slug}\n`,
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

await main();
