---
titulo: Next.js
resumen: Framework sobre React que añade enrutado por archivos, renderizado en servidor y generación estática.
categoria: framework
tags: [frontend, backend]
alias: [Next]
relacionados: [react]
alternativas: [astro, react]
web: https://nextjs.org
fuentes: [https://nextjs.org/docs]
---

## Qué es

Next.js es un framework construido sobre React. Aporta enrutado basado en archivos, renderizado en el servidor, generación estática y rutas de API, de forma que se cubren partes de frontend y de backend en un mismo proyecto.

## Para qué sirve

Sirve para aplicaciones React que necesitan mezclar páginas estáticas, renderizadas en servidor y dinámicas, además de endpoints en el mismo repositorio.

## Cuándo usarla

Cuando el proyecto es principalmente React y requiere datos por petición, sesiones o backend integrado, y quieres una ruta de crecimiento conocida.

## Cuándo no

Cuando casi todo es contenido que se lee: una wiki se beneficia más de la generación estática por defecto y del JavaScript mínimo de Astro.

## Alternativas

Astro prioriza HTML estático e islas y es ideal para contenido; React a secas deja el enrutado y el renderizado en tus manos.

## Ejemplo

```tsx
// app/paquetes/[slug]/page.tsx
export default async function Page({ params }) {
  const { slug } = await params;
  return <h1>{slug}</h1>;
}
```
