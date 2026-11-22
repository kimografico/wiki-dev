# AGENTS.md

Reglas básicas del repositorio para agentes que trabajen en él.

## Qué es este proyecto

Wiki técnica estática hecha con **Astro** y publicada en **GitHub Pages**.
El contenido vive en `content/<coleccion>/*.md` y su frontmatter se valida
con los esquemas de `src/lib/content/esquemas.ts`. Todo el texto de la wiki
se escribe en **español**.

## Comandos

| Comando                                 | Qué hace                                          |
| --------------------------------------- | ------------------------------------------------- |
| `npm run dev`                           | Servidor de desarrollo (puerto 3000)              |
| `npm run build`                         | Build de producción                               |
| `npm run check`                         | Comprobación de tipos (Astro + TS)                |
| `npm run lint` · `npm run format:check` | ESLint · Prettier                                 |
| `npm run validate`                      | Valida el contenido (esquema, secciones, enlaces) |
| `npm run test:coverage`                 | Vitest con cobertura; debe ser ≥ 90 %             |

## Reglas

1. **No commitear ni pushear nada a menos que el autor lo pida
   expresamente.** Ni siquiera cambios pequeños ni «de paso»: espera a la
   orden.
2. Nunca usar `--no-verify` ni saltarse los hooks de Husky (pre-commit y
   pre-push).
3. `main` admite commits directos (un solo mantenedor), pero solo cuando
   se pide.
4. Antes de dar por terminado un cambio, dejar en verde: `check`, `lint`,
   `format:check`, `validate` y `test:coverage`.
5. Para crear o ampliar entradas, seguir las skills del proyecto
   (`anadir-entrada`, `enlazar-entradas`, `validar-contenido`): el esquema
   manda, no inventar frontmatter fuera de `esquemas.ts`.
6. Los secretos nunca se escriben en el repo: van en GitHub Secrets o en
   `cf secret put`.
7. Si un script necesita el schema, las plantillas o los enums, se leen
   del checkout; no se duplican en el código.
