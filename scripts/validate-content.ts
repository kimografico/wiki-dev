// Validación de contenido (RF-10) — `npm run validate`.
//
// Falla si hay: esquema inválido, slug duplicado (global), referencias a
// entradas inexistentes, enlaces internos rotos, secciones obligatorias
// ausentes, `## Relacionados`/`## Mencionado en` escritos en el cuerpo, alias en
// conflicto o etiquetas fuera del catálogo. Avisa, sin fallar, de las entradas
// por debajo del mínimo de palabras (MANUAL.md).
//
// Reutiliza los esquemas de `src/lib/content/esquemas.ts` (única fuente de
// verdad) y lee el frontmatter con `gray-matter`, sin depender de Astro.
//
// Se ejecuta con el TypeScript nativo de Node (`node scripts/validate-content.ts`).
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import matter from "gray-matter";
import { archivosMarkdown } from "../src/lib/content/archivos.ts";
import {
  CAMPOS_RELACION,
  COLECCIONES,
  SECCIONES_GENERADAS,
  SECCIONES_OBLIGATORIAS,
  esquemaPaginaTelegramBot,
  esquemasPorColeccion,
  type Coleccion,
} from "../src/lib/content/esquemas.ts";

/** Objetivo mínimo de palabras del cuerpo por colección (MANUAL.md). */
const MIN_PALABRAS: Partial<Record<Coleccion, number>> = {
  glosario: 150,
  tecnologias: 250,
  paquetes: 250,
  comparativas: 250,
  patrones: 250,
  ia: 250,
  testing: 250,
};

/** Palabras del cuerpo Markdown: cuenta también el código, no el frontmatter. */
function contarPalabras(texto: string): number {
  return (texto.match(/[\p{L}\p{N}]+(?:[-_][\p{L}\p{N}]+)*/gu) ?? []).length;
}

interface EntradaLeida {
  ruta: string;
  coleccion: Coleccion;
  slug: string;
  data: Record<string, unknown>;
  cuerpo: string;
}

/** Encabezados `##` del cuerpo, ignorando los que están dentro de code fences. */
function encabezados(cuerpo: string): string[] {
  const resultado: string[] = [];
  let enFence = false;
  for (const linea of cuerpo.split("\n")) {
    if (/^\s*```/.test(linea)) {
      enFence = !enFence;
      continue;
    }
    if (enFence) continue;
    const m = /^##\s+(.+?)\s*$/.exec(linea);
    if (m) resultado.push(m[1]!);
  }
  return resultado;
}

/** Enlaces internos escritos a mano: `[texto](/...)`. */
function enlacesInternos(cuerpo: string): string[] {
  const urls: string[] = [];
  const regex = /\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(cuerpo)) !== null) {
    const url = m[1]!;
    if (url.startsWith("/") || url.startsWith("./")) urls.push(url);
  }
  return urls;
}

export interface ResultadoValidacion {
  errores: string[];
  /** Entradas por debajo del mínimo de palabras: informan, no fallan. */
  avisos: string[];
  entradas: EntradaLeida[];
}

/** Valida todo el contenido bajo `raiz` y devuelve los errores encontrados. */
export async function validarContenido(
  raiz = "content",
): Promise<ResultadoValidacion> {
  const errores: string[] = [];
  const avisos: string[] = [];
  const entradas: EntradaLeida[] = [];

  for (const coleccion of COLECCIONES) {
    const esquema = esquemasPorColeccion[coleccion];
    for (const ruta of await archivosMarkdown(join(raiz, coleccion))) {
      const fuente = await readFile(ruta, "utf8");
      const { data, content } = matter(fuente);
      const slug = ruta
        .replace(/\\/g, "/")
        .split("/")
        .pop()!
        .replace(/\.md$/, "");
      const parsed = esquema.safeParse(data);
      if (!parsed.success) {
        for (const problema of parsed.error.issues) {
          errores.push(
            `${ruta}: esquema inválido en "${problema.path.join(".")}": ${problema.message}`,
          );
        }
      }
      entradas.push({ ruta, coleccion, slug, data, cuerpo: content });
    }
  }

  for (const ruta of await archivosMarkdown(join(raiz, "telegrambot"))) {
    const fuente = await readFile(ruta, "utf8");
    const { data } = matter(fuente);
    const parsed = esquemaPaginaTelegramBot.safeParse(data);
    if (!parsed.success) {
      for (const problema of parsed.error.issues) {
        errores.push(
          `${ruta}: esquema inválido en "${problema.path.join(".")}": ${problema.message}`,
        );
      }
      continue;
    }

    const slug = ruta
      .replace(/\\/g, "/")
      .split("/")
      .pop()!
      .replace(/\.md$/, "");
    if (parsed.data.apartado !== slug) {
      errores.push(
        `${ruta}: el apartado "${parsed.data.apartado}" debe coincidir con el nombre del archivo`,
      );
    }
  }

  // Slug único en toda la wiki (RF-10).
  const porSlug = new Map<string, EntradaLeida>();
  for (const entrada of entradas) {
    const previa = porSlug.get(entrada.slug);
    if (previa) {
      errores.push(
        `${entrada.ruta}: slug duplicado "${entrada.slug}" (ya en ${previa.ruta})`,
      );
    } else {
      porSlug.set(entrada.slug, entrada);
    }
  }

  // Alias en conflicto con otro alias, slug o título (RF-10).
  const propietarioDe = new Map<string, string>();
  const registrar = (clave: string, ruta: string) => {
    const previo = propietarioDe.get(clave);
    if (previo && previo !== ruta) {
      errores.push(`${ruta}: la clave "${clave}" ya la usa ${previo}`);
    } else {
      propietarioDe.set(clave, ruta);
    }
  };
  for (const entrada of entradas) {
    registrar(entrada.slug, entrada.ruta);
  }
  for (const entrada of entradas) {
    const titulo = entrada.data.titulo;
    if (typeof titulo === "string") registrar(titulo, entrada.ruta);
  }
  for (const entrada of entradas) {
    const alias = entrada.data.alias;
    if (Array.isArray(alias)) {
      for (const a of alias)
        if (typeof a === "string") registrar(a, entrada.ruta);
    }
  }

  // Referencias, secciones y enlaces.
  for (const entrada of entradas) {
    for (const campo of CAMPOS_RELACION[entrada.coleccion]) {
      const valor = entrada.data[campo];
      if (!Array.isArray(valor)) continue;
      for (const referencia of valor) {
        if (typeof referencia === "string" && !porSlug.has(referencia)) {
          errores.push(
            `${entrada.ruta}: "${campo}" referencia a "${referencia}", que no existe`,
          );
        }
      }
    }

    const encabezadosCuerpo = encabezados(entrada.cuerpo);
    for (const obligatoria of SECCIONES_OBLIGATORIAS[entrada.coleccion]) {
      if (!encabezadosCuerpo.includes(obligatoria)) {
        errores.push(
          `${entrada.ruta}: falta la sección obligatoria "## ${obligatoria}"`,
        );
      }
    }
    for (const generada of SECCIONES_GENERADAS) {
      if (encabezadosCuerpo.includes(generada)) {
        errores.push(
          `${entrada.ruta}: "## ${generada}" la genera el layout, no debe escribirse`,
        );
      }
    }

    for (const url of enlacesInternos(entrada.cuerpo)) {
      const segmentos = url.replace(/^\.\//, "").split("/").filter(Boolean);
      const posibleSlug = segmentos[segmentos.length - 1] ?? "";
      const esPaginaConocida = [
        ...COLECCIONES,
        "categorias",
        "etiquetas",
        "buscar",
        "acerca-de",
      ].includes(posibleSlug);
      if (!posibleSlug || esPaginaConocida) continue;
      if (!porSlug.has(posibleSlug)) {
        errores.push(
          `${entrada.ruta}: enlace interno roto "${url}" (no existe la entrada "${posibleSlug}")`,
        );
      }
    }

    const minimo = MIN_PALABRAS[entrada.coleccion];
    if (minimo !== undefined) {
      const palabras = contarPalabras(entrada.cuerpo);
      if (palabras < minimo) {
        avisos.push(`${entrada.ruta}: ${palabras} palabras; mínimo ${minimo}`);
      }
    }
  }

  return { errores, avisos, entradas };
}

const esEjecucionDirecta =
  process.argv[1] !== undefined &&
  import.meta.url ===
    new URL(`file://${process.argv[1].replace(/\\/g, "/")}`).href;

if (esEjecucionDirecta) {
  const { errores, avisos } = await validarContenido();
  if (errores.length > 0) {
    console.error(`Validación de contenido: ${errores.length} problema(s)\n`);
    for (const error of errores) console.error(`  ✗ ${error}`);
    process.exit(1);
  }
  console.log("Validación de contenido: todo correcto.");
  if (avisos.length > 0) {
    console.log(
      `Avisos de profundidad: ${avisos.length} entrada(s) por debajo del mínimo (glosario 150, fichas 250). No bloquean la publicación.`,
    );
    for (const aviso of avisos.slice(0, 10)) console.log(`  · ${aviso}`);
    if (avisos.length > 10) console.log(`  · ... y ${avisos.length - 10} más`);
  }
}
