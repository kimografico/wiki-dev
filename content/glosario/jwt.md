---
titulo: "JWT"
resumen: "JSON Web Token: token firmado con cabecera, carga y firma, usado para transportar afirmaciones de identidad o permisos."
categoria: concepto
tags: ["seguridad","backend"]
alias: ["JSON Web Token"]
relacionados: [token, autenticacion, cookies, base64]
fuentes: []
autoenlace: true
---
## Definición

Un JWT (JSON Web Token) es un token compacto formado por tres partes separadas por puntos: cabecera, carga y firma. La cabecera y la carga son JSON codificados en base64url; la firma se calcula sobre ambas con una clave que conoce el emisor. La carga contiene afirmaciones, por ejemplo `sub` para identificar al usuario y `exp` para la caducidad. Verificar la firma y la caducidad convierte esos datos en una credencial de confianza.

## Por qué importa

Permite autenticar peticiones sin sesión en el servidor: el servicio valida el token con la clave y lee los permisos de la carga. Caso concreto: una API acepta una solicitud con el token en la cabecera `Authorization` sin consultar una tabla de sesiones. El coste es la revocación; conviene tokens de corta duración y vía para renovarlos. La carga es decodificable: nunca pongas secretos en ella.

## Ejemplo

```txt
cabecera.carga.firma
```

Decodificar la carga muestra algo como `{"sub":"123","exp":...}`; cambiar `sub` sin recalcular la firma hace que la validación falle.

## Se confunde con

Con cifrado: la carga es legible; la firma garantiza integridad, no confidencialidad. Con Cookies: la cookie es un mecanismo de transporte entre navegador y servidor; el token es el contenido transportado. Con Base64: codificar no firma ni protege. Y con Token en general: JWT es un formato concreto de token.
