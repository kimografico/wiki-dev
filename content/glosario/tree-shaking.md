---
titulo: "Tree shaking"
resumen: "Eliminación automática de código no usado durante el build."
categoria: rendimiento-ux
tags: ["frontend","rendimiento"]
alias: []
relacionados: []
fuentes: []
autoenlace: true
---
## Definición

Eliminación automática de código no usado durante el build.

## Por qué importa

Reduce el tamaño final del bundle sin que el autor tenga que borrar manualmente exportaciones muertas.

## Ejemplo

Importar solo `debounce` de una librería permite descartar el resto si los módulos son analyzables.

## Se confunde con

No es minificación: minificar acorta nombres; tree shaking elimina código entero.
