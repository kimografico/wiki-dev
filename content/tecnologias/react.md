---
titulo: React
resumen: Biblioteca para construir interfaces a partir de componentes y estado, que aquí se usa solo dentro de islas concretas.
categoria: framework
tags: [frontend]
alias: []
relacionados: [arquitectura-de-islas, hidratacion, astro]
alternativas: [vue, angular, lit]
web: https://react.dev
fuentes: [https://react.dev/learn]
---

## Qué es

React es una librería para construir interfaces a partir de componentes reutilizables. Cada componente describe cómo se ve una parte de la pantalla según su estado, y React se encarga de actualizar el DOM cuando ese estado cambia.

## Para qué sirve

Brilla cuando hay interactividad real: formularios, filtros, contadores, controles con estado. Su modelo de componentes y su ecosistema lo hacen muy habitual en equipos grandes.

## Cuándo usarla

Cuando un fragmento concreto necesita estado en el navegador. En este proyecto es la pieza interactiva (por ejemplo, el interruptor de tema) dentro de una página por lo demás estática.

## Cuándo no

Para contenido que solo se lee: enviar React a una página de texto es peso innecesario. Tampoco es la mejor elección si el proyecto ya está muy alineado con otro framework.

## Alternativas

Vue y Angular cubren casos parecidos con distinta filosofía; Lit acerca los componentes web estándar; Astro permite prescindir de un framework en la mayoría de páginas.

## Ejemplo

```tsx
export function Contador() {
  const [n, setN] = useState(0);
  return <button onClick={() => setN(n + 1)}>{n}</button>;
}
```
