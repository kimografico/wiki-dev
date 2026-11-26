---
titulo: "JWT"
resumen: "JSON Web Token: token firmado que transporta afirmaciones de identidad o permisos en tres partes separadas por puntos."
categoria: concepto
tags: ["seguridad","backend"]
alias: ["JSON Web Token"]
relacionados: []
fuentes: []
autoenlace: true
---
## Definición

JSON Web Token: token firmado que transporta afirmaciones de identidad o permisos en tres partes separadas por puntos.

## Por qué importa

Permite autenticar peticiones sin guardar sesión en el servidor, siempre que se verifique firma y caducidad.

## Ejemplo

`header.payload.signature`, decodificable pero no modificable sin romper la firma.

## Se confunde con

No es cifrado: el contenido es legible; la firma garantiza integridad, no confidencialidad.
