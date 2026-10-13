---
titulo: Astrobook
resumen: Visor de componentes para Astro, en desarrollo, que muestra cada componente aislado con sus variantes (stories).
categoria: herramienta
tags: [frontend]
alias: []
relacionados: [astro, storybook]
alternativas: [storybook]
web: https://github.com/ocavue/astrobook
npm: astrobook
fuentes: [https://github.com/ocavue/astrobook]
---

## Qué es

Astrobook es una herramienta de desarrollo que presenta los componentes de un proyecto Astro en una página propia, cada uno aislado y con sus variantes. Cada variante es una *story*.

## Para qué sirve

Permite revisar y ajustar un componente sin montar una página completa alrededor. Aquí muestra los componentes de la wiki (badges, listas, fichas) y sus estados, y solo se activa en desarrollo.

## Cuándo usarlo

Cuando quieres documentar visualmente los componentes y verlos en todos sus estados mientras los construyes.

## Cuándo no

No forma parte del sitio publicado: es una herramienta de desarrollo. Tampoco sustituye a las pruebas de integración.

## Alternativas

Storybook es el estándar general, con más ecosistema y más peso; Astrobook es más ligero y específico para Astro, que es lo que se usa aquí.

## Ejemplo

```ts
// Configuración solo en desarrollo (astro.config.mjs)
astrobook({ subpath: "/astrobook", css: ["./src/styles/global.css"] });
```
