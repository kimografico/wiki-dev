// Navegación entre fichas de una misma colección. TypeScript puro: no conoce
// Astro ni el almacenamiento del navegador, así que el build y la isla pueden
// usar la misma función (RNF-07).

/** Datos mínimos ya resueltos en build para enlazar una ficha vecina. */
export interface FichaNav {
  slug: string;
  titulo: string;
  url: string;
}

/** Vecinas inmediatas según la secuencia y las preferencias del lector. */
export interface Vecinas {
  anterior?: FichaNav;
  siguiente?: FichaNav;
}

/**
 * Busca la ficha vecina anterior y la siguiente en `secuencia`.
 *
 * Con «solo pendientes» se omiten las aprendidas: se toma la última candidata
 * antes de la actual y la primera después. La ficha actual se localiza por su
 * posición original, así que funciona incluso si ella misma está aprendida.
 * Sin candidata en un lado, ese lado queda ausente (no hay salto circular).
 */
export function vecinas(
  secuencia: readonly FichaNav[],
  slugActual: string,
  aprendidas: readonly string[] = [],
  soloPendientes = false,
): Vecinas {
  const indiceActual = secuencia.findIndex((ficha) => ficha.slug === slugActual);
  if (indiceActual === -1) return {};

  const excluidas = new Set(aprendidas);
  const resultado: Vecinas = {};

  for (let indice = 0; indice < secuencia.length; indice++) {
    const ficha = secuencia[indice]!;
    if (ficha.slug === slugActual) continue;
    if (soloPendientes && excluidas.has(ficha.slug)) continue;

    if (indice < indiceActual) resultado.anterior = ficha;
    if (indice > indiceActual) {
      resultado.siguiente = ficha;
      break;
    }
  }

  return resultado;
}
