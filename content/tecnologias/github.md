---
titulo: "GitHub"
resumen: "Plataforma de alojamiento de repositorios Git que añade pull requests, issues, revisiones y automatización con Actions."
categoria: despliegue
tags: ["terminal", "nivel-0"]
alias: []
relacionados: ["git", "github-actions", "github-pages", "pull-request"]
fuentes: ["https://docs.github.com/", "https://docs.github.com/actions"]
autoenlace: true
alternativas: ["gitlab","bitbucket"]
web: "https://github.com/"
---
## Qué es

GitHub es una plataforma que aloja repositorios Git y añade colaboración alrededor de ellos: pull requests, revisiones, issues, permisos y ejecución de flujos con GitHub Actions. No es Git: Git es el sistema de control de versiones que funciona en tu máquina; GitHub es un servicio que guarda copias remotas y ofrece una interfaz encima. Entender la distinción evita una confusión frecuente: si la plataforma no responde, tu historial local sigue intacto.

## Para qué sirve

Es el lugar donde se revisa el código, se discuten cambios y se ejecuta la automatización del proyecto. Un cambio típico empieza en una rama local, continúa como pull request con una descripción, dispara comprobaciones automáticas y termina fusionado en la rama principal. Las issues sirven para registrar trabajo pendiente y vincularlo al cambio que lo cierra. Toda esa trazabilidad vive fuera de los archivos, pero apunta a commits concretos.

## Cuándo usarla

- El equipo quiere código, revisión y automatización en un mismo sitio.
- Necesitas permisos por repositorio, ramas protegidas y trazas de las comprobaciones.
- El proyecto se publica como sitio estático y quieres usar GitHub Pages sin otro proveedor.

## Cuándo no

Si el flujo ya está montado en otra plataforma con Jira y Bitbucket, duplicar repositorios no aporta valor. Para guardar un proyecto personal en local, GitHub tampoco es obligatorio: puedes trabajar solo con Git y decidir después dónde publicar.

## Alternativas

| Opción | Criterio para elegirla |
| --- | --- |
| GitLab | Repositorio, revisiones y CI integrados en una plataforma distinta. |
| Bitbucket | El equipo vive en el ecosistema Atlassian y quiere continuidad con Jira y Bamboo. |
| GitHub | Quieres integración estrecha con Actions y Pages y una comunidad amplia. |

Mover el código a otra plataforma no es solo cambiar la URL: hay que migrar historial, permisos, secrets y flujos.

## Ejemplo

Operaciones habituales con la CLI oficial:

```bash
git switch -c arreglar-enlaces
gh issue create --title "Revisar enlaces internos"
gh pr create --fill
gh pr checks
```

La primera crea la rama; las siguientes abren la incidencia, el pull request y muestran el estado de las comprobaciones. Las mismas acciones están disponibles en la interfaz web.

## Matices

GitHub Actions es una herramienta de GitHub, no GitHub entero. Puedes usar Git con GitHub y no ejecutar ningún workflow; y puedes tener flujos de integración continua en otras plataformas sin dejar de alojar el código aquí. Separa conceptos: dónde se guarda el código, dónde se revisa y dónde se ejecutan las pruebas.
