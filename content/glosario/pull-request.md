---
titulo: "Pull request"
resumen: "Propuesta de cambios que se abre en una plataforma de Git para revisarla, discutirla y fusionarla."
categoria: concepto
tags: ["terminal"]
alias: ["PR"]
relacionados: [evidencias, bugfix, hotfix, pullback]
fuentes:
  - "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request"
autoenlace: true
---
## Definición

Propuesta de cambios que se abre en una plataforma de Git para revisarla, discutirla y fusionarla.

## Por qué importa

Es la unidad de revisión y trazabilidad: cada decisión queda asociada a un diff y a su contexto. Adjuntar Evidencias al PR permite que quien revisa compruebe el resultado sin reproducir el caso a ciegas.

## Ejemplo

Abrir un PR desde `feature/buscar` hacia `main` y esperar a que pase la CI.

## Se confunde con

No es un commit: el commit guarda cambios; el PR coordina su revisión e integración.
