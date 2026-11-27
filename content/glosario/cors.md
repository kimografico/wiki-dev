---
titulo: "CORS"
resumen: "Cross-Origin Resource Sharing: mecanismo por el que un servidor autoriza que una página de otro origen lea su respuesta."
categoria: datos-api
tags: ["backend","seguridad"]
alias: []
relacionados: [cabeceras-http, api, autenticacion, token]
fuentes: ["https://developer.mozilla.org/es/docs/Web/HTTP/CORS"]
autoenlace: true
---

## Definición

CORS (Cross-Origin Resource Sharing) es el mecanismo por el que un servidor declara, mediante cabeceras HTTP, qué orígenes pueden leer sus respuestas. El navegador aplica la política: dos URLs son de distinto origen si cambia el esquema, el host o el puerto. Sin la cabecera adecuada, la petición puede ejecutarse en el servidor, pero el navegador no entrega la respuesta al script.

## Por qué importa

Explica el error más frustrante al conectar un frontend con una API: la consola muestra un bloqueo de CORS aunque el endpoint funcione con `curl`. La solución está en el servidor, no en el cliente. Para las peticiones que pueden modificar datos, el navegador envía primero una petición `OPTIONS` de preflight y exige que la respuesta autorice el método y las cabeceras que se van a usar.

## Ejemplo

```http
Access-Control-Allow-Origin: https://midominio.example
Access-Control-Allow-Methods: GET, POST
```

En una petición con credenciales, el origen debe declararse explícitamente y no con un comodín; además hace falta `Access-Control-Allow-Credentials: true`.

## Se confunde con

Con la autenticación. CORS responde a «¿este origen puede leer?», mientras que un token responde a «¿quién es este usuario?». Tener un token válido no evita el bloqueo por CORS, y una cabecera CORS permisiva no autentica a nadie.
