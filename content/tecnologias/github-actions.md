---
titulo: "GitHub Actions"
resumen: "Plataforma de integración y entrega continua que ejecuta flujos automatizados ante eventos de un repositorio de GitHub."
categoria: despliegue
tags: [terminal]
alias: []
relacionados: [workflow, ci-cd, github, github-pages, docker]
alternativas: [bamboo, gitlab]
web: "https://github.com/features/actions"
fuentes:
  - "https://docs.github.com/en/actions/about-github-actions/understanding-github-actions"
  - "https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax"
  - "https://docs.github.com/en/actions/tutorials/build-and-test-code/nodejs"
autoenlace: true
---

## Qué es

GitHub Actions automatiza tareas de construcción, prueba y publicación dentro de GitHub. Un **workflow** es un archivo YAML en `.github/workflows/` que se dispara ante un evento del repositorio: un `push`, un `pull_request`, una programación o una ejecución manual.

La plataforma es la herramienta; la política de integración, entrega o despliegue la decide el equipo.

## Para qué sirve

Permite ejecutar las mismas comprobaciones en cada cambio —tipos, lint, formato, pruebas— y publicar el resultado cuando pasan. Un workflow puede construir una imagen con Docker y desplegar el sitio en GitHub Pages, por citar dos usos habituales.

## Cuándo usarla

Cuando el código ya vive en GitHub y se quiere automatizar la validación y el despliegue sin mantener otro sistema de integración continua.

## Cuándo no

Cuando la automatización depende de otro ecosistema —por ejemplo, un plan de Bamboo en Atlassian— o cuando el trabajo necesita un entorno que no encaja en los runners disponibles.

## Alternativas

Bamboo y GitLab cubren necesidades parecidas; la comparativa Plataformas de CI reúne las opciones más habituales. La elección depende de dónde estén el código, las issues y el equipo.

## Ejemplo

```yaml
name: Comprobar el sitio
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - run: npm ci
      - run: npm run validate
```

Los ejemplos oficiales añaden pasos con `actions/checkout` y `actions/setup-node`, cuyas versiones cambian con el tiempo; conviene consultar la documentación vigente antes de copiarlas.

## Workflow, job, step y action

| Pieza | Qué es |
|---|---|
| Workflow | El archivo YAML completo, disparado por un evento |
| Job | Una unidad de ejecución que corre en un *runner* |
| Step | Cada una de las órdenes del job: un `run` o un `uses` |
| Action | Un paso reutilizable que se invoca con `uses` |

Un *runner* es la máquina —Ubuntu, Windows, macOS o propia— donde se ejecuta el job. Una action no es un workflow: es una pieza que se usa dentro de él.

## Integración, entrega y despliegue

La integración continua integra cambios frecuentemente en la rama principal y valida cada uno con build y pruebas. La entrega continua deja el artefacto listo y el lanzamiento puede requerir una acción manual. El despliegue continuo publica automáticamente todo cambio que supera las comprobaciones. GitHub Actions puede automatizar las tres, pero no define por sí sola cuál se aplica.
