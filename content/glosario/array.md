---
titulo: "Array"
resumen: "Estructura de datos ordenada que guarda valores accesibles por índice y expone métodos como map, filter y reduce."
categoria: lenguaje
tags: ["nivel-0"]
alias: []
relacionados: []
fuentes: []
autoenlace: true
---
## Definición

Estructura de datos ordenada que guarda valores accesibles por índice y expone métodos como map, filter y reduce.

## Por qué importa

Casi todo procesamiento de listas pasa por estas operaciones; confundirlas con la estructura Map lleva a código difícil de leer.

## Ejemplo

```js
const nombres = ['Ada', 'Linus']; const mayusculas = nombres.map((n) => n.toUpperCase());
```

## Se confunde con

El método `.map()` transforma un array; la estructura `Map` guarda pares clave-valor y no es lo mismo.
