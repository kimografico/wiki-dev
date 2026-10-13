---
titulo: Tailwind CSS
resumen: Framework de CSS que aporta utilidades de clase para componer estilos directamente en el marcado.
categoria: estilos
tags: [frontend]
alias: [Tailwind]
relacionados: []
alternativas: []
web: https://tailwindcss.com
fuentes: [https://tailwindcss.com/docs]
---

## Qué es

Tailwind CSS es un framework de estilos basado en utilidades: en lugar de escribir reglas CSS con nombres propios, se combinan clases pequeñas (`flex`, `text-sm`, `bg-surface`) directamente en el HTML.

## Para qué sirve

Da un sistema de diseño consistente sin inventar nombres de clase para cada bloque, y permite ajustar los estilos en el mismo lugar donde se construye el componente.

## Cuándo usarla

Cuando el diseño se apoya en un conjunto acotado de tokens (colores, espaciados, tipografía) y se quiere evitar CSS que crece sin control. Es el caso de esta wiki, con su paleta en variables.

## Cuándo no

Si el equipo prefiere CSS con clases semánticas o si hay mucho estilo dinámico generado, la mezcla de utilidades en el marcado puede resultar incómoda.

## Alternativas

CSS Modules, CSS-in-JS o CSS plano con buenas convenciones cubren necesidades similares con otra relación entre estilos y marcado.

## Ejemplo

```html
<a class="rounded-lg bg-primary px-3 py-2 text-white">Ver</a>
```

Los colores provienen de los tokens definidos como variables CSS.
