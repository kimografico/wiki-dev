---
titulo: "Redux"
resumen: "Biblioteca de estado predecible que centraliza los cambios en reducers puros."
categoria: estado
tags: ["frontend"]
alias: []
relacionados: []
fuentes: []
autoenlace: true
alternativas: ["zustand"]
---
## Qué es

Biblioteca de estado predecible que centraliza los cambios en reducers puros.

## Para qué sirve

Hace explícitas las acciones que cambian el estado y facilita depuración y tests.

## Cuándo usarla

Conviene en aplicaciones grandes con estado compartido por muchas ramas.

## Cuándo no

No hace falta en una web estática ni en un formulario local con dos variables.

## Alternativas

Las alternativas directas son `zustand`. Conviene compararlas antes de elegir.

## Ejemplo

```js
const reducer = (state, action) => action.type === 'sumar' ? state + 1 : state;
```
