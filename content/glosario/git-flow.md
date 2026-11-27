---
titulo: "Git Flow"
resumen: "Modelo de trabajo con Git que usa ramas largas para desarrollo y versiones, y ramas cortas para features y correcciones."
categoria: concepto
tags: ["terminal"]
alias: []
relacionados: [bugfix, hotfix, pullback, entrega-continua]
fuentes:
  - "https://nvie.com/posts/a-successful-git-branching-model/"
autoenlace: true
---
## Definición

Git Flow es una convención de ramas sobre Git, no una funcionalidad de Git. Propone dos ramas de larga vida —`main` para lo publicado y `develop` para el trabajo acumulado— y ramas cortas para features, release y correcciones. Cada tipo tiene origen y destino: una feature nace de `develop` y vuelve a ella; una release se separa para estabilizar; un Hotfix nace de `main` porque corrige lo desplegado.

## Por qué importa

Aporta orden cuando las versiones se publican de forma espaciada y conviene congelar una rama mientras entra trabajo en la siguiente. Caso concreto: mientras `release/1.4` solo recibe correcciones, `feature/buscar` avanza hacia `1.5` sin mezclar cambios a medio terminar. El coste es más ramas, fusiones y decisiones de procedimiento; en Entrega continua suelen preferirse flujos más simples.

## Ejemplo

```bash
git checkout -b feature/buscar develop
git checkout -b release/1.4 develop
git checkout -b hotfix/1.4.1 main
```

Tras publicar el hotfix, su cambio se lleva a `develop` con un Pullback; si no, `1.5` podría reintroducir el fallo.

## Se confunde con

Con Git: Git guarda historial y ramas; Git Flow solo dice cómo nombrarlas y cuándo fusionarlas. Con Bugfix y Hotfix: el Bugfix sigue el camino ordinario; el Hotfix se lo salta por urgencia. Con Pull request: es la revisión del cambio, no el modelo de ramas.
