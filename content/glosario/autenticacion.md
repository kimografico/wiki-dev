---
titulo: "Autenticación"
resumen: "Proceso de verificar la identidad de quien llama antes de decidir qué permisos se le aplican."
categoria: concepto
tags: ["seguridad","backend"]
alias: []
relacionados: [jwt, cookies, token, secreto]
fuentes: []
autoenlace: true
---
## Definición

La autenticación es el proceso de comprobar la identidad de quien intenta usar un sistema. Quien solicita acceso presenta una credencial —contraseña, clave, token o huella— y el sistema la valida. El resultado es una sesión o un token que identifica al usuario en las siguientes peticiones; no es una decisión sobre lo que puede hacer.

## Por qué importa

Antes de aplicar permisos hay que saber quién llama. Un panel interno que confía en un parámetro `?usuario=admin` no autentica: solo cree que alguien lo dice. Una autenticación bien diseñada separa el inicio de sesión del uso posterior y permite cerrar sesión, caducar credenciales y detectar accesos indebidos. Guardar contraseñas en texto plano, en cambio, convierte cualquier fuga en un problema irreversible.

## Ejemplo

```http
POST /login
Content-Type: application/json

{"usuario":"ada","clave":"..."}
```

Si la validación sale bien, la respuesta devuelve un JWT o una cookie de sesión. En la siguiente petición se envía esa prueba, no la contraseña. El Secreto que firma el token debe vivir fuera del repositorio.

## Se confunde con

Con la autorización. Autenticación responde «quién eres»; autorización responde «qué puedes hacer». Un JWT válido puede acreditar identidad y aun así no permitir borrar un usuario. También se confunde con cifrado: autenticar no cifra el canal; para eso hace falta HTTPS.
