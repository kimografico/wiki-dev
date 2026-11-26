---
titulo: "Babel"
resumen: "Transpilador que convierte JavaScript moderno y JSX en una versión compatible con entornos antiguos."
categoria: herramienta
tags: ["frontend","terminal"]
alias: []
relacionados: []
fuentes: ["https://babeljs.io/"]
autoenlace: true
alternativas: []
web: "https://babeljs.io/"
npm: "@babel/core"
---
## Qué es

Transpilador que convierte JavaScript moderno y JSX en una versión compatible con entornos antiguos.

## Para qué sirve

Permite usar sintaxis nueva sin esperar a que todos los navegadores la soporten.

## Cuándo usarlo

Úsalo cuando el objetivo de build incluye navegadores o versiones de Node que no entienden tu sintaxis.

## Cuándo no

No hace falta si el build de Vite o Astro ya transpila al nivel que necesitas.

## Alternativas

No hay una alternativa directa dentro del catálogo: la decisión depende del requisito concreto.

## Ejemplo

```json
{ "presets": ["@babel/preset-env"] }
```
