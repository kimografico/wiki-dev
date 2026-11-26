---
titulo: "Spread y rest"
resumen: "Operadores `...` que, según el contexto, expanden elementos en una estructura o agrupan los restantes en una variable."
categoria: lenguaje
tags: ["frontend"]
alias: []
relacionados: []
fuentes: []
autoenlace: true
---
## Definición

Operadores `...` que, según el contexto, expanden elementos en una estructura o agrupan los restantes en una variable.

## Por qué importa

Resumen operaciones que antes requerían `apply` o bucles manuales.

## Ejemplo

```js
const copia = { ...original, extra: 1 }; const [primero, ...resto] = lista;
```

## Se confunde con

Spread expande hacia fuera; rest agrupa hacia dentro. No confundir con destructuring simple.
