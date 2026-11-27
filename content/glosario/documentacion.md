---
titulo: "Documentación"
resumen: "Texto que explica cómo usar, mantener o extender un sistema para que otra persona pueda hacerlo sin preguntar."
categoria: concepto
tags: ["nivel-0"]
alias: []
relacionados: ["readme", "markdown", "frontmatter", "code-review"]
fuentes: []
autoenlace: true
---
## Definición

Documentación es el texto que explica cómo usar, mantener o extender un sistema para que otra persona pueda hacerlo sin preguntar al autor. Describe el conjunto: propósito, decisiones, comandos, convenciones y límites. No es un diario de cambios ni una transcripción del código; es una guía que se actualiza cuando el comportamiento cambia.

## Por qué importa

En una wiki el contenido es el producto: una entrada que solo define el término no resuelve la duda. En código, un README con los comandos de arranque convierte un clon en un entorno de trabajo; sin él, cada persona reconstruye el proceso por prueba y error y el conocimiento se queda en quien lo escribió.

## Ejemplo

Un README con requisitos, `npm install`, `npm run dev`, dónde vive el contenido y qué comprobaciones hay que dejar en verde antes de publicar. En esta wiki, `specs/MANUAL.md` cumple ese papel: concentra las normas vigentes y separa las decisiones históricas de las que mandan hoy.

## Se confunde con

No es un comentario de código: el comentario aclara una línea puntual y suele quedar obsoleto en silencio; la documentación describe el sistema y se revisa como cualquier otro entregable. Tampoco es publicidad: prometer que algo «es rápido» sin criterio ni medición no ayuda a decidir. Una documentación útil dice qué hacer, cuándo y con qué límite.
