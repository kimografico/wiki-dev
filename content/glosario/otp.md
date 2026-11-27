---
titulo: "OTP"
resumen: "Secreto válido para una sola autenticación u operación; puede generarse en una app o enviarse por otro canal."
categoria: concepto
tags: ["seguridad", "backend"]
alias: ["one-time password", "contraseña de un solo uso"]
relacionados: [autenticacion, token, jwt, ciberseguridad]
fuentes:
  - "https://pages.nist.gov/800-63-4/sp800-63b.html"
  - "https://www.rfc-editor.org/rfc/rfc4226.txt"
  - "https://www.rfc-editor.org/rfc/rfc6238.txt"
autoenlace: true
terminoEn: "one-time password"
---

## Definición

OTP (*one-time password*, «contraseña de un solo uso») es un secreto que se usa una sola vez para autenticar o confirmar una operación. NIST lo describe como un secreto obtenido de un dispositivo o aplicación en poder de la persona: puede generarse en una app, venir de un token de hardware o enviarse por SMS o voz. Las variantes habituales son HOTP, basada en un contador (RFC 4226), y TOTP, basada en el tiempo (RFC 6238).

## Por qué importa

Un código que caduca o se consume limita el daño de una credencial copiada: aunque alguien lo lea, no sirve para otra operación. Se añade a la contraseña como factor de posesión. El canal no es automáticamente seguro: NIST restringe el correo como autenticador fuera de banda.

## Ejemplo

Un inicio de sesión en dos pasos: la persona escribe su contraseña, la app genera un TOTP con la clave compartida y el servidor lo comprueba antes de crear la sesión. El código no se reutiliza; la continuidad la da el token resultante.

## Se confunde con

- **MFA o 2FA**: exigen dos factores distintos. Un OTP puede ser solo un factor; añadirlo a la contraseña es lo que forma el segundo.
- **Contraseña**: es reutilizable y recordable. El OTP se consume o caduca; NIST clasifica uno como «algo que sabes» y el otro como «algo que tienes».
- **Token o JWT**: viajan en cada petición para mantener la identidad verificada; el OTP se presenta una vez para obtenerlos.
- **Enlace mágico**: es un código de un solo uso en un enlace de correo, no un SMS. NIST no admite el correo como autenticador fuera de banda salvo casos concretos.
