---
titulo: "Token"
resumen: "Cadena que una parte presenta a otra para probar una identidad o una autorización ante un servicio."
categoria: concepto
tags: ["seguridad","backend"]
alias: []
relacionados: ["autenticacion", "jwt", "secreto", "cabeceras-http"]
fuentes: ["https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization"]
autoenlace: true
---

## Definición

En seguridad, un token es una cadena que una parte presenta a otra para probar una identidad o una autorización. No es un nombre de usuario: es una credencial transportable que el servicio valida sin mantener una sesión abierta. Puede ser opaco —una cadena aleatoria que solo el servidor interpreta— o tener estructura, como un JWT.

## Por qué importa

Viaja en cada petición y decide qué puede hacer el cliente: leer un archivo, modificar un dato o llamar a una API de pago. Si se filtra en un log, un repositorio o una captura, quien lo copie actúa con los mismos permisos hasta que caduque o se revoque. Por eso se guarda fuera del código y se envía en cabeceras, no en la URL.

## Ejemplo

```http
Authorization: Bearer eyJhbGciOi...
```

El servidor lee la cabecera, comprueba firma y caducidad y solo entonces responde. Un PAT cumple el mismo papel con una cadena de larga duración ligada a una cuenta.

## Se confunde con

Con un token léxico, la unidad mínima de texto de un analizador, y con un design token, un valor de diseño como un color o un espaciado; ninguno de los dos es secreto. También con una cookie de sesión: el navegador la envía automáticamente, mientras que un token Bearer lo añade explícitamente el cliente.

## Matices

Un token en Base64 no está cifrado: la firma garantiza integridad, no confidencialidad.
