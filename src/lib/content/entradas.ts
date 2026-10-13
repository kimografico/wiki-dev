// Capa de acceso a contenido (Patrón 3: Repository / Facade).
//
// Es el ÚNICO módulo que importa `astro:content` (§8). Las páginas y los
// componentes piden datos con funciones de dominio y no conocen la fuente.
//
// ASTRO: `getCollection` lee de las content collections y `render` genera el
//   componente `Content` de una entrada.
// REACT+VITE: aquí iría `import.meta.glob` + parseo del frontmatter; las
//   funciones exportadas serían idénticas (ese es el objetivo del patrón).
import { getCollection, render } from "astro:content";
import type { CollectionEntry } from "astro:content";
import { COLECCIONES, type Coleccion } from "./esquemas.ts";

/** Entrada normalizada: campos comunes ya resueltos + la entrada original. */
export interface Entrada {
  slug: string;
  coleccion: Coleccion;
  titulo: string;
  resumen: string;
  categoria: string;
  tags: string[];
  alias: string[];
  relacionados: string[];
  autoenlace: boolean;
  alternativas: string[];
  entidades: string[];
  entry: CollectionEntry<Coleccion>;
}

function normalizar(
  entry: CollectionEntry<Coleccion>,
  coleccion: Coleccion,
): Entrada {
  const data = entry.data as {
    titulo: string;
    resumen: string;
    categoria: string;
    tags: string[];
    alias: string[];
    relacionados: string[];
    autoenlace: boolean;
    alternativas?: string[];
    entidades?: string[];
  };
  return {
    slug: entry.id,
    coleccion,
    titulo: data.titulo,
    resumen: data.resumen,
    categoria: data.categoria,
    tags: data.tags,
    alias: data.alias,
    relacionados: data.relacionados,
    autoenlace: data.autoenlace,
    alternativas: data.alternativas ?? [],
    entidades: data.entidades ?? [],
    entry,
  };
}

/** Todas las entradas de todas las colecciones. */
export async function getTodasLasEntradas(): Promise<Entrada[]> {
  const porColeccion = await Promise.all(
    COLECCIONES.map(async (coleccion) => {
      const entries = await getCollection(coleccion);
      return entries.map((entry) => normalizar(entry, coleccion));
    }),
  );
  return porColeccion.flat();
}

/** Las entradas de una colección concreta. */
export async function getPorColeccion(coleccion: Coleccion): Promise<Entrada[]> {
  const entries = await getCollection(coleccion);
  return entries.map((entry) => normalizar(entry, coleccion));
}

/** Una entrada por su slug (único en toda la wiki). */
export async function getEntrada(slug: string): Promise<Entrada | undefined> {
  const todas = await getTodasLasEntradas();
  return todas.find((entrada) => entrada.slug === slug);
}

/** Entradas declaradas en `relacionados`, ya resueltas. */
export async function getRelacionados(slug: string): Promise<Entrada[]> {
  const entrada = await getEntrada(slug);
  if (!entrada) return [];
  const todas = await getTodasLasEntradas();
  const porSlug = new Map(todas.map((e) => [e.slug, e]));
  return entrada.relacionados
    .map((s) => porSlug.get(s))
    .filter((e): e is Entrada => e !== undefined);
}

/** Entradas que declaran este slug en `relacionados` (backlinks, RF-06). */
export async function getBacklinks(slug: string): Promise<Entrada[]> {
  const todas = await getTodasLasEntradas();
  return todas.filter((entrada) => entrada.relacionados.includes(slug));
}

/** Entrada + su componente de contenido renderizado, para las fichas. */
export async function getPaginaEntrada(slug: string) {
  const entrada = await getEntrada(slug);
  if (!entrada) return undefined;
  const { Content, headings } = await render(entrada.entry);
  return { entrada, Content, headings };
}

/** URL pública de una entrada, respetando `base` (§9). */
export function urlEntrada(
  coleccion: Coleccion,
  slug: string,
  base: string,
): string {
  return `${base}${coleccion}/${slug}`;
}
