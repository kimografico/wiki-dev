---
titulo: "Tree shaking"
resumen: "Eliminación automática de código no usado durante el build, a partir del grafo de importaciones."
categoria: rendimiento-ux
tags: ["frontend","rendimiento"]
alias: []
relacionados: ["bundler", "build", "code-splitting", "dependencia"]
fuentes: ["https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking"]
autoenlace: true
---

## Definición

Tree shaking es la eliminación automática, durante el build, de exportaciones que nadie usa. El bundler recorre el grafo de importaciones desde los puntos de entrada y descarta las ramas inalcanzables. No borra nada del código fuente: solo reduce lo que se publica.

## Por qué importa

Una librería de utilidades puede tener cien funciones y una página usar tres. Sin este proceso, el navegador descarga y analiza las cien. En un sitio con un bundle por página, importar solo `debounce` mantiene fuera el resto de ayudas, lo que reduce el JavaScript inicial y mejora la carga en móvil.

## Ejemplo

```js
import { debounce } from "utilidades";
const buscar = debounce(consultar, 200);
```

Para que el análisis funcione, el módulo debe ofrecer exportaciones nombradas y efectos limitados. Un `import "libreria"` que registra algo global o una importación dinámica opaca impiden decidir qué se puede quitar.

## Se confunde con

No es minificación: minificar acorta nombres y espacios pero conserva las funciones; tree shaking elimina código entero. Tampoco es Code splitting, que divide el resultado en archivos para cargarlos cuando hagan falta. Ni compresión gzip o Brotli, que reduce lo que se transfiere de un bundle que ya existe.

## Matices

Si el paquete declara efectos secundarios, el bundler conserva módulos aparentemente muertos: quitarlos cambiaría el comportamiento.
