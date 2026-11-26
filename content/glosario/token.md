---
titulo: "Token"
resumen: "Cadena alfanumérica secreta que identifica o autoriza a un cliente ante un servicio."
categoria: concepto
tags: ["seguridad","backend"]
alias: []
relacionados: []
fuentes: []
autoenlace: true
---
## Definición

Cadena alfanumérica secreta que identifica o autoriza a un cliente ante un servicio.

## Por qué importa

Es la credencial que viaja en cada petición; si se filtra, cualquiera puede actuar con esa identidad.

## Ejemplo

```http
Authorization: Bearer eyJhbGciOi...
```

## Se confunde con

No es un token léxico ni un design token: aquí es una credencial secreta, no una unidad de texto ni de diseño.
