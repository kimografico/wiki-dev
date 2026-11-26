---
titulo: "Webpack"
resumen: "Bundler maduro que procesa módulos y recursos mediante loaders y plugins."
categoria: herramienta
tags: ["frontend","terminal"]
alias: []
relacionados: []
fuentes: ["https://webpack.js.org/"]
autoenlace: true
alternativas: ["vite","rollup"]
web: "https://webpack.js.org/"
npm: "webpack"
---
## Qué es

Bundler maduro que procesa módulos y recursos mediante loaders y plugins.

## Para qué sirve

Permite construir aplicaciones complejas con transformaciones muy configurables.

## Cuándo usarlo

Úsalo cuando un proyecto heredado ya depende de sus loaders o de plugins específicos.

## Cuándo no

No es la opción más ligera para un proyecto nuevo que solo necesita un servidor rápido.

## Alternativas

Las alternativas directas son `vite`, `rollup`. Conviene compararlas antes de elegir.

## Ejemplo

```js
module.exports = { module: { rules: [{ test: /\.css$/, use: ['style-loader', 'css-loader'] }] } };
```
