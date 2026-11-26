---
titulo: "Rollup"
resumen: "Bundler que empaqueta módulos ES y destaca por generar bibliotecas con tree shaking eficiente."
categoria: herramienta
tags: ["frontend","terminal"]
alias: []
relacionados: []
fuentes: ["https://rollupjs.org/"]
autoenlace: true
alternativas: ["vite","webpack"]
web: "https://rollupjs.org/"
npm: "rollup"
---
## Qué es

Bundler que empaqueta módulos ES y destaca por generar bibliotecas con tree shaking eficiente.

## Para qué sirve

Es el motor habitual para producir paquetes publicables en npm.

## Cuándo usarlo

Úsalo cuando el resultado es una biblioteca y quieres controlar los formatos de salida.

## Cuándo no

No es la herramienta más cómoda para una aplicación con recarga en caliente; ahí Vite va mejor.

## Alternativas

Las alternativas directas son `vite`, `webpack`. Conviene compararlas antes de elegir.

## Ejemplo

```js
export default { input: 'src/index.js', output: { file: 'dist/lib.js', format: 'es' } };
```
