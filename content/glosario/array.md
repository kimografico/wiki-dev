---
titulo: "Array"
resumen: "Colección ordenada accesible por índice cuyos métodos permiten filtrar, transformar y reducir valores."
categoria: lenguaje
tags: ["nivel-0"]
alias: []
relacionados: [estructuras-de-datos, metodo, operadores, inmutabilidad]
fuentes: []
autoenlace: true
---
## Definición

Un array es una colección ordenada de valores a los que se accede por índice, empezando por cero. Tiene una longitud conocida y admite operaciones como recorrer, filtrar, transformar o reducir sus elementos. JavaScript no exige que todos los valores sean del mismo tipo, aunque en la práctica conviene que lo sean para evitar comprobaciones innecesarias.

## Por qué importa

Es la forma habitual de representar listas: resultados de una consulta, etiquetas de una entrada, líneas de un archivo. Saber qué método conviene evita bucles escritos a mano y errores sutiles. `map` devuelve una nueva lista de la misma longitud; `filter` devuelve solo los elementos que cumplen una condición; `reduce` produce un único valor. Elegir mal explica por qué una lista sale vacía o llena de `undefined`.

## Ejemplo

```js
const etiquetas = ['frontend', 'accesibilidad', 'tests'];
const largas = etiquetas
  .filter((t) => t.length > 5)
  .map((t) => t.toUpperCase());
// ['FRONTEND', 'ACCESIBILIDAD']
```

Un Método como `filter` reduce la lista; `map` transforma después lo que queda.

## Se confunde con

Con `Map`. Aunque `map` es un método de array, `Map` es otra estructura pensada para pares clave-valor con claves de cualquier tipo. Acceder por índice no es lo mismo que buscar por clave. Tampoco es una tupla: las tuplas tienen posiciones fijas con significado propio. Además, `map` y `filter` no modifican el original: encajan con Inmutabilidad.
