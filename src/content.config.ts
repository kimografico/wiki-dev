// Esquemas Zod de las content collections (Patrón 2).
//
// ASTRO: `defineCollection` + un loader `glob` declaran y cargan cada colección.
// REACT+VITE: cargarías con `import.meta.glob('/content/**/*.md', { eager: true })`
//   y validarías cada frontmatter con `schema.parse()` en un script de build.
//
// Las reglas viven en `src/lib/content/esquemas.ts` para que `npm run validate`
// (RF-10) las reutilice sin depender de `astro:content`.
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import {
  esquemaComparativas,
  esquemaGlosario,
  esquemaPaquetes,
  esquemaTecnologias,
} from "./lib/content/esquemas.ts";

const glosario = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./content/glosario" }),
  schema: esquemaGlosario,
});

const tecnologias = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./content/tecnologias" }),
  schema: esquemaTecnologias,
});

const paquetes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./content/paquetes" }),
  schema: esquemaPaquetes,
});

const comparativas = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./content/comparativas" }),
  schema: esquemaComparativas,
});

export const collections = { glosario, tecnologias, paquetes, comparativas };
