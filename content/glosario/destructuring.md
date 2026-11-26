---
titulo: "Destructuring"
resumen: "Sintaxis que extrae valores de arrays u objetos y los asigna directamente a variables."
categoria: lenguaje
tags: ["frontend"]
alias: []
relacionados: []
fuentes: []
autoenlace: true
---
## Definición

Sintaxis que extrae valores de arrays u objetos y los asigna directamente a variables.

## Por qué importa

Hace explícitas las propiedades que se usan y reduce errores al acceder a estructuras anidadas.

## Ejemplo

```js
const { nombre, edad } = persona; const [primero, ...resto] = lista;
```

## Se confunde con

No es spread: destructuring extrae; spread expande valores en otra estructura.
