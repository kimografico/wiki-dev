---
titulo: "Cloudflare Worker"
resumen: "Función que se ejecuta en la red perimetral de Cloudflare cerca de la persona usuaria."
categoria: despliegue
tags: ["backend","rendimiento"]
alias: ["Worker de Cloudflare"]
relacionados: []
fuentes: ["https://developers.cloudflare.com/workers/"]
autoenlace: true
alternativas: ["cloudflare"]
web: "https://workers.cloudflare.com/"
---
## Qué es

Función que se ejecuta en la red perimetral de Cloudflare cerca de la persona usuaria.

## Para qué sirve

Permite responder, redirigir o validar peticiones sin gestionar servidores propios.

## Cuándo usarla

Conviene para webhooks, middleware HTTP o lógica ligera que debe estar cerca del usuario.

## Cuándo no

No sustituye a un servidor con estado complejo ni a una base de datos transaccional.

## Alternativas

Las alternativas directas son `cloudflare`. Conviene compararlas antes de elegir.

## Ejemplo

Un Worker que comprueba un secreto antes de reenviar un mensaje a GitHub Actions.
