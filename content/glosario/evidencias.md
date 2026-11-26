---
fecha: 2026-11-26
titulo: Evidencias
resumen: "Documentación que prueba un error o una validación positiva y se adjunta a una PR para apoyar su revisión."
categoria: concepto
tags: [tests, terminal]
alias: [evidencia de validación, prueba adjunta]
relacionados: [pull-request, code-review, documentacion, auditoria, cobertura]
fuentes:
  - "https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/attaching-files"
  - "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request"
autoenlace: true
---

## Definición

Una evidencia es un artefacto verificable que se adjunta a una PR para demostrar algo: la salida de una prueba, un log con el error reproducido, una captura del estado incorrecto o el resultado de una comprobación de rendimiento. No es una opinión ni un «ya lo he probado»: es algo que otra persona puede inspeccionar.

Puede documentar un fallo (para justificar la corrección) o una validación positiva (para demostrar que el cambio funciona).

## Por qué importa

Reduce el trabajo de revisión. En lugar de aceptar una afirmación, quien revisa ve el comando ejecutado y su resultado, y puede decidir si la comprobación realmente cubre el cambio.

También crea trazabilidad: semanas después, la evidencia explica por qué se aprobó una PR o por qué se consideró resuelto un incidente.

## Ejemplo

Una PR que corrige un fallo de renderizado adjunta la captura del estado roto, el comando `npm run test:coverage` con su salida y una captura después del arreglo. La revisión puede contrastar ambas imágenes sin reproducir el caso a ciegas.

## Se confunde con

- **Cobertura**: es una métrica; puede ser una evidencia más, pero un porcentaje alto no demuestra que el caso concreto funcione.
- **Auditoría**: recoge hallazgos y remediación; la evidencia es el material con el que se sostiene cada hallazgo.
- **Evidencia en RAG**: allí significa material de recuperación para una respuesta; aquí, material adjunto a una revisión de código.

## Información incompleta

> **Aviso: información incompleta.** GitHub permite adjuntar archivos a PRs y comentarios, pero su documentación no define una convención obligatoria de «evidencias». Adjuntarlas es una práctica de equipo, no un requisito de la plataforma.
