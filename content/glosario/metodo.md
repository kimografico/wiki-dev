---
titulo: "Método"
resumen: "Función asociada a un objeto o a una clase que opera sobre el estado de ese objeto y recibe `this` como contexto."
categoria: lenguaje
tags: ["nivel-0"]
alias: []
relacionados: []
fuentes: []
autoenlace: true
---
## Definición

Función asociada a un objeto o a una clase que opera sobre el estado de ese objeto y recibe `this` como contexto.

## Por qué importa

Define el comportamiento de las entidades y es la unidad natural para encapsular reglas de negocio.

## Ejemplo

```js
class Contador { incrementar() { this.valor++; } }
```

## Se confunde con

No es una función libre: el método pertenece a un objeto; una función existe por sí misma.
