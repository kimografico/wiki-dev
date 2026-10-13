# wiki-dev

Wiki **estática** de consulta para programadores junior: glosario, tecnologías, paquetes y
comparativas. El contenido son archivos Markdown que **se añaden por código** (normalmente
mediante agentes de opencode); la página no tiene ninguna interfaz para crear entradas.

- No hay backend ni base de datos: el sitio se genera en build (SSG) y se sirve desde
  GitHub Pages.
- Una entrada nueva es un archivo `content/<coleccion>/<slug>.md`. El esquema (Zod) y el
  build garantizan su calidad.
- El proyecto se desarrolla guiado por especificación (SDD): la fuente de verdad está en
  [`specs/`](./specs).
- Sitio publicado: <https://kimografico.github.io/wiki-dev/>

## Flujo de trabajo

- **Husky** gestiona los hooks de git: `pre-commit` pasa lint-staged y la validación de
  contenido; `pre-push` exige cobertura ≥ 90 % (RNF-10).
- **CI** (`.github/workflows/ci.yml`) verifica tipos, lint, formato, validación y build en
  cada push y PR.
- **Deploy** (`.github/workflows/deploy.yml`) publica en GitHub Pages al hacer push a
  `main`.

## Requisitos

- Node.js **>= 22.12** (lo exige Astro 7).
- npm.

## Cómo ejecutarlo

```bash
npm install
npm run dev      # servidor de desarrollo
npm run build    # genera dist/
npm run preview  # sirve dist/
```

## Scripts

| Script                  | Qué hace                                       |
| ----------------------- | ---------------------------------------------- |
| `npm run dev`           | Servidor de desarrollo de Astro                |
| `npm run build`         | Build estático en `dist/`                      |
| `npm run preview`       | Sirve el resultado del build                   |
| `npm run check`         | `astro check`: tipos y esquemas                |
| `npm run lint`          | ESLint                                         |
| `npm run format`        | Prettier (escribe)                             |
| `npm run format:check`  | Prettier (solo comprueba)                      |
| `npm run test`          | Vitest                                         |
| `npm run test:coverage` | Vitest con umbral de cobertura ≥ 90 % (RNF-10) |
| `npm run astro`         | CLI de Astro                                   |

> F1 añade `npm run validate` (validación del contenido, RF-10).

## Estructura

```
content/            Markdown del contenido (fuera de src)
src/
  features/         código por dominio (glosario, busqueda, preferencias…)
  components/       componentes compartidos (EntradaItem, Badge…)
  layouts/          plantillas base y de ficha
  pages/            rutas (Astro enruta por archivos)
  styles/           Tailwind y tokens de tema
  lib/              content · preferencias · markdown (TypeScript puro)
scripts/            utilidades (validate-content en F1)
specs/              estos SDD y las plantillas de las entradas
```

Detalle completo en `specs/spec.md` §13.

## De la duda a la entrada

1. Planteas una duda en lenguaje natural a opencode (agente `wiki-curator`).
2. Busca si el concepto ya existe: amplía la entrada o crea una nueva.
3. El subagente `content-researcher` reúne fuentes oficiales y se redacta con las
   plantillas de `specs/plantillas/`.
4. El subagente `content-reviewer` valida. El resultado es un artículo de wiki autónomo
   (nunca formato pregunta/respuesta) y se revisa en el `git diff`.

El flujo y las reglas completas están en `specs/agentes-y-skills.md`.

## Documentos

- [`specs/spec.md`](./specs/spec.md) — requisitos funcionales y no funcionales, modelo de
  contenido y plan por fases.
- [`specs/design-pattern.md`](./specs/design-pattern.md) — patrones de diseño y arquitectura.
- [`specs/agentes-y-skills.md`](./specs/agentes-y-skills.md) — agentes, skills y flujo de
  contenido.

## Glosario del proyecto

Formato: **definición breve** + para qué se usa aquí.

| Término              | Definición breve                                                | Para qué se usa aquí                                                   |
| -------------------- | --------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Astro                | Framework para sitios estáticos con «islas».                    | Framework base: rutas, content collections y SSG.                      |
| React                | Librería de UI basada en componentes.                           | Solo para las islas interactivas (buscador, preferencias).             |
| Vite                 | Bundler y servidor de desarrollo.                               | Motor bajo Astro y referencia didáctica (React + Vite).                |
| TypeScript           | JavaScript con tipos.                                           | Lenguaje del código, en modo estricto.                                 |
| Tailwind             | Framework de utilidades CSS.                                    | Estilos y tokens de tema.                                              |
| Zod                  | Validación de esquemas en TypeScript.                           | Valida el frontmatter de cada entrada.                                 |
| Markdown             | Formato de texto ligero.                                        | Formato de todas las entradas (sin MDX).                               |
| frontmatter          | Cabecera YAML entre `---` al inicio de un `.md`.                | Datos de la entrada (título, categoría…).                              |
| content collection   | Conjunto de archivos validados por un esquema en Astro.         | Glosario, tecnologías, paquetes, comparativas y patrones.              |
| slug                 | Identificador de la entrada (nombre del archivo, kebab-case).   | Único en toda la wiki; clave de relaciones y menciones.                |
| SSG                  | Generación estática del sitio en build.                         | Todo el sitio se pre-renderiza a HTML.                                 |
| hidratación          | Añadir JavaScript a HTML estático.                              | Solo en las islas.                                                     |
| isla                 | Componente interactivo hidratado dentro de una página estática. | Buscador y controles de preferencias.                                  |
| directiva `client:*` | Controla cuándo se hidrata un componente.                       | `client:load` / `client:idle` en las islas.                            |
| Pagefind             | Buscador estático ejecutado tras el build.                      | Página `/buscar` (F2).                                                 |
| unified              | Ecosistema de procesado de Markdown/HTML.                       | El pipeline de Markdown del proyecto.                                  |
| remark               | Conjunto de plugins de unified para Markdown.                   | Plugin de menciones enlazadas (F1).                                    |
| Mermaid              | Diagramas generados desde texto.                                | Bloques ` ```mermaid ` vía `astro-mermaid` (F2).                       |
| Astrobook            | Visor de componentes para desarrollo.                           | Ver componentes sin Storybook (F1).                                    |
| Lighthouse           | Auditoría de rendimiento, accesibilidad y SEO.                  | `npm run lighthouse` a demanda.                                        |
| lint                 | Análisis estático de estilo y errores.                          | ESLint en pre-commit y CI.                                             |
| ESLint               | Linter de JavaScript, TypeScript y Astro.                       | El «lint» del proyecto.                                                |
| Prettier             | Formateador de código.                                          | Formato en pre-commit y CI.                                            |
| Vitest               | Framework de tests.                                             | Tests de `lib/` y `scripts/` con cobertura ≥ 90 %.                     |
| cobertura            | Porcentaje de código ejecutado por los tests.                   | Umbral del 90 % exigido en pre-push (RNF-10).                          |
| Husky                | Herramienta que gestiona hooks de git.                          | Hooks `pre-commit` y `pre-push`.                                       |
| hook de git          | Script que git ejecuta ante un evento.                          | `pre-commit` (lint-staged y validación) y `pre-push` (cobertura).      |
| CI                   | Integración continua.                                           | GitHub Actions en cada push y PR.                                      |
| GitHub Pages         | Alojamiento estático de GitHub.                                 | Despliegue del sitio (proyecto, bajo `/<repo>/`).                      |
| localStorage         | Almacén de datos del navegador.                                 | Preferencias (tema, aprendidas, «solo pendientes»), prefijo `wiki:`.   |
| SDD                  | Desarrollo guiado por especificación.                           | `specs/` es la fuente de verdad del proyecto.                          |
| agente               | Rol de opencode con instrucciones y permisos.                   | `wiki-curator`, `content-researcher`, `content-reviewer` y `wiki-dev`. |
| skill                | Capacidad reutilizable que un agente puede cargar.              | Tareas concretas (`resolver-duda`, `ponytail`…).                       |
| opencode             | Herramienta de agentes que ejecuta el proyecto.                 | Ejecuta agentes y skills para crear contenido y código.                |
| ponytail             | Modo «senior perezoso» (DietrichGebert/ponytail, MIT).          | Escribir la implementación más pequeña que cumpla la SDD.              |
| YAGNI                | «You Aren't Gonna Need It»: no construyas lo que no necesitas.  | Primer peldaño del modo ponytail.                                      |
| `shortcut:`          | Comentario `shortcut: <límite>, <cuándo revisar>`.              | Marca un atajo aceptado con su límite conocido.                        |
| repository (patrón)  | Capa única que encapsula el acceso a los datos.                 | `src/lib/content/` es el único que lee las entradas.                   |
| facade               | Fachada que ofrece una API simple sobre algo complejo.          | `src/lib/content/`, junto con repository.                              |
