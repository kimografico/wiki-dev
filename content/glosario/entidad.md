---
titulo: "Entidad"
resumen: "Concepto del dominio con identidad propia y datos que pueden cambiar con el tiempo."
categoria: datos-api
tags: ["backend"]
alias: []
relacionados: ["ddd", "modelos", "negocio", "tipos"]
fuentes: []
autoenlace: true
---
## Definición

Una entidad es un concepto del dominio con identidad propia y datos que pueden cambiar con el tiempo. Lo que la define no es su aspecto, sino que sigue siendo «la misma» aunque se modifiquen sus atributos: un `Pedido` continúa siendo ese pedido cuando pasa de `borrador` a `publicado`.

## Por qué importa

Separa «qué es» de «cómo se guarda». Si el modelo nace copiando una tabla, la base de datos decide qué existe en el negocio y cualquier cambio de esquema se propaga por toda la lógica. Pensar en entidades permite acordar reglas —quién puede confirmar un pedido— antes de decidir columnas o relaciones.

## Ejemplo

```ts
type Pedido = {
  id: string;
  estado: 'borrador' | 'publicado';
  lineas: string[];
};
```

Dos pedidos con el mismo `estado` y las mismas líneas son distintos si su `id` difiere; dos versiones del mismo `id` son el mismo pedido en momentos distintos.

## Se confunde con

No es cualquier modelo de datos: un objeto con los campos de una respuesta puede no tener identidad ni continuidad. Tampoco es sinónimo de fila: la fila es una representación en almacenamiento; la entidad pertenece al dominio y puede guardarse de varias formas. Y no se confunde con Negocio: ese término nombra el área de responsabilidad, no cada objeto modelado dentro de ella.
