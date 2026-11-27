---
titulo: "Plataformas de CI"
resumen: "Bamboo y Jenkins automatizan; Bitbucket, GitHub y GitLab también alojan código: la elección sigue al lugar donde ya viven las incidencias."
categoria: despliegue
tags: ["terminal"]
alias: []
relacionados: [bamboo, jenkins, bitbucket, github, gitlab, github-actions]
fuentes:
  - "https://www.jenkins.io/doc/book/pipeline/"
  - "https://docs.gitlab.com/ci/migration/jenkins/"
  - "https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax"
  - "https://support.atlassian.com/bitbucket-cloud/docs/get-started-with-bitbucket-pipelines/"
  - "https://confluence.atlassian.com/bamboo/understanding-the-bamboo-ci-server-289277285.html"
  - "https://confluence.atlassian.com/bamboo/integrating-bamboo-with-other-applications-289276942.html"
  - "https://docs.gitlab.com/ci/yaml/#image"
  - "https://docs.gitlab.com/ci/yaml/#tags"
autoenlace: true
entidades: [bamboo, jenkins, bitbucket, github, gitlab]
contexto: "Elegir dónde ejecutar la automatización cuando el código, las revisiones y los despliegues ya viven en una plataforma concreta, o cuando se administra un servidor propio."
---

## Contexto

Estos cinco nombres no describen exactamente lo mismo. **Bamboo** y **Jenkins** son servidores de integración y **Entrega continua**; **Bitbucket**, **GitHub** y **GitLab** alojan código y además ejecutan automatización. En la práctica la decisión suele seguir al sitio donde ya están los issues, las pull requests y las personas; Jenkins se elige cuando se administra el servidor.

Añadir una plataforma de CI distinta del repositorio es posible, pero obliga a mantener dos sistemas de permisos y dos sitios donde mirar fallos.

## Criterios

| Criterio | Bamboo | Jenkins | Bitbucket | GitHub | GitLab |
|---|---|---|---|---|---|
| Papel | CI/CD dedicado | CI/CD dedicado y extensible | Repositorio + pipelines | Repositorio + **GitHub Actions** | Repositorio, CI y registro |
| Configuración | Planes y despliegues | `Jenkinsfile` en Groovy | `bitbucket-pipelines.yml` | `.github/workflows/*.yml` | `.gitlab-ci.yml` |
| Integración | Jira y Confluence | Plugins | Ecosistema Atlassian | Issues y pull requests | Issues, MR y registro |
| Enfoque | Interfaz y agentes | *Controller*, agentes y plugins | YAML junto al repo | YAML por workflow | Etapas en un archivo |
| Mejor encaje | Organizaciones ya en Atlassian | Servidor propio y flujos con plugins | Equipos Bitbucket | Proyectos ya en GitHub | Ciclo completo en una herramienta |

Un **Pipeline** es la secuencia de pasos; la plataforma es solo dónde se define y se ejecuta. Cuidado con las palabras que se parecen: el `agent` de Jenkins elige dónde corre el pipeline; en GitHub Actions, `runs-on` elige la máquina y `container.image` la imagen del contenedor; en GitLab, `image` fija la imagen y `tags` selecciona el runner. No son sinónimos.

## Cuándo elegir cada una

Elige **GitHub** si el código, las issues y las revisiones ya están allí: **GitHub Actions** añade automatización sin mudar el repositorio. Elige **GitLab** si quieres una sola herramienta para código, revisiones, CI y artefactos, con menos costes de integración entre sistemas.

Elige **Bitbucket** cuando el equipo vive en Atlassian y quiere que las pipelines estén cerca del código. Elige **Bamboo** cuando la organización ya mantiene sus propios agentes y planes de despliegue y quiere conservarlos. Elige **Jenkins** cuando se administra el servidor, hacen falta plugins concretos o se quiere decidir en qué agentes se ejecuta cada trabajo: el `Jenkinsfile` se versiona con el código.

Evita abrir una segunda plataforma solo porque su interfaz gusta más. También evita mudar el repositorio únicamente para cambiar de CI: la mudanza se paga en historial, permisos y hábitos del equipo.

## Ejemplos

```yaml
# GitLab CI (.gitlab-ci.yml)
check:
  script:
    - npm run check
    - npm run validate
```

```yaml
# GitHub Actions: fragmento de workflow
- name: Comprobar tipos
  run: npm run check
```

```groovy
// Jenkinsfile: fragmento de Pipeline declarativo
pipeline {
    agent any
    stages {
        stage('Comprobar') { steps { sh 'npm run validate' } }
    }
}
```

Tareas típicas en cualquiera de las cinco: instalar dependencias, ejecutar comprobaciones, construir y publicar. El contenido de esas tareas es transferible; cambia la sintaxis que las describe y el sitio donde se define el trabajo.

## Matices

**CI/CD** nombra la práctica; la plataforma es la herramienta. **Jenkins** no aloja código: necesita un repositorio aparte, mientras que GitHub, GitLab y Bitbucket sí lo hacen. Bamboo organiza el trabajo en planes, etapas, jobs y tareas; Jenkins lo hace en pipelines, `stages` y `steps`: las unidades no se corresponden una a una. Un mismo repositorio puede usar **GitHub** para código y **Bamboo** para despliegues si existe una razón. Lo que no conviene es duplicar la misma comprobación en dos sitios sin que uno sea la fuente oficial del resultado.
