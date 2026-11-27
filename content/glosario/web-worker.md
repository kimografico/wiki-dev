---
titulo: "Web Worker"
resumen: "Hilo del navegador distinto al de la interfaz: permite cálculo pesado sin bloquear la respuesta de la página."
categoria: concepto
tags: ["backend"]
alias: []
relacionados: [dom, event-loop, concurrencia, cloudflare-worker, asincronia]
fuentes: []
autoenlace: true
---
## Definición

Un Web Worker es un script que el navegador ejecuta en otro hilo, separado del hilo principal donde viven el **DOM** y la interfaz. Se comunica por mensajes: `postMessage` envía datos y `onmessage` recibe el resultado. No toca el DOM ni `window`; su terreno es el cálculo.

## Por qué importa

El hilo principal es único. Un bucle que tarda tres segundos bloquea clics, animaciones y repintado: la página parece colgada aunque siga trabajando. Mover la tarea deja la interfaz respondiendo: ordenar cien mil filas o procesar un archivo grande. La ganancia es fluidez, no velocidad: el trabajo sigue en otra hebra del **Event loop**.

## Ejemplo

```js
// main.js
const worker = new Worker("calculo.js");
worker.onmessage = ({ data }) => console.log(data);
worker.postMessage([5, 3, 9]);
```

`calculo.js` ordena la lista y devuelve el resultado; mientras tanto la página sigue aceptando eventos.

## Se confunde con

Con un **Cloudflare Worker**: el Web Worker está en el navegador del usuario y no ve el DOM; el de Cloudflare se ejecuta en la red, fuera de la página. Tampoco es **Concurrencia** de servidor: aquí no hay varias peticiones, sino dos hilos en una pestaña. La **Asincronía** de `fetch` evita esperar, pero no traslada el trabajo a otro hilo: un `fetch` asíncrono con cálculo pesado detrás sigue bloqueando la interfaz.
