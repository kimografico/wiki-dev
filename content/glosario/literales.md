---
titulo: "Literales"
resumen: "Valores escritos directamente en el código, sin calcularlos ni leerlos de otra variable."
categoria: lenguaje
tags: ["nivel-0"]
alias: []
relacionados: [tipos, enum, operadores, inmutabilidad]
fuentes: []
autoenlace: true
---

## Definición

Un literal es un valor escrito directamente en el código con su sintaxis: `'borrador'`, `42`, `true`, `[1, 2]`, `{ estado: 'borrador' }`. No es el resultado de una llamada ni la lectura de otra variable: está ahí, tal cual, en el texto del programa.

## Por qué importa

Son la forma más simple de expresar datos y, a la vez, la fuente más habitual de «valores mágicos». Un `if (estado === 3)` obliga a adivinar qué significa 3; un Enum con `BORRADOR = 3` lo explica. Los literales son además inmutables por definición: `42` no cambia, aunque la variable que lo guarda sí pueda reasignarse. Esto importa al pasar objetos literales: la referencia se copia, no el contenido.

## Ejemplo

```js
const estado = "borrador";
const maxIntentos = 3;
const config = { reintentos: maxIntentos, modo: "lectura" };
```

## Se confunde con

Con un tipo. El literal es la sintaxis para escribir un valor; el tipo (`string`, `number`) es su categoría. `'borrador'` es un literal de tipo `string`. Tampoco es una constante: la constante es un nombre ligado a un valor; el literal es el valor en sí.

## Valores mágicos

Si un número o cadena aparece en varias partes del código, o necesita un comentario para entenderse, merece un nombre. Los Operadores actúan sobre literales; no los definen.
