---
titulo: Storybook
resumen: Entorno aislado y muy extendido para desarrollar, documentar y probar componentes de interfaz.
categoria: herramienta
tags: [frontend]
alias: []
relacionados: [astrobook]
alternativas: [astrobook]
web: https://storybook.js.org
npm: storybook
fuentes: [https://storybook.js.org/docs]
---

## Qué es

Storybook es un taller para componentes: los muestra por separado, con sus distintas variantes (stories) y controles para cambiar sus propiedades. Es el estándar de facto en muchos equipos.

## Para qué sirve

Facilita desarrollar componentes de forma aislada, documentar sus estados y detectar regresiones visuales, sin depender de la aplicación completa.

## Cuándo usarlo

En proyectos con muchos componentes y necesidad de documentarlos o probarlos visualmente, sobre todo con React, Vue o Angular.

## Cuándo no

Cuando el objetivo es Astro, Astrobook resulta más ligero y natural. Storybook también añade peso y configuración que una wiki pequeña no necesita.

## Alternativas

Astrobook es la alternativa específica para Astro y la que se usa en este proyecto.

## Ejemplo

```tsx
// Badge.stories.tsx (ejemplo genérico)
export default { component: Badge };
export const Basico = { args: { children: "React" } };
```
