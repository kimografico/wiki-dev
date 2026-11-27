// Contexto de la wiki para agentes — `npm run contexto`.
//
// Imprime en una lectura las reglas vigentes (colecciones, categorías,
// etiquetas, secciones, relaciones y mínimos), las plantillas y un índice de
// `content/` con slug, título, alias, categoría y palabras. Todo se lee del
// checkout en cada ejecución: aquí no se copia ningún enum ni plantilla.
//
// Con términos, filtra el índice: `npm run contexto -- jenkins lockfile`.
// Se ejecuta con el TypeScript nativo de Node (`node scripts/contexto-wiki.ts`).
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import matter from "gray-matter";
import { archivosMarkdown } from "../src/lib/content/archivos.ts";
import {
  CAMPOS_RELACION,
  CATEGORIAS,
  COLECCIONES,
  ETIQUETAS,
  SECCIONES_GENERADAS,
  SECCIONES_OBLIGATORIAS,
} from "../src/lib/content/esquemas.ts";
import { MIN_PALABRAS, contarPalabras } from "./validate-content.ts";

interface Ficha {
  slug: string;
  titulo: string;
  alias: string[];
  coleccion: string;
  categoria: string;
  palabras: number;
}

function slugDe(ruta: string): string {
  return ruta.split(/[\\/]/).pop()!.replace(/\.md$/, "");
}

async function lineas(filtro: string[]): Promise<string[]> {
  const salida: string[] = [
    "# Contexto de la wiki",
    "",
    "Generado en caliente del checkout; no editar. Fuentes: `specs/MANUAL.md`,",
    "`specs/agentes-y-skills.md` y `src/lib/content/esquemas.ts`.",
    "",
    "## Reglas",
    "",
    `- Colecciones: ${COLECCIONES.join(", ")}`,
    `- Categorías: ${CATEGORIAS.join(", ")}`,
    `- Etiquetas: ${ETIQUETAS.join(", ")}`,
    `- Secciones generadas por el layout (no escribirlas): ${SECCIONES_GENERADAS.join(", ")}`,
    `- Extensión: glosario ${MIN_PALABRAS.glosario}–250 palabras; fichas ${MIN_PALABRAS.tecnologias}–600 (mínimo ${MIN_PALABRAS.tecnologias}; 600 es objetivo).`,
    "",
    "Secciones obligatorias y campos de relación:",
    "",
  ];

  for (const coleccion of COLECCIONES) {
    salida.push(
      `- \`${coleccion}\`: ${SECCIONES_OBLIGATORIAS[coleccion].join(" · ")}. Relación: ${CAMPOS_RELACION[coleccion].join(", ") || "ninguna"}.`,
    );
  }

  salida.push("", "## Plantillas", "");
  for (const ruta of await archivosMarkdown("specs/plantillas")) {
    salida.push(`### ${slugDe(ruta)} (\`${ruta}\`)`, "");
    salida.push((await readFile(ruta, "utf8")).trimEnd(), "");
  }

  salida.push("", "## Índice de contenido", "");
  salida.push("`slug` — título · colección/categoría · palabras · alias", "");
  for (const coleccion of COLECCIONES) {
    const rutas = (await archivosMarkdown(join("content", coleccion))).sort();
    for (const ruta of rutas) {
      const { data, content } = matter(await readFile(ruta, "utf8"));
      const alias = Array.isArray(data.alias) ? (data.alias as string[]) : [];
      const ficha: Ficha = {
        slug: slugDe(ruta),
        titulo: String(data.titulo ?? ""),
        alias,
        coleccion,
        categoria: String(data.categoria ?? ""),
        palabras: contarPalabras(content),
      };
      const buscable =
        `${ficha.slug} ${ficha.titulo} ${ficha.alias.join(" ")}`.toLowerCase();
      if (
        filtro.length > 0 &&
        !filtro.some((termino) => buscable.includes(termino))
      ) {
        continue;
      }
      salida.push(
        `- \`${ficha.slug}\` — ${ficha.titulo} · ${ficha.coleccion}/${ficha.categoria} · ${ficha.palabras} p.${ficha.alias.length > 0 ? ` · alias: ${ficha.alias.join(", ")}` : ""}`,
      );
    }
  }

  salida.push(
    "",
    "Para trabajar: abre solo la plantilla y las entradas que vayas a tocar;",
    "profundiza en las normas largas si el caso lo pide.",
  );
  return salida;
}

const filtro = process.argv.slice(2).map((t) => t.toLowerCase());
console.log((await lineas(filtro)).join("\n"));
