---
fecha: 2026-11-26
titulo: "Promesa"
resumen: "Objeto que representa el resultado futuro de una operación asíncrona: pendiente, cumplido o rechazado."
categoria: lenguaje
tags: [frontend, backend]
alias: [Promise, promesas]
relacionados: [asincronia, event-loop]
fuentes:
  - "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise"
  - "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled"
autoenlace: true
terminoEn: Promise
---

## Definición

Una promesa es un objeto con tres estados: *pendiente*, *cumplido* con un valor o *rechazado* con un motivo. No es el valor en sí, sino un recibo que se podrá canjear más tarde. `await` espera ese recibo y entrega el valor o lanza el error.

## Por qué importa

Permite escribir código asíncrono con flujo lineal y, sobre todo, composar operaciones: lanzar varias esperas a la vez, quedarse con la primera o esperar a que todas terminen. Elegir mal el combinador es una fuente habitual de errores que solo aparecen bajo carga.

## Ejemplo

```js
const resultados = await Promise.allSettled([
  cargarUsuario(),
  cargarPedidos(),
]);
const correctos = resultados.filter((r) => r.status === "fulfilled");
```

`asincronia` muestra el ejemplo de `Promise.all` para lanzar esperas independientes a la vez. `await` es azúcar sintáctico sobre promesas: simplifica la lectura, pero no cambia el modelo.

## Se confunde con

Con paralelismo: varias promesas concurrentes siguen ejecutándose en un solo hilo. Tampoco es un callback: la promesa guarda su estado, así que puedes suscribirte después de que se resolviera y seguirás recibiendo el valor.

## Combinar varias promesas

| Método | Se resuelve cuando | Se rechaza si |
|---|---|---|
| `all` | todas se cumplen | alguna falla (falla rápida) |
| `allSettled` | todas terminan | nunca; devuelve estados por elemento |
| `race` | la primera se asienta, bien o mal | esa primera falla |
| `any` | la primera se cumple | todas fallan (`AggregateError`) |

`all` devuelve los valores **en el orden del iterable**, no en el de llegada. `race` decide por el primer asentamiento: un rechazo rápido gana aunque después llegue un resolve. `any`, en cambio, ignora rechazos hasta el primer cumplimiento.

Para cargar paneles independientes, `allSettled` evita que un fallo deje la pantalla vacía: cada resultado trae su `status` y se decide qué mostrar.

## Errores y carreras

Un `await` sin `try/catch` dentro de una función asíncrona convierte el rechazo en un error que puede quedar sin manejar. Envuelve la operación cuando sepas qué hacer con el fallo: reintentar, mostrar un mensaje o degradar la interfaz.

En cadenas con `.then`, olvidar `return` rompe la propagación: los errores de la función ignorada ya no llegan al `.catch` final. Si la promesa ya se asentó antes de suscribirte, el handler se encola en una microtarea: no hay carrera entre «terminó» y «me suscribí».

La carrera más típica no es de hilos, sino de respuestas que llegan desordenadas: el usuario escribe «a» y luego «ab», y la respuesta de «a» llega la última y pinta datos viejos. Se corta con un identificador o con `AbortController`:

```js
let peticion = 0;

async function buscar(termino) {
  const id = ++peticion;
  const datos = await fetch(`/buscar?q=${encodeURIComponent(termino)}`).then((r) => r.json());
  if (id !== peticion) return; // una búsqueda más reciente ya ganó
  pintar(datos);
}
```
