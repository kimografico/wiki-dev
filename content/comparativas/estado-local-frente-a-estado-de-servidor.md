---
fecha: 2026-11-26
titulo: Estado local frente a estado de servidor
resumen: Criterios para decidir si un dato va en el estado del componente, en un store global o en la caché de una librería de datos remotos.
categoria: estado
tags: [frontend]
alias: [estado global frente a estado de servidor]
relacionados: [gestion-de-estado, react, tanstack, swr]
fuentes:
  - "https://react.dev/learn/managing-state"
  - "https://react.dev/learn/you-might-not-need-an-effect"
  - "https://redux.js.org/faq/general#when-should-i-use-redux"
  - "https://tanstack.com/query/latest/docs/framework/react/overview"
autoenlace: true
entidades: [gestion-de-estado, react, redux, zustand, tanstack, swr]
contexto: "En un dashboard React con filtros locales y un listado de pedidos procedente de una API, decidir qué va en estado local o global y qué debe gestionar la caché de datos remotos."
---

## Contexto

Un dashboard tiene filtros que el usuario cambia, un tema visual compartido y una lista de pedidos que viene de una API. Si todo acaba en el mismo store, aparecen problemas que no son de React sino de origen: datos remotos duplicados, sin revalidación y sin saber cuál copia manda.

La pregunta útil no es «qué librería de estado uso», sino **quién es dueño del dato**.

## Criterios

| Opción | Origen del dato | Ámbito | Cuándo elegirla | Coste / riesgo |
|---|---|---|---|---|
| `useState` / `useReducer` | Interfaz | Un componente o un subárbol pequeño | Un desplegable abierto, los campos de un formulario | Prop drilling si lo necesitan muchos niveles |
| Context / `zustand` | Cliente | Toda la app | Tema, sesión, filtros compartidos que no vienen de una API | Otra store que mantener; no cachea respuestas |
| `redux` (Toolkit) | Cliente | Toda la app, con muchas actualizaciones | Estado complejo y compartido, equipo grande, necesidad de trazar cambios | Más conceptos, código e indirección |
| `tanstack` / `swr` | Servidor | Toda la app, con caché | Listados, detalle, paginación, revalidación en segundo plano | Hay que entender caducidad y refresco; no es para formularios |

Los valores que se pueden calcular en el render no son estado: guardarlos y sincronizarlos con un efecto solo añade renders y oportunidades de desincronización.

## Cuándo elegir cada una

- **Estado local:** empieza aquí siempre. Sube el estado al padre común más cercano solo cuando dos hijos lo necesitan.
- **Store global ligero:** cuando el dato es de cliente y está lejos de quien lo usa. No tiene que venir de una API: tema e idioma son ejemplos típicos.
- **Redux Toolkit:** cuando la lógica de estado es compleja, se actualiza con frecuencia y conviene poder explicar cada cambio. Para código nuevo, usa Toolkit en lugar del core clásico.
- **Datos remotos:** cuando el dato vive en el servidor y puede quedar obsoleto. La librería se encarga de caché, deduplicación de peticiones y revalidación en segundo plano. TanStack Query añade recolección de entradas antiguas (`gcTime`); SWR no expone esa misma opción.

El error más caro es copiar una respuesta de API a un store global y escribir efectos para sincronizarlo. Si el dato tiene dueño en el servidor, déjalo en la capa de datos remotos.

## Ejemplos

```tsx
// Local: solo lo necesita este componente.
const [abierto, setAbierto] = useState(false);

// Remoto: TanStack Query / SWR poseen la copia y su ciclo de vida.
const { data: pedidos } = usePedidos({ estado: "abiertos" });

// Derivado: se calcula, no se guarda.
const total = pedidos?.reduce((sum, p) => sum + p.importe, 0) ?? 0;
```

Si más adelante otro componente necesita `abierto`, se eleva o se pasa a un store ligero. No se convierte en remoto: su origen sigue siendo la interfaz.
