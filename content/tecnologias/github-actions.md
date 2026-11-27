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
  - "https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows"
  - "https://docs.github.com/en/actions/reference/runners/github-hosted-runners"
  - "https://docs.github.com/en/actions/concepts/runners/self-hosted-runners"
autoenlace: true
---

## Qué es

GitHub Actions automatiza tareas de construcción, prueba y publicación dentro de GitHub. Un **workflow** es un archivo YAML en `.github/workflows/` que se dispara ante un evento del repositorio: un `push`, un `pull_request`, la creación de una `release`, la apertura de `issues`, una programación (`schedule`) o una ejecución manual. La documentación oficial enumera el resto de eventos posibles; el archivo decide cuál inicia la ejecución.

La plataforma es la herramienta; la política de integración, entrega o despliegue la decide el equipo.

## Para qué sirve

Permite ejecutar las mismas comprobaciones en cada cambio —tipos, lint, formato, pruebas— y publicar el resultado cuando pasan. Un workflow puede construir una imagen con Docker y desplegar el sitio en GitHub Pages, por citar dos usos habituales.

## Cuándo usarla

Cuando el código ya vive en GitHub y se quiere automatizar la validación y el despliegue sin mantener otro sistema de integración continua.

## Cuándo no

Cuando la automatización depende de otro ecosistema —por ejemplo, un plan de Bamboo en Atlassian— o cuando el trabajo exige un entorno que no ofrece ningún runner, gestionado por GitHub o propio, y mantener uno propio no compensa.

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
  publicar:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - run: echo "Aquí iría el despliegue"
```

Los ejemplos oficiales añaden pasos con `actions/checkout` y `actions/setup-node`, cuyas versiones cambian con el tiempo; conviene consultar la documentación vigente antes de copiarlas.

## Workflow, job, step y action

| Pieza | Qué es |
|---|---|
| Workflow | El archivo YAML completo, disparado por un evento |
| Job | Una unidad de ejecución que corre en un *runner* |
| Step | Cada una de las órdenes del job: un `run` o un `uses` |
| Action | Un paso reutilizable que se invoca con `uses` |

Un *runner* es la máquina donde se ejecuta el job. Los runners gestionados por GitHub (GitHub-hosted) ofrecen entornos preparados; los propios (self-hosted) los instala y mantiene el equipo, con más control sobre hardware, sistema operativo y herramientas, y con el coste de esa gestión. Una action no es un workflow: es una pieza que se usa dentro de él.

Los jobs corren en paralelo por defecto. `needs` declara dependencias: en el ejemplo, `publicar` espera a `build`. La condición es que el job previo termine con éxito; si falla o se omite, los jobs que dependen de él se omiten salvo que usen una expresión como `if: ${{ always() }}`. Los pasos de un job se ejecutan en orden; el paralelismo se decide entre jobs.

## Programación con cron

El evento `schedule` dispara un workflow a una hora determinada con sintaxis cron POSIX y se declara con `cron` en YAML. Por defecto las horas se interpretan en UTC, los workflows programados se ejecutan en la rama por defecto y pueden sufrir retrasos. No admite atajos como `@daily`.

```yaml
on:
  schedule:
    - cron: "15 4 * * *"
```

## Integración, entrega y despliegue

La integración continua integra cambios frecuentemente en la rama principal y valida cada uno con build y pruebas. La entrega continua deja el artefacto listo y el lanzamiento puede requerir una acción manual. El despliegue continuo publica automáticamente todo cambio que supera las comprobaciones. GitHub Actions puede automatizar las tres, pero no define por sí sola cuál se aplica.
