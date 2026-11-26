---
titulo: "Cookies"
resumen: "Pequeños pares clave-valor que el servidor envía al navegador y este devuelve en peticiones posteriores."
categoria: datos-api
tags: ["frontend","seguridad"]
alias: []
relacionados: []
fuentes: []
autoenlace: true
---
## Definición

Pequeños pares clave-valor que el servidor envía al navegador y este devuelve en peticiones posteriores.

## Por qué importa

Mantienen sesión, preferencias y consentimiento; mal configuradas filtran datos o facilitan tracking no deseado.

## Ejemplo

```http
Set-Cookie: theme=oscuro; HttpOnly; Secure; SameSite=Lax
```

## Se confunde con

No son localStorage: las cookies viajan al servidor en cada petición y pueden marcarse HttpOnly; localStorage solo vive en el navegador.
