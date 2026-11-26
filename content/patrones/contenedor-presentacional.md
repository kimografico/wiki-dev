---
fecha: 2026-11-26
titulo: Contenedor / presentacional
resumen: Separar el componente que obtiene y decide los datos del componente que solo los pinta.
categoria: concepto
tags: [frontend]
alias: [smart y dumb components, componentes contenedor y presentacionales]
relacionados: [react, componentizacion, hook, provider, data-layer]
familia: estructural
fuentes:
  - "https://react.dev/learn/thinking-in-react"
  - "https://react.dev/learn/sharing-state-between-components"
  - "https://react.dev/learn/you-might-not-need-an-effect"
autoenlace: true
---

## Problema

Una vista necesita datos de una API, un store y un par de estados locales. Si todo vive en el mismo componente, cambiar la fuente de datos obliga a tocar la presentación, y probar la vista exige montar providers y redes falsas.

## Solución

Se separan dos responsabilidades. El contenedor decide qué datos se necesitan y cómo se obtienen; el componente presentacional recibe props y devuelve interfaz. En código moderno, el contenedor suele ser un custom hook en lugar de un segundo componente.

No es un patrón canónico del catálogo de refactoring.guru: aquí se clasifica como estructural por analogía, porque separa dos papeles que antes estaban juntos.

## Estructura

```
Página o contenedor
   │  usePedidos()  →  datos y manejadores
   ▼
Componente presentacional
   │  props: items, onSeleccionar
   ▼
Interfaz (sin saber de APIs ni de stores)
```

## Ejemplo

```tsx
function PedidosPage() {
  const { pedidos, seleccionar } = usePedidos();

  return <PedidosTabla items={pedidos} onSeleccionar={seleccionar} />;
}

function PedidosTabla({ items, onSeleccionar }) {
  return (
    <table>
      <tbody>
        {items.map((pedido) => (
          <tr key={pedido.id} onClick={() => onSeleccionar(pedido.id)}>
            <td>{pedido.cliente}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

`PedidosTabla` se puede probar con props y reutilizar con otra fuente de datos; `PedidosPage` concentra la lógica de obtención.

## Cuándo usarlo

Cuando la misma vista se consume con varias fuentes, cuando se quiere aislar el diseño en Storybook o cuando la lógica cambia mucho más que la presentación. No merece la pena si el contenedor solo reenvía props: añade un archivo sin quitar acoplamiento.

Antes de crear dos componentes, valúa un único componente que llame a un hook. Los valores derivados se calculan durante el render: guardarlos en estado y sincronizarlos con un efecto solo crea renders extra y desincronización. El provider de contexto de React reparte valores por el árbol de componentes; el Provider de inyección de dependencias resuelve una necesidad parecida fuera de ese árbol.
