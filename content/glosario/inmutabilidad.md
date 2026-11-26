---
titulo: "Inmutabilidad"
resumen: "Principio por el que un valor no se modifica después de crearse: los cambios producen un valor nuevo."
categoria: concepto
tags: ["frontend"]
alias: []
relacionados: []
fuentes: []
autoenlace: true
---
## Definición

Principio por el que un valor no se modifica después de crearse: los cambios producen un valor nuevo.

## Por qué importa

Hace más fiables los cambios de estado y evita efectos colaterales difíciles de rastrear.

## Ejemplo

```js
const nuevo = [...lista, elemento]; // en lugar de lista.push(elemento)
```

## Se confunde con

No es `const`: `const` evita reasignar la variable, pero el objeto al que apunta puede seguir mutando.
