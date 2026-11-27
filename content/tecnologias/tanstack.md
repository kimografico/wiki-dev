---
titulo: "TanStack"
resumen: "Familia de bibliotecas de código abierto para estado asíncrono, rutas, tablas y formularios."
categoria: framework
tags: ["frontend"]
alias: []
relacionados: [react, swr, estado-local-frente-a-estado-de-servidor, typescript]
fuentes: ["https://tanstack.com/", "https://tanstack.com/query/latest/docs/framework/react/guides/queries"]
autoenlace: true
alternativas: [swr]
web: "https://tanstack.com/"
---
## Qué es

TanStack es una familia de bibliotecas de código abierto, no un framework único. Cada pieza resuelve una necesidad concreta: Query gestiona datos del servidor y su caché, Router el enrutamiento, Table tablas con ordenación y filtros, y Form formularios con validación. Comparten filosofía —API declarativa, tipado fuerte y adaptadores para varios frameworks—, pero se instalan por separado. No controla el ciclo de vida de la aplicación: se integra dentro de ella.

## Para qué sirve

Resuelve problemas que aparecen en casi cualquier aplicación React: cuándo volver a pedir datos, cómo evitar dos peticiones iguales, cómo mantener una tabla con muchas filas sin recalcularlo todo en cada render. Un caso reconocible es un panel con filtros: Query cachea la respuesta por clave, Table aplica el filtro sobre esos datos y Router conserva el filtro en la URL para que se pueda compartir.

## Cuándo usarla

Conviene cuando ya se usa React y la aplicación tiene datos remotos o tablas complejas, y se quiere una solución probada con una API coherente entre paquetes. Resulta especialmente útil cuando varias pantallas consumen el mismo recurso y necesitas una caché compartida en lugar de un `useEffect` por componente.

## Cuándo no

No aporta nada a una web estática de lectura: no hay datos que cachear ni interacción que gestionar. Tampoco sustituye al estado local de un componente: un interruptor o el valor de un campo no necesitan ir a una caché global. Si solo se necesitan datos remotos en un par de componentes, una solución más pequeña puede bastar.

## Alternativas

SWR es la alternativa directa a TanStack Query: ambos cachean datos remotos en React. La diferencia está en el alcance. SWR es una biblioteca pequeña centrada en *fetching* con una API muy simple; Query añade invalidación por claves, actualización al recuperar el foco, mutaciones y herramientas de depuración más completas, a costa de más conceptos que aprender. Para tablas o formularios la alternativa no es SWR, sino resolverlos con componentes propios mientras la complejidad sea baja.

## Ejemplo

```tsx
import { useQuery } from "@tanstack/react-query";

function Entradas() {
  const { data, isPending } = useQuery({
    queryKey: ["entradas"],
    queryFn: () => fetch("/api/entradas").then((r) => r.json()),
  });

  if (isPending) return <p>Cargando…</p>;
  return <ul>{data.map((e) => <li key={e.slug}>{e.titulo}</li>)}</ul>;
}
```

La clave `entradas` identifica la caché: otra pantalla que pida la misma clave reutiliza el resultado en lugar de repetir la petición. Cambiar la clave obliga a recargar, así que conviene elegirla con cuidado.
