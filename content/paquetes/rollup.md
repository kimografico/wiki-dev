---
titulo: "Rollup"
resumen: "Bundler que empaqueta módulos ES y destaca por generar bibliotecas con tree shaking eficiente."
categoria: herramienta
tags: ["frontend","terminal"]
alias: []
relacionados: ["vite", "webpack", "bundler", "tree-shaking"]
fuentes: ["https://rollupjs.org/"]
autoenlace: true
alternativas: ["vite", "webpack"]
web: "https://rollupjs.org/"
npm: "rollup"
---

## Qué es

Rollup es un empaquetador de módulos JavaScript. Lee un punto de entrada, sigue sus importaciones y produce uno o varios archivos de salida con los formatos que se soliciten. Su punto fuerte es el tree shaking: al trabajar con módulos ES puede descartar el código que nadie importa. Es el motor que hay detrás de muchas bibliotecas publicadas en npm, aunque también puede usarse directamente.

## Para qué sirve

Sirve para preparar una biblioteca: se entrega una versión para `import` y otra para `require`, se marca React como dependencia externa para que no se incluya en el paquete y se genera un archivo pequeño con solo lo que el consumidor necesita. También es útil cuando se quiere controlar al detalle el nombre de los archivos y el contenido del paquete publicado.

## Cuándo usarlo

Cuando el resultado es una librería reutilizable y se necesita decidir el formato de salida, los archivos de declaración y qué dependencias quedan fuera. Encaja también en proyectos donde se quiere un bundle de producción sencillo y no se necesita un servidor de desarrollo propio.

## Cuándo no

No es la opción más cómoda para desarrollar una aplicación con recarga en caliente: para eso Vite ofrece un servidor listo. Tampoco conviene elegirlo solo porque sea el motor interno de otra herramienta; si la aplicación ya usa otro build, añadir Rollup por separado duplica trabajo.

## Alternativas

Vite es la elección natural para aplicaciones: desarrollo rápido y build optimizado con muy poca configuración. Webpack destaca en proyectos heredados con loaders y plugins muy específicos. Rollup gana en bibliotecas, donde importan el formato de salida y el tamaño del resultado. La decisión no es de prestigio sino de producto: aplicación, Vite; paquete publicable, Rollup; proyecto con una cadena antigua que depende de sus plugins, Webpack.

## Ejemplo

```js
// rollup.config.js
export default {
  input: "src/index.js",
  external: ["react"],
  output: [
    { file: "dist/index.es.js", format: "es" },
    { file: "dist/index.cjs", format: "cjs" },
  ],
};
```

## Matices

Marcar una dependencia como externa evita que dos copias de React acaben en la misma aplicación. El coste es que quien consuma la biblioteca debe tenerla instalada; por eso las bibliotecas declaran esas dependencias en su manifiesto en lugar de empaquetarlas.
