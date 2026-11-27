---
titulo: "Webpack"
resumen: "Bundler maduro que procesa módulos y recursos mediante loaders y plugins."
categoria: herramienta
tags: ["frontend","terminal"]
alias: []
relacionados: ["vite", "rollup", "bundler", "plugin"]
fuentes: ["https://webpack.js.org/"]
autoenlace: true
alternativas: ["vite", "rollup"]
web: "https://webpack.js.org/"
npm: "webpack"
---

## Qué es

Webpack es un empaquetador que construye un grafo de dependencias a partir de un punto de entrada y produce archivos para el navegador o para Node.js. Lo que lo distingue es su modelo de extensión: los loaders transforman tipos de archivo y los plugins se enganchan a momentos del build. No es un servidor de desarrollo, aunque puede incluir uno mediante paquetes adicionales, y no es un marco de interfaz.

## Para qué sirve

Permite construir aplicaciones con necesidades muy concretas: importar CSS, imágenes o fuentes, dividir el resultado en trozos, sustituir textos en tiempo de build y generar varios bundles. En proyectos heredados, esa flexibilidad sostiene cadenas que nadie ha querido reescribir.

## Cuándo usarlo

Cuando el repositorio ya depende de loaders o plugins concretos y migrarlos costaría más que mantenerlos. También encaja si el build necesita una transformación muy específica que todavía no tiene una opción equivalente en herramientas más simples.

## Cuándo no

Para un proyecto nuevo que solo quiera un servidor rápido y un build razonable, la configuración de Webpack suele ser más de lo necesario. Tampoco conviene añadirlo encima de un marco de trabajo que ya trae su propio empaquetador: dos cadenas de build compitiendo por los mismos archivos acaban generando confusión.

## Alternativas

Vite ofrece una experiencia de desarrollo mucho más ágil y una configuración corta; es la opción natural para aplicaciones nuevas. Rollup se especializa en empaquetar bibliotecas con buen tree shaking y formatos de salida controlados. Webpack conserva ventaja donde hay un ecosistema de loaders ya pagado y una configuración que resuelve requisitos poco comunes. La decisión depende del punto de partida: herencia compleja, Webpack; aplicación nueva, Vite; biblioteca publicable, Rollup.

## Ejemplo

```js
// webpack.config.js
module.exports = {
  entry: "./src/index.js",
  module: {
    rules: [{ test: /\.css$/, use: ["style-loader", "css-loader"] }],
  },
};
```

## Matices

Un loader y un plugin no hacen lo mismo. El loader transforma un archivo mientras se lee; el plugin observa el ciclo de vida del build y puede cambiar el resultado global. Confundirlos lleva a buscar en la sección equivocada cuando una regla no se aplica.
