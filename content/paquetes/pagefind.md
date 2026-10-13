---
titulo: Pagefind
resumen: Buscador estático que indexa un sitio ya construido y añade búsqueda sin ningún servidor.
categoria: herramienta
tags: [frontend, rendimiento]
alias: []
relacionados: [static-site-generation]
alternativas: []
web: https://pagefind.app
npm: pagefind
fuentes: [https://pagefind.app/docs/]
---

## Qué es

Pagefind recorre el sitio ya generado, construye un índice y lo divide en trozos que el navegador descarga solo cuando hace falta. La búsqueda ocurre en el cliente, sin backend.

## Para qué sirve

Añade un buscador a un sitio estático sin mantener un servicio aparte. Es la pieza prevista para la búsqueda de esta wiki (F2): se ejecuta después del build, sobre `dist/`.

## Cuándo usarlo

En sitios estáticos de contenido donde quieres búsqueda local, rápida y sin dependencias de servidor.

## Cuándo no

Cuando se necesita búsqueda con sinónimos, facetas o datos que cambian al instante: ahí un servicio dedicado encaja mejor.

## Alternativas

Algolia DocSearch y un índice propio con Lunr cubren el mismo objetivo; aquí Pagefind gana por ser local y ejecutable en el propio build.

## Ejemplo

```bash
npm run build
npx pagefind --site dist
```
