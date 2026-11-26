---
titulo: "Refactor"
resumen: "Cambio en la estructura interna del código que no altera su comportamiento observable."
categoria: concepto
tags: ["frontend"]
alias: []
relacionados: []
fuentes: []
autoenlace: true
---
## Definición

Cambio en la estructura interna del código que no altera su comportamiento observable.

## Por qué importa

Mantiene el sistema comprensible a medida que crece; los tests son la red que permite hacerlo sin miedo.

## Ejemplo

Extraer una función repetida y ejecutar los tests para comprobar que nada cambió.

## Se confunde con

No es añadir funcionalidad: si el comportamiento cambia, es un cambio de feature, no refactor.
