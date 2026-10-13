# Patrones de diseño del proyecto

> Wiki **estática** de consulta para programadores junior: glosario, tecnologías, paquetes y comparativas. El contenido son archivos Markdown que se añaden por código (normalmente mediante agentes); la página no tiene funcionalidad para crear entradas.
> Stack: **Astro + TypeScript + Tailwind + Zod**, Markdown plano (sin MDX), con islas de React cuando haga falta.

Este documento recoge los patrones de diseño y arquitectura elegidos, **por qué** se eligieron para este proyecto y **cómo** se aplican. Cada patrón incluye su equivalencia en React + Vite, porque uno de los objetivos del proyecto es aprender conceptos extrapolables a otros frameworks.

Documentos relacionados: [`spec.md`](./spec.md) · [`agentes-y-skills.md`](./agentes-y-skills.md)

---

## Índice

1. [Visión general](#1-visión-general)
2. [Patrón 1: Arquitectura de islas](#2-patrón-1-arquitectura-de-islas)
3. [Patrón 2: Contenido como datos (Schema-first)](#3-patrón-2-contenido-como-datos-schema-first)
4. [Patrón 3: Capa de acceso a contenido (Repository / Facade)](#4-patrón-3-capa-de-acceso-a-contenido-repository--facade)
5. [Patrón 4: Estructura por funcionalidades (Feature-based)](#5-patrón-4-estructura-por-funcionalidades-feature-based)
6. [Patrón 5: Composición de plantillas (Layouts + Composite)](#6-patrón-5-composición-de-plantillas-layouts--composite)
7. [Patrón 6: Generación estática (SSG)](#7-patrón-6-generación-estática-ssg)
8. [Patrón 7: Pipeline de Markdown (plugins de unified)](#8-patrón-7-pipeline-de-markdown-plugins-de-unified)
9. [Cómo encajan entre sí](#9-cómo-encajan-entre-sí)
10. [Reglas para agentes y skills](#10-reglas-para-agentes-y-skills)
11. [Tabla de equivalencias Astro ↔ React](#11-tabla-de-equivalencias-astro--react)
12. [Decisiones descartadas](#12-decisiones-descartadas)

---

## 1. Visión general

| # | Patrón | Problema que resuelve | Dónde vive |
|---|--------|-----------------------|------------|
| 1 | Arquitectura de islas | Enviar poco JavaScript en un sitio de lectura | Componentes interactivos |
| 2 | Schema-first | Garantizar la calidad del contenido añadido por agentes | `src/content.config.ts` |
| 3 | Repository / Facade | Desacoplar páginas de la fuente de datos | `src/lib/content/` |
| 4 | Feature-based | Escalar al añadir secciones nuevas | `src/features/` |
| 5 | Layouts + Composite | Reutilizar estructura y componentes | `src/layouts/`, `src/components/` |
| 6 | SSG | Rendimiento, coste cero de servidor, errores en build | Build de Astro |
| 7 | Pipeline de Markdown | Transformar el contenido en build (menciones enlazadas, diagramas) | `src/lib/markdown/`, `astro.config.*` |

**Principio rector:** *el contenido es el producto y el código es el vehículo.* Todo el diseño busca que añadir una entrada nueva sea crear un archivo Markdown, sin tocar código y sin ninguna interfaz en la página.

---

## 2. Patrón 1: Arquitectura de islas

### Qué es
La página se renderiza como **HTML estático**. Solo los componentes que realmente necesitan interactividad (las "islas") se hidratan con JavaScript en el cliente. El resto no envía JS al navegador.

### Por qué aquí
La wiki es **mayoritariamente lectura**. Un artículo sobre "Zod" no necesita JavaScript para mostrarse. Solo lo necesitan el buscador y los controles de preferencias (tema, «solo pendientes», marcar como aprendida).

### Cómo se aplica

```astro
---
// src/layouts/BaseLayout.astro (fragmento del header)
import Buscador from '../features/busqueda/Buscador.tsx';
import InterruptoresHeader from '../features/preferencias/InterruptoresHeader.tsx';
---

<!-- HTML estático: cero JS en el cliente -->
<main><slot /></main>

<!--
  ISLAS: estos componentes React sí se hidratan en el navegador.
  ASTRO: client:load / client:visible / client:idle controlan CUÁNDO se hidrata.
  REACT+VITE: no existe el concepto; toda la app es un árbol de componentes
  que se hidrata entero. Aquí el equivalente sería importar <Buscador /> y punto.
-->
<header>
  <Buscador client:load />
  <InterruptoresHeader client:load />
</header>
```

### Directivas de hidratación

| Directiva | Cuándo hidrata | Uso en el proyecto |
|-----------|----------------|--------------------|
| *(ninguna)* | Nunca | Todo el contenido |
| `client:load` | Al cargar la página | Buscador e interruptores del header (tema y «solo pendientes») |
| `client:idle` | Cuando el navegador está libre | Botón «Marcar como aprendida» de la ficha |
| `client:visible` | Al entrar en pantalla | Sin uso por ahora; disponible para elementos interactivos lejos del primer pantallazo |

### Ventajas y límites
- **+** Carga muy rápida y buen SEO por defecto.
- **−** Compartir estado entre islas es más incómodo que en una app React pura. En este proyecto el estado compartido (tema, aprendidas, filtro) vive en `localStorage` y en atributos del documento, no en memoria, así que no hace falta una librería de estado; si apareciera esa necesidad, se usarían *nanostores* o se replantearía la decisión.

---

## 3. Patrón 2: Contenido como datos (Schema-first)

### Qué es
El contenido vive en archivos `.md` **fuera del código**, y cada tipo de entrada tiene un **esquema** que define qué campos son obligatorios y de qué tipo. Si una entrada no cumple el esquema, el build falla.

### Por qué aquí
Los agentes y skills van a añadir contenido de forma continua. Sin un esquema, cualquier inconsistencia (un campo mal escrito, una categoría inventada) pasaría desapercibida y degradaría la wiki. El esquema es la **red de seguridad**.

### Cómo se aplica

```ts
// src/content.config.ts
// (verificar el import de `z` contra la versión vigente de Astro)
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Enums controlados: evitan categorías o etiquetas inventadas por un agente.
const categorias = z.enum([
  'lenguaje', 'framework', 'estilos', 'estado', 'datos-api',
  'rendimiento-ux', 'herramienta', 'despliegue', 'concepto',
]);

// Etiquetas transversales. Algo fullstack lleva 'frontend' y 'backend'.
const etiquetas = z.enum([
  'frontend', 'backend', 'tests', 'terminal',
  'accesibilidad', 'rendimiento', 'seguridad',
]);

// Campos comunes a todas las colecciones.
const base = z.object({
  titulo: z.string(),
  resumen: z.string().max(200),
  categoria: categorias,
  tags: z.array(etiquetas).default([]),
  alias: z.array(z.string()).default([]),
  relacionados: z.array(z.string()).default([]),
  fuentes: z.array(z.string().url()).default([]),
  autoenlace: z.boolean().default(true),
});

const glosario = defineCollection({
  // ASTRO: la collection carga los archivos y los valida con el esquema.
  // REACT+VITE: cargarías con import.meta.glob('/content/glosario/*.md', { eager: true })
  //   y validarías cada frontmatter con schema.parse() en un script de build (scripts/validate-content.ts).
  loader: glob({ pattern: '**/*.md', base: './content/glosario' }),
  schema: base.extend({ terminoEn: z.string().optional() }),
});

const tecnologias = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/tecnologias' }),
  schema: base.extend({
    alternativas: z.array(z.string()).default([]),
    web: z.string().url().optional(),
  }),
});

const paquetes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/paquetes' }),
  schema: base.extend({
    alternativas: z.array(z.string()).default([]),
    web: z.string().url().optional(),
    npm: z.string().optional(), // nombre en el registro de npm
  }),
});

const comparativas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/comparativas' }),
  schema: base.extend({
    entidades: z.array(z.string()).min(2),
    contexto: z.string(),
  }),
});

// `patrones` (fase 5) se añade con el mismo esquema base + `familia`.
export const collections = { glosario, tecnologias, paquetes, comparativas };
```

### Ejemplo de entrada válida

```md
---
titulo: Zod
resumen: Librería para definir esquemas y validar datos en TypeScript en tiempo de ejecución.
categoria: datos-api
tags: [frontend, backend]
relacionados: [typescript, schema-first]
npm: zod
---

## Qué es

Zod permite describir la forma de un dato y comprobar en tiempo de ejecución que la cumple...
```

En el texto, «TypeScript» se enlazará solo a su entrada (Patrón 7). El bloque «Relacionados» lo genera el layout desde `relacionados`; no se escribe en el cuerpo.

### Reglas
- Los valores de `categoria` y `tags` salen **siempre** de un enum. Para añadir una categoría o una etiqueta nueva se edita el esquema, no el contenido.
- Los campos de relación (`relacionados`, `alternativas`, `entidades`) referencian **slugs** de otras entradas.
- El slug es **único en toda la wiki**, no solo dentro de su colección, porque las relaciones y las menciones se resuelven por slug.
- No hay campos de nivel, estado, fechas ni dudas: cada entrada añadida es final y se revisa en el `git diff`.

---

## 4. Patrón 3: Capa de acceso a contenido (Repository / Facade)

### Qué es
Un único módulo, `src/lib/content/`, es el **único** que sabe cómo leer las entradas. Las páginas y componentes piden datos mediante funciones con nombre de dominio (`getEntrada`, `getRelacionados`, `getBacklinks`) y no consultan los archivos directamente.

### Por qué aquí
Es el patrón **más importante para el objetivo didáctico**. Desacopla *qué datos necesito* de *cómo se obtienen*. Si mañana migras de Astro a Next o a Vite + React, solo reescribes esta capa; las páginas y componentes apenas cambian.

### Cómo se aplica

```ts
// src/lib/content/entradas.ts
import { getCollection } from 'astro:content';

// ASTRO: getCollection lee de las content collections.
// REACT+VITE: aquí iría import.meta.glob + parseo del frontmatter.
// Las funciones exportadas serían IDÉNTICAS: ese es el objetivo del patrón.

const COLECCIONES = ['glosario', 'tecnologias', 'paquetes', 'comparativas'] as const;

// Como el slug es único en toda la wiki, se puede resolver sin saber la colección.
export async function getTodasLasEntradas() {
  const porColeccion = await Promise.all(
    COLECCIONES.map(async (coleccion) => {
      const entradas = await getCollection(coleccion);
      return entradas.map((e) => ({ ...e, coleccion }));
    }),
  );
  return porColeccion.flat(); // (verificar el tipado de getCollection con una unión)
}

export async function getEntrada(slug: string) {
  const todas = await getTodasLasEntradas();
  return todas.find((e) => e.id === slug);
}

export async function getRelacionados(slug: string) {
  const entrada = await getEntrada(slug);
  if (!entrada) return [];
  const resueltos = await Promise.all(entrada.data.relacionados.map(getEntrada));
  return resueltos.filter(Boolean);
}

// Backlinks: las entradas que me declaran como relacionado.
export async function getBacklinks(slug: string) {
  const todas = await getTodasLasEntradas();
  return todas.filter((e) => e.data.relacionados.includes(slug));
}
```

```ts
// src/lib/content/glosario.ts
import { getCollection } from 'astro:content';

export async function getTodosLosTerminos() {
  const entradas = await getCollection('glosario');
  return entradas.sort((a, b) => a.data.titulo.localeCompare(b.data.titulo, 'es'));
}
```

### Regla de oro
> Ninguna página, layout ni componente importa `astro:content` directamente. Solo `src/lib/content/` lo hace.

Se puede reforzar con una regla de ESLint (`no-restricted-imports`) fuera de esa carpeta.

El plugin de menciones (Patrón 7) tampoco importa `astro:content`: lee el frontmatter de `content/` con `gray-matter`, para que siga siendo un plugin estándar de remark.

---

## 5. Patrón 4: Estructura por funcionalidades (Feature-based)

### Qué es
El código se organiza por **dominio** (glosario, tecnologías, paquetes, comparativas, búsqueda, preferencias) y no por tipo de archivo (todos los componentes juntos, todas las páginas juntas).

### Por qué aquí
La wiki irá añadiendo secciones. Con estructura por tipo, cada sección nueva toca cinco carpetas distintas. Con estructura por funcionalidad, una sección nueva es **una carpeta nueva**.

### Estructura propuesta

```
content/                       # Datos (fuera de src: separa contenido de código)
  glosario/
  tecnologias/
  paquetes/
  comparativas/
  patrones/

src/
  content.config.ts            # Esquemas Zod
  features/
    glosario/                  # Componentes y lógica propios del glosario
    tecnologias/
    paquetes/
    comparativas/
    busqueda/
      Buscador.tsx             # Isla React (usa la API JS de Pagefind)
    preferencias/
      InterruptoresHeader.tsx  # Tema y «solo pendientes» (islas)
      BotonAprendida.tsx       # Marcar como aprendida (isla)
  components/                  # Compartidos: EntradaItem, IconoAprendida, Badge...
                               # (cada componente puede llevar su *.stories.* para Astrobook)
  layouts/                     # Plantillas base
  assets/icons/aprendida.svg   # Icono de aprendida (currentColor)
  lib/
    content/                   # Capa de acceso (Patrón 3)
    preferencias/              # Aprendidas, filtro y tema: TS puro, sin Astro
    markdown/                  # Plugin de menciones enlazadas (Patrón 7)
  pages/                       # Rutas (Astro enruta por archivos)

scripts/
  validate-content.ts          # Enlaces rotos, slugs duplicados, referencias, secciones

specs/                         # Estos documentos
  plantillas/                  # Una por tipo de entrada (la usa la skill anadir-entrada)

# Archivos de sistema: los edita el autor con el agente `builder` de opencode
.github/workflows/
.husky/
.opencode/
  agent/
  skills/
```

### Reglas
- Una feature **no importa** de otra feature. Lo compartido sube a `components/` o `lib/`. Por ejemplo, las preferencias del lector actúan sobre el atributo `data-slug` que ponen los componentes compartidos, sin importar de las demás features.
- `content/` queda fuera de `src/` para que los agentes trabajen solo ahí, sin riesgo de tocar código.
- Los archivos de sistema (`.github/`, `.husky/`, `.opencode/`) no los editan los agentes del proyecto.

---

## 6. Patrón 5: Composición de plantillas (Layouts + Composite)

### Qué es
Una plantilla base (`BaseLayout`) aporta la estructura común (cabecera, navegación, pie, metadatos), y cada tipo de entrada tiene su propia plantilla construida con **componentes pequeños y reutilizables** (insignias, elemento de listado, bloques de relacionados).

### Por qué aquí
Todas las fichas deben verse y comportarse igual. Un cambio en el diseño de la cabecera se hace en un solo sitio. Además, los bloques «Relacionados» y «Mencionado en» se generan aquí a partir del frontmatter, de modo que el cuerpo de las entradas solo contiene contenido.

### Cómo se aplica

```astro
---
// src/layouts/FichaLayout.astro
import BaseLayout from './BaseLayout.astro';
import Badge from '../components/Badge.astro';
import Relacionados from '../components/Relacionados.astro';
import MencionadoEn from '../components/MencionadoEn.astro';
const { titulo, categoria, tags, slug } = Astro.props;
---

<!--
  ASTRO: <slot /> inserta el contenido hijo.
  REACT: es exactamente {children}.
-->
<BaseLayout titulo={titulo}>
  <header>
    <h1>{titulo}</h1>
    <Badge tipo="categoria">{categoria}</Badge>
    {tags.map((t) => <Badge tipo="tag">{t}</Badge>)}
  </header>
  <slot />
  <!-- Generados desde el frontmatter y los backlinks; no se escriben en el cuerpo -->
  <Relacionados slug={slug} />
  <MencionadoEn slug={slug} />
</BaseLayout>
```

### Script inline: tema y preferencias sin parpadeo

```astro
<head>
  <!--
    ASTRO: is:inline hace que Astro emita el script tal cual, sin procesarlo, y bloqueante en <head>.
    REACT+VITE: sería un <script> clásico en index.html, antes del bundle de la app.
    Aplica el tema y las preferencias antes del primer pintado, para evitar parpadeos.
  -->
  <script is:inline>
    try {
      const guardado = localStorage.getItem('wiki:tema');
      const tema = guardado ?? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      document.documentElement.dataset.theme = tema; // astro-mermaid lee data-theme (light | dark)

      const aprendidas = JSON.parse(localStorage.getItem('wiki:aprendidas') ?? '[]')
        .filter((s) => /^[a-z0-9-]+$/.test(s)); // slugs válidos: evita inyectar CSS arbitrario
      const soloPendientes = localStorage.getItem('wiki:solo-pendientes') === 'true';
      const css = aprendidas
        .map((s) => soloPendientes
          ? `[data-slug="${s}"]{display:none}`
          : `[data-slug="${s}"] .icono-aprendida{display:inline-block}`)
        .join('');
      if (css) document.head.insertAdjacentHTML('beforeend', `<style>${css}</style>`);
    } catch { /* localStorage no disponible: todo visible */ }
  </script>
</head>
```

> El script inline no puede importar módulos. Para no duplicar la lógica de `lib/preferencias/`, se intenta generarlo a partir de ella; si no es viable en Astro, se mantiene esta versión mínima con un test que compruebe que ambas coinciden. Verificar al implementar.

### Componentes compartidos
Piezas pequeñas de `src/components/`, sin lógica de dominio:

| Componente | Uso |
|------------|-----|
| `EntradaItem` | Elemento de cualquier listado. Lleva `data-slug` y contiene el icono de aprendida (oculto por defecto) |
| `IconoAprendida` | SVG de `assets/icons/aprendida.svg`, incrustado y con `currentColor` |
| `Badge` | Insignia de categoría o etiqueta |
| `Relacionados`, `MencionadoEn` | Bloques generados desde el frontmatter y los backlinks |

**Sin MDX.** El contenido es Markdown plano: no hay componentes dentro del texto. Los diagramas se escriben como bloques ```` ```mermaid ```` y los renderiza `astro-mermaid`. Si algún día hiciera falta un componente dentro del contenido, se reconsideraría añadir `@astrojs/mdx`.

---

## 7. Patrón 6: Generación estática (SSG)

### Qué es
Todo el sitio se construye en **tiempo de build** a HTML plano. No hay servidor ni base de datos en producción.

### Por qué aquí
- Coste de alojamiento nulo (GitHub Pages).
- Rendimiento máximo.
- **Los errores se detectan antes de publicar**: esquema inválido, enlace roto o slug duplicado hacen fallar el build/CI.

### Cómo se aplica

```ts
// src/pages/glosario/[slug].astro (fragmento)
// ASTRO: getStaticPaths indica qué páginas generar en build.
// REACT+VITE: con vite-react-ssg o similar harías lo equivalente al definir
//   las rutas a prerenderizar; sin SSG, React Router resolvería esto en el cliente.
export async function getStaticPaths() {
  const terminos = await getTodosLosTerminos();
  return terminos.map((t) => ({ params: { slug: t.id }, props: { t } }));
}
```

La wiki se publica en un sitio de proyecto de GitHub Pages, así que `site` y `base` están configurados y **todo enlace y asset usa `import.meta.env.BASE_URL`**.

### Validaciones en CI
1. `astro check` (tipos y esquemas).
2. ESLint + Prettier.
3. `npm run validate` (`scripts/validate-content.ts`): esquema, slugs duplicados (globales), referencias a entradas inexistentes, enlaces rotos, secciones obligatorias, `## Relacionados` escrito a mano, alias en conflicto y etiquetas fuera del catálogo.
4. Build completo + indexado con Pagefind.

Los tests y la cobertura (≥ 90 %) no están en CI: se exigen en el hook `pre-push`.

---

## 8. Patrón 7: Pipeline de Markdown (plugins de unified)

### Qué es
El Markdown de cada entrada pasa por una cadena de transformaciones en build (el ecosistema *unified*: remark para el árbol de Markdown, rehype para el de HTML). Cada plugin recorre el árbol y lo modifica.

### Por qué aquí
Dos necesidades se resuelven en este punto, sin tocar el contenido:
- **Menciones enlazadas:** si el texto menciona algo con entrada propia (por ejemplo «React» dentro de `react-router`), se convierte en enlace. Así los agentes no mantienen enlaces a mano.
- **Diagramas:** los bloques ```` ```mermaid ```` los procesa `astro-mermaid`.

### Cómo se aplica

```ts
// astro.config.mjs (fragmento; sintaxis orientativa, verificar contra la versión instalada)
import { unified } from '@astrojs/markdown-remark';
import { remarkMenciones } from './src/lib/markdown/remark-menciones.ts';

export default defineConfig({
  site: 'https://<usuario>.github.io',
  base: '/<repo>/',
  // ASTRO 7: el procesador por defecto (Sätteri) NO ejecuta plugins de remark.
  //   Fijar unified() hace que sí se ejecuten y mantiene el plugin portable.
  // REACT+VITE: usarías unified/remark directamente (o @mdx-js/rollup) en tu pipeline.
  markdown: { processor: unified({ remarkPlugins: [remarkMenciones] }) },
  // integraciones: react(), astro-mermaid y, solo en desarrollo, astrobook
});
```

```ts
// src/lib/markdown/remark-menciones.ts (esquema del algoritmo)
// 1. Una vez por build: leer content/**/*.md con gray-matter y construir el índice
//    título/alias → slug (descartando las entradas con autoenlace: false).
// 2. Recorrer los nodos de texto saltando code, inlineCode, heading, link y html.
// 3. En cada sección (##), sustituir la primera mención de cada término por un enlace
//    (sensible a mayúsculas, palabra completa, gana la coincidencia más larga).
// 4. No enlazar una entrada a sí misma; construir los enlaces con base.
```

### Reglas
- El plugin es TypeScript sin dependencias de Astro: portable a cualquier proyecto con unified (RNF-07).
- Se prueba con tests unitarios: coincidencia más larga, primera mención por sección, exclusión de código y de enlaces existentes, `autoenlace: false`, y `base`.
- Los diagramas Mermaid se renderizan en el navegador y siguen el tema por `data-theme`.
- Verificar al implementar que `astro-mermaid` funciona con el procesador `unified()` en la versión de Astro instalada.

---

## 9. Cómo encajan entre sí

```
content/*.md ──▶ Esquema Zod (P2) ──▶ lib/content (P3) ──▶ features/* (P4)
 (datos)          (valida)            (único acceso)        (lógica por dominio)
     │                                                              │
     ▼                                                              ▼
 Pipeline de Markdown (P7) ─────────────▶ layouts + componentes (P5) ──▶ HTML estático (P6)
 (menciones enlazadas, Mermaid)                                    │
                                                                   ▼
                                                    islas solo si hay interacción (P1)
```

Flujo de una entrada nueva: un agente crea `content/paquetes/vite.md` → el esquema la valida (P2) → el pipeline enlaza las menciones a otras entradas (P7) → `lib/content` la expone (P3) → la feature de paquetes la lista (P4) → el layout la presenta y genera sus relacionados (P5) → se genera como HTML estático (P6).

---

## 10. Reglas para agentes y skills

Toda skill o agente que añada contenido o código debe cumplir:

**Contenido**
1. Crear solo archivos dentro de `content/`.
2. Respetar el esquema; usar únicamente valores de los enums existentes (categorías y etiquetas).
3. Referenciar otras entradas por slug, y comprobar que existen. El slug y los alias son únicos en toda la wiki.
4. No escribir `## Relacionados` ni enlazar a mano las menciones a otras entradas: las genera el sistema. Al mencionarlas, usar su título o alias exacto.
5. Ejecutar `npm run validate` antes de dar la tarea por terminada. **No ejecutar tests** tras cada cambio.

**Código**
1. No importar `astro:content` fuera de `src/lib/content/`.
2. Una feature no importa de otra feature.
3. Todo uso de una característica específica de Astro lleva un comentario con su equivalencia en React + Vite (formato `ASTRO: ... / REACT+VITE: ...`).
4. No añadir dependencias sin justificarlas en el commit.
5. No editar archivos de sistema (`.github/`, `.husky/`, `.opencode/`): si hace falta un cambio ahí, indicarlo al autor, que lo hará con `builder`.
6. Los tests se escriben o ejecutan solo a petición del autor, al cierre de un trabajo ya validado funcionalmente. El hook `pre-push` exige una cobertura ≥ 90 %. Ningún agente usa `--no-verify`.

---

## 11. Tabla de equivalencias Astro ↔ React

| Concepto | Astro | React + Vite |
|----------|-------|--------------|
| Carga de contenido | `getCollection()` / content collections | `import.meta.glob()` + parseo de frontmatter |
| Validación de esquemas | Zod integrado en `content.config.ts` | Zod en un script de build propio |
| Rutas dinámicas | `getStaticPaths()` + `[slug].astro` | React Router con rutas generadas desde el contenido |
| Layouts | `<slot />` en `.astro` | `{children}` en componentes |
| Procesado de Markdown | `markdown.processor: unified()` con plugins de remark | `unified` directamente (o `@mdx-js/rollup`) |
| Diagramas | `astro-mermaid` sobre bloques ```` ```mermaid ```` | `mermaid` en cliente con un plugin de remark |
| Hidratación | `client:load`, `client:visible`, `client:idle` | Toda la app se hidrata (o `React.lazy` + `Suspense`) |
| Tema sin parpadeo | `<script is:inline>` en `<head>` | `<script>` clásico en `index.html` antes del bundle |
| Búsqueda estática | Pagefind en postbuild | MiniSearch/Fuse con índice generado en build |
| Visor de componentes | Astrobook (stories CSF3) | Storybook |
| Prerenderizado | Por defecto | `vite-react-ssg` o SSR propio |
| Estado compartido entre islas | `localStorage` y atributos del documento (o Nanostores) | Zustand / Context |

---

## 12. Decisiones descartadas

| Alternativa | Motivo del descarte |
|-------------|---------------------|
| React + Vite puro | Obliga a construir el pipeline de contenido a mano; se documenta como equivalencia didáctica en lugar de usarlo |
| Base de datos / CMS externo | Innecesario para un sitio estático; el Markdown en Git ya es versionable y revisable |
| Interfaz en la página para crear entradas | El contenido se añade por código y por agentes; una interfaz exigiría un backend |
| Estructura por tipo de archivo | Escala peor al añadir secciones |
| Acceso directo a archivos desde páginas | Acopla las páginas a la fuente de datos y dificulta una migración futura |
| MDX y componentes dentro del contenido | Complica el contenido que escriben los agentes y choca con las secciones obligatorias; Markdown plano basta |
| Storybook | No soporta `.astro` de forma oficial y añadiría un segundo toolchain; Astrobook cubre la necesidad de ver los componentes |
| `rehype-mermaid` con Playwright | Obliga a instalar un navegador en local y en CI solo para los diagramas; `astro-mermaid` renderiza en el navegador |
| Plugin con la API propia de Sätteri | Solo serviría en Astro; un plugin de remark con `unified()` es portable |
| Estado editorial, fechas y campo de dudas en las entradas | No aportan: cada entrada añadida es final y se revisa en el diff; la duda orienta la redacción pero no se registra |
| Niveles de dificultad en las entradas | No se categoriza el contenido por niveles |
| Tests y cobertura en CI | El autor los exige en el hook `pre-push` y decide cuándo saltárselo |

---

*Documento vivo: se actualiza cuando se añada, cambie o descarte un patrón.*
