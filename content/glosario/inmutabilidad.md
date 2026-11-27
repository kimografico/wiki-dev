---
titulo: "Inmutabilidad"
resumen: "Principio por el que un valor no se modifica después de crearse: los cambios producen un valor nuevo."
categoria: concepto
tags: ["frontend"]
alias: []
relacionados: [gestion-de-estado, reactividad, spread-rest, array]
fuentes: []
autoenlace: true
---
## Definición

La inmutabilidad es el principio por el que un valor no se cambia después de crearse: una operación que «modifica» datos devuelve un valor nuevo. En JavaScript, `const` solo fija la referencia; para mantener el valor hay que evitar `push`, `splice` o asignar propiedades. Las copias son superficiales: expandir un array crea otro, pero los objetos internos siguen siendo los mismos.

## Por qué importa

Muchas librerías deciden si actualizan la interfaz comparando referencias. Si se hace `lista.push(...)` sobre el mismo array, esa referencia no cambia y el cambio puede pasar desapercibido; con `[...lista, elemento]` la referencia nueva activa la comparación. También hace más fiables las pruebas: una función que no modifica sus entradas no altera el resultado de otro test posterior.

## Ejemplo

```js
const lista = [{ id: 1 }];
const nueva = [...lista, { id: 2 }];

const actualizada = nueva.map((item) =>
  item.id === 1 ? { ...item, id: 9 } : item
);
```

`nueva` no es `lista`; `actualizada` tampoco modifica los objetos originales.

## Se confunde con

Con `const`: evita reasignar la variable, no congela el objeto. Con `Object.freeze`: congela solo el primer nivel, igual que el spread. Con pureza: una función pura no produce efectos; la inmutabilidad es propiedad de los datos. En gestión de estado y reactividad, de ella depende detectar cambios.
