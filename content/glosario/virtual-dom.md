---
titulo: "Virtual DOM"
resumen: "Representación en memoria del DOM que se compara con la anterior para calcular el mínimo conjunto de cambios reales."
categoria: concepto
tags: ["frontend","rendimiento"]
alias: []
relacionados: []
fuentes: []
autoenlace: true
---
## Definición

Representación en memoria del DOM que se compara con la anterior para calcular el mínimo conjunto de cambios reales.

## Por qué importa

Explica por qué los frameworks evitan manipulate el DOM directamente en cada actualización.

## Ejemplo

React construye un árbol nuevo, lo compara con el anterior y aplica solo las diferencias.

## Se confunde con

No es el DOM real: es una copia intermedia; el navegador solo ve las mutaciones finales.
