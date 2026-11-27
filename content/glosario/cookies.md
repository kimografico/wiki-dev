---
titulo: "Cookies"
resumen: "Pequeños pares clave-valor que el servidor envía al navegador y este devuelve en peticiones posteriores."
categoria: datos-api
tags: ["frontend","seguridad"]
alias: []
relacionados: [localstorage, sessionstorage, autenticacion, token]
fuentes: ["https://developer.mozilla.org/es/docs/Web/HTTP/Cookies"]
autoenlace: true
---

## Definición

Una cookie es un par clave–valor que el servidor envía con `Set-Cookie` y el navegador guarda y devuelve automáticamente en las peticiones posteriores al mismo dominio. Viaja en la cabecera `Cookie`, así que el servidor la lee en cada petición sin que la página la gestione explícitamente.

## Por qué importa

Es la base de las sesiones clásicas: el servidor guarda un identificador y la cookie lo transporta. También explica buena parte del consentimiento de privacidad: una cookie de analítica debe declararse, mientras que una de sesión estrictamente necesaria no suele requerirlo. Sus atributos limitan el alcance: `HttpOnly` impide leerla desde JavaScript, `Secure` exige HTTPS y `SameSite` recorta cuándo se envía en peticiones entre sitios.

## Ejemplo

```http
Set-Cookie: sid=abc123; Path=/; HttpOnly; Secure; SameSite=Lax
```

El navegador devolverá `Cookie: sid=abc123` en las peticiones a ese dominio; `document.cookie` no podrá ver `sid` al ser `HttpOnly`.

## Se confunde con

Con `localStorage`. Ambos guardan datos en el navegador, pero `localStorage` no se envía al servidor, no tiene `HttpOnly` y solo lo borra el propio script o el usuario. Tampoco es un token en memoria: ese token se pierde al recargar si no se persiste de algún modo.
