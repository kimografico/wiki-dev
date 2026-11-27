---
fecha: 2026-10-13
titulo: Astro frente a Next.js
resumen: "Dos formas de construir para la web: contenido estático con islas frente a una aplicación React con render en servidor y rutas de datos."
categoria: framework
tags: [frontend, backend]
alias: []
relacionados: [astro, nextjs, arquitectura-de-islas, static-site-generation, hidratacion]
fuentes: []
autoenlace: true
entidades: [astro, nextjs]
contexto: "Elegir un framework cuando el sitio es sobre todo contenido, pero necesita algún componente interactivo o datos por petición."
---

## Contexto

**Astro** parte de una página documental: genera HTML y solo carga JavaScript cuando una isla lo pide. **Next.js** parte de una aplicación **React**: cada ruta puede renderizarse en servidor, generarse en el build o hidratarse en cliente. Ninguno es «mejor» en abstracto; la pregunta útil es dónde está la frontera dinámica del sitio.

Esta wiki es un ejemplo del primer caso: fichas en Markdown, salida estática y una isla aislada para la interactividad.

## Criterios

| Criterio | Astro | Next.js |
|---|---|---|
| Unidad de trabajo | Componentes `.astro` y colecciones de contenido | Componentes React por ruta |
| JavaScript inicial | Ninguno hasta que se pide una isla | Runtime de React en las rutas interactivas |
| Render por defecto | **Generación de sitio estático** | Servidor, estático o cliente según la ruta |
| Datos | Contenido disponible en el build | Datos por petición y rutas de API |
| Despliegue | Cualquier hosting estático, incluido **GitHub Pages** | Estático si la ruta es estática; con render por petición, plataforma con Node.js o funciones |
| Curva | HTML y Markdown familiares | Convenciones de React y del framework |

La **Arquitectura de islas** explica por qué Astro puede tener interactividad sin convertir toda la página en una aplicación. La **Hidratación** es el mecanismo que convierte el HTML estático en componentes vivos.

## Cuándo elegir cada una

Elige **Astro** para documentación, blogs, wikis o páginas de producto donde el contenido se lee más que se manipula. Aprovechas HTML rápido, buen posicionamiento y hosting barato; añades un buscador o un selector de tema solo donde hace falta.

Elige **Next.js** cuando la página depende del usuario o de datos frescos: paneles, carritos, autenticación o endpoints propios. También cuando el equipo ya trabaja en React y quiere una sola convención para rutas, datos y despliegue.

Evita **Next.js** para un folleto estático: pagarías servidor y JavaScript por algo que no cambia. Evita **Astro** si casi toda la interfaz es estado compartido y en tiempo real: acabarías hidratando casi todo.

## Ejemplos

```astro
---
import Buscador from "../componentes/Buscador.jsx";
---
<article><h1>Comparativas</h1></article>
<Buscador client:visible />
```

```tsx
export default async function Pedidos() {
  const pedidos = await fetch("/api/pedidos", { cache: "no-store" })
    .then((r) => r.json());
  return <ul>{pedidos.map((p) => <li key={p.id}>{p.total}</li>)}</ul>;
}
```

## Matices

Astro también puede renderizar en servidor y Next.js puede generar páginas estáticas. La diferencia está en el camino por defecto, no en una lista cerrada de capacidades. Cambiar de framework no arregla un modelo de datos confuso: decide primero qué debe calcularse en el build y qué debe responder a cada petición.
