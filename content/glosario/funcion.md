---
titulo: "Función"
resumen: "Bloque de código con nombre que recibe parámetros, realiza una tarea y puede devolver un resultado."
categoria: lenguaje
tags: ["nivel-0"]
alias: []
relacionados: [metodo, closure, scope, metodo-frente-a-funcion]
fuentes: []
autoenlace: true
---
## Definición

Una función es un bloque de código con nombre que recibe parámetros, realiza una tarea y devuelve —o puede devolver— un resultado. También existen funciones anónimas y asignadas a constantes: la forma no cambia la idea de entrada, cuerpo y salida. Lo que importa a quien la usa es su contrato: qué recibe, qué devuelve y qué efectos produce. Si modifica una variable compartida, debe documentarlo.

## Por qué importa

Es la unidad mínima de reutilización y de prueba. Si la misma conversión de precios aparece en tres pantallas, extraerla deja un único sitio donde corregir el error y una sola prueba que escribir. Además, `calcularTotal` nombra la intención mejor que una decena de líneas repetidas. Una función que hace demasiadas cosas acopla casos distintos y complica los tests.

## Ejemplo

```js
function total(carrito) {
  return carrito.reduce((suma, { precio }) => suma + precio, 0);
}

total([{ precio: 10 }, { precio: 5 }]); // 15
```

La entrada es el array, la salida un número y no hay estado modificado: dos llamadas iguales dan el mismo resultado.

## Se confunde con

Con Método: pertenece a un objeto o clase y trabaja con `this`; la función independiente no lo tiene. Método frente a función detalla el criterio. Con Closure: recuerda variables de su Scope externo. Y no es el bloque: puede ejecutarse una vez o llamarse muchas veces.
