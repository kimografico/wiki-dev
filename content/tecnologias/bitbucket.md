---
titulo: "Bitbucket"
resumen: "Plataforma de repositorios Git de Atlassian con control de acceso, pull requests y pipelines propios para integrar código y despliegue."
categoria: despliegue
tags: ["terminal"]
alias: []
relacionados: ["git", "bamboo", "github", "pull-request"]
fuentes: ["https://support.atlassian.com/bitbucket-cloud/docs/"]
autoenlace: true
alternativas: ["github","gitlab"]
web: "https://bitbucket.org/"
---
## Qué es

Bitbucket es una plataforma de alojamiento de repositorios Git de Atlassian. Añade a Git una capa de colaboración: control de acceso, ramas protegidas, pull requests, revisiones y ejecución de pipelines. No es Git en sí: el historial y los comandos siguen siendo los de Git, y podrías seguir trabajando en local aunque la plataforma cayera. Tampoco es exclusivamente CI; los pipelines son una de sus funciones.

## Para qué sirve

Aloja el código y conecta el cambio con su revisión y su despliegue. Un flujo típico es: una rama de trabajo, un pull request que resume el cambio, una pipeline que comprueba tipos y tests, y una fusión solo cuando todo pasa. Como la herramienta pertenece al mismo ecosistema que Jira y Bamboo, las incidencias y los planes de build pueden vincularse al commit sin copiar enlaces a mano.

## Cuándo usarla

- El equipo ya usa Jira, Confluence o Bamboo y quiere que el código quede en el mismo ecosistema.
- Necesitas políticas de acceso por equipo y revisiones obligatorias antes de fusionar.
- Prefieres definir la CI en un archivo del repositorio, junto al código que valida.

## Cuándo no

Si toda la documentación, las automatizaciones y las personas están en GitHub, mover el código a Bitbucket añade una segunda plataforma sin ganancia. Para un proyecto personal con un solo repositorio, cualquier proveedor cubre lo esencial; la decisión la marca el entorno de trabajo, no una característica aislada.

## Alternativas

| Opción | Criterio para elegirla |
| --- | --- |
| GitHub | El flujo del equipo ya vive en GitHub y quiere issues, Actions y Pages juntos. |
| GitLab | Buscas repositorio, revisiones y CI integrados con otra aproximación. |
| Bitbucket | El ecosistema Atlassian manda y conviene la continuidad con Jira y Bamboo. |

La elección rara vez se revierte sin coste: implica migrar historial, permisos y automatizaciones.

## Ejemplo

Archivo `bitbucket-pipelines.yml` en la raíz del repositorio:

```yaml
pipelines:
  default:
    - step:
        name: Comprobar y construir
        script:
          - npm ci
          - npm run check
          - npm run build
```

Cada push o pull request dispara el paso. Si alguno de los comandos devuelve error, la fusión queda bloqueada mientras la rama protegida exija pipelines correctas.

## Matices

Bitbucket Pipelines y Bamboo resuelven parte del mismo problema, pero no son intercambiables: pipelines se definen en el repositorio y se ejecutan en el servicio de Bitbucket; Bamboo es un servidor con planes y etapas que puede coordinar varios proyectos.
