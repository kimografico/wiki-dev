# SDD — Wiki personal de programación

> **Estado:** Borrador v0.4 · **Fecha:** 2026-10-12
> **Documentos relacionados:** [`design-pattern.md`](./design-pattern.md) · [`agentes-y-skills.md`](./agentes-y-skills.md)

Este documento es la especificación del proyecto (Spec-Driven Development): define **qué** se construye y **cómo se sabe que está bien**. Los patrones de arquitectura están en `design-pattern.md`; los agentes y skills que alimentan la wiki están en `agentes-y-skills.md`.

> **En una frase:** una wiki **estática** (HTML generado en build, sin servidor ni base de datos) cuyo contenido son archivos Markdown. **La página no tiene ninguna funcionalidad para crear o editar entradas**: las entradas se añaden **por código** (archivos `.md` en `content/`), normalmente mediante agentes. El código del proyecto solo se ocupa de presentar, enlazar y buscar ese contenido.

---

## 1. Contexto y propósito

Una wiki estática de consulta para programadores junior: glosario de términos, fichas de tecnologías, fichas de paquetes y dependencias, y comparativas entre alternativas, con casos de uso y ejemplos.

Además es la **base de conocimiento personal** del autor. El flujo principal no es escribir contenido a mano, sino **plantear una duda a un agente (opencode, desde VS Code) y obtener como resultado una entrada de la wiki** redactada de modo que resuelva esa duda (ver RF-09). Eso es un asunto de agentes, no de la página.

Cada entrada añadida es **final**: se revisa en el `git diff` y no existe ningún estado editorial (borrador, revisado…).

Como herramienta de estudio, el lector puede marcar entradas como **aprendidas** y ocultarlas de los listados para quitar ruido (RF-14). Esa preferencia vive en su navegador.

El proyecto es también una muestra de trabajo y un vehículo de aprendizaje: el código documenta con comentarios la equivalencia de lo que hace Astro en React + Vite, y la página «Acerca de» (RF-15) presenta el proyecto con sus datos de accesibilidad, rendimiento y copyright.

## 2. Objetivos y no objetivos

**Objetivos**
- O1. Consultar rápido cualquier término, tecnología, paquete o comparativa (lectura y búsqueda).
- O2. Añadir contenido con el mínimo esfuerzo y la máxima consistencia (archivos Markdown validados por esquema).
- O3. Convertir dudas personales en entradas que las resuelvan, mediante agentes.
- O4. Escalar a cientos o miles de entradas sin reestructurar.
- O5. Aplicar buenas prácticas de estructura, dependencias y calidad, y que sean extrapolables a otros proyectos.
- O6. Estudiar con la wiki: poder ocultar lo ya aprendido y ver solo lo pendiente.

**No objetivos (por ahora)**
- Cualquier interfaz para crear, editar o borrar entradas desde la página: el contenido se añade por código.
- Cuentas de usuario, backend, base de datos o CMS externo.
- Comentarios de lectores o contenido colaborativo.
- Contadores, estadísticas o sincronización del progreso de lectura.
- Clasificación del contenido por niveles.
- Estados editoriales y metadatos de fecha en las entradas.
- MDX o componentes dentro del contenido: las entradas son Markdown plano.
- Internacionalización (contenido solo en español; la estructura no debe impedirla).

## 3. Usuarios y casos de uso

| Actor | Necesidad |
|-------|-----------|
| **Autor** (el propietario) | Plantear dudas al agente y revisar las entradas resultantes en el diff; consultar su propia base de conocimiento. |
| **Lector junior** | Entender un concepto, comparar alternativas y decidir qué usar, sin conocimientos previos; quitar de la vista lo que ya domina. |

**Casos de uso principales**
- CU1. El autor pregunta "¿X es lo mismo que Y?" y obtiene entradas nuevas o ampliadas.
- CU2. Un lector busca "zustand" y ve qué es, cuándo usarlo y su comparativa con Redux.
- CU3. Un lector navega por categoría o por etiqueta (frontend, backend, tests…).
- CU4. El autor revisa con `git diff` lo que ha generado el agente y lo acepta o corrige.
- CU5. Un lector lee sobre `react-router`, hace clic en «React» dentro del texto y llega a su entrada.
- CU6. Un lector marca una entrada como aprendida y activa «solo pendientes» para no volver a verla en los listados.

## 4. Principios de diseño

1. **El contenido es el producto; el código es el vehículo.** Añadir una entrada = crear un archivo `.md` en `content/`, por código o por agente, nunca desde la página.
2. **Todo contenido pasa por un esquema.** Lo inválido no se publica.
3. **Una sola fuente de verdad por dato.** Las relaciones se declaran una vez (en el frontmatter) y se derivan en ambos sentidos; las menciones en el texto se enlazan solas.
4. **Explicar a un junior:** lenguaje claro, términos definidos al usarse, ejemplos mínimos y ejecutables.
5. **Cero servidor.** Todo se resuelve en build; lo único que guarda el navegador son las preferencias del lector (aprendidas, filtro y tema).
6. **Aprender haciendo:** lo específico de Astro se comenta con su equivalencia en React.
7. **Lo añadido es final.** Sin estados intermedios: la revisión es el diff.
8. **Lo de sistema lo toca el autor.** `.github/`, `.opencode/` y `.husky/` no los editan los agentes del proyecto.

## 5. Requisitos funcionales

Prioridad según MoSCoW: **M**ust, **S**hould, **C**ould.

### RF-01 · Glosario (M)
Colección de términos con definición breve, explicación, ejemplo y relaciones.
- *Dado* un término existente, *cuando* se visita `/glosario/<slug>`, *entonces* se muestra definición, explicación, ejemplo, "se confunde con" y relacionados (estos últimos, generados desde el frontmatter).
- *Dado* el índice `/glosario`, *entonces* se listan los términos en orden alfabético (locale `es`) con salto por letra.

### RF-02 · Tecnologías (M)
Fichas de lenguajes, frameworks de aplicación, plataformas y servicios (React, Astro, TypeScript, Git, GitHub Pages).
- La ficha incluye: qué es, para qué sirve, cuándo usarla y cuándo no, alternativas con comparación breve, y ejemplo.
- La comparación breve va en prosa en la sección «Alternativas» del cuerpo. El campo `alternativas` (slugs) se valida y alimenta los enlaces a comparativas y los backlinks.
- *Dado* un valor de `alternativas`, *entonces* la ficha enlaza a la entrada correspondiente (o a la comparativa si existe).

### RF-03 · Paquetes y dependencias (M)
Fichas de paquetes que se añaden a un proyecto como dependencia o se invocan como CLI de su ecosistema (`mermaid`, `playwright`, `eslint`, `vite`, `npm`…).
- La ficha incluye: qué es, para qué sirve, cuándo usarlo y cuándo no, alternativas y un ejemplo mínimo de instalación y uso.
- **Criterio de reparto:**
  - *Paquete*: dependencia o CLI de un ecosistema.
  - *Tecnología*: lenguaje, framework de aplicación, plataforma o servicio.
  - Los frameworks (React, Astro) son tecnologías aunque se instalen con npm.
- El campo opcional `npm` indica el nombre en el registro de npm.
- *Dado* un valor de `alternativas`, *entonces* la ficha enlaza a la entrada correspondiente (o a la comparativa si existe).

### RF-04 · Comparativas (M)
Entidad propia que compara 2 o más tecnologías o paquetes (`entidades`) respecto a una decisión concreta.
- Incluye contexto de decisión, tabla de criterios, "cuándo elegir cada una" y ejemplos.
- *Dado* una comparativa, *entonces* cada entidad comparada muestra un enlace a ella desde su ficha.

### RF-05 · Patrones de diseño (C, fase 5)
Colección opcional al estilo refactoring.guru: problema, solución, estructura, ejemplo y relación con otros patrones (esta última, mediante `relacionados`).

### RF-06 · Navegación y relaciones (M)
- Índices por colección, por categoría y por etiqueta.
- Enlaces cruzados bidireccionales: si A declara a B como relacionado, B muestra "Mencionado en: A" (backlinks calculados en `lib/content`).
- Los bloques «Relacionados» y «Mencionado en» **los genera el layout** a partir del frontmatter y los backlinks; no se escriben en el cuerpo.
- Breadcrumbs en todas las fichas.

### RF-07 · Menciones enlazadas (M)
Si el texto de una entrada menciona algo que tiene su propia entrada, esa mención es un enlace a ella. Por ejemplo, en `react-router`, la palabra «React» lleva a la entrada `react`.
- Se aplica en build sobre el cuerpo de todas las entradas, mediante un **plugin de remark**. Requiere `@astrojs/markdown-remark` y `markdown.processor: unified()`, porque el procesador por defecto de Astro 7 (Sätteri) no ejecuta plugins de remark.
- Se enlaza por coincidencia exacta, sensible a mayúsculas, con el `titulo` o cualquier `alias` de otra entrada, como palabra completa.
- Gana la coincidencia más larga: *dado* "React Router" y las entradas `react` y `react-router`, *entonces* enlaza `react-router`.
- Se enlaza la **primera mención de cada término en cada sección** (`##`).
- No se enlaza dentro de bloques de código (incluidos los de Mermaid), código en línea, encabezados, nodos HTML ni enlaces existentes, ni una entrada a sí misma.
- *Dado* una entrada con `autoenlace: false`, *entonces* su título y alias no se convierten en enlace automático en otras entradas (útil para palabras comunes como «estado»).
- El plugin obtiene el índice de títulos y alias leyendo el frontmatter de `content/` con `gray-matter`, sin importar `astro:content` (regla de §8), y lo construye una sola vez por build (RNF-04).
- Los enlaces respetan `base` (§9).
- Las menciones a conceptos sin entrada no generan nada; quedan como pendientes en el informe del agente.

### RF-08 · Búsqueda (M)
- Búsqueda de texto completo estática, sin backend.
- Coincide por título, alias (p. ej. "SSG" ↔ "Static Site Generation"), resumen y cuerpo.
- Filtros por tipo (colección), categoría y etiqueta.
- *Dado* "zustnad" (error tipográfico leve), *entonces* debería devolver Zustand (tolerancia a erratas deseable, no bloqueante).
- *Dado* «solo pendientes» activo (RF-14), *entonces* los resultados no incluyen entradas aprendidas.

### RF-09 · Entradas generadas por agentes (M)
El contenido no se crea desde la página: **se añade por código**, como archivos Markdown en `content/`, normalmente mediante agentes. Los agentes y skills se especifican en `agentes-y-skills.md` y no forman parte del código de la página.
- La entrada es un artículo **autónomo**: sigue la plantilla estándar del tipo y, además, su énfasis, ejemplos y sección de matices están pensados para resolver la duda que la originó.
- La entrada **no** tiene formato pregunta/respuesta ni alude a la conversación, y la duda no se registra en el contenido.
- Cada entrada añadida es **final**: no tiene estado editorial. Se revisa en el `git diff`.
- Detalle del flujo y reglas de redacción: `agentes-y-skills.md`.

### RF-10 · Validación de contenido (M)
Script `validate` que falla si hay: esquema inválido, slug duplicado (la unicidad es **global**, entre colecciones), referencias a entradas inexistentes (`relacionados`, `alternativas`, `entidades`), enlaces internos rotos, secciones obligatorias ausentes, una sección `## Relacionados` escrita en el cuerpo (la genera el layout), alias en conflicto (con otro alias, slug o título) o etiquetas fuera del catálogo (§7.5).

### RF-11 · README con glosario del proyecto (M)
El `README.md` incluye un glosario de los términos que usa el propio proyecto (§14).

### RF-12 · Comentarios de equivalencia Astro ↔ React (M)
Todo código que use una característica específica de Astro lleva un comentario `ASTRO: … / REACT+VITE: …`.

### RF-13 · Tema claro/oscuro (M)
- Interruptor en el header (`<button>` con `aria-pressed` y texto accesible), disponible en todas las páginas y usable desde 360 px.
- *Dado* un lector sin preferencia guardada, *entonces* se usa `prefers-color-scheme`; *dado* una preferencia guardada, *entonces* prevalece.
- El tema se aplica antes del primer pintado, sin parpadeo: un script inline en `<head>` fija `data-theme="light"` o `data-theme="dark"` en `<html>`. Se usa ese atributo y esos valores porque `astro-mermaid` los reconoce para cambiar el tema de los diagramas.
- Los colores son **tokens** (variables CSS) definidos para ambos temas y consumidos por Tailwind, configurado para usar el atributo `data-theme` (verificar la sintaxis vigente). La paleta parte de los colores de kimografico.com: el archivo de estilos se aporta como parte del prompt de implementación. Hasta tenerlo, se usan valores provisionales.
- La paleta debe cumplir contraste AA en ambos temas (RNF-03); si algún par original no lo cumple, se ajusta y se documenta.
- Bloques de código y diagramas deben leerse bien en ambos temas.

### RF-14 · Aprendidas y «solo pendientes» (S)
Un filtro sencillo para quitar ruido: no es un sistema de progreso.
- *Dado* una ficha de entrada, *cuando* el lector pulsa «Marcar como aprendida», *entonces* queda marcada (el control pasa a «Aprendida» con el icono); pulsarlo de nuevo la desmarca. Es un `<button>` con `aria-pressed` y texto visible.
- *Dado* el header, *entonces* hay un interruptor «Mostrar: todo / solo pendientes» (`<button>` con `aria-pressed`). Por defecto, «todo».
- *Dado* una entrada aprendida y el filtro en «todo», *entonces* su elemento en los listados muestra el **icono de aprendida**, con texto accesible oculto («Aprendida»).
- *Dado* «solo pendientes» activo, *entonces* las entradas aprendidas **desaparecen de los listados**: portada, índices de colección, listados por categoría y etiqueta, y resultados de búsqueda.
- Las entradas ocultas **no se atenúan**: simplemente no aparecen en los listados. Siguen siendo accesibles con normalidad desde enlaces (menciones, relacionados, «mencionado en», breadcrumbs) y por URL directa.
- *Dado* que el filtro deja un listado vacío, *entonces* se muestra un mensaje breve con la opción de volver a «todo».
- **Persistencia** (`localStorage`, claves con prefijo `wiki:`): `wiki:aprendidas` (lista de slugs), `wiki:solo-pendientes` (booleano) y `wiki:tema` (`light` | `dark`, RF-13). Sin fechas, sin versiones ni más datos.
- Los slugs guardados que ya no existan se ignoran sin error.
- Si `localStorage` no está disponible o los datos son inválidos, la wiki funciona con normalidad con todo visible, los controles de aprendidas se desactivan y no se lanzan errores.
- **Icono:** un SVG en `src/assets/icons/aprendida.svg`, incrustado en línea y con `currentColor` para seguir el tema. `wiki-dev` genera uno provisional sencillo (un check) o descarga uno de un set de licencia libre anotando autoría y licencia; el autor lo sustituirá por el suyo. Si el SVG definitivo trae colores fijos, se ajustan a `currentColor`.
- **Criterios técnicos:**
  - Solo los elementos de **listado** (componente compartido `EntradaItem`) llevan `data-slug` y contienen el icono oculto; los enlaces dentro de las entradas nunca se ocultan.
  - El mismo script inline de `<head>` (< 2 KB) que aplica el tema inyecta un `<style>` que muestra el icono en las entradas aprendidas y, con el filtro activo, oculta su elemento de listado (`[data-slug="…"]`). Así no hay parpadeo. Lleva comentario de equivalencia (RF-12).
  - La lectura, escritura y validación de las preferencias es TypeScript puro en `src/lib/preferencias/`, sin dependencia de Astro (RNF-07).
  - El botón de marcar y los interruptores del header son islas mínimas.

### RF-15 · Acerca de (S)
Página `/acerca-de` que presenta el proyecto como muestra de trabajo. Es una página normal, no una entrada de contenido. Incluye:
- Qué es el proyecto y por qué existe (incluye que es estático y que el contenido se añade por código y por agentes).
- Stack utilizado, con cada tecnología o paquete enlazado a su entrada de la wiki cuando exista.
- **Copyright y licencia**: autoría y licencia del código y del contenido, y autoría y licencia de los recursos de terceros (por ejemplo, el icono si procede de un set libre).
- **Accesibilidad**: objetivo WCAG 2.1 AA, cómo se comprueba y cómo comunicar un problema.
- **Rendimiento**: objetivos de Lighthouse y resumen de la última medición hecha con el CLI (actualizado a mano).
- **Privacidad**: sin cuentas, sin servidor; las preferencias solo se guardan en el navegador (RNF-09).
- Enlace al repositorio.

## 6. Requisitos no funcionales

| ID | Requisito | Criterio de aceptación |
|----|-----------|------------------------|
| RNF-01 | Rendimiento | Lighthouse ≥ 95 en rendimiento, accesibilidad, buenas prácticas y SEO en páginas de contenido, comprobado **a demanda** con `npm run lighthouse` (no en CI) |
| RNF-02 | JavaScript mínimo | Las páginas de contenido no envían JS salvo el de las islas declaradas (búsqueda, preferencias), el script inline de `<head>` (< 2 KB) y el de `astro-mermaid`, que debe cargar Mermaid solo en las páginas con diagramas |
| RNF-03 | Accesibilidad | WCAG 2.1 AA en ambos temas: contraste, navegación por teclado, jerarquía de encabezados, controles con rol y estado accesibles |
| RNF-04 | Escalabilidad | Build correcto con 1000 entradas sintéticas en tiempo razonable (objetivo: < 2 min), incluido el plugin de menciones |
| RNF-05 | Coste | Alojamiento gratuito en GitHub Pages |
| RNF-06 | Mantenibilidad | Typecheck, lint, formato y validación de contenido en CI; sin errores para fusionar |
| RNF-07 | Portabilidad | La capa de contenido (`content/`, esquemas, `lib/content`, `lib/preferencias`, `lib/markdown`, scripts) es independiente del framework; el plugin de menciones es un plugin estándar de remark |
| RNF-08 | Responsive | Lectura cómoda desde 360 px; bloques de código con scroll horizontal |
| RNF-09 | Privacidad | Las preferencias del lector nunca salen de su navegador; no se envían a ningún servidor |
| RNF-10 | Cobertura | Cobertura de tests ≥ 90 % (líneas, funciones, ramas y sentencias) sobre la lógica TypeScript (`src/lib/**`, `scripts/**`); se excluyen `.astro`, páginas, stories y configuración. Se exige en el hook pre-push, no en CI |

## 7. Modelo de contenido

Todos los archivos viven en `content/<coleccion>/<slug>.md`. El **slug** es el nombre del archivo: kebab-case, sin acentos, en singular y con el nombre canónico (`zod`, `static-site-generation`). Las siglas van en `alias`. El slug es **único en toda la wiki**, no solo dentro de su colección, porque las relaciones y las menciones se resuelven por slug.

### 7.1 Campos comunes (base)

| Campo | Tipo | Obligatorio | Notas |
|-------|------|-------------|-------|
| `titulo` | string | Sí | Nombre visible |
| `resumen` | string ≤ 200 | Sí | Definición corta; se usa en listados y SEO |
| `categoria` | enum | Sí | Ver §7.2 |
| `tags` | enum[] | No | Del catálogo de §7.5. Default `[]` |
| `alias` | string[] | No | Siglas y nombres alternativos; únicos en toda la wiki |
| `relacionados` | slug[] | No | Deben existir. Alimentan el bloque «Relacionados», que genera el layout |
| `fuentes` | url[] | No | Documentación oficial usada |
| `autoenlace` | boolean | No | Default `true`. Con `false`, su título y alias no se enlazan automáticamente en otras entradas (RF-07) |

No hay campos de nivel, estado, fechas ni dudas.

### 7.2 Categorías (enum controlado)

`lenguaje · framework · estilos · estado · datos-api · rendimiento-ux · herramienta · despliegue · concepto`

La categoría es temática y transversal a las colecciones. Añadir una categoría nueva requiere editar el esquema (skill `evolucionar-esquema`), no el contenido.

### 7.3 Campos por colección

| Colección | Campos adicionales |
|-----------|--------------------|
| `glosario` | `terminoEn` (opcional, término en inglés) |
| `tecnologias` | `alternativas` (slug[]), `web` (url, opcional) |
| `paquetes` | `alternativas` (slug[]), `web` (url, opcional), `npm` (string, nombre en npm, opcional) |
| `comparativas` | `entidades` (slug[], mínimo 2, tecnologías o paquetes), `contexto` (string: la decisión que ayuda a tomar) |
| `patrones` | `familia` enum `creacional \| estructural \| comportamiento` |

### 7.4 Plantillas de cuerpo (secciones obligatorias)

El validador comprueba que existan los encabezados `##` obligatorios; se permiten secciones adicionales (donde suele integrarse el enfoque de la duda). «Relacionados» y «Mencionado en» **no** se escriben: los genera el layout. Un bloque de código con lenguaje `mermaid` se renderiza como diagrama.

| Tipo | Secciones obligatorias |
|------|------------------------|
| Glosario | Definición · Por qué importa · Ejemplo · Se confunde con |
| Tecnología | Qué es · Para qué sirve · Cuándo usarla · Cuándo no · Alternativas · Ejemplo |
| Paquete | Qué es · Para qué sirve · Cuándo usarlo · Cuándo no · Alternativas · Ejemplo |
| Comparativa | Contexto · Criterios · Cuándo elegir cada una · Ejemplos |
| Patrón | Problema · Solución · Estructura · Ejemplo · Cuándo usarlo |

Las plantillas con el frontmatter y las secciones vacías viven en `specs/plantillas/` (una por tipo), y las lee la skill `anadir-entrada`.

### 7.5 Etiquetas (catálogo controlado)

`frontend · backend · tests · terminal · accesibilidad · rendimiento · seguridad`

- La mayoría de las entradas serán `frontend`.
- Algo *fullstack* lleva **ambas** etiquetas, `frontend` y `backend`; no existe una etiqueta `fullstack`.
- Las etiquetas alimentan `/etiquetas/[etiqueta]` y el filtro de búsqueda.
- Añadir una etiqueta requiere editar el esquema (skill `evolucionar-esquema`); una etiqueta fuera del catálogo hace fallar `validate`.

## 8. Arquitectura

Definida en `design-pattern.md`: islas, schema-first, capa de acceso a contenido, estructura por funcionalidades, composición de plantillas, SSG y pipeline de Markdown con plugins. Reglas vinculantes:

- Solo `src/lib/content/` importa `astro:content`.
- Una feature no importa de otra feature. Las preferencias del lector actúan sobre el atributo `data-slug` de los componentes compartidos, sin importar de las demás features.
- Solo Markdown (`.md`): sin MDX.
- Sin dependencias nuevas sin justificarlas en el commit.
- Los archivos de sistema (`.github/`, `.opencode/`, `.husky/`) los edita el autor, no los agentes del proyecto.

### 8.1 Dependencias iniciales

Fijar versiones exactas al inicializar el proyecto y verificar la sintaxis de imports de Zod/colecciones contra la versión vigente de Astro.

| Dependencia | Para qué | Equivalencia React + Vite |
|-------------|----------|---------------------------|
| `astro` | Framework, rutas, content collections | Vite + React Router + script propio |
| `@astrojs/react` + `react` | Islas interactivas | Ya es React |
| `@astrojs/markdown-remark` | Procesador `unified()` para ejecutar plugins de remark (en Astro 7 el defecto, Sätteri, no los ejecuta) | `unified` directamente |
| `astro-mermaid` + `mermaid` | Diagramas en bloques ```` ```mermaid ````, renderizados en el navegador | `mermaid` + plugin de remark |
| `tailwindcss` | Estilos y tokens de tema | Igual |
| `zod` | Esquemas (integrado en colecciones) | Zod en script de build |
| `pagefind` | Índice de búsqueda estático | MiniSearch / Fuse |
| `gray-matter` | Leer frontmatter fuera de Astro (plugin de menciones, `validate`) | Igual |
| `typescript`, `@astrojs/check` | Tipos | `tsc` |
| `eslint`, `prettier` (+ plugin Astro) | Lint y formato | Igual |
| `vitest`, `@vitest/coverage-v8` | Tests y cobertura de `lib/` y scripts | Igual |
| `husky`, `lint-staged` | Hooks de git | Igual |
| `astrobook` | Visor de componentes, solo desarrollo | Storybook (las stories usan CSF3, portables) |
| `lighthouse` | CLI para medir métricas a demanda, solo desarrollo | Igual |

El plugin de menciones puede necesitar utilidades de unified (por ejemplo, para recorrer el árbol); se justifican en el commit.

### 8.2 Verificaciones antes de adoptar

Cuatro piezas dependen de integraciones que hay que comprobar contra las versiones vigentes al instalarlas:

- **`unified()` en Astro 7:** confirmar la configuración de `markdown.processor` con `@astrojs/markdown-remark` y que el plugin de menciones se ejecuta.
- **`astro-mermaid`:** su README indica que detecta el procesador activo y que carga Mermaid de forma condicional. Comprobar que funciona con `unified()` bajo Astro 7, que no carga JS en páginas sin diagramas y que sigue el tema por `data-theme`.
- **Astrobook:** compatibilidad con la versión de Astro; activarlo solo en desarrollo (condición sobre `NODE_ENV`, para que no entre en el build); cargar los estilos globales y los tokens de tema mediante sus opciones `css` y `head`. Es una herramienta opcional: si se descontinúa, se elimina sin afectar a la wiki.
- **Pagefind:** confirmar la API JavaScript necesaria para filtrar resultados (RF-08, RF-14) con la versión instalada.

## 9. Rutas

| Ruta | Contenido |
|------|-----------|
| `/` | Portada: buscador y accesos por categoría y por etiqueta |
| `/glosario` · `/glosario/[slug]` | Índice y ficha |
| `/tecnologias` · `/tecnologias/[slug]` | Índice y ficha |
| `/paquetes` · `/paquetes/[slug]` | Índice y ficha |
| `/comparativas` · `/comparativas/[slug]` | Índice y comparativa |
| `/patrones` · `/patrones/[slug]` | (fase 5) |
| `/categorias/[categoria]` | Entradas de todas las colecciones de una categoría |
| `/etiquetas/[etiqueta]` | Entradas de todas las colecciones con una etiqueta |
| `/buscar` | Búsqueda con filtros |
| `/acerca-de` | RF-15 |
| `/404` | Página de error con buscador |

GitHub Pages sirve un sitio de proyecto en `https://<usuario>.github.io/<repo>/`: configurar `site` y `base: '/<repo>/'`. Todo enlace interno y todo asset deben usar `base` (`import.meta.env.BASE_URL`), incluidos los enlaces generados por el plugin de menciones y la ruta de carga de Pagefind. Si más adelante se asocia un dominio propio, solo cambian `site` y `base`.

## 10. Búsqueda

- **Herramienta:** Pagefind, ejecutado tras el build sobre el HTML generado.
- Cada ficha marca su cuerpo como indexable; los metadatos (`tipo`, `categoria`, `tags`) se exponen como filtros.
- Los alias se inyectan como texto oculto indexable para que "SSG" encuentre "Static Site Generation".
- La interfaz de búsqueda es una **isla** (`client:load` en cabecera). Usa la API JavaScript de Pagefind, no su UI por defecto, para poder ocultar los resultados aprendidos con «solo pendientes» (RF-14); el slug se deriva de la URL del resultado.
- *Equivalencia didáctica:* en React + Vite se generaría un índice JSON en build y se consultaría con MiniSearch/Fuse (se documenta en comentarios).

## 11. Calidad, hooks y CI

**Forma de trabajo.** Los agentes **no ejecutan la suite de tests tras cada cambio**. Primero se implementa y el autor valida el resultado funcionalmente; los tests se escriben o ajustan **al final**, a petición del autor, antes del push. Mientras tanto, los agentes pueden usar las comprobaciones ligeras (`check`, `lint`, `validate`) cuando las necesiten.

**Hooks locales (Husky)**
- `pre-commit`: formato y lint de los archivos añadidos (`lint-staged`) y validación rápida de contenido.
- `pre-push`: `npm run test:coverage`. Falla si la cobertura baja del 90 % (RNF-10), con el umbral definido en la configuración de Vitest.
- La cobertura **no se repite en CI**. Saltarse el hook con `--no-verify` es una decisión consciente y exclusiva del autor; ningún agente lo usa.

**CI (cada push y PR)**
1. `astro check` (tipos y esquemas)
2. `eslint` y `prettier --check`
3. `npm run validate` (RF-10)
4. `astro build` + indexado Pagefind

**A demanda (fuera de CI)**
- `npm run lighthouse`: construye, sirve la vista previa y ejecuta el CLI de Lighthouse sobre páginas representativas. Necesita Chrome o Chromium instalado; no requiere Playwright. Sirve para comprobar RNF-01 cuando el autor quiera.
- Astrobook: visor de componentes en el servidor de desarrollo.

**Archivos de sistema.** La configuración de Husky, de CI y de despliegue (`.husky/`, `.github/`) y las definiciones de agentes y skills (`.opencode/`) las edita el autor con el agente `builder` de opencode. Los agentes del proyecto no las tocan; si una tarea las necesita, indican qué cambio hace falta.

## 12. Despliegue

- Hosting estático en **GitHub Pages**, desplegado con GitHub Actions desde la rama principal tras pasar CI. El workflow lo configura el autor. Verificar la configuración vigente en la documentación de Astro y de GitHub al montarlo.
- Pagefind se ejecuta después del build.
- Astrobook no se publica: solo está activo en desarrollo.
- Al compartir origen todos los sitios de proyecto de un mismo usuario de GitHub Pages, las claves de `localStorage` llevan siempre el prefijo `wiki:`.

## 13. Estructura de carpetas

```
content/
  glosario/ · tecnologias/ · paquetes/ · comparativas/ · patrones/
src/
  content.config.ts
  features/{glosario,tecnologias,paquetes,comparativas,busqueda,preferencias}/
  components/                # compartidos: EntradaItem, IconoAprendida, Badge...; stories junto a cada componente
  layouts/ · pages/
  assets/icons/aprendida.svg
  lib/content/
  lib/preferencias/          # aprendidas, filtro y tema: TS puro, sin Astro
  lib/markdown/              # plugin de menciones enlazadas
scripts/
  validate-content.ts
specs/                       # Estos SDD y design-pattern.md
  plantillas/                # una por tipo de entrada, usadas por anadir-entrada
README.md

# Archivos de sistema: los edita el autor con `builder`
.github/workflows/
.husky/
.opencode/
  agent/ · skills/
```

## 14. README del proyecto

Debe incluir: qué es (y que es estática y se alimenta por código y agentes), cómo ejecutarlo, estructura, flujo "de la duda a la entrada", scripts disponibles, enlaces a `specs/`, y un **glosario del proyecto** con el mismo formato que las entradas de la wiki (definición breve + para qué se usa aquí).

**Términos semilla:** Astro, React, Vite, TypeScript, Tailwind, Zod, Markdown, frontmatter, content collection, slug, SSG, hidratación, isla, directiva `client:*`, Pagefind, unified, remark, Mermaid, Astrobook, Lighthouse, lint, ESLint, Prettier, Vitest, cobertura, Husky, hook de git, CI, GitHub Pages, localStorage, SDD, agente, skill, opencode, repository (patrón), facade.

Regla: cuando un cambio introduzca una herramienta o concepto nuevo en el proyecto, se añade al glosario del README (skill `actualizar-glosario-readme`, que usa `wiki-dev`).

## 15. Plan por fases

| Fase | Contenido | Requisitos |
|------|-----------|------------|
| **F0 · Fundación** | Repositorio, Astro + TS + Tailwind, lint/format, Vitest con umbral del 90 %, estructura de carpetas, README inicial. El autor, con `builder`, configura Husky (pre-commit y pre-push), CI y el despliegue inicial en GitHub Pages | RNF-05, RNF-06, RNF-10, RF-11 |
| **F1 · Núcleo de contenido** | Tema claro/oscuro con la paleta aportada, procesador `unified()`, esquemas Zod (categorías y etiquetas), `lib/content`, layouts, páginas de glosario, tecnologías y paquetes, menciones enlazadas, `validate`, Astrobook para los primeros componentes | RF-13, RF-01, RF-02, RF-03, RF-07, RF-10, RF-12 |
| **F2 · Descubrimiento** | Navegación, categorías, etiquetas, backlinks, comparativas, búsqueda con Pagefind, aprendidas y «solo pendientes», Mermaid, script de Lighthouse | RF-04, RF-06, RF-08, RF-14 |
| **F3 · Agentes y skills** | `.opencode/` completo según `agentes-y-skills.md` (lo crea el autor con `builder`); flujo de la duda a la entrada | RF-09 |
| **F4 · Contenido semilla** | Migrar el documento base (frameworks, estilos, estado, datos, UX, herramientas, despliegue) y las dudas ya resueltas en la fase de diseño (islas, hidratación, Zod, MDX vs MD, SSG, facade/repository) | O1, O3 |
| **F5 · Pulido** | Página «Acerca de» con las métricas medidas, auditoría de accesibilidad, colección de patrones | RF-15, RF-05, RNF-01, RNF-03 |

F3 puede empezar en cuanto F1 deje los esquemas estables.

## 16. Decisiones abiertas

1. **Licencia** del código y del contenido, necesaria para «Acerca de».
2. **Nombre del repositorio**, que determina la URL de GitHub Pages y el valor de `base`.
3. **Catálogo inicial de etiquetas** (§7.5): ¿falta alguna o sobra alguna?

## 17. Riesgos

| Riesgo | Mitigación |
|--------|------------|
| El agente inventa información o fuentes | Skill `investigar-tema`, campo `fuentes`, revisor independiente, revisión en el `git diff` |
| Duplicados o solapamiento entre entradas | Búsqueda previa obligatoria; el flujo prefiere ampliar a crear |
| Deriva del esquema con muchas entradas | Cambios solo con `evolucionar-esquema`, que migra las existentes |
| Información que caduca (el modelo no guarda fechas) | Evitar afirmaciones de versión salvo que estén verificadas con fuente |
| Cambios en Astro (versiones mayores) | Capa `lib/content` aislada; versiones fijadas; actualizaciones con el CI en verde. Astro 7 ya cambió el procesador de Markdown |
| El plugin de remark deja de ejecutarse si se cambia de procesador | Procesador `unified()` fijado en la configuración; el plugin está aislado en `lib/markdown` y tiene tests |
| Menciones enlazadas ruidosas o erróneas (palabras comunes) | Coincidencia sensible a mayúsculas, primera mención por sección, `autoenlace: false`, tests del plugin |
| Plugin de menciones lento con muchas entradas | Índice calculado una vez por build; comprobado en RNF-04 |
| `astro-mermaid` carga JS en el navegador | Debe cargarse solo en páginas con diagramas; verificado en §8.2 |
| Astrobook (versión anterior a la 1.0) se descontinúa | Es solo desarrollo y no entra en el build: se elimina sin afectar a la wiki |
| Marcas huérfanas si se renombra un slug | Evitar renombrar slugs; las marcas huérfanas se ignoran sin error |
| Parpadeo de tema o de filtro al cargar | Script inline bloqueante en `<head>` antes del primer pintado |
| `localStorage` no disponible (modo privado, políticas del navegador) | Degradación: todo visible, controles de aprendidas desactivados, sin errores |

## 18. Definición de hecho

**Por tarea**
- Cumple los criterios de aceptación del requisito asociado y el autor lo ha validado funcionalmente.
- Código con comentarios de equivalencia cuando use algo específico de Astro.
- Si introduce un concepto nuevo, está en el glosario del README.
- Si guarda algo en el navegador, documenta su clave y formato.

**Al cierre, antes de hacer push**
- Los tests están escritos o ajustados y el pre-push pasa con cobertura ≥ 90 %.
- CI en verde (tipos, lint, formato, validación, build).
- Los SDD y `design-pattern.md` siguen siendo coherentes con el resultado.
