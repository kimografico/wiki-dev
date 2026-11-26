---
titulo: "Secreto"
resumen: "Dato sensible —token, contraseña o clave— que debe mantenerse fuera del código y del historial de Git."
categoria: concepto
tags: ["seguridad"]
alias: []
relacionados: []
fuentes: []
autoenlace: true
---
## Definición

Dato sensible —token, contraseña o clave— que debe mantenerse fuera del código y del historial de Git.

## Por qué importa

Un secreto filtrado en un commit sigue existiendo aunque se borre después; por eso se guarda en un gestor externo.

## Ejemplo

El PAT del workflow se lee desde GitHub Secrets, no desde un archivo del repo.

## Se confunde con

No es configuración pública: una variable como la URL del sitio puede estar en el repo; un token no.
