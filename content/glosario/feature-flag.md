---
titulo: "Feature flag"
resumen: "Interruptor en código o configuración que activa o desactiva una funcionalidad sin desplegar de nuevo."
categoria: concepto
tags: ["frontend","backend"]
alias: []
relacionados: []
fuentes: []
autoenlace: true
---
## Definición

Interruptor en código o configuración que activa o desactiva una funcionalidad sin desplegar de nuevo.

## Por qué importa

Permite probar con usuarios concretos y revertir una función sin volver a publicar.

## Ejemplo

```js
if (flags.nuevoBuscador) renderizarBuscadorNuevo();
```

## Se confunde con

No es una feature: la feature es la funcionalidad; el flag es el mecanismo para activarla gradualmente.
