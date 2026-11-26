# AGENTS.md

Reglas básicas del repositorio para agentes que trabajen en él.

## Qué es este proyecto

Wiki técnica estática hecha con **Astro** y publicada en **GitHub Pages**.
El contenido vive en `content/<coleccion>/*.md` y su frontmatter se valida
con los esquemas de `src/lib/content/esquemas.ts`. Todo el texto de la wiki
se escribe en **español**.

## Comandos

| Comando                                 | Qué hace                                                |
| --------------------------------------- | ------------------------------------------------------- |
| `npm run dev`                           | Servidor de desarrollo (puerto 3000)                    |
| `npm run build`                         | Build de producción                                     |
| `npm run check`                         | Comprobación de tipos (Astro + TS)                      |
| `npm run lint` · `npm run format:check` | ESLint · Prettier                                       |
| `npm run validate`                      | Valida el contenido (esquema, secciones, enlaces)       |
| `npm run test:coverage`                 | Vitest con cobertura: obligatorio ≥ 90 %, objetivo 95 % |

## Reglas

1. **No commitear ni pushear nada a menos que el autor lo pida
   expresamente.** Ni siquiera cambios pequeños ni «de paso»: espera a la
   orden.
2. Nunca usar `--no-verify` ni saltarse los hooks de Husky (pre-commit y
   pre-push).
3. `main` admite commits directos (un solo mantenedor), pero solo cuando
   se pide.
4. Antes de dar por terminado un cambio, dejar en verde: `check`, `lint`,
   `format:check`, `validate` y `test:coverage`. La cobertura **obligatoria**
   es del 90 % (umbral de Vitest y pre-push); el **objetivo** de calidad es
   el 95 %.
5. Para crear o ampliar entradas, seguir las skills del proyecto
   (`anadir-entrada`, `enlazar-entradas`, `validar-contenido`): el esquema
   manda, no inventar frontmatter fuera de `esquemas.ts`.
6. Los secretos nunca se escriben en el repo: van en GitHub Secrets o en
   un archivo temporal fuera del repo cargado con `cf deploy --secrets-file`.
7. Si un script necesita el schema, las plantillas o los enums, se leen
   del checkout; no se duplican en el código.
8. Las entradas con etiqueta `bbva` describen sistemas internos cuya fuente
   es privada: no se les exige contraste con fuentes públicas ni aviso de
   información incompleta por ese motivo; basta con declarar el origen
   interno en la propia entrada.
