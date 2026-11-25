// Preferencias del lector: aprendidas y «solo pendientes» (RF-14). TypeScript
// puro, sin dependencia de Astro (RNF-07): el estado vive solo en el navegador
// y nunca sale de él (RNF-09).
//
// Claves siempre con prefijo `wiki:` porque todos los sitios de proyecto de un
// mismo usuario de GitHub Pages comparten origen (§12).
//
// El script inline de <head> (BaseLayout) aplica estas mismas reglas antes del
// primer pintado: no puede importar este módulo, así que lleva una copia mínima
// y el test de coherencia comprueba que ambas versiones coinciden.
import { tieneAlmacen } from "./almacen.ts";

export const CLAVE_APRENDIDAS = "wiki:aprendidas";
export const CLAVE_SOLO_PENDIENTES = "wiki:solo-pendientes";

/** Evento que avisa a las islas de que las preferencias han cambiado. */
export const EVENTO_PREFERENCIAS = "wiki:preferencias";

/** Slugs válidos dentro de las reglas CSS: evita inyectar CSS arbitrario. */
const RE_SLUG = /^[a-z0-9-]+$/;

/** false si el navegador no permite almacenar: los controles quedan desactivados. */
export function hayAlmacenamiento(): boolean {
  return tieneAlmacen();
}

/** Slugs aprendidos válidos; un dato ausente, corrupto o inválido se ignora. */
export function leerAprendidas(): string[] {
  if (!tieneAlmacen()) return [];
  try {
    const crudo: unknown = JSON.parse(
      localStorage.getItem(CLAVE_APRENDIDAS) ?? "[]",
    );
    if (!Array.isArray(crudo)) return [];
    return crudo.filter(
      (valor): valor is string =>
        typeof valor === "string" && RE_SLUG.test(valor),
    );
  } catch {
    return [];
  }
}

/** ¿Está marcada esta entrada como aprendida? */
export function esAprendida(slug: string): boolean {
  return leerAprendidas().includes(slug);
}

/** Añade o quita una aprendida; devuelve la lista resultante. */
export function alternarAprendida(slug: string): string[] {
  const actuales = leerAprendidas();
  const nueva = actuales.includes(slug)
    ? actuales.filter((valor) => valor !== slug)
    : [...actuales, slug];
  if (tieneAlmacen()) {
    try {
      localStorage.setItem(CLAVE_APRENDIDAS, JSON.stringify(nueva));
    } catch {
      /* sin almacenamiento: la marca no persiste, sin errores */
    }
  }
  return nueva;
}

/** Filtro «solo pendientes» activo (por defecto, «todo»). */
export function leerSoloPendientes(): boolean {
  if (!tieneAlmacen()) return false;
  try {
    return localStorage.getItem(CLAVE_SOLO_PENDIENTES) === "true";
  } catch {
    return false;
  }
}

/** Guarda el estado del filtro «solo pendientes». */
export function guardarSoloPendientes(valor: boolean): void {
  if (!tieneAlmacen()) return;
  try {
    localStorage.setItem(CLAVE_SOLO_PENDIENTES, String(valor));
  } catch {
    /* sin almacenamiento: la elección no persiste, sin errores */
  }
}

/**
 * Reglas CSS que aplican las preferencias en los listados (RF-14):
 * - filtro «todo»: muestra el icono en las entradas aprendidas y les da el
 *   fondo de la página (`--color-bg`) para que pasen desapercibidas;
 * - filtro «solo pendientes»: oculta sus elementos de listado, muestra el
 *   aviso `.vacio-filtro` cuando no queda ninguno visible y, en la portada,
 *   revela las cuatro primeras entradas pendientes para rellenar los huecos
 *   (los demás enlaces —relacionados, menciones— no se ocultan).
 */
export function cssPreferencias(
  aprendidas: readonly string[],
  soloPendientes: boolean,
): string {
  const validos = aprendidas.filter((valor) => RE_SLUG.test(valor));
  if (soloPendientes) {
    if (validos.length === 0) return "";
    const ocultos = validos
      .map((valor) => `[data-slug="${valor}"]{display:none}`)
      .join("");
    const sinAprendidas = validos
      .map((valor) => `:not([data-slug="${valor}"])`)
      .join("");
    const aviso = `html[data-filtro="solo-pendientes"] .lista-bloque:not(:has(ul>li${sinAprendidas})) .vacio-filtro{display:block}`;
    const ocultosPortada =
      'html[data-filtro="solo-pendientes"] .lista-portada>li{display:none}';
    const relleno = `html[data-filtro="solo-pendientes"] .lista-portada>li:nth-child(-n+4 of ${sinAprendidas}){display:block}`;
    return ocultos + aviso + ocultosPortada + relleno;
  }
  return validos
    .map(
      (valor) =>
        `[data-slug="${valor}"] .icono-aprendida{display:inline-flex}` +
        `.entrada-item[data-slug="${valor}"]>a{background:var(--color-bg)}`,
    )
    .join("");
}

/**
 * Vuelve a inyectar el `<style id="wiki-estilos-pref">` y el `data-filtro` a
 * partir del almacenamiento, y avisa a las islas con `EVENTO_PREFERENCIAS`.
 * Lo llaman las islas tras escribir; el script de <head> hace lo mismo en el
 * primer pintado con su copia mínima.
 */
export function aplicarEstilos(): void {
  if (typeof document === "undefined") return;
  const aprendidas = leerAprendidas();
  const soloPendientes = leerSoloPendientes();

  let style = document.getElementById("wiki-estilos-pref");
  if (!style) {
    style = document.createElement("style");
    style.id = "wiki-estilos-pref";
    document.head.appendChild(style);
  }
  style.textContent = cssPreferencias(aprendidas, soloPendientes);
  document.documentElement.dataset.filtro = soloPendientes
    ? "solo-pendientes"
    : "todo";

  window.dispatchEvent(new CustomEvent(EVENTO_PREFERENCIAS));
}
