---
titulo: "Método frente a función"
resumen: "Una Función recibe todo por parámetros; un Método pertenece a un objeto y usa su estado a través de this. La firma no siempre lo delata."
categoria: lenguaje
tags: ["nivel-0"]
alias: []
relacionados: [metodo, funcion, poo, inmutabilidad, closure]
fuentes: []
autoenlace: true
entidades: [metodo, funcion]
contexto: "Dos formas de nombrar bloques reutilizables que se confunden en código orientado a objetos por el uso implícito de this."
---

## Contexto

Una **Función** y un **Método** son bloques reutilizables, pero no son intercambiables. La confusión aparece en código de **POO**, donde una función guardada en una clase pasa a llamarse método y `this` cambia el comportamiento sin que la firma lo diga.

La pregunta que decide es de pertenencia: ¿esta operación tiene sentido sin el objeto que la contiene?

## Criterios

| Criterio | Función | Método |
|---|---|---|
| Definición | Bloque invocado por su nombre | Función asociada a un objeto o clase |
| Estado | Llega por parámetros | Se lee de `this` |
| Acoplamiento | Bajo | Ligado a la forma del objeto |
| Prueba | Llamar con entradas | Crear el objeto o fijar el receptor |
| Reutilización | En cualquier contexto | Con objetos compatibles o subclases |
| Nombre típico | `calcularTotal(items)` | `carrito.calcularTotal()` |

## Cuándo elegir cada una

Elige una **Función** para cálculos, validaciones y formateos que deben ser predecibles: con las mismas entradas devuelve la misma salida. Encaja con **Inmutabilidad** y es fácil de mover, probar y paralelizar.

Elige un **Método** cuando la operación es una responsabilidad del objeto: incrementar un contador, serializar un pedido o validar un formulario que conoce sus propios campos. Si el método ignora `this`, probablemente debería ser una función o un miembro estático.

Señal contraria: una función con cinco parámetros que siempre salen del mismo objeto suele estar pidiendo ser método. Una clase con métodos que solo hacen `return this.x * 2` suele estar pidiendo funciones libres.

## Ejemplos

```js
// Función: depende solo de sus parámetros
const doble = (n) => n * 2;

// Método: depende del estado del objeto
class Contador {
  constructor() { this.valor = 0; }
  incrementar() { this.valor += 1; return this.valor; }
}

const c = new Contador();
const incrementar = c.incrementar;
// incrementar() pierde el receptor: `this` ya no es c
const incrementarC = c.incrementar.bind(c);
```

## Matices

Las funciones flecha guardadas como campo de clase capturan `this`, así que no pierden el receptor al pasarlas como callback. Una **Closure** captura variables del ámbito, no al objeto implícito: son mecanismos distintos. En los tests, un método con `this` obliga a construir el objeto; una función pura no.
