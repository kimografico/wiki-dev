---
titulo: "SWR"
resumen: "Biblioteca de React para obtener datos remotos con caché, revalidación y actualización optimista."
categoria: estado
tags: ["frontend"]
alias: []
relacionados: ["tanstack", "gestion-de-estado", "estado-local-frente-a-estado-de-servidor"]
fuentes: ["https://swr.vercel.app/"]
autoenlace: true
alternativas: ["tanstack"]
web: "https://swr.vercel.app/"
npm: "swr"
---

## Qué es

SWR es una biblioteca de React para leer datos remotos. El nombre viene de «stale while revalidate»: mostrar primero el dato guardado en caché y, al mismo tiempo, pedir uno fresco. Expone el resultado como un hook con `data`, `error` e `isLoading`, de modo que el componente no necesita tres estados propios para la misma petición.

## Para qué sirve

Resuelve el estado asíncrono de lectura. Al abrir una pantalla de pedidos, aparece al instante la última lista cacheada; cuando llega la respuesta, se actualiza sola. La revalidación puede ocurrir al enfocar la ventana o al pasar un tiempo, y una escritura puede refrescar la clave afectada con `mutate`. La clave es la identidad de la petición: dos componentes que usan `/pedidos` comparten caché sin pasar datos por props.

## Cuándo usarlo

Cuando la aplicación consume APIs de lectura frecuente y se acepta servir un dato recién guardado mientras se comprueba si sigue vigente. Encaja en paneles, listados y detalle de recursos. Conviene dar a cada petición una clave estable, como `/pedidos/42`, para que la caché se organice de forma predecible.

## Cuándo no

No es un gestor de estado global: para el carrito, un formulario multipaso o un indicador compartido, Gestión de estado es la herramienta adecuada. Tampoco sustituye a React en la gestión de un formulario, porque los valores del campo pertenecen a la interfaz hasta que se envían.

## Alternativas

TanStack es la alternativa directa. Cubre consultas y mutaciones con una API más explícita y suele elegirse cuando las operaciones de escritura son complejas o se necesitan invalidaciones muy controladas. SWR es más pequeño y directo cuando casi todo son lecturas. La comparativa Estado local frente a estado de servidor aclara la frontera con el estado de la interfaz; la decisión entre ambas bibliotecas depende del peso de las mutaciones y de la API que el equipo prefiera mantener.

## Ejemplo

```jsx
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((respuesta) => respuesta.json());

function Pedidos() {
  const { data, error, isLoading } = useSWR("/pedidos", fetcher);
  if (error) return <p>No se pudieron cargar los pedidos.</p>;
  if (isLoading) return <p>Cargando…</p>;
  return <ul>{data.map((pedido) => <li key={pedido.id}>{pedido.total}</li>)}</ul>;
}
```

## Actualización optimista

Tras crear un pedido se puede actualizar la caché antes de que el servidor confirme:

```js
import useSWR, { mutate } from "swr";

await mutate(
  "/pedidos",
  async (pedidos) => {
    const guardado = await guardarPedido(nuevo);
    return [...pedidos, guardado];
  },
  {
    optimisticData: (pedidos) => [...pedidos, nuevo],
    rollbackOnError: true,
  },
);
```

La interfaz responde al instante, pero muestra durante un momento un dato que el servidor aún no ha aceptado. Si la operación depende de una validación del servidor, conviene esperar a la respuesta en vez de anticiparse.
