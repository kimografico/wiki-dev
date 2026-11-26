---
titulo: "Métodos HTTP"
resumen: "Verbos de una petición que indican la acción deseada sobre un recurso: GET, POST, PUT, PATCH, DELETE y HEAD."
categoria: datos-api
tags: ["nivel-0","backend"]
alias: ["verbos HTTP"]
relacionados: []
fuentes: ["https://developer.mozilla.org/es/docs/Web/HTTP/Methods"]
autoenlace: true
---
## Definición

Verbos de una petición que indican la acción deseada sobre un recurso: GET, POST, PUT, PATCH, DELETE y HEAD.

## Por qué importa

Elegir bien el verbo hace que una API sea predecible y que las cachés y los permisos funcionen como se espera.

## Ejemplo

`GET /pedidos/1` lee, `PATCH /pedidos/1` cambia parte y `DELETE /pedidos/1` borra.

## Se confunde con

No es un código de estado: el método dice qué se hace; el código dice cómo terminó.
