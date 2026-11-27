---
fecha: 2026-10-13
titulo: React
resumen: "Biblioteca de componentes con estado para interfaces interactivas; cuándo compensa y por qué aquí se usa solo en islas concretas."
categoria: framework
tags: [frontend]
alias: []
relacionados: [arquitectura-de-islas, hidratacion, astro, virtual-dom]
alternativas: [vue, angular, lit]
web: https://react.dev
fuentes: [https://react.dev/learn]
---

## Qué es

React es una biblioteca para construir interfaces a partir de componentes: funciones que describen qué se ve según su estado. Al cambiar ese estado, React vuelve a ejecutar la función, compara el resultado con el DOM y actualiza lo necesario. No incluye enrutado, cliente HTTP, acceso a base de datos ni sistema de build: esas decisiones las toma el proyecto o un framework como Next.js. Confundir esas capas es la duda más frecuente: un contador es React; decidir en qué URL aparece, no.

## Para qué sirve

Brilla cuando hay interactividad real: filtros, formularios con validación, contadores o controles que recuerdan una elección. En esta wiki, el interruptor de tema es una isla React dentro de una página por lo demás estática: el texto de la ficha se entrega como HTML y solo ese control necesita estado en el navegador.

## Cuándo usarla

Cuando un fragmento concreto requiere estado o eventos en el navegador; cuando el equipo conoce el modelo de componentes y quiere aprovechar su ecosistema; o cuando se construye una aplicación donde muchas piezas comparten comportamiento. Para integrarlo en un sitio estático basta declarar la isla, sin convertir todas las páginas en una aplicación.

## Cuándo no

Para contenido que solo se lee: enviar React en una página de texto añade peso sin aportar nada. Si la interacción se resuelve con un par de líneas de JavaScript, tampoco compensa. 

## Ejemplo

```tsx
import { useState } from "react";

export function Filtro({ items }: { items: string[] }) {
  const [q, setQ] = useState("");
  const visibles = items.filter((item) =>
    item.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <>
      <input value={q} onChange={(event) => setQ(event.target.value)} />
      <ul>
        {visibles.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </>
  );
}
```

El campo es controlado: `onChange` actualiza `q`, del que sale `visibles` durante el renderizado. La clave `key` identifica cada elemento.

## Matices: estado, renderizado y efectos

Cada `setQ` solicita un renderizado; React ejecuta la función de nuevo y recalcula la lista derivada. El estado no se modifica en su sitio: se sustituye por un valor nuevo. `useEffect` se reserva para sincronizar con algo externo —un temporizador, una suscripción, la API—, no para calcular valores que ya se deducen de las propiedades. Si esos datos viven en un servidor, conviene separarlos del estado local como explica Estado local frente a estado de servidor.

En una isla, React adjunta sus manejadores durante la Hidratación del HTML ya generado.

## Frente a otras opciones

| Opción | Diferencia principal | Criterio de decisión |
| --- | --- | --- |
| Vue | Plantillas y reactividad integrada | Preferirla si el equipo viene de HTML y CSS |
| Angular | Solución completa y opinionada | Preferirla en aplicaciones grandes con convenciones estrictas |
| Lit | Componentes web del navegador | Preferirla si la portabilidad pesa más que el ecosistema |
