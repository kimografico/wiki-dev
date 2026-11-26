---
titulo: "Optional chaining"
resumen: "Operador que permite leer una propiedad anidada sin lanzar error si algún eslabón es nulo o indefinido."
categoria: lenguaje
tags: ["frontend"]
alias: []
relacionados: []
fuentes: []
autoenlace: true
---
## Definición

Operador que permite leer una propiedad anidada sin lanzar error si algún eslabón es nulo o indefinido.

## Por qué importa

Elimina comprobaciones repetidas y hace más seguro trabajar con respuestas parciales de una API.

## Ejemplo

```js
const ciudad = usuario?.direccion?.ciudad;
```

## Se confunde con

No es un valor por defecto: `?.` evita el error; `??` proporciona el valor alternativo.
