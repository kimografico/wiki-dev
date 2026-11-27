---
titulo: "Algoritmo"
resumen: "Secuencia finita de pasos que transforma una entrada en una salida; se razona sobre ella antes de elegir el código."
categoria: concepto
tags: ["nivel-0"]
alias: []
relacionados: [estructuras-de-datos, funcion, array, operadores]
fuentes: []
autoenlace: true
---
## Definición

Un algoritmo es una secuencia finita y ordenada de pasos que, partiendo de una entrada, produce una salida. Cada paso debe ser inequívoco y la secuencia debe terminar. Es una idea independiente del lenguaje: la misma receta puede escribirse en JavaScript, en Python o en papel. El código es una implementación; el algoritmo, lo implementado.

## Por qué importa

Permite razonar antes de escribir. Si se sabe que buscar un valor en una lista no ordenada exige revisar cada elemento, se entiende por qué añadir elementos encarece la búsqueda pero no obliga a ordenarla en cada consulta. También facilita explicar un error: se puede señalar el paso que se aparta del resultado esperado, no solo la línea del síntoma.

## Ejemplo

```js
function mayor(numeros) {
  let mejor = numeros[0];
  for (const n of numeros) {
    if (n > mejor) mejor = n;
  }
  return mejor;
}
```

Recorrer la lista una sola vez es un algoritmo lineal: el trabajo crece con el número de elementos.

## Se confunde con

Con un programa o con una estructura de datos. El programa añade detalles del entorno; Estructuras de datos describe dónde se guardan los valores, no qué pasos se aplican. Tampoco es sinónimo de eficiencia: un algoritmo correcto puede ser lento, y uno rápido puede dar una respuesta equivocada. La corrección y el coste se analizan por separado.
