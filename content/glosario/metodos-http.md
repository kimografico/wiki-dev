---
titulo: "Métodos HTTP"
resumen: "Verbos de una petición que indican la acción deseada sobre un recurso: GET, POST, PUT, PATCH, DELETE y HEAD."
categoria: datos-api
tags: ["nivel-0","backend"]
alias: ["verbos HTTP"]
relacionados: [api, codigos-http, cabeceras-http, cors, cache]
fuentes: ["https://developer.mozilla.org/es/docs/Web/HTTP/Methods"]
autoenlace: true
---

## Definición

Los métodos HTTP, o verbos, indican la acción que el cliente quiere realizar sobre un recurso identificado por una URL. Los principales son GET (leer), POST (crear), PUT (reemplazar), PATCH (modificar parte), DELETE (borrar) y HEAD (solo cabeceras). OPTIONS sirve para descubrir qué se permite.

## Por qué importa

Elegir bien el verbo hace que una API sea predecible. `GET /pedidos/1` se puede cachear y repetir sin efectos; `POST /pedidos` crea un pedido nuevo cada vez que se llama. Si se usa POST para leer, se pierden esas garantías y la Cache deja de funcionar como se espera. Los permisos suelen darse por método: leer no es lo mismo que borrar.

## Ejemplo

```http
GET /pedidos/1 HTTP/1.1

PATCH /pedidos/1 HTTP/1.1
Content-Type: application/json

{"estado": "enviado"}
```

## Se confunde con

Con un código de estado. El método dice **qué se hace**; el código (200, 404, 500) dice **cómo terminó**. PUT y PATCH también se confunden: PUT envía la representación completa del recurso y PATCH solo los campos cambiados.

## Idempotencia

GET, PUT y DELETE son idempotentes: repetirlos deja el mismo resultado. POST no lo es. Por eso un navegador puede reintentar un GET sin peligro, pero reenviar un POST puede duplicar la operación. Las Cabeceras HTTP y las reglas de CORS complementan al método.
