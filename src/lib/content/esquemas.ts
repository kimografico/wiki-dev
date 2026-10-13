import { z } from "astro/zod";

// Esquemas de contenido (Patrón 2, schema-first).
// Se definen aquí, en TypeScript puro que solo depende de `astro/zod`, para que
// los use tanto `src/content.config.ts` como `scripts/validate-content.ts`
// (RF-10) sin duplicar reglas. Este módulo NO importa `astro:content`.
//
// ASTRO: el import de Zod es `astro/zod`; el de `astro:content` está deprecado
//   y desaparece en Astro 8.
// REACT+VITE: importarías `zod` directamente y validarías en un script de build.

/** Colecciones de contenido. `patrones` existe desde F5. */
export const COLECCIONES = [
  "glosario",
  "tecnologias",
  "paquetes",
  "comparativas",
] as const;

export type Coleccion = (typeof COLECCIONES)[number];

/** Categorías temáticas (enum controlado, §7.2). */
export const categorias = z.enum([
  "lenguaje",
  "framework",
  "estilos",
  "estado",
  "datos-api",
  "rendimiento-ux",
  "herramienta",
  "despliegue",
  "concepto",
]);

/** Etiquetas transversales (enum controlado, §7.5). */
export const etiquetas = z.enum([
  "frontend",
  "backend",
  "tests",
  "terminal",
  "accesibilidad",
  "rendimiento",
  "seguridad",
]);

/** Campos comunes a todas las colecciones (§7.1). */
export const base = z.object({
  titulo: z.string().min(1),
  resumen: z.string().max(200),
  categoria: categorias,
  tags: z.array(etiquetas).default([]),
  alias: z.array(z.string()).default([]),
  relacionados: z.array(z.string()).default([]),
  fuentes: z.array(z.url()).default([]),
  autoenlace: z.boolean().default(true),
});

export const esquemaGlosario = base.extend({
  terminoEn: z.string().optional(),
});

export const esquemaTecnologias = base.extend({
  alternativas: z.array(z.string()).default([]),
  web: z.url().optional(),
});

export const esquemaPaquetes = base.extend({
  alternativas: z.array(z.string()).default([]),
  web: z.url().optional(),
  npm: z.string().optional(),
});

export const esquemaComparativas = base.extend({
  entidades: z.array(z.string()).min(2),
  contexto: z.string().min(1),
});

export const esquemaPatrones = base.extend({
  familia: z.enum(["creacional", "estructural", "comportamiento"]),
});

/** Esquema de cada colección, indexado por su nombre. */
export const esquemasPorColeccion = {
  glosario: esquemaGlosario,
  tecnologias: esquemaTecnologias,
  paquetes: esquemaPaquetes,
  comparativas: esquemaComparativas,
} as const;

/** Secciones `##` obligatorias del cuerpo por tipo (§7.4). */
export const SECCIONES_OBLIGATORIAS: Record<Coleccion, readonly string[]> = {
  glosario: ["Definición", "Por qué importa", "Ejemplo", "Se confunde con"],
  tecnologias: [
    "Qué es",
    "Para qué sirve",
    "Cuándo usarla",
    "Cuándo no",
    "Alternativas",
    "Ejemplo",
  ],
  paquetes: [
    "Qué es",
    "Para qué sirve",
    "Cuándo usarlo",
    "Cuándo no",
    "Alternativas",
    "Ejemplo",
  ],
  comparativas: [
    "Contexto",
    "Criterios",
    "Cuándo elegir cada una",
    "Ejemplos",
  ],
};

/**
 * Campos de relación por colección: referencian slugs de otras entradas y
 * deben existir (RF-10). `contexto` y `terminoEn`/`web`/`npm` no son relaciones.
 */
export const CAMPOS_RELACION: Record<Coleccion, readonly string[]> = {
  glosario: [],
  tecnologias: ["relacionados", "alternativas"],
  paquetes: ["relacionados", "alternativas"],
  comparativas: ["relacionados", "entidades"],
};

/** Nombres de sección reservados: los genera el layout, no se escriben (§7.4). */
export const SECCIONES_GENERADAS = ["Relacionados", "Mencionado en"] as const;
