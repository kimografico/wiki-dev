---
titulo: "Code review"
resumen: "Revisión deliberada de un cambio por otra persona antes de integrarlo."
categoria: concepto
tags: ["terminal"]
alias: []
relacionados: [pull-request, git-hooks, tdd, pipeline]
fuentes: []
autoenlace: true
---
## Definición

Una code review es la revisión deliberada de un cambio por otra persona antes de integrarlo. Se hace normalmente sobre un pull request: quien revisa lee el diff, pregunta, pide ajustes y acaba aprobando o bloqueando la incorporación. El objeto es el cambio completo —intención, diseño y efectos colaterales—, no solo que compile.

## Por qué importa

Los tests automáticos responden a preguntas concretas; la revisión juzga si la solución encaja con el resto del sistema. Detecta nombres engañosos, caminos de error sin cubrir y decisiones que dejarían deuda técnica. También reparte conocimiento: quien revisa aprende una parte del código y quien escribe deja de ser la única persona que la entiende.

## Ejemplo

```md
- [ ] La lógica cubre el caso de error
- [ ] Hay tests para el cambio
- [ ] Los nombres explican la intención
```

Una lista así hace la revisión repetible sin sustituir el criterio.

## Se confunde con

Con aprobar sin leer: dar el visto bueno para desbloquear no es revisar. Tampoco es un test: la máquina comprueba resultados esperados; la persona evalúa si esos resultados son los correctos y si el cambio será mantenible.
