---
titulo: "Issue"
resumen: "Unidad de trabajo registrada en un gestor de incidencias, normalmente una tarea, un bug o una petición de funcionalidad."
categoria: herramienta
tags: ["terminal"]
alias: ["ticket"]
relacionados: [pull-request, todo, feature-flag, repositorio-git]
fuentes: []
autoenlace: true
---
## Definición

Una issue es una unidad de trabajo registrada en un gestor de incidencias, como GitHub Issues o Jira. Puede describir una tarea, un defecto o una petición de funcionalidad, y suele incluir título, descripción, etiquetas, responsable, estado y criterios de aceptación. No contiene la solución en forma de código: guarda el contexto y la intención para que otra persona pueda retomar el trabajo más tarde.

## Por qué importa

Es el puente entre una necesidad y los commits que la resuelven. Un caso concreto: una issue describe cómo reproducir un fallo, se vincula al Pull request que lo corrige y se cierra automáticamente al fusionarse. Meses después se puede reconstruir por qué se tomó una decisión leyendo esa conversación, algo que el historial de Git solo muestra como diferencias sin motivación.

## Ejemplo

```md
**Título:** Buscar por etiqueta
**Criterios:** admite varias etiquetas; sin resultados muestra un mensaje.
**Estado:** abierta → cerrada por PR #42
```

Los criterios sirven para saber cuándo dar el trabajo por terminado.

## Se confunde con

Con Pull request: la issue registra trabajo pendiente o realizado; el PR propone código para revisar y una issue puede necesitar varios PR. Con TODO: es un comentario en el código, sin estado ni seguimiento compartido. Con Feature flag: la issue documenta la intención; el flag activa o esconde la funcionalidad ya implementada.
