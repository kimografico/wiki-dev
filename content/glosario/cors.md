---
titulo: "CORS"
resumen: "Cross-Origin Resource Sharing: mecanismo por el que un servidor autoriza que una página de otro origen lea su respuesta."
categoria: datos-api
tags: ["backend","seguridad"]
alias: []
relacionados: []
fuentes: ["https://developer.mozilla.org/es/docs/Web/HTTP/CORS"]
autoenlace: true
---
## Definición

Cross-Origin Resource Sharing: mecanismo por el que un servidor autoriza que una página de otro origen lea su respuesta.

## Por qué importa

Sin la cabecera adecuada, el navegador bloquea una respuesta aunque la petición haya llegado al servidor.

## Ejemplo

```http
Access-Control-Allow-Origin: https://midominio.example
```

## Se confunde con

No es autenticación: CORS decide qué origen puede leer; un token decide quién es el usuario.
