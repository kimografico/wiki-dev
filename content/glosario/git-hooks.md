---
titulo: "Git hooks"
resumen: "Scripts que Git ejecuta automáticamente en puntos concretos, como antes de un commit o antes de un push."
categoria: herramienta
tags: ["terminal"]
alias: []
relacionados: []
fuentes: []
autoenlace: true
---
## Definición

Scripts que Git ejecuta automáticamente en puntos concretos, como antes de un commit o antes de un push.

## Por qué importa

Hacen que la calidad se compruebe siempre, sin depender de que cada persona recuerde ejecutar el comando.

## Ejemplo

Husky instala `pre-commit` para formato y `pre-push` para cobertura en este proyecto.

## Se confunde con

No son un pipeline de CI: los hooks corren en local; la CI corre en el servidor tras el push.
