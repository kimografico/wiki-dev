---
titulo: "Códigos HTTP"
resumen: "Números de tres cifras que indican el resultado de una petición: 1xx informativo, 2xx éxito, 3xx redirección, 4xx error del cliente y 5xx error del servidor."
categoria: datos-api
tags: ["nivel-0","backend"]
alias: ["códigos de estado HTTP"]
relacionados: []
fuentes: ["https://developer.mozilla.org/es/docs/Web/HTTP/Status"]
autoenlace: true
---
## Definición

Números de tres cifras que indican el resultado de una petición: 1xx informativo, 2xx éxito, 3xx redirección, 4xx error del cliente y 5xx error del servidor.

## Por qué importa

Permiten diagnosticar una incidencia sin leer el cuerpo: un 401 no se arregla igual que un 503.

## Ejemplo

`200 OK`, `404 Not Found`, `422 Unprocessable Content` y `503 Service Unavailable`.

## Se confunde con

No es lo mismo que el método HTTP: el método dice qué se quiere hacer; el código dice qué pasó.
