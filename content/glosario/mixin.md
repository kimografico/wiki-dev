---
titulo: "Mixin"
resumen: "Comportamiento reutilizable que se añade a varias clases sin clase base común: suma capacidades en lugar de heredar identidad."
categoria: concepto
tags: ["frontend"]
alias: []
relacionados: [poo, entidad, componentizacion, metodo]
fuentes: []
autoenlace: true
---
## Definición

Un mixin es un fragmento de comportamiento reutilizable que se añade a varias clases u objetos sin que compartan una clase base. En JavaScript suele ser una función que recibe una clase y devuelve una subclase con métodos o propiedades extra. Aporta una capacidad concreta, no una identidad: dos clases que lo usan siguen siendo tipos distintos.

## Por qué importa

La herencia simple obliga a elegir una única superclase. Cuando varias entidades no emparentadas necesitan lo mismo —fechas de creación, validación—, una base común las forzaría a una jerarquía artificial. El mixin evita esa jerarquía y mantiene cada capacidad en un solo sitio: si cambia la forma de registrar fechas, se cambia una vez para todas.

## Ejemplo

```js
const ConFecha = (Base) => class extends Base {
  createdAt = new Date();
  actualizar() { this.updatedAt = new Date(); }
};
class Pedido extends ConFecha(class {}) {}
class Usuario extends ConFecha(class {}) {}
```

## Se confunde con

- **Herencia**: crea una relación de tipo («Pedido es un...»); el mixin solo añade una capacidad («Pedido sabe...»).
- **Composición**: delega en otro objeto; el mixin incorpora el comportamiento a la clase resultante.
- **Utilidades**: funciones sueltas que no alteran la clase.

Señal útil: si puedes quitar el mixin y la clase sigue teniendo sentido, era una capacidad añadida, no parte de su identidad.
