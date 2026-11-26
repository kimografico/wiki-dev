---
titulo: "XSS"
resumen: "Cross-Site Scripting: inyección de código JavaScript malicioso en una página que otros usuarios visitan."
categoria: concepto
tags: ["seguridad"]
alias: ["Cross-Site Scripting"]
relacionados: []
fuentes: ["https://owasp.org/www-community/attacks/xss/"]
autoenlace: true
---
## Definición

Cross-Site Scripting: inyección de código JavaScript malicioso en una página que otros usuarios visitan.

## Por qué importa

Convierte datos de entrada en código ejecutable con los permisos de la víctima.

## Ejemplo

Mostrar sin escapar un comentario que contiene `<script>...</script>`.

## Se confunde con

No es CSRF: XSS ejecuta código del atacante; CSRF fuerza acciones del usuario ya autenticado.
