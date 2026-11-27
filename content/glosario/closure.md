---
titulo: "Closure"
resumen: "Función que recuerda el ámbito en el que se creó y puede acceder a sus variables aunque se ejecute después y fuera de él."
categoria: concepto
tags: ["frontend","backend"]
alias: ["clausura"]
relacionados: [scope, funcion, event-loop, gestion-de-estado]
fuentes: []
autoenlace: true
---
## Definición

Un closure (o clausura) es una función que recuerda el ámbito en el que se creó y puede seguir accediendo a sus variables aunque se ejecute después y fuera de él. No es un tipo especial de función: es el resultado de cómo JavaScript asocia una función con su entorno léxico en el momento de declararla.

## Por qué importa

Explica por qué un contador sigue aumentando cuando la función externa ya terminó: la variable no se destruye porque la función interna la mantiene viva. También explica un error clásico: crear varias funciones dentro de un bucle con `var` y descubrir que todas comparten la misma variable. Y advierte de fugas de memoria cuando un closure conserva objetos grandes durante más tiempo del necesario.

## Ejemplo

```js
function contador() {
  let n = 0;
  return () => ++n;
}
const siguiente = contador();
siguiente(); // 1
siguiente(); // 2
```

## Se confunde con

Con el ámbito: el ámbito es la zona donde se declara la variable; el closure es la función que lo conserva después. Tampoco es un lenguaje: es semántica de ejecución presente en JavaScript y en otros lenguajes con funciones de primera clase.
