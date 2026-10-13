---
titulo: Astro frente a Next.js
resumen: Comparativa entre generar HTML estático con islas (Astro) y un framework React con render en servidor (Next.js).
categoria: framework
tags: [frontend, backend]
alias: []
relacionados: [astro, nextjs]
entidades: [astro, nextjs]
contexto: Elegir un framework para publicar contenido con algo de interactividad.
---

## Contexto

Astro y Next.js parten de mundos distintos. Astro asume que la página es contenido que se lee y añade interactividad por islas; Next.js asume una aplicación React y ofrece render en servidor, generación estática y backend en el mismo sitio.

## Criterios

- **JavaScript enviado**: Astro permite cero JS por defecto; Next.js suele enviar el framework a las páginas.
- **Modelo de render**: Astro genera estático por defecto; Next.js combina estático, servidor y cliente.
- **Backend**: Next.js incluye rutas de API; Astro se centra en el contenido.
- **Interactividad**: ambas soportan React, Vue u otros, pero con estrategias de hidratación distintas.

## Cuándo elegir cada una

Elige **Astro** cuando el contenido manda: documentación, wikis o blogs, donde el HTML estático y el poco JavaScript son la clave. Elige **Next.js** cuando es una aplicación React que necesita datos por petición, sesiones o endpoints.

Esta wiki es de contenido, así que Astro es la elección natural.

## Ejemplos

Las fichas de Astro y de Next.js desarrollan cada enfoque con sus propios ejemplos.
