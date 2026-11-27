---
titulo: "Jenkins"
resumen: "Servidor de automatización autoalojado y extensible con plugins que ejecuta pipelines definidos en un Jenkinsfile versionable."
categoria: despliegue
tags: ["terminal"]
alias: []
relacionados: [pipeline, integracion-continua, entrega-continua, github-actions, bamboo, gitlab, plataformas-ci]
fuentes:
  - "https://www.jenkins.io/doc/book/glossary/"
  - "https://www.jenkins.io/doc/book/pipeline/"
  - "https://www.jenkins.io/doc/book/pipeline/syntax/"
  - "https://www.jenkins.io/doc/book/managing/plugins/"
  - "https://www.jenkins.io/doc/book/security/"
  - "https://docs.gitlab.com/ci/migration/jenkins/"
  - "https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#jobsjob_idruns-on"
  - "https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#jobsjob_idcontainerimage"
  - "https://docs.gitlab.com/ci/yaml/#image"
  - "https://docs.gitlab.com/ci/yaml/#tags"
  - "https://confluence.atlassian.com/bamboo/understanding-the-bamboo-ci-server-289277285.html"
autoenlace: true
alternativas: [github-actions, gitlab, bamboo]
web: "https://www.jenkins.io/"
---
## Qué es

Jenkins es un servidor de automatización de código abierto que ejecuta tareas cuando cambia el código: compilar, probar y publicar. Se administra en una máquina propia, el *controller*, que guarda la configuración y carga los plugins. El trabajo se reparte en *agents*, máquinas o contenedores que ejecutan las tareas; un *node* es cualquier máquina capaz de hacerlo. Cada ejecución usa su propio *workspace*, un directorio desechable. Jenkins no guarda código ni gestiona incidencias: actúa después del commit. La integración continua es la práctica; Jenkins es una herramienta que la implementa.

## Para qué sirve

Define la cadena de comprobaciones como texto en un `Jenkinsfile` que se versiona con el proyecto. La práctica recomendada es guardarlo en el gestor de control de versiones; también puede crearse desde la interfaz clásica, donde queda almacenado en el servidor. Los plugins amplían el núcleo para integrar notificaciones, informes de pruebas, contenedores o despliegues. Así, un mismo pipeline valida los tipos, ejecuta las pruebas, construye el artefacto y lo publica sin que nadie repita las órdenes a mano.

## Cuándo usarla

- La organización administra sus propios servidores y quiere decidir dónde se ejecutan los builds.
- El flujo necesita plugins concretos o agentes con entornos distintos, por ejemplo un contenedor con Docker.
- Hay que encadenar etapas, variables y aprobaciones y el repositorio no ofrece esa automatización.

## Cuándo no

En un proyecto pequeño alojado en GitHub, GitHub Actions cubre lo mismo sin mantener un servidor. Si el equipo ya trabaja en GitLab o en Atlassian, GitLab o Bamboo encajan mejor con el ecosistema existente. Tampoco conviene adoptarlo cuando nadie va a revisar plugins y parches: un servidor con extensiones exige mantenimiento, y el controller concentra la configuración y los secretos.

## Alternativas

| Herramienta | Cuándo conviene |
| --- | --- |
| GitHub Actions | El repositorio está en GitHub y los flujos se definen en YAML dentro de `.github/workflows`. |
| GitLab | Quieres código, revisiones, CI y registro de paquetes en una sola plataforma. |
| Bamboo | La organización ya mantiene agentes y planes de despliegue de Atlassian. |

No son intercambiables sin traducir conceptos. En Jenkins, `agent` elige dónde se ejecuta el pipeline: `any`, una etiqueta, un contenedor o Kubernetes. En GitHub Actions esa decisión se reparte en dos claves: `runs-on` elige la máquina y `container.image` la imagen del contenedor. En GitLab, `image` fija la imagen del job y `tags` selecciona el runner. La guía de migración de GitLab muestra `image` junto a `agent` en su tabla, pero aclara que `agent` define además cómo se ejecuta el pipeline: conviene traducir la intención, no copiar el campo. En Bamboo la jerarquía es plan → etapa → job → tarea, frente a pipeline → `stage` → `step` de Jenkins.

## Ejemplo

```groovy
pipeline {
    agent any
    stages {
        stage('Comprobar') {
            steps {
                sh 'npm ci'
                sh 'npm run validate'
            }
        }
        stage('Construir') {
            steps {
                sh 'npm run build'
            }
        }
    }
}
```

Es sintaxis de Pipeline declarativo en Groovy. `pipeline { }` abre la definición, `agent any` elige cualquier nodo disponible, `stage` agrupa tareas y `sh` ejecuta una orden. Para publicar informes de pruebas, un paso habitual es `junit 'reports/**/*.xml'`.

## Pipeline, Jenkinsfile y estilos

Pipeline es la funcionalidad; el `Jenkinsfile` es su definición en texto. Por defecto se busca un `Jenkinsfile` en la raíz del repositorio, aunque la ruta se configura en el trabajo. En estilo declarativo se escribe `pipeline { agent … stages { stage … steps … } }`; en estilo *scripted* se usan bloques `node` y se controla el flujo con Groovy. Un `stage` agrupa tareas y un `step` es una tarea concreta.

## Matices

El *controller* concentra la configuración, así que conviene aislarlo y no ejecutar builds en el nodo integrado. `credentials()` oculta el valor en la consola, pero no evita que un secreto se interpole en Groovy; en `sh` usa comillas simples para que lo expanda el shell. Mantener plugins al día forma parte del coste de esta herramienta.
