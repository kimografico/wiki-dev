// Escáner único de Markdown del repo. Lo usan el validador de contenido, el
// índice de menciones y el generador de entradas para que las tres vistas del
// contenido no puedan divergir (RF-10, RNF-07).
import { readdir } from "node:fs/promises";
import { join } from "node:path";

/** Rutas `.md` bajo `dir`, recursivamente; un directorio ausente da vacío. */
export async function archivosMarkdown(dir: string): Promise<string[]> {
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

/** Slugs (nombre de archivo sin `.md`) bajo `dir`, recursivamente. */
export async function slugsDe(dir: string): Promise<string[]> {
  const rutas = await archivosMarkdown(dir);
  return rutas.map((ruta) => ruta.split(/[\\/]/).pop()!.replace(/\.md$/, ""));
}
