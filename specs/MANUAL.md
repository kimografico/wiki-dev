# Manual de mantenimiento de la wiki

Normas vigentes para mantener la app y su contenido. `spec-construccion.md` es el
registro histórico de cómo se construyó: sirve para rastrear decisiones, **no para
decidir qué hacer ahora**.

## Fuentes de verdad

| Qué | Dónde |
|-----|-------|
| Normas de contenido y publicación | Este archivo |
| Esquemas, colecciones, categorías y etiquetas | `src/lib/content/esquemas.ts` |
| Esqueletos de entrada | `specs/plantillas/` |
| Arquitectura del código | `specs/design-pattern.md` |
| Flujo y reglas de agentes/skills | `specs/agentes-y-skills.md` |
| Decisiones de construcción ya cerradas | `specs/spec-construccion.md` |

Si una norma antigua contradice este manual, manda este manual.

## Comandos

| Comando | Para qué |
|---------|----------|
| `npm run dev` | Servidor local (puerto 3000) |
| `npm run build` | Build estático |
| `npm run check` | Tipos y esquemas |
| `npm run lint` · `npm run format:check` | ESLint · Prettier |
| `npm run validate` | Esquema, slugs, referencias, enlaces, secciones y avisos de extensión |
| `npm run test:coverage` | Vitest: ≥ 90 % obligatorio, objetivo 95 % |

Antes de dar por terminado cualquier cambio: `check`, `lint`, `format:check`,
`validate` y `test:coverage` en verde. No se commitea ni se pushea sin orden
expresa del autor; los hooks de Husky no se saltan.

## Cómo se publica contenido

- Vía principal: agente `wiki-curator` (investiga, redacta, enlaza y revisa). El
  bot de Telegram solo crea entradas nuevas y no amplía: úsalo para capturar
  conceptos sencillos.
- **Prefiere ampliar** una entrada existente antes que crear otra.
- La entrada es un artículo autónomo en español: nunca formato pregunta/respuesta
  ni alusión a la conversación que la originó.
- `## Relacionados` y `## Mencionado en` los genera el layout: no se escriben.

## Extensión de las entradas

| Tipo | Objetivo de palabras |
|------|----------------------|
| Glosario | 150–250 |
| Tecnologías, paquetes, comparativas, patrones, IA, testing | 250–600 |

- El mínimo es **150 palabras en glosario y 250 en el resto**. `npm run validate`
  avisa de las entradas que no lo alcanzan, pero todavía **no falla**: hay contenido
  heredado por debajo del umbral. Las entradas nuevas sí deben cumplirlo.
- 600 es un objetivo de referencia, **no un límite**: los temas con más información
  pueden superarlo sin pedir excepción.
- Se cuentan las palabras del cuerpo Markdown (sin frontmatter; el código cuenta).

## Secciones obligatorias

| Colección | Secciones `##` |
|-----------|----------------|
| `glosario` | Definición · Por qué importa · Ejemplo · Se confunde con |
| `tecnologias` | Qué es · Para qué sirve · Cuándo usarla · Cuándo no · Ejemplo |
| `paquetes` | Qué es · Para qué sirve · Cuándo usarlo · Cuándo no · Ejemplo |
| `comparativas` | Contexto · Criterios · Cuándo elegir cada una · Ejemplos |
| `patrones` | Problema · Solución · Estructura · Ejemplo · Cuándo usarlo |
| `ia` | Qué es · Para qué sirve · Ejemplo · Limitaciones |
| `testing` | Qué es · Para qué sirve · Tipos de prueba · Ejemplo |

Se permiten secciones adicionales cuando ayudan a resolver la duda. La lista la
define `SECCIONES_OBLIGATORIAS` en `esquemas.ts`; cambiarla es un cambio de esquema.

### `Alternativas` es condicional

- Escríbela **solo si hay una alternativa real** que ayude a decidir. Si no,
  **omite el encabezado**: no la rellenes con frases del tipo «No hay una
  alternativa directa dentro del catálogo».
- Si la alternativa tiene entrada en la wiki, declara su slug en `alternativas`
  del frontmatter y explica la comparación en prosa en el cuerpo.
- Si hay dos o más alternativas directas sin comparativa, propón crearla.

### Conceptos compuestos

- Si cada concepto tiene entidad propia o suscita dudas distintas → **entradas
  separadas**.
- Si siempre se presentan juntos y la duda es la relación entre ellos → **ficha
  paraguas** con un `##` por concepto.
- Ejemplo: `testing/cucumber-gherkin` debe distinguir Cucumber (el ejecutor) de
  Gherkin (el lenguaje en que se escriben los escenarios).

## Frontmatter y redacción

- Slug global en kebab-case, sin acentos, singular y canónico; las siglas van en
  `alias`. No se renombran slugs: rompen menciones y marcas de aprendidas.
- `resumen` ≤ 200 caracteres; `categoria` y `tags` se leen de `esquemas.ts`, no se
  inventan. Usa `autoenlace: false` solo en palabras comunes que no deben enlazarse
  solas.
- Declara `relacionados` con slugs existentes y registra en `fuentes` la documentación
  oficial citada, sobre todo para datos sensibles al tiempo. Las entradas `bbva`
  pueden declarar origen interno en lugar de fuentes públicas.
- Español claro y orientado a junior: define el término al primer uso, sin relleno,
  con ejemplos ejecutables y su lenguaje en el bloque de código. Usa tablas para
  comparar.

## Cambios en el proyecto

- Para tocar esquemas, categorías o etiquetas usa `evolucionar-esquema`; para crear
  o ampliar entradas, las skills de contenido; para cambios de esquema, migra las
  entradas existentes.
- El código sigue `design-pattern.md`: comentarios de equivalencia Astro ↔ React,
  capa de contenido aislada, islas declaradas, accesibilidad AA.
- Los tests se escriben o ajustan **al cierre y a petición del autor** (skill
  `escribir-tests`); no tras cada cambio.
