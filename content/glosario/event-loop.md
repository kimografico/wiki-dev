---
titulo: "Event loop"
resumen: "Mecanismo de JavaScript que decide qué tarea ejecuta el hilo cuando la pila está vacía, priorizando microtareas."
categoria: concepto
tags: ["frontend","backend"]
alias: ["bucle de eventos"]
relacionados: []
fuentes: []
autoenlace: true
---
## Definición

Mecanismo de JavaScript que decide qué tarea ejecuta el hilo cuando la pila está vacía, priorizando microtareas.

## Por qué importa

Explica por qué un `setTimeout(0)` se ejecuta después de las promesas ya resueltas.

## Ejemplo

```js
console.log('A'); Promise.resolve().then(() => console.log('C')); setTimeout(() => console.log('B')); // A, C, B
```

## Se confunde con

No es el backend de Node: el bucle de eventos existe en navegador y en Node, pero con fases y APIs distintas.
