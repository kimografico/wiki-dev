---
titulo: "Hoisting"
resumen: "Comportamiento de JavaScript por el que algunas declaraciones se procesan antes de ejecutar el código línea a línea."
categoria: concepto
tags: ["frontend"]
alias: []
relacionados: [scope, closure, funcion, modulos]
fuentes: []
autoenlace: true
---
## Definición

Hoisting es el nombre que se da en JavaScript al tratamiento de las declaraciones antes de ejecutar el código línea a línea. Al preparar la ejecución, el motor crea las bindings del ámbito: una función declarada se puede llamar antes de su definición, `var` queda a `undefined`, y `let` y `const` no se pueden leer hasta su línea (zona muerta temporal). Nada se mueve: cambia cuándo se crea la binding.

## Por qué importa

Explica dos sorpresas. Llamar a `saludar()` antes de la declaración funciona porque la función ya está disponible; leer un `var` antes de asignarlo devuelve `undefined` y el fallo aparece lejos de la causa. Con `let` se lanza ReferenceError de inmediato: ese fallo temprano evita que valores indefinidos viajen por el programa.

## Ejemplo

```js
console.log(x); // undefined
var x = 1;

function saludar() { console.log("hola"); }
saludar(); // "hola"
```

Si la primera línea fuera `console.log(y)` con `let y = 1`, lanzaría ReferenceError por la zona muerta temporal.

## Se confunde con

Con reordenar el código: las instrucciones se ejecutan en el mismo orden. Con Scope: el ámbito decide dónde vive la variable; el hoisting, cuándo se crea. Con las funciones de flecha asignadas a `const`: no se pueden llamar antes de la asignación, aunque estén escritas arriba.
