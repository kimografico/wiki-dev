// Orden de las entradas en los listados (portada).
//
// La fecha de alta es opcional: las entradas antiguas sin `fecha` no deben
// desaparecer del listado, solo quedar detrás de las que sí la tienen.

/** Datos mínimos para ordenar una entrada. */
export interface EntradaFechada {
  titulo: string;
  slug: string;
  fecha?: Date;
}

/**
 * Compara por fecha de alta descendente (la más reciente primero).
 *
 * Las entradas sin fecha van al final y los empates se resuelven por título y
 * slug: así el orden no depende del sistema de archivos ni del motor de turno.
 */
export function compararPorFecha(a: EntradaFechada, b: EntradaFechada): number {
  if (a.fecha && b.fecha) {
    const diferencia = b.fecha.getTime() - a.fecha.getTime();
    if (diferencia !== 0) return diferencia;
  } else if (a.fecha) {
    return -1;
  } else if (b.fecha) {
    return 1;
  }
  return (
    a.titulo.localeCompare(b.titulo, "es") || a.slug.localeCompare(b.slug, "es")
  );
}

/** Copia de `entradas` ordenada con `compararPorFecha` (no muta la original). */
export function ordenarPorFecha<T extends EntradaFechada>(entradas: T[]): T[] {
  return [...entradas].sort(compararPorFecha);
}
