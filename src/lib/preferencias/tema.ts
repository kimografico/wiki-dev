// Preferencias del lector: tema (RF-13). TypeScript puro, sin dependencia de
// Astro (RNF-07, RNF-09): el estado vive solo en el navegador.
//
// Claves de `localStorage` siempre con prefijo `wiki:` porque todos los sitios
// de proyecto de un mismo usuario de GitHub Pages comparten origen (§12).

export type Tema = "light" | "dark";

export const CLAVE_TEMA = "wiki:tema";

function tieneAlmacen(): boolean {
  try {
    return typeof localStorage !== "undefined";
  } catch {
    return false;
  }
}

/** Tema que el sistema operativo prefiere. */
export function temaDelSistema(): Tema {
  try {
    return typeof matchMedia === "function" &&
      matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  } catch {
    return "light";
  }
}

/** Tema guardado por el lector, o `null` si no hay (manda el sistema). */
export function leerTemaAlmacenado(): Tema | null {
  if (!tieneAlmacen()) return null;
  try {
    const valor = localStorage.getItem(CLAVE_TEMA);
    return valor === "light" || valor === "dark" ? valor : null;
  } catch {
    return null;
  }
}

/** Tema con el que debe arrancar la página. */
export function temaInicial(): Tema {
  return leerTemaAlmacenado() ?? temaDelSistema();
}

/** Guarda la elección del lector. */
export function guardarTema(tema: Tema): void {
  if (!tieneAlmacen()) return;
  try {
    localStorage.setItem(CLAVE_TEMA, tema);
  } catch {
    /* almacenamiento no disponible: la elección no persiste, sin errores */
  }
}

/**
 * Aplica el tema al documento. `data-theme` es el atributo que leen los tokens
 * CSS y `astro-mermaid` (RF-13).
 */
export function aplicarTema(tema: Tema): void {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.theme = tema;
}

/** Aplica un tema y lo guarda: lo que hace el interruptor del header. */
export function alternarTema(actual: Tema): Tema {
  const nuevo: Tema = actual === "dark" ? "light" : "dark";
  aplicarTema(nuevo);
  guardarTema(nuevo);
  return nuevo;
}
