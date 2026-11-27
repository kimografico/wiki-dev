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

Una pull request (PR) es una propuesta de integración: pide que los commits de una rama se revisen y se fusionen en otra. No es un comando básico de Git, sino una función de la plataforma que aloja el repositorio, como GitHub o GitLab.

## Por qué importa

Convierte un diff en un lugar de decisión. Quien revisa ve el cambio, los comentarios, los resultados de la integración continua y el contexto; quien lo abre deja trazabilidad de por qué se aceptó. Adjuntar Evidencias —capturas, salida de tests o una grabación breve— permite comprobar un cambio visual sin reproducir el caso a ciegas. Si la rama se mueve mientras se revisa, la PR se actualiza y conviene volver a mirar lo que cambió.

## Ejemplo

```bash
git switch -c feature/buscar
git push -u origin feature/buscar
# Abrir la PR de feature/buscar a main y esperar a la CI
```

## Se confunde con

Con un commit: el commit guarda un estado; la PR coordina la revisión de varios commits antes de integrarlos. Tampoco equivale a fusionar: se puede cerrar sin integrar, y el merge es el paso final.
