---
titulo: "Spread y rest"
resumen: "Operadores `...` que, según el contexto, expanden elementos en una estructura o agrupan los restantes en una variable."
categoria: lenguaje
tags: ["frontend"]
alias: []
relacionados: ["destructuring", "operadores", "array", "inmutabilidad"]
fuentes: ["https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax"]
autoenlace: true
---

## Definición

Los dos operadores `...` tienen la misma forma y dirección contraria. Spread expande un iterable o un objeto al construir otra estructura; rest recolecta los valores sobrantes al declarar o destructurar. El contexto decide cuál se usa.

## Spread

```js
const copia = { ...original, activo: true };
const numeros = [...lista, 4];
Math.max(...numeros);
```

Es copia superficial: los objetos anidados comparten referencia.

## Rest

```js
const { id, ...demas } = perfil;
function sumar(inicial, ...valores) { /* valores es un array */ }
```

En destructuring de arrays, rest produce un array; en objetos, un objeto sin la clave extraída. En parámetros recoge los argumentos que sobran, y debe ir al final.

## Por qué importa

Reemplazan `apply`, `concat` y los bucles de copia, y hacen visibles las actualizaciones inmutables: `{ ...estado, pagina: 2 }` dice claramente qué cambia y qué se conserva. En una lista de filtros, `...filtros` evita modificar el array que ya está usando otra parte de la interfaz.

## Ejemplo

```js
const base = { etiqueta: "tests", activo: false };
const { activo, ...filtro } = { ...base, activo: true };
// filtro -> { etiqueta: "tests" }; base sigue intacto
```

La misma sentencia muestra ambos sentidos: `...base` expande, `...filtro` recolecta.

## Se confunde con

Con destructuring simple: `const [a, b] = lista` solo extrae; la diferencia aparece con `...`. Regla práctica: si `...` está a la izquierda de una asignación o en parámetros de función, es rest; si está en un array, un objeto o una llamada, es spread.
