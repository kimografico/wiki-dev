---
fecha: 2026-10-13
titulo: Vite
resumen: Servidor de desarrollo y empaquetador que sirve los módulos al instante y prepara el build optimizado.
categoria: herramienta
tags: [frontend, terminal, nivel-0]
alias: []
relacionados: [astro, bundler, vitest, rollup]
alternativas: ["rollup", "webpack"]
web: https://vite.dev
npm: vite
fuentes: [https://vite.dev/guide/]
---

## Qué es

Vite es una herramienta de desarrollo y construcción para frontend. En modo desarrollo sirve los módulos directamente al navegador y recarga solo la parte cambiada; al generar el sitio, empaqueta y optimiza los recursos. Conviene no reducirlo a «un empaquetador»: su valor está sobre todo en el servidor de desarrollo, que evita recompilar media aplicación cada vez que se guarda un archivo.

## Para qué sirve

Acelera el ciclo guardar-ver y produce el build de producción. Astro apoya en Vite su servidor local y su salida final, por lo que en este proyecto aparece de forma indirecta: se nota en la rapidez de `npm run dev` y en las opciones de configuración que se pueden trasladar. Vitest reutiliza la misma configuración, así que las pruebas y la aplicación comparten dependencias y aliases.

## Cuándo usarlo

En proyectos frontend que quieran arrancar rápido, ver los cambios al instante y generar un sitio optimizado sin escribir una configuración de empaquetado extensa. Encaja tanto en aplicaciones como en sitios estáticos gestionados por un marco de trabajo que ya lo integra.

## Cuándo no

Si una cadena de build consolidada ya funciona y nadie va a mantener una migración, cambiarla solo por moda añade riesgo. En proyectos sin frontend, o donde el despliegue impone una configuración muy particular heredada de otra herramienta, conviene evaluar el coste antes de mover nada.

## Alternativas

Rollup es el motor de empaquetado muy usado para bibliotecas y da más control sobre los formatos de salida. Webpack domina en proyectos antiguos con loaders y plugins específicos. Vite gana en experiencia de desarrollo y en configuración inicial; frente a Rollup, añade el servidor que le falta, y frente a Webpack, evita gran parte del trabajo manual. Para una aplicación nueva, Vite suele ser el punto de partida; para una biblioteca, Rollup sigue siendo una opción más precisa; para un proyecto heredado, mantener Webpack puede ser lo sensato.

## Ejemplo

```bash
npm run dev     # servidor de desarrollo con recarga
npm run build   # build de producción
```

```js
// astro.config.mjs: opciones de Vite trasladadas al proyecto
import { defineConfig } from "astro/config";

export default defineConfig({
  vite: { server: { port: 3000 } },
});
```

## Matices

Que Astro use Vite por debajo no obliga a configurarlo a mano. La mayoría de los proyectos se quedan con los valores por defecto y solo ajustan opciones concretas cuando una dependencia lo pide.
