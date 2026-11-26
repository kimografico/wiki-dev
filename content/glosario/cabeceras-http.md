---
fecha: 2026-11-26
titulo: "Cabeceras HTTP"
resumen: "Metadatos clave/valor que viajan con una petición o una respuesta HTTP y condicionan caché, seguridad y negociación del contenido."
categoria: datos-api
tags: [frontend, backend]
alias: [headers, cabecera HTTP]
relacionados: [metodos-http, codigos-http, cache, cors, cookies]
fuentes:
  - "https://developer.mozilla.org/es/docs/Web/HTTP/Reference/Headers/Cache-Control"
  - "https://developer.mozilla.org/es/docs/Web/HTTP/Reference/Headers/ETag"
  - "https://developer.mozilla.org/es/docs/Web/HTTP/Reference/Headers/Authorization"
  - "https://developer.mozilla.org/es/docs/Web/HTTP/Reference/Headers/Content-Type"
autoenlace: true
terminoEn: HTTP headers
---

## Definición

Una cabecera HTTP es un par nombre/valor que acompaña a la petición o a la respuesta. No es el contenido: describe cómo hay que tratar ese contenido (formato, caché, autenticación, cookies).

## Por qué importa

Dos respuestas idénticas pueden comportarse distinto por una cabecera: ser cacheadas durante un año, revalidarse en cada visita o prohibirse por CORS. Cuando una petición «funciona en Postman pero no en el navegador», la diferencia casi siempre está en las cabeceras.

## Ejemplo

```js
const respuesta = await fetch("/api/pedidos", {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

console.log(respuesta.headers.get("content-type"));
```

En la respuesta, `Set-Cookie` la escribe el servidor; el navegador la guarda y la devuelve en peticiones posteriores según sus atributos.

## Se confunde con

Con los parámetros de la query string ni con el cuerpo de la petición. La query identifica **qué** quieres; el cuerpo lleva **los datos**; las cabeceras dicen **cómo** interpretarlos y tratarlos.

## Las que más importan

| Cabecera | Para qué sirve |
|---|---|
| `Cache-Control` | Define si se puede cachear, durante cuánto tiempo y si requiere revalidación |
| `ETag` / `If-None-Match` | Identificador de versión: el servidor responde `304` si no cambió |
| `Authorization` | Credenciales para el servidor (por ejemplo, un token Bearer) |
| `Content-Type` | Formato del cuerpo (`application/json`, `text/html`…) |
| `Accept` | Formato que el cliente prefiere recibir |
| `Set-Cookie` | El servidor guarda una cookie en el navegador |

`Cache-Control: no-cache` no significa «no guardar»: significa «guardar, pero revalidar antes de usar». Quien prohíbe almacenar es `no-store`, y `private` impide que una caché compartida guarde una respuesta personalizada. Es una de las confusiones más caras al depurar caché (ver `cache`).

`ETag` se devuelve al servidor en `If-None-Match`; si el validador coincide, la respuesta es `304` sin cuerpo. El prefijo `W/` indica un validador débil. `Content-Type` describe el cuerpo que se envía, mientras `Accept` describe lo que se quiere recibir: son dos cabeceras distintas.
