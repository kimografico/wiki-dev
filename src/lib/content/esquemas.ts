import { z } from "astro/zod";

// Esquemas de contenido (Patrón 2, schema-first).
// Se definen aquí, en TypeScript puro que solo depende de `astro/zod`, para que
// los use tanto `src/content.config.ts` como `scripts/validate-content.ts`
// (RF-10) sin duplicar reglas. Este módulo NO importa `astro:content`.
//
// ASTRO: el import de Zod es `astro/zod`; el de `astro:content` está deprecado
//   y desaparece en Astro 8.
// REACT+VITE: importarías `zod` directamente y validarías en un script de build.

/** Colecciones de contenido (el orden es el de navegación; ver `catalogo.ts`). */
export const COLECCIONES = [
  "glosario",
  "tecnologias",
  "paquetes",
  "comparativas",
  "patrones",
  "ia",
  "testing",
] as const;

export type Coleccion = (typeof COLECCIONES)[number];

/** Valores de categorías (enum controlado, §7.2). Fuente única de verdad. */
export const CATEGORIAS = [
  "lenguaje",
  "framework",
  "estilos",
  "estado",
  "datos-api",
  "rendimiento-ux",
  "herramienta",
  "despliegue",
  "concepto",
] as const;

/** Valores de etiquetas (enum controlado, §7.5). Fuente única de verdad. */
export const ETIQUETAS = [
  "frontend",
  "backend",
  "tests",
  "terminal",
  "accesibilidad",
  "rendimiento",
  "seguridad",
] as const;

export const categorias = z.enum(CATEGORIAS);
export const etiquetas = z.enum(ETIQUETAS);

/** Campos comunes a todas las colecciones (§7.1). */
export const base = z.object({
  titulo: z.string().min(1),
  resumen: z.string().max(200),
  // Fecha de alta (ISO `YYYY-MM-DD`). La inyecta `scripts/add-concept.ts` al
  // crear la entrada con el bot; las entradas anteriores se rellenaron desde
  // el historial de git. Es opcional para no romper contenido sin fecha.
  fecha: z.coerce.date().optional(),
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

export const esquemaIa = base.extend({
  alternativas: z.array(z.string()).default([]),
  web: z.url().optional(),
});

export const esquemaTesting = base.extend({
  alternativas: z.array(z.string()).default([]),
  web: z.url().optional(),
  npm: z.string().optional(),
});

export const esquemaPaginaTelegramBot = z.object({
  titulo: z.string().min(1),
  resumen: z.string().max(200),
  apartado: z.enum(["funcional", "tecnico"]),
});

export type ApartadoTelegramBot = z.infer<
  typeof esquemaPaginaTelegramBot
>["apartado"];

/** Esquema de cada colección, indexado por su nombre. */
export const esquemasPorColeccion = {
  glosario: esquemaGlosario,
  tecnologias: esquemaTecnologias,
  paquetes: esquemaPaquetes,
  comparativas: esquemaComparativas,
  patrones: esquemaPatrones,
  ia: esquemaIa,
  testing: esquemaTesting,
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
  patrones: ["Problema", "Solución", "Estructura", "Ejemplo", "Cuándo usarlo"],
  ia: ["Qué es", "Para qué sirve", "Ejemplo", "Limitaciones", "Alternativas"],
  testing: [
    "Qué es",
    "Para qué sirve",
    "Tipos de prueba",
    "Ejemplo",
    "Alternativas",
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
  patrones: ["relacionados"],
  ia: ["relacionados", "alternativas"],
  testing: ["relacionados", "alternativas"],
};

/** Nombres de sección reservados: los genera el layout, no se escriben (§7.4). */
export const SECCIONES_GENERADAS = ["Relacionados", "Mencionado en"] as const;
