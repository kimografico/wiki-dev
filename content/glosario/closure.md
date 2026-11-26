---
titulo: "Closure"
resumen: "Función que recuerda el ámbito en el que se creó y puede acceder a sus variables aunque se ejecute después y fuera de él."
categoria: concepto
tags: ["frontend","backend"]
alias: ["clausura"]
relacionados: []
fuentes: []
autoenlace: true
---
## Definición

Función que recuerda el ámbito en el que se creó y puede acceder a sus variables aunque se ejecute después y fuera de él.

## Por qué importa

Explica por qué un contador sigue funcionando cuando la función externa ya terminó, y por qué pueden aparecer fugas de memoria.

## Ejemplo

```js
function contador() { let n = 0; return () => ++n; }
```

## Se confunde con

No es un lenguaje: es semántica de ejecución. Tampoco es ámbito: el ámbito es el lugar donde se declara la variable; el closure es la función que lo conserva.
