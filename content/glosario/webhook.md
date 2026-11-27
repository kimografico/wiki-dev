---
titulo: "Webhook"
resumen: "Aviso HTTP que un servicio envía a otro cuando ocurre un evento; alternativa a consultar cambios por sondeo."
categoria: concepto
tags: ["backend"]
alias: []
relacionados: [api, hook, secreto, cabeceras-http]
fuentes: []
autoenlace: true
---
## Definición

Un webhook es una petición HTTP que un servicio origina por su cuenta cuando ocurre un evento: un pago confirmado, un commit subido, un mensaje recibido. Quien lo recibe expone una URL pública y procesa el cuerpo de la petición. La dirección de la comunicación se invierte frente a una **API** habitual: aquí no preguntas tú, te avisan a ti.

## Por qué importa

Elimina el sondeo. Consultar cada minuto si hay cambios malgasta peticiones y añade latencia; recibir el aviso en el momento evita ambas cosas. Aquí el bot de Telegram recibe un POST por mensaje. Eso exige dos precauciones: verificar al emisor (firma o **Secreto**) y responder rápido, porque suele reintentar si falla.

## Ejemplo

```js
export default {
  async fetch(request) {
    if (request.method !== "POST") return new Response("No", { status: 405 });
    const evento = await request.json();
    return new Response("OK"); // confirmar antes de procesar a fondo
  },
};
```

Validar las **Cabeceras HTTP** antes de confiar en el cuerpo.

## Se confunde con

Con un **Hook** local: un hook se ejecuta dentro del mismo sistema, como un Git hook antes de confirmar, y no cruza la red; el webhook sí. Tampoco es **WebSockets**: el webhook es una petición corta por evento, mientras que el socket mantiene un canal abierto para muchos mensajes. Un reintento no es un duplicado del emisor, así que el receptor conviene que sea idempotente.
