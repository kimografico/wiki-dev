---
titulo: "Git Flow"
resumen: "Modelo de trabajo con Git que usa ramas largas para desarrollo y versiones, y ramas cortas para features y correcciones."
categoria: concepto
tags: ["terminal"]
alias: []
relacionados: [bugfix, hotfix, pullback]
fuentes:
  - "https://nvie.com/posts/a-successful-git-branching-model/"
autoenlace: true
---
## Definición

Modelo de trabajo con Git que usa ramas largas para desarrollo y versiones, y ramas cortas para features y correcciones.

## Por qué importa

Aporta orden en equipos con releases espaciados, a costa de más ramas y más ceremonia. Es un modelo histórico y popular; en entrega continua suelen preferirse flujos más simples.

## Ejemplo

Rama `main`, rama `develop`, `feature/nuevo-buscar` y `release/1.4`. Un defecto urgente se atiende con un Hotfix sobre `main` y después se devuelve a `develop` con un Pullback.

## Se confunde con

No es Git en sí: Git es la herramienta; Git Flow es una convención de ramas sobre ella.
