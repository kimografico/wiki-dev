// Validación de contenido (RF-10) — `npm run validate`.
//
// Falla si hay: esquema inválido, slug duplicado (global), referencias a
// entradas inexistentes, enlaces internos rotos, secciones obligatorias
// ausentes, `## Relacionados`/`## Mencionado en` escritos en el cuerpo, alias en
// conflicto o etiquetas fuera del catálogo.
//
// Reutiliza los esquemas de `src/lib/content/esquemas.ts` (única fuente de
// verdad) y lee el frontmatter con `gray-matter`, sin depender de Astro.
//
// Se ejecuta con el TypeScript nativo de Node (`node scripts/validate-content.ts`).
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import matter from "gray-matter";
import {
  CAMPOS_RELACION,
  COLECCIONES,
  SECCIONES_GENERADAS,
  SECCIONES_OBLIGATORIAS,
  esquemasPorColeccion,
  type Coleccion,
} from "../src/lib/content/esquemas.ts";

interface EntradaLeida {
  ruta: string;
  coleccion: Coleccion;
  slug: string;
  data: Record<string, unknown>;
  cuerpo: string;
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
  entradas: EntradaLeida[];
}

/** Valida todo el contenido bajo `raiz` y devuelve los errores encontrados. */
export async function validarContenido(
  raiz = "content",
): Promise<ResultadoValidacion> {
  const errores: string[] = [];
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
        "glosario",
        "tecnologias",
        "paquetes",
        "comparativas",
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
  }

  return { errores, entradas };
}

const esEjecucionDirecta =
  process.argv[1] !== undefined &&
  import.meta.url ===
    new URL(`file://${process.argv[1].replace(/\\/g, "/")}`).href;

if (esEjecucionDirecta) {
  const { errores } = await validarContenido();
  if (errores.length > 0) {
    console.error(`Validación de contenido: ${errores.length} problema(s)\n`);
    for (const error of errores) console.error(`  ✗ ${error}`);
    process.exit(1);
  }
  console.log("Validación de contenido: todo correcto.");
}
