---
titulo: "Webhook"
resumen: "Mecanismo por el que un servicio avisa a otro mediante una petición HTTP cuando ocurre un evento."
categoria: concepto
tags: ["backend"]
alias: []
relacionados: []
fuentes: []
autoenlace: true
---
## Definición

Mecanismo por el que un servicio avisa a otro mediante una petición HTTP cuando ocurre un evento.

## Por qué importa

Permite reaccionar a cambios externos sin estar consultando constantemente.

## Ejemplo

Telegram envía un POST al worker de esta wiki cuando llega un mensaje al bot.

## Se confunde con

No es un hook local: el webhook cruza la red; un hook se ejecuta dentro del mismo sistema.
