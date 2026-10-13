// Plugin de remark: menciones enlazadas (RF-07, Patrón 7).
//
// Convierte la primera mención de cada término con entrada propia en un enlace,
// en cada sección `##`. Es TypeScript sin dependencias de Astro (RNF-07): solo
// recorre el árbol mdast y usa el índice de `indice-menciones.ts`.
//
// Reglas (RF-07):
//  - coincidencia exacta ignorando mayúsculas/minúsculas, como palabra completa;
//  - gana la coincidencia más larga ("React Router" antes que "React");
//  - solo la primera mención de cada término en cada sección `##`;
//  - nunca dentro de código, código en línea, encabezados, HTML ni enlaces;
//  - una entrada no se enlaza a sí misma; los enlaces respetan `base`.
import { indiceMenciones } from "./indice-menciones.ts";
import type { IndiceMenciones, TerminoMencion } from "./indice-menciones.ts";

/** Nodo mdast mínimo (evita depender de @types/mdast). */
interface Nodo {
  type: string;
  value?: string;
  url?: string;
  depth?: number;
  children?: Nodo[];
}

interface ArchivoMd {
  path?: string;
  history?: string[];
}

export interface OpcionesMenciones {
  /** `base` del sitio, p. ej. `/wiki-dev/`. */
  base: string;
  /** Directorio raíz del contenido (por defecto `content`). */
  raizContenido?: string;
  /** Índice ya construido (útil en tests). */
  indice?: IndiceMenciones;
}

// Tipos que no se recorren ni se enlazan.
const SALTAR = new Set([
  "code",
  "inlineCode",
  "heading",
  "link",
  "linkReference",
  "image",
  "imageReference",
  "html",
  "definition",
  "yaml",
]);

function escaparRegex(texto: string): string {
  return texto.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function construirRegex(terminos: TerminoMencion[]): RegExp | null {
  if (terminos.length === 0) return null;
  // Ya vienen ordenados de más largo a más corto: la alternancia en JS es
  // "el primero que encaja", así que la coincidencia más larga gana.
  const alternancia = terminos.map((t) => escaparRegex(t.termino)).join("|");
  // Palabra completa sin usar \b (falla con términos como "Next.js"): los
  // caracteres contiguos al término no pueden ser alfanuméricos. La `i` hace
  // la coincidencia insensible a mayúsculas/minúsculas.
  return new RegExp(`(?<![A-Za-z0-9])(?:${alternancia})(?![A-Za-z0-9])`, "gi");
}

function slugDeArchivo(archivo: ArchivoMd | undefined): string | undefined {
  const ruta = archivo?.path ?? archivo?.history?.[0];
  if (typeof ruta !== "string" || ruta.length === 0) return undefined;
  return ruta.replace(/\\/g, "/").split("/").pop()!.replace(/\.md$/, "");
}

function normalizarBase(base: string): string {
  return base.endsWith("/") ? base : `${base}/`;
}

/**
 * Fábrica del plugin de remark. Devuelve el transformador que Astro ejecuta en
 * build sobre el árbol de cada entrada de Markdown.
 */
export function remarkMenciones(opciones: OpcionesMenciones) {
  const base = normalizarBase(opciones.base);

  return async (arbol: Nodo, archivo?: ArchivoMd): Promise<void> => {
    const indice =
      opciones.indice ??
      (await indiceMenciones(opciones.raizContenido ?? "content"));
    const slugActual = slugDeArchivo(archivo);
    const terminos = indice.terminos.filter((t) => t.slug !== slugActual);
    const regex = construirRegex(terminos);
    if (!regex) return;

    const porTermino = new Map(
      terminos.map((t) => [t.termino.toLowerCase(), t]),
    );
    let vistos = new Set<string>();

    const enlazarTexto = (valor: string): Nodo[] => {
      const partes: Nodo[] = [];
      let ultimo = 0;
      regex.lastIndex = 0;
      let coincidencia: RegExpExecArray | null;
      while ((coincidencia = regex.exec(valor)) !== null) {
        const termino = coincidencia[0];
        const clave = termino.toLowerCase();
        if (vistos.has(clave)) continue;
        const info = porTermino.get(clave);
        if (!info) continue;
        if (coincidencia.index > ultimo) {
          partes.push({
            type: "text",
            value: valor.slice(ultimo, coincidencia.index),
          });
        }
        partes.push({
          type: "link",
          url: `${base}${info.coleccion}/${info.slug}`,
          children: [{ type: "text", value: termino }],
        });
        vistos.add(clave);
        ultimo = coincidencia.index + termino.length;
      }
      if (ultimo < valor.length) {
        partes.push({ type: "text", value: valor.slice(ultimo) });
      }
      return partes;
    };

    const recorrer = (padre: Nodo): void => {
      if (!padre.children) return;
      const nuevos: Nodo[] = [];
      for (const hijo of padre.children) {
        if (hijo.type === "heading") {
          // Cada sección `##` reinicia las "primeras menciones" (RF-07).
          if (hijo.depth === 2) vistos = new Set<string>();
          nuevos.push(hijo); // los encabezados nunca se enlazan
          continue;
        }
        if (SALTAR.has(hijo.type)) {
          nuevos.push(hijo);
          continue;
        }
        if (hijo.type === "text" && typeof hijo.value === "string") {
          nuevos.push(...enlazarTexto(hijo.value));
        } else {
          recorrer(hijo);
          nuevos.push(hijo);
        }
      }
      padre.children = nuevos;
    };

    recorrer(arbol);
  };
}
