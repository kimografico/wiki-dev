---
titulo: "BDD"
resumen: "Behavior-Driven Development: metodología que describe el comportamiento esperado en lenguaje casi natural antes de implementarlo."
categoria: concepto
tags: ["tests","backend"]
alias: ["Behavior-Driven Development"]
relacionados: []
fuentes: []
autoenlace: true
---
## Definición

Behavior-Driven Development: metodología que describe el comportamiento esperado en lenguaje casi natural antes de implementarlo.

## Por qué importa

Hace que negocio, testing y desarrollo hablen el mismo escenario y reduce interpretaciones distintas de una feature.

## Ejemplo

```gherkin
Given un usuario sin sesión
When intenta entrar al panel
Then ve el formulario de acceso
```

## Se confunde con

No es TDD: el TDD empieza por un test unitario fallido; el BDD empieza por un escenario de comportamiento compartido.
