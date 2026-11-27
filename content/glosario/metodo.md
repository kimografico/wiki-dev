---
titulo: "Método"
resumen: "Función asociada a un objeto o a una clase que opera sobre su estado y recibe `this` como contexto."
categoria: lenguaje
tags: ["nivel-0"]
alias: []
relacionados: [funcion, poo, entidad, metodo-frente-a-funcion]
fuentes: []
autoenlace: true
---

## Definición

Un método es una función que pertenece a un objeto o a una clase y opera sobre el estado de ese objeto. Dentro de él, `this` apunta a la instancia desde la que se llamó. Declarar `incrementar()` dentro de `class Contador` crea un método; declararla fuera crea una función libre.

## Por qué importa

Junta datos y comportamiento en un mismo lugar: `carrito.anyadir(producto)` es más claro que `anyadir(carrito, producto)` y evita que cualquier código manipule el carrito por su cuenta. Es la unidad natural para encapsular reglas de negocio y para que una Entidad se valide a sí misma. Además, los métodos se heredan: una subclase puede reutilizarlos o sobrescribirlos.

## Ejemplo

```js
class Contador {
  constructor() { this.valor = 0; }
  incrementar() { this.valor++; }
}
const c = new Contador();
c.incrementar(); // c.valor === 1
```

## Se confunde con

Con una Función. La función existe por sí sola y recibe lo que necesita como parámetros; el método se llama a través de un objeto y tiene acceso implícito a `this`. Ojo con extraerlo a una variable: `const f = c.incrementar; f()` pierde `this` en JavaScript; hace falta `c.incrementar.bind(c)`. Tampoco es un método estático: ese se llama en la clase y no recibe la instancia. La comparativa Método frente a función amplía el contraste.
