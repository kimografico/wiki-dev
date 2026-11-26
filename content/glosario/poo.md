---
titulo: "POO"
resumen: "Programación orientada a objetos: paradigma que organiza el código en objetos que encapsulan estado y comportamiento."
categoria: lenguaje
tags: ["nivel-0"]
alias: ["OOP"]
relacionados: [facade, repository]
fuentes: ["https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this"]
autoenlace: true
---
## Definición

Programación orientada a objetos: paradigma que organiza el código en objetos que encapsulan estado y comportamiento.

## Por qué importa

Aporta vocabulario para modelar dominio: clase, objeto, herencia, interfaz y método.

## Ejemplo

Una clase `Pedido` con métodos `calcularTotal()` y `cancelar()`.

## Se confunde con

No es un lenguaje: es un paradigma que se puede aplicar en Java, TypeScript o Python.

## Prototipos y `this`

Los métodos de una clase no se copian en cada instancia: viven en el prototipo y se comparten. Dos objetos tienen las mismas funciones pero datos distintos.

`this` no se decide donde se escribe el método, sino cómo se llama. Al pasar el método como callback se pierde el receptor:

```js
const boton = { texto: "Guardar", pintar() { console.log(this.texto); } };
boton.pintar();            // "Guardar"
const suelto = boton.pintar;
suelto();                  // undefined (o error en modo estricto)
const ligado = boton.pintar.bind(boton);
ligado();                  // "Guardar"
```

Las funciones flecha no tienen `this` propio: lo toman del ámbito donde se crean. Por eso funcionan bien en handlers, pero no como métodos que necesitan cambiar de receptor. Cómo se comporta `this` cuando el navegador llama al handler está explicado en Propagación de eventos.
