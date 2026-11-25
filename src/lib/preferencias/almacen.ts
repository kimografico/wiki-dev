// Disponibilidad de `localStorage`, compartida por todas las preferencias.
// Un entorno con almacenamiento bloqueado (o que lanza al acceder) deja los
// controles inactivos en lugar de romper la página (RNF-09).

export function tieneAlmacen(): boolean {
  try {
    return typeof localStorage !== "undefined";
  } catch {
    return false;
  }
}
