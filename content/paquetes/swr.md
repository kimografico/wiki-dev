---
titulo: "SWR"
resumen: "Biblioteca de React para obtener datos remotos con caché, revalidación y actualización optimista."
categoria: estado
tags: ["frontend"]
alias: []
relacionados: []
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

Las alternativas directas son `tanstack`. Conviene compararlas antes de elegir.

## Ejemplo

```js
const { data, error } = useSwr('/pedidos', fetcher);
```
