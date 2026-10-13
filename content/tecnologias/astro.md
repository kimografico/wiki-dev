---
titulo: Astro
resumen: Framework web que genera HTML estático por defecto y solo hidrata las «islas» que declaran interactividad.
categoria: framework
tags: [frontend, rendimiento]
alias: []
relacionados: [static-site-generation, arquitectura-de-islas, react]
alternativas: [nextjs, vue, react]
web: https://astro.build
fuentes: [https://docs.astro.build/]
---

## Qué es

Astro es un framework para construir sitios web centrados en el contenido. Su valor por defecto es generar HTML estático en el build y enviar **cero JavaScript**, salvo en los componentes que marcas explícitamente como interactivos.

## Para qué sirve

Sirve para wikis, blogs, documentación y, en general, sitios donde leer importa más que «usar». Además define *content collections* con esquemas, que es justo lo que este proyecto aprovecha.

## Cuándo usarla

Cuando el contenido manda y el JavaScript es la excepción: páginas de lectura, documentación, catálogos. También cuando quieres mezclar frameworks (React, Vue…) solo dentro de las islas.

## Cuándo no

Si tu producto es una aplicación muy interactiva —un chat, un editor colaborativo, un panel con estado constante— una SPA puede encajar mejor que pelearse con hidrataciones parciales.

## Alternativas

[Next.js](/wiki-dev/tecnologias/nextjs/) si el proyecto es sobre todo React y necesita SSR; `vue` o `react` puros si toda la página es una aplicación.

## Ejemplo

```astro
---
import { getEntry } from "astro:content";
const entrada = await getEntry("glosario", "slug");
---

<h1>{entrada.data.titulo}</h1>
```
