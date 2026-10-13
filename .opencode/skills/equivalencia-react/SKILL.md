---
name: equivalencia-react
description: Escribe los comentarios de equivalencia ASTRO / REACT+VITE que documentan lo que Astro hace por el desarrollador. Úsala al escribir código que use características específicas de Astro.
---

# equivalencia-react

## Formato

```ts
// ASTRO: <qué hace Astro y por qué>
// REACT+VITE: <cómo se resolvería sin Astro>
```

## Cuándo

Colecciones, `getStaticPaths`, `<slot />`, directivas `client:*`, procesador `unified()`, scripts `is:inline`, Pagefind, rutas por archivos y Astrobook (stories CSF3 ↔ Storybook).

## Regla

El comentario explica el mecanismo, no repite el código.
