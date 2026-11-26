---
titulo: "Proxy"
resumen: "Intermediario que recibe peticiones de un cliente y las reenvía a otro servidor, pudiendo inspeccionarlas o transformarlas."
categoria: datos-api
tags: ["backend"]
alias: []
relacionados: []
fuentes: []
autoenlace: true
---
## Definición

Intermediario que recibe peticiones de un cliente y las reenvía a otro servidor, pudiendo inspeccionarlas o transformarlas.

## Por qué importa

Permite ocultar el backend, cachear respuestas o sortear restricciones de origen durante el desarrollo.

## Ejemplo

Un proxy local redirige `/api` al servidor real para evitar problemas de CORS en desarrollo.

## Se confunde con

No es un middleware de aplicación: el proxy puede estar delante de toda la aplicación, no dentro de ella.
