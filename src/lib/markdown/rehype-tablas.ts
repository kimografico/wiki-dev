// Plugin de rehype: envuelve cada tabla de Markdown en un contenedor con scroll
// horizontal propio (RNF-08, WCAG 1.4.10 y 2.1.1).
//
// Una tabla no encoge por debajo de su contenido mínimo: con celdas de código
// largo se sale de la tarjeta y el scroll horizontal acaba en la página entera.
// El contenedor se queda ese scroll, se alcanza con teclado y lleva un nombre
// accesible tomado del encabezado de su sección.
//
// Es unified puro (no depende de Astro): se registra en `markdown.processor`
// de `astro.config.mjs`, donde está el comentario ASTRO / REACT+VITE.

/** Nodo hast mínimo (evita depender de @types/hast). */
interface Nodo {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: Nodo[];
}

const CLASE = "tabla-scroll";
const ETIQUETA_POR_DEFECTO = "Tabla con desplazamiento horizontal";

function esElemento(nodo: Nodo, tagName?: string): boolean {
  return (
    nodo.type === "element" &&
    (tagName === undefined || nodo.tagName === tagName)
  );
}

function esEncabezado(nodo: Nodo): boolean {
  return esElemento(nodo) && /^h[1-6]$/.test(nodo.tagName ?? "");
}

/** Texto plano de un nodo, para usar el encabezado como nombre accesible. */
function textoPlano(nodo: Nodo): string {
  if (typeof nodo.value === "string") return nodo.value;
  return (nodo.children ?? []).map(textoPlano).join("");
}

function clases(nodo: Nodo): string[] {
  const valor = nodo.properties?.className;
  return Array.isArray(valor) ? valor.map(String) : [];
}

/**
 * `scope="col"` en las cabeceras: sin él, un lector de pantalla no asocia cada
 * celda con su columna. Las tablas de Markdown solo tienen cabeceras de columna.
 */
function marcarCabeceras(tabla: Nodo): void {
  const recorrer = (nodo: Nodo, enCabecera: boolean): void => {
    for (const hijo of nodo.children ?? []) {
      if (esElemento(hijo, "th") && enCabecera) {
        hijo.properties = { ...hijo.properties, scope: "col" };
      }
      recorrer(hijo, enCabecera || esElemento(hijo, "thead"));
    }
  };
  recorrer(tabla, false);
}

function envolver(tabla: Nodo, titulo: string): Nodo {
  return {
    type: "element",
    tagName: "div",
    properties: {
      className: [CLASE],
      role: "region",
      tabIndex: 0,
      ariaLabel: titulo || ETIQUETA_POR_DEFECTO,
    },
    children: [tabla],
  };
}

function recorrer(padre: Nodo): void {
  const hijos = padre.children;
  if (!hijos) return;

  // El último encabezado del mismo nivel da nombre al contenedor de la tabla.
  let titulo = "";
  const nuevos: Nodo[] = [];

  for (const hijo of hijos) {
    if (esEncabezado(hijo)) {
      titulo = textoPlano(hijo).trim() || titulo;
      recorrer(hijo);
      nuevos.push(hijo);
      continue;
    }
    if (esElemento(hijo, "table")) {
      marcarCabeceras(hijo);
      nuevos.push(envolver(hijo, titulo));
      continue;
    }
    if (esElemento(hijo) && clases(hijo).includes(CLASE)) {
      // Ya envuelta (el plugin se ejecutó antes): no duplicar el contenedor.
      nuevos.push(hijo);
      continue;
    }
    recorrer(hijo);
    nuevos.push(hijo);
  }

  padre.children = nuevos;
}

/** Fábrica del plugin: devuelve el transformador que ejecuta el pipeline. */
export function rehypeTablas() {
  return (arbol: Nodo): void => recorrer(arbol);
}
