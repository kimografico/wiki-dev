// Esquemas Zod de las content collections (Patrón 2).
//
// ASTRO: `defineCollection` + un loader `glob` declaran y cargan cada colección.
//   Aquí se generan desde `COLECCIONES` para no repetir el bloque por colección:
//   una colección nueva solo exige su esquema en `esquemas.ts` y su carpeta.
// REACT+VITE: cargarías con `import.meta.glob('/content/**/*.md', { eager: true })`
//   y validarías cada frontmatter con `schema.parse()` en un script de build.
//
// Las reglas viven en `src/lib/content/esquemas.ts` para que `npm run validate`
// (RF-10) las reutilice sin depender de `astro:content`.
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import {
  COLECCIONES,
  esquemaPaginaTelegramBot,
  esquemasPorColeccion,
  type Coleccion,
} from "./lib/content/esquemas.ts";

const crearColeccion = (coleccion: Coleccion) =>
  defineCollection({
    loader: glob({ pattern: "**/*.md", base: `./content/${coleccion}` }),
    schema: esquemasPorColeccion[coleccion],
  });

const coleccionesWiki = Object.fromEntries(
  COLECCIONES.map((coleccion) => [coleccion, crearColeccion(coleccion)]),
) as Record<Coleccion, ReturnType<typeof crearColeccion>>;

export const collections = {
  ...coleccionesWiki,
  telegrambot: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./content/telegrambot" }),
    schema: esquemaPaginaTelegramBot,
  }),
};
