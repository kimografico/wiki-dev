---
titulo: "Hoisting"
resumen: "Comportamiento de JavaScript por el que algunas declaraciones se procesan antes de ejecutar el código línea a línea."
categoria: concepto
tags: ["frontend"]
alias: []
relacionados: []
fuentes: []
autoenlace: true
---
## Definición

Comportamiento de JavaScript por el que algunas declaraciones se procesan antes de ejecutar el código línea a línea.

## Por qué importa

Explica por qué una función declarada se puede llamar antes de su definición y por qué `var` no avisa como `let`.

## Ejemplo

```js
saludar(); function saludar() { console.log('hola'); }
```

## Se confunde con

No es un lenguaje: es semántica de ejecución. Tampoco es mover código: solo cambia cuándo se crea la binding.
