---
titulo: "WebSockets"
resumen: "Protocolo con una conexión persistente y bidireccional entre navegador y servidor, pensado para tiempo real."
categoria: datos-api
tags: ["backend"]
alias: ["WebSocket"]
relacionados: [api, webhook, asincronia, concurrencia]
fuentes: []
autoenlace: true
---
## Definición

WebSockets es un protocolo que abre una conexión una sola vez y la mantiene viva entre navegador y servidor. Tras un saludo HTTP, cualquiera de los dos extremos envía mensajes sin repetir petición. No es una **API** de petición y respuesta: un solo punto de conexión abierto.

## Por qué importa

Resuelve el sondeo. En un chat, preguntar cada dos segundos si hay mensajes nuevos genera cientos de peticiones vacías y retrasa cada mensaje hasta la siguiente consulta. Con el socket, el servidor empuja el mensaje en cuanto llega. El coste son reconexiones, latidos y estado de sesión: si cae, el cliente debe reanudar sin perder eventos.

## Ejemplo

```js
const socket = new WebSocket("wss://ejemplo.com/chat");
socket.onmessage = (evento) => console.log(JSON.parse(evento.data));
socket.send(JSON.stringify({ texto: "Hola" }));
```

`wss://` denota la variante cifrada; el saludo inicial negocia el cambio de protocolo mediante **Cabeceras HTTP**.

## Se confunde con

Con HTTP y con **Webhook**. HTTP abre y cierra una transacción por petición; el socket reutiliza la misma conexión. El webhook también avisa de eventos, pero lo hace con peticiones independientes y sin mantener estado del destinatario. Tampoco es **Asincronía** en general: `fetch` es asíncrono y aun así usa conexiones cortas. La elección depende de la frecuencia: para cambios esporádicos basta un webhook; para flujo continuo, conviene el socket.
