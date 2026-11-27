---
fecha: 2026-10-13
titulo: Next.js
resumen: "Framework sobre React que añade enrutado por archivos, renderizado en servidor y generación estática; cuándo compensa frente a Astro."
categoria: framework
tags: [frontend, backend]
alias: [Next]
relacionados: [react, astro, vercel, hidratacion]
alternativas: [astro]
web: https://nextjs.org
fuentes: [https://nextjs.org/docs/app]
---

## Qué es

Next.js es un framework construido sobre React. Aporta enrutado basado en archivos, renderizado en servidor, generación estática y rutas de API, de modo que frontend y parte del backend viven en el mismo proyecto. No es «otro React»: los componentes siguen siendo React. La duda habitual es si React ya incluye todo esto; no. React es la capa de interfaz, mientras que Next.js decide cómo se sirve esa interfaz y en dónde se ejecuta cada parte.

## Para qué sirve

Sirve para aplicaciones que mezclan páginas que se pueden generar por adelantado con vistas que necesitan datos en cada petición: un catálogo con fichas estáticas y un panel que consulta la sesión del usuario, por ejemplo. 

## Cuándo usarla

Cuando el equipo ya trabaja con React y necesita sesiones, autorización, datos por petición o rutas de API; cuando interesa una convención conocida para organizar páginas y cargas de datos; o cuando el despliegue se apoya en plataformas que entienden este modelo y ofrecen vistas previas por rama.

## Cuándo no

Cuando casi todo el sitio es contenido que se lee y no cambia por usuario. Una wiki se beneficia más de generar HTML estático y enviar JavaScript solo a las piezas interactivas: cargar el framework en cada ficha es peso innecesario. Tampoco compensa si no hay necesidades de servidor y un generador estático resuelve el trabajo con menos configuración.

## Ejemplo

```tsx
// app/paquetes/[slug]/page.tsx
export default async function Pagina({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <main>
      <h1>{slug}</h1>
    </main>
  );
}
```

La ruta del archivo define la URL: `app/paquetes/[slug]/page.tsx` responde a `/paquetes/<slug>`. El segmento es dinámico y `params` se espera antes de usarlo.

## Frente a Astro

| Criterio | Next.js | Astro |
| --- | --- | --- |
| Centro de gravedad | Aplicaciones con datos por petición | Contenido y páginas estáticas |
| JavaScript en la página | El que necesite la aplicación React | Solo el de las islas declaradas |
| Backend | Rutas de API integradas | Se añade por separado si hace falta |

La comparativa desarrollada está en Astro frente a Next.js. La elección no depende de cuál sea «mejor», sino de si el sitio se comporta como una aplicación o como un conjunto de documentos.

## Matices: dónde corre cada código

Parte del código se ejecuta en el servidor y nunca llega al navegador; el código que necesita estado o eventos del navegador se marca explícitamente como cliente. Esa distinción evita enviar librerías pesadas al usuario, pero exige tener clara la frontera: una variable calculada en servidor no está disponible en un control interactivo sin pasarla como propiedad. Para contenido estático, esa misma frontera es la que simplifica la Arquitectura de islas.
