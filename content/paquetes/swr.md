---
titulo: "SWR"
resumen: "Biblioteca de React para obtener datos remotos con caché, revalidación y actualización optimista."
categoria: estado
tags: ["frontend"]
alias: []
relacionados: [tanstack, gestion-de-estado]
fuentes: ["https://swr.vercel.app/"]
autoenlace: true
alternativas: ["tanstack"]
web: "https://swr.vercel.app/"
npm: "swr"
---
## Qué es

Biblioteca de React para obtener datos remotos con caché, revalidación y actualización optimista.

## Para qué sirve

Simplifica el estado asíncrono de lectura sin llenar el componente de flags de carga.

## Cuándo usarlo

Úsalo cuando la aplicación consume APIs de lectura frecuente y quiere respuestas inmediatas desde caché.

## Cuándo no

No es un gestor de estado global para datos locales ni una alternativa a React para formularios.

## Alternativas

La alternativa directa es `tanstack`. Conviene comparar ambas antes de elegir.

## Ejemplo

```js
const fetcher = (url) => fetch(url).then((respuesta) => respuesta.json());
const { data, error } = useSWR("/pedidos", fetcher);
```

## Actualización optimista

En lugar de esperar a que la API confirme el cambio, se actualiza la caché local primero y se lanza la petición después. Si falla, se restaura el valor anterior:

```js
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

La actualización optimista mejora la percepción de velocidad, pero la interfaz muestra durante un momento un dato que el servidor aún no ha aceptado. No conviene cuando la operación es crítica o el dato mostrado depende de una validación del servidor.
