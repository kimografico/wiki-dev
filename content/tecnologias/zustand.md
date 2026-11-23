---
titulo: Zustand
resumen: "Gestor de estado minimalista para React sin providers ni boilerplate, con un almacén fuera de los componentes."
categoria: estado
tags: [frontend]
alias: []
relacionados: [react]
fuentes: ["https://zustand.docs.pmnd.rs/"]
autoenlace: true
alternativas: []
web: https://zustand.docs.pmnd.rs/
npm: zustand
---

## Qué es

Zustand es una librería de gestión de estado para React (y otros frameworks) que crea un almacén fuera del árbol de componentes y lo conecta con un hook (`useStore`). No necesita provider, contexto ni decoradores: la store se define con una función que devuelve el estado y sus acciones.

## Para qué sirve

Compartir estado entre componentes que no están emparentados (tema, sesión, carrito, estado de un formulario largo) sin prop drilling y sin la verbosidad de un store clásico. Se usa también para estado del servidor en caché y para lógica de UI que no merece un reducer entero.

## Cuándo usarla

Cuando varias partes de la interfaz leen o escriben el mismo estado y el contexto de React se vuelve verboso. Encaja muy bien con el patrón de *hooks*: cada componente selecciona solo la parte del estado que necesita y se re-renderiza solo cuando esa parte cambia.

## Cuándo no

Para estado local de un solo componente, `useState` sigue siendo más simple. Si necesitas devtools estrictas, middleware de persistencia formal o un patrón Redux documentado a nivel empresarial, valora Redux Toolkit; Zustand prefiere la mínima abstracción.

## Alternativas

Redux Toolkit aporta estructura y herramientas para apps grandes; Jotai y Valfred (Valtio) abordan el estado de forma atómica o por proxies; el Context API de React sirve sin dependencias, aunque dispara re-renderizados más fácil.

## Ejemplo

```tsx
import { create } from "zustand";

interface EstadoTema {
  oscuro: boolean;
  alternar: () => void;
}

export const useTema = create<EstadoTema>((set) => ({
  oscuro: false,
  alternar: () => set((estado) => ({ oscuro: !estado.oscuro })),
}));

function Interruptor() {
  const { oscuro, alternar } = useTema();
  return <button onClick={alternar}>{oscuro ? "Claro" : "Oscuro"}</button>;
}
```
