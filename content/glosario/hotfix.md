---
fecha: 2026-11-26
titulo: Hotfix
resumen: "Corrección urgente que se aplica sobre la versión en producción sin esperar al ciclo normal de releases."
categoria: concepto
tags: [terminal]
alias: [parche de urgencia]
relacionados: [bugfix, pullback, git-flow, despliegue, pipeline, correcciones-en-produccion]
fuentes:
  - "https://nvie.com/posts/a-successful-git-branching-model/"
  - "https://en.wikipedia.org/wiki/Hotfix"
autoenlace: true
---

## Definición

Un hotfix es una corrección de urgencia para un defecto que ya afecta a producción. Se prepara sobre la versión desplegada, se valida con la comprobación mínima necesaria y se publica de inmediato, sin esperar a la próxima release planificada.

El nombre describe *cuándo* se aplica, no una tecnología ni un tipo de prueba.

## Por qué importa

Reduce el tiempo durante el cual el fallo está visible para los usuarios. El coste es una ceremonia más corta: por eso conviene dejar constancia de qué se cambió, quién lo revisó y qué se comprobó antes de desplegar.

Después del despliegue hay que devolver ese cambio a la rama de desarrollo con un pullback; si no, la próxima versión puede volver a incluir el bug.

## Ejemplo

Producción calcula mal el importe de un pedido. Se crea `hotfix/importe`, se corrige una línea, se ejecutan las pruebas críticas, se despliega y se abre un pullback hacia `develop` para que el arreglo no se pierda.

## Se confunde con

- **Bugfix**: sigue el flujo normal y sale con la siguiente versión; el hotfix no puede esperar.
- **Pullback**: es el paso posterior que lleva el cambio de producción a desarrollo.
- **Rollback**: deshacer un despliegue; el hotfix avanza con una corrección en lugar de volver atrás.

## Información incompleta

> **Aviso: información incompleta.** El modelo de ramas de git-flow del que procede este flujo es histórico y popular, no una recomendación universal para entrega continua. La fuente general sobre hotfixes lleva además aviso de insuficiencia de citas.
