---
titulo: "Workflow"
resumen: "Definición YAML de los pasos automáticos que GitHub Actions ejecuta cuando ocurre un evento del repositorio."
categoria: despliegue
tags: ["terminal"]
alias: []
relacionados: [github-actions, ci-cd, integracion-continua, entrega-continua, pipeline]
fuentes: []
autoenlace: true
---
## Definición

Un workflow es la definición declarativa —normalmente un archivo YAML en `.github/workflows/`— de uno o varios trabajos automáticos. Indica qué evento lo dispara (`push`, `pull_request`, una programación), en qué entorno se ejecuta y qué pasos corren en orden. No es el motor que lo ejecuta: ese es **GitHub Actions**. El workflow es la receta; el motor la sigue.

## Por qué importa

Hace repetible lo que antes dependía de recordar comandos. Aquí comprueba tipos, lint, formato, contenido y cobertura en cada cambio: nadie recuerda `npm run check`. Cada ejecución guarda sus registros para localizar el paso que falló. Un mismo repositorio puede tener varios: uno de validación y otro de publicación, con eventos distintos.

## Ejemplo

```yaml
on: [push]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - run: npm ci          # tras clonar el repositorio
      - run: npm run check
```

Cada `run` es un paso; si falla, los siguientes se detienen.

## Se confunde con

Con un **Pipeline**: es el conjunto encadenado de etapas, idea más amplia que puede vivir fuera de GitHub; workflow es su forma concreta en este sistema. Tampoco es **Entrega continua**: el workflow es el mecanismo y la entrega continua es la práctica de publicar con frecuencia y seguridad. Un workflow puede limitarse a verificar y no publicar nada. La **Integración continua** es el hábito que estos archivos hacen posible.

## Matices

Un **SDD** (Specification-Driven Development) ordena cuál es la fuente de las decisiones del proyecto; no se confunde con el workflow, sino que puede describirlo.
