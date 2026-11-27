---
fecha: 2026-10-13
titulo: Astrobook
resumen: Visor de componentes para Astro, en desarrollo, que muestra cada componente aislado con sus variantes (stories).
categoria: herramienta
tags: [frontend]
alias: []
relacionados: [astro, storybook]
alternativas: [storybook]
web: https://github.com/ocavue/astrobook
npm: astrobook
fuentes: [https://github.com/ocavue/astrobook]
---

## Qué es

Astrobook es un visor de componentes para Astro que muestra cada componente de forma aislada en una página propia. Cada estado que quieres revisar se define como una *story*: una combinación concreta de propiedades que renderiza el componente sin montar una página completa alrededor. Es una herramienta de desarrollo: se registra en la configuración de Astro y solo se activa cuando levantas el servidor local.

## Para qué sirve

Permite ver y ajustar un componente en todos sus estados sin navegar por la web para encontrarlo. Caso concreto: una insignia con variantes de color y tamaño; en lugar de editar tres páginas para comprobarlas, abres Astrobook y ves las tres stories juntas. En esta wiki sirve para revisar insignias, listas y fichas mientras se construyen, con la misma hoja de estilos global que usa el sitio publicado.

## Cuándo usarlo

- Cuando un componente tiene varias variantes y quieres documentarlas visualmente mientras lo desarrollas.
- Cuando necesitas comprobar un estado poco frecuente —carga, error, lista vacía— sin provocarlos en la aplicación real.
- Cuando el equipo quiere una referencia visual compartida de la interfaz que viaja con el código.

## Cuándo no

- No forma parte del sitio publicado: no es una galería para usuarios finales.
- No sustituye a las pruebas de integración: ver un componente no demuestra que responda bien a un clic.
- Si el proyecto tiene pocos componentes y pocos estados, la configuración extra puede no compensar.

## Alternativas

Storybook es el estándar general y tiene más ecosistema (complementos, integraciones, soporte para varios frameworks), pero también más configuración y peso. Astrobook es más ligero y entiende el modelo de componentes de Astro sin adaptadores: por eso se usa aquí. La decisión depende de si trabajas solo con Astro y te basta con lo esencial, o si necesitas el ecosistema de Storybook o compartir el visor entre proyectos de frameworks distintos.

## Matices

Una story no es una prueba. Sirve para inspeccionar y para conversar sobre el diseño, pero no falla la integración continua cuando el componente se rompe. Conviene mantenerla como apoyo visual y dejar la comprobación de comportamiento a las pruebas. Tampoco conviene confundir su página con el sitio real: se sirve en una ruta separada, configurada en el arranque de Astro y normalmente limitada al entorno de desarrollo.

## Ejemplo

```ts
// astro.config.mjs — la integración se registra solo en desarrollo
import { defineConfig } from "astro/config";
import astrobook from "astrobook";

const soloDesarrollo = process.env.NODE_ENV === "development";

export default defineConfig({
  integrations: [
    ...(soloDesarrollo
      ? [
          astrobook({
            subpath: "/astrobook",
            css: ["./src/styles/global.css"],
          }),
        ]
      : []),
  ],
});
```

En el código que corre dentro de Astro, el condicional equivalente es `import.meta.env.DEV`:

```js
if (import.meta.env.DEV) {
  // lógica que solo se ejecuta en desarrollo
}
```

Con esto, `/astrobook` lista las stories del proyecto en local. El condicional del archivo de configuración deja el array de integraciones sin Astrobook en el build de producción, así que la galería no se publica.
