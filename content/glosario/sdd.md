---
titulo: "SDD"
resumen: "Specification-Driven Development: forma de trabajar en la que la especificación es la fuente de verdad y el código se deriva de ella."
categoria: concepto
tags: ["tests","backend"]
alias: ["Specification-Driven Development"]
relacionados: [documentacion, tdd, ddd, skill]
fuentes: []
autoenlace: true
---

## Definición

SDD (Specification-Driven Development) es una forma de trabajar en la que la especificación manda: describe qué debe cumplir el sistema y el código se escribe para satisfacerla. Si surge una duda, se actualiza la especificación antes de improvisar una respuesta en el código.

## Por qué importa

Evita que las decisiones vivan solo en la memoria de quien escribió una entrada. En esta wiki, `specs/MANUAL.md` fija las normas vigentes, `src/lib/content/esquemas.ts` es la fuente de verdad del modelo de contenido y las skills capturan el flujo de trabajo. `specs/spec-construccion.md` explica decisiones pasadas, pero no manda: usarlo para decidir sería invertir la jerarquía. El orden también evita contradicciones: si el manual y una nota antigua difieren, se aplica el manual y se corrige la nota.

## Ejemplo

```text
specs/MANUAL.md  -> norma vigente
esquemas.ts      -> campos permitidos
contenido/*.md   -> entradas que cumplen la norma
```

## Se confunde con

Con TDD: la spec dice qué construir y cuándo una decisión es válida; un test comprueba una expectativa ejecutable. Tampoco es DDD: aquel enfoque organiza el dominio; SDD ordena cuál es la fuente de las decisiones.
