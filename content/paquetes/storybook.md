---
fecha: 2026-10-13
titulo: Storybook
resumen: Entorno aislado y muy extendido para desarrollar, documentar y probar componentes de interfaz.
categoria: herramienta
tags: [frontend]
alias: []
relacionados: [astrobook, astro, componentizacion, snapshot]
alternativas: [astrobook]
web: https://storybook.js.org
npm: storybook
fuentes: [https://storybook.js.org/docs]
---

## Qué es

Storybook es un entorno aislado para desarrollar componentes de interfaz. Cada componente se muestra con sus variantes, llamadas stories, y se pueden cambiar sus propiedades desde controles sin arrancar la aplicación completa. No es un marco de interfaz ni un sustituto de las pruebas: es un taller donde ver y documentar estados.

## Para qué sirve

Permite trabajar en un botón con su estado normal, desactivado y de carga sin navegar hasta la pantalla donde aparece. Sirve también para documentar cuándo usar cada variante y para detectar regresiones visuales: si un cambio de CSS altera una story, la diferencia se ve antes de mezclarlo. En equipos con React, Vue o Angular suele ser el lugar común para revisar el diseño.

## Cuándo usarlo

Cuando hay muchos componentes reutilizables, conviene exhibir sus estados y se quiere que diseño y desarrollo hablen el mismo lenguaje. Aporta menos si la interfaz son unas pocas páginas que nadie reutiliza.

## Cuándo no

En un proyecto de Astro, Astrobook encaja mejor: entiende los componentes de Astro y no exige montar un ecosistema paralelo. Storybook también añade configuración y peso que una wiki pequeña no necesita. Si el objetivo es comprobar comportamiento, una prueba automatizada da una señal más fiable que mirar una story a ojo.

## Alternativas

Astrobook es la alternativa específica para Astro y la que usa este proyecto. Storybook tiene un ecosistema más amplio y más extensiones, pero esa flexibilidad solo compensa cuando el proyecto tiene bastantes componentes y una comunidad que mantenga esa configuración. Para decidir: si los componentes son `.astro`, Astrobook; si son React o Vue y el equipo ya trabaja con Storybook, mantenerlo.

## Ejemplo

```tsx
// Badge.stories.tsx (React)
import Badge from "./Badge";

export default { title: "Interfaz/Badge", component: Badge };

export const Basico = { args: { children: "React" } };
export const Desactivado = { args: { children: "React", disabled: true } };
```

## Matices

Una story no es una prueba. Muestra un estado, pero no falla cuando el resultado cambia salvo que se añada una comparación visual o una aserción. Conviene combinarla con pruebas de componente y reservar el modo visual para revisar estética y accesibilidad.
