---
titulo: "Code splitting"
resumen: "Técnica de dividir el código en fragmentos que se cargan solo cuando se necesitan."
categoria: rendimiento-ux
tags: ["frontend","rendimiento"]
alias: []
relacionados: []
fuentes: []
autoenlace: true
---
## Definición

Técnica de dividir el código en fragmentos que se cargan solo cuando se necesitan.

## Por qué importa

Reduce el JavaScript inicial y mejora las métricas de carga en rutas que quizá nunca se visitan.

## Ejemplo

```js
const Panel = () => import('./Panel.js');
```

## Se confunde con

No es tree shaking: dividir cambia cuándo se descarga; eliminar código muerto cambia cuánto se descarga.
