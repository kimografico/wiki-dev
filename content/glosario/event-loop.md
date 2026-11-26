---
titulo: "Event loop"
resumen: "Mecanismo de JavaScript que decide qué tarea ejecuta el hilo cuando la pila está vacía, priorizando microtareas."
categoria: concepto
tags: ["frontend","backend"]
alias: ["bucle de eventos"]
relacionados: [asincronia, promesa]
fuentes: ["https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop"]
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

## Microtareas en la práctica

Las continuaciones de `await` y los callbacks de `Promise` son microtareas: se ejecutan antes de la siguiente tarea del bucle. Por eso el ejemplo anterior imprime `C` antes que `B`, aunque `setTimeout` use `0`.

Una cadena larga de microtareas puede dejar sin turno al renderizado y a la entrada del usuario. `setTimeout(0)` o `requestAnimationFrame` ceden el turno; `queueMicrotask` lo encadena. Si la interfaz se queda «pillada», mira cuántas microtareas se encadenan antes de culpar al framework.
