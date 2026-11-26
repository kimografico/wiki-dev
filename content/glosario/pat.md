---
titulo: "PAT"
resumen: "Personal Access Token: credencial de larga duración emitida por una plataforma para actuar en nombre de una cuenta."
categoria: concepto
tags: ["seguridad","terminal"]
alias: ["Personal Access Token"]
relacionados: []
fuentes: []
autoenlace: true
---
## Definición

Personal Access Token: credencial de larga duración emitida por una plataforma para actuar en nombre de una cuenta.

## Por qué importa

Permite automatizar workflows, pero al ser portable hay que guardarlo como secreto y limitar sus permisos.

## Ejemplo

Un workflow de GitHub usa un PAT con permiso de contenidos para hacer commit en nombre del bot.

## Se confunde con

No es un JWT de sesión: el PAT se emite manualmente y suele durar mucho más.
