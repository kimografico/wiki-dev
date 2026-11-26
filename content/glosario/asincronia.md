---
titulo: "Asincronía"
resumen: "Modelo en el que una operación larga no bloquea el hilo: se continúa con otra tarea y se recibe el resultado después."
categoria: lenguaje
tags: ["frontend","backend"]
alias: []
relacionados: [event-loop, promesa]
fuentes: ["https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function"]
autoenlace: true
---
## Definición

Modelo en el que una operación larga no bloquea el hilo: se continúa con otra tarea y se recibe el resultado después.

## Por qué importa

Explica por qué el orden de ejecución de un script no coincide con el orden en que llegan las respuestas.

## Ejemplo

```js
async function cargar() { const r = await fetch('/datos'); return r.json(); }
```

## Se confunde con

No es paralelismo: la asincronía gestiona esperas en un mismo hilo; el paralelismo ejecuta trabajo real en varios núcleos.

## Secuencial frente a concurrente

`await` detiene solo la función que lo contiene. Dos esperas escritas una detrás de otra suman sus tiempos; si no dependen entre sí, se pueden lanzar juntas:

```js
// Secuencial: 200 ms + 200 ms
const usuario = await cargarUsuario();
const pedidos = await cargarPedidos();

// Concurrente: unos 200 ms
const [usuario, pedidos] = await Promise.all([
  cargarUsuario(),
  cargarPedidos(),
]);
```

Si una falla, `Promise.all` rechaza aunque la otra termine bien: en la entrada Promesa están `allSettled` y el manejo de errores.
