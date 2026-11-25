// Catálogo único de colecciones (F1): lo que la UI y los scripts necesitan
// saber de cada colección —nombre, descripción, icono, color y plantilla— en
// un solo sitio. Nav, portada, 404, buscador, badges y el bot de Telegram
// derivan de aquí; no se repite la lista en cada componente.
//
// El MODELO de contenido (esquema, secciones, campos de relación) vive en
// `esquemas.ts`; aquí solo lo presentacional. La relación es por tipo:
// `Record<Coleccion, …>` hace fallar `npm run check` si falta o sobra una
// colección respecto de `COLECCIONES`.
//
// Importa SOLO el tipo de `esquemas.ts` (se compila a nada): las islas React
// que importan este módulo no arrastran zod al cliente.
import type { Coleccion } from "./esquemas.ts";

export interface ColeccionCatalogo {
  /** Nombre visible en menú, migas, tarjetas y cabeceras. */
  nombre: string;
  /** Texto corto para tarjetas de portada, 404 e índices. */
  descripcion: string;
  /** Glifo monoespaciado para tarjetas de portada y 404. */
  icono: string;
  /** Valor CSS del color de texto (siempre la variante `-text`: AA en texto). */
  colorText: string;
  /** Fichero en `specs/plantillas/` que lee el bot de Telegram. */
  plantilla: string;
}

export const CATALOGO: Record<Coleccion, ColeccionCatalogo> = {
  glosario: {
    nombre: "Glosario",
    descripcion: "Términos, patrones y conceptos clave explicados sin rodeos.",
    icono: "Aa",
    colorText: "var(--color-glosario-text)",
    plantilla: "glosario.md",
  },
  tecnologias: {
    nombre: "Tecnologías",
    descripcion:
      "Lenguajes, frameworks de aplicación, plataformas y servicios.",
    icono: "</>",
    colorText: "var(--color-tecnologias-text)",
    plantilla: "tecnologia.md",
  },
  paquetes: {
    nombre: "Paquetes",
    descripcion: "Dependencias, linters, utilidades y CLI del ecosistema web.",
    icono: "{ }",
    colorText: "var(--color-paquetes-text)",
    plantilla: "paquete.md",
  },
  comparativas: {
    nombre: "Comparativas",
    descripcion:
      "Astro frente a Next.js: contexto, criterios y cuándo elegir cada una.",
    icono: "≠",
    colorText: "var(--color-comparativas-text)",
    plantilla: "comparativa.md",
  },
  patrones: {
    nombre: "Patrones",
    descripcion:
      "Problemas recurrentes con su solución, estructura y ejemplos.",
    icono: "◇",
    colorText: "var(--color-patrones-text)",
    plantilla: "patron.md",
  },
  ia: {
    nombre: "IA",
    descripcion:
      "Modelos, agentes y herramientas de inteligencia artificial con ejemplos.",
    icono: "AI",
    colorText: "var(--color-ia-text)",
    plantilla: "ia.md",
  },
  testing: {
    nombre: "Testing",
    descripcion:
      "Herramientas y prácticas de pruebas: unitarias, integración y E2E.",
    icono: "✓",
    colorText: "var(--color-testing-text)",
    plantilla: "testing.md",
  },
};

/**
 * Colecciones en orden de navegación. El orden es el de declaración del
 * catálogo; un test lo fija contra `COLECCIONES` para que no se desincronice.
 */
export const LISTA_COLECCIONES = Object.keys(CATALOGO) as Coleccion[];
