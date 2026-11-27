# wiki-dev

Wiki **estática** de consulta para programadores junior: glosario, tecnologías, paquetes,
comparativas, patrones, IA y testing. El contenido son archivos Markdown que **se añaden por
código** (normalmente mediante agentes de opencode); la página no tiene ninguna interfaz para
crear entradas.

- No hay backend ni base de datos: el sitio se genera en build (SSG) y se sirve desde
  GitHub Pages.
- Una entrada nueva es un archivo `content/<coleccion>/<slug>.md`. El esquema (Zod) valida
  su estructura y `npm run validate` avisa de la extensión; la calidad del texto se revisa
  antes de publicar según [`specs/MANUAL.md`](./specs/MANUAL.md).
- Las normas vigentes están en [`specs/MANUAL.md`](./specs/MANUAL.md); `specs/` conserva
  también el registro histórico de la construcción.
- Sitio publicado: <https://kimografico.github.io/wiki-dev/>

## Flujo de trabajo

- **Husky** gestiona los hooks de git: `pre-commit` pasa lint-staged y la validación de
  contenido; `pre-push` exige cobertura ≥ 90 % (RNF-10), con un objetivo de calidad del
  95 %.
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

### Catálogo de componentes

Con el servidor de desarrollo abierto, visita `http://localhost:3000/astrobook`.
Astrobook solo se activa en desarrollo y agrupa las stories por su carpeta real
(`pages/`, `components/`, `features/`). Las de componentes muestran variantes con
datos de muestra; las de páginas viven en `src/pages/_stories/` (el prefijo `_`
hace que Astro no las trate como rutas) y renderizan páginas reales, incluidas
las fichas.
Para simular la base de GitHub Pages, define `ASTRO_BASE_URL=/wiki-dev/` antes
de iniciar Astro; en ese caso el catálogo queda en
`http://localhost:3000/wiki-dev/astrobook`.

## Scripts

| Script                  | Qué hace                                            |
| ----------------------- | --------------------------------------------------- |
| `npm run dev`           | Servidor de desarrollo de Astro                     |
| `npm run build`         | Build estático en `dist/`                           |
| `npm run preview`       | Sirve el resultado del build                        |
| `npm run check`         | `astro check`: tipos y esquemas                     |
| `npm run lint`          | ESLint                                              |
| `npm run format`        | Prettier (escribe)                                  |
| `npm run format:check`  | Prettier (solo comprueba)                           |
| `npm run validate`      | Valida el contenido (esquema, enlaces y secciones)  |
| `npm run test`          | Vitest                                              |
| `npm run test:coverage` | Vitest con cobertura ≥ 90 % (objetivo 95 %, RNF-10) |
| `npm run astro`         | CLI de Astro                                        |

## Estructura

```
content/            Markdown del contenido (fuera de src)
src/
  features/         código por dominio (glosario, busqueda, preferencias, telegrambot…)
  components/       componentes compartidos (EntradaItem, Badge…)
  layouts/          plantillas base y de ficha
  pages/            rutas (Astro enruta por archivos; `_stories/` no son rutas)
  styles/           Tailwind y tokens de tema
  lib/              content · preferencias · markdown (TypeScript puro)
scripts/            validate-content y add-concept (generación desde Telegram)
specs/              SDD, plantillas de entradas y spec del bot
worker/             webhook de Telegram
.opencode/          agentes, skills y comandos
```

Normas de mantenimiento en [`specs/MANUAL.md`](./specs/MANUAL.md); detalle histórico de la estructura en [`specs/spec-construccion.md` §13](./specs/spec-construccion.md).

## Tests y cobertura

Los tests van **colocados** junto al módulo que prueban (`src/**/*.test.ts`,
`scripts/**/*.test.ts`); no hay una carpeta `tests/` aparte. `npm run test` lanza Vitest y
`npm run test:coverage` mide `src/lib/**` y `scripts/**`: el umbral obligatorio es el 90 %
en líneas, funciones, ramas y sentencias, con un objetivo de calidad del 95 % (RNF-10), y
el hook `pre-push` lo exige. El flujo de contenido del agente no ejecuta tests; la cobertura
se comprueba al cerrar cambios de código.

## Cómo añadir conceptos

Hay dos vías, y ambas usan las plantillas de `specs/plantillas/` y los enums de
`src/lib/content/esquemas.ts` como fuente de verdad: la colección, la categoría y las
etiquetas las elige el modelo, no quien escribe.

### 🤖 Con el agente (OpenCode en VS Code)

Selecciona el agente **`wiki-curator`** en el chat de OpenCode y escribe la duda o la lista
de conceptos en lenguaje natural; no hay un comando específico. Por ejemplo:

> Añade `closure` y explícalo frente a ámbito léxico; también quiero `hoisting` y `event loop`.

La skill `resolver-duda` orquesta el flujo «de la duda a la entrada» (reglas completas en
[`specs/agentes-y-skills.md`](./specs/agentes-y-skills.md)):

1. Extrae los conceptos y busca en `content/` por título, alias, etiquetas y categoría;
   **prefiere ampliar** una entrada existente antes que crear otra.
2. Invoca a `content-researcher` para reunir fuentes oficiales.
3. Redacta con `anadir-entrada` y `redactar-orientado-a-duda`, enlaza con
   `enlazar-entradas` y revisa con `content-reviewer` (máximo 2 rondas).
4. Ejecuta `npm run validate` e informa de entradas creadas, ampliadas y pendientes.

Hasta 3 archivos afectados actúa directamente; con más, muestra un plan y espera
confirmación. El resultado es un artículo autónomo (nunca formato pregunta/respuesta), sin
fechas ni sección `## Relacionados`: las menciones se enlazan solas en el build. El agente
**no hace commit ni ejecuta tests**: tú revisas con `git diff` y pasas el resto de checks
antes de commitear.

### 📱 Con el bot de Telegram

Envía el concepto al bot `@KimoWiki_Bot` (el prefijo `/add` es opcional); cada mensaje
genera una entrada. El Worker de `worker/src/index.ts` comprueba el secreto y lanza el
workflow [`add-concept.yml`](./.github/workflows/add-concept.yml), que ejecuta
`scripts/add-concept.ts`: inyecta en el prompt de Gemini las plantillas, los enums y los
slugs existentes del checkout, y el modelo devuelve colección, slug y contenido (la fecha
la pone el script).

Si la colección y el slug son válidos y el archivo no existe, el workflow aplica Prettier,
`check`, `lint`, `format:check`, `validate` y `build`. Solo si todo pasa hace commit y push
a `main`, lo que dispara la CI y el despliegue en GitHub Pages; si algo falla, `main` queda
intacto y se notifica el error. El detalle está en
[`specs/telegram-bot.md`](./specs/telegram-bot.md).

El bot **nunca sobrescribe ni amplía**: si el slug ya existe, reintenta con uno más
específico. Es una vía de creación rápida, no de mantenimiento.

### Cuándo usar cada uno

| Aspecto                  | Agente (`wiki-curator`)                       | Bot de Telegram                                                     |
| ------------------------ | --------------------------------------------- | ------------------------------------------------------------------- |
| Crear o ampliar          | Busca y **prefiere ampliar**                  | Solo crea; si el slug existe, busca otro                            |
| Investigación y revisión | `content-researcher` y `content-reviewer`     | Un solo modelo, con reintentos ante errores                         |
| Redacción y enlazado     | Principios de redacción y grafo de relaciones | Reglas básicas del prompt; sin revisión de grafo                    |
| Listas de conceptos      | Sí, con confirmación a partir de 4 archivos   | Un concepto por mensaje                                             |
| Verificación automática  | `npm run validate`                            | Prettier + `check` + `lint` + `format:check` + `validate` + `build` |
| Publicación              | Sin commit; revisión en `git diff`            | Commit y push automáticos a `main`                                  |
| Desde el móvil, sin IDE  | No                                            | Sí                                                                  |

El agente da mejor contenido: investiga, evita duplicados, enriquece entradas ya existentes
y cuida las relaciones. El bot da más automatización y unas barreras de verificación más
completas antes de publicar, a costa de crear siempre una entrada nueva.

**Recomendación:** usa el agente como vía principal para el contenido que importa —conceptos
ambiguos, comparativas, listas o entradas que quizá ya existan— y reserva el bot para
capturar conceptos nuevos y sencillos cuando estés fuera del ordenador y te interese la
publicación automática. Tras trabajar con el agente, ejecuta `check`, `lint`,
`format:check`, `validate` y `test:coverage` antes de commitear.
