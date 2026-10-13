// Índice de menciones (RF-07): título y alias de cada entrada → su slug.
//
// Lee el frontmatter de `content/` con `gray-matter` y NO importa
// `astro:content` (regla §8), para que el plugin siga siendo un plugin estándar
// de remark, portable a cualquier proyecto con unified (RNF-07).
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import matter from "gray-matter";
import { COLECCIONES, type Coleccion } from "../content/esquemas.ts";

export interface TerminoMencion {
  /** Texto tal cual debe encontrarse en el cuerpo (título o alias). */
  termino: string;
  slug: string;
  coleccion: Coleccion;
}

export interface IndiceMenciones {
  terminos: TerminoMencion[];
}

async function archivosMarkdown(dir: string): Promise<string[]> {
  let entradas;
  try {
    entradas = await readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }
  const rutas: string[] = [];
  for (const entrada of entradas) {
    const ruta = join(dir, entrada.name);
    if (entrada.isDirectory()) {
      rutas.push(...(await archivosMarkdown(ruta)));
    } else if (entrada.name.endsWith(".md")) {
      rutas.push(ruta);
    }
  }
  return rutas;
}

/** Construye el índice leyendo los `.md` de `content/<coleccion>`. */
export async function construirIndiceMenciones(
  raiz = "content",
): Promise<IndiceMenciones> {
  const terminos = new Map<string, TerminoMencion>();

  for (const coleccion of COLECCIONES) {
    const dir = join(raiz, coleccion);
    for (const ruta of await archivosMarkdown(dir)) {
      const fuente = await readFile(ruta, "utf8");
      const { data } = matter(fuente);
      // `autoenlace: false` excluye el título y los alias de esta entrada (RF-07).
      if (data.autoenlace === false) continue;
      const slug = ruta
        .replace(/\\/g, "/")
        .split("/")
        .pop()!
        .replace(/\.md$/, "");
      const candidatos: string[] = [];
      if (typeof data.titulo === "string") candidatos.push(data.titulo);
      if (Array.isArray(data.alias)) {
        for (const alias of data.alias) {
          if (typeof alias === "string") candidatos.push(alias);
        }
      }
      for (const termino of candidatos) {
        if (termino.length === 0 || terminos.has(termino)) continue;
        terminos.set(termino, { termino, slug, coleccion });
      }
    }
  }

  // Gana la coincidencia más larga: el plugin usa este orden al enlazar.
  const lista = [...terminos.values()].sort(
    (a, b) => b.termino.length - a.termino.length,
  );
  return { terminos: lista };
}

let cache: Promise<IndiceMenciones> | undefined;

/**
 * Índice memoizado: se construye una sola vez por build (RNF-04), sin importar
 * cuántas entradas lo consulten.
 */
export function indiceMenciones(raiz = "content"): Promise<IndiceMenciones> {
  cache ??= construirIndiceMenciones(raiz);
  return cache;
}
