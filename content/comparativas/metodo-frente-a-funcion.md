---
titulo: "Método frente a función"
resumen: "Dos formas de nombrar bloques reutilizables que se confunden en código orientado a objetos."
categoria: lenguaje
tags: ["nivel-0"]
alias: []
relacionados: ["metodo","funcion"]
fuentes: []
autoenlace: true
entidades: ["metodo","funcion"]
contexto: "Dos formas de nombrar bloques reutilizables que se confunden en código orientado a objetos."
---
## Contexto

Dos formas de nombrar bloques reutilizables que se confunden en código orientado a objetos.

## Criterios

Pertenencia a un objeto, uso de `this`, acoplamiento al estado y facilidad de test.

## Cuándo elegir cada una

Una función libre para lógica pura y reutilizable; un método cuando la operación pertenece al objeto y usa su estado.

## Ejemplos

```js
function doble(n) { return n * 2; }
class Contador { incrementar() { this.valor++; } }
```
