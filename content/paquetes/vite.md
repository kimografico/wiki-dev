---
titulo: Vite
resumen: Servidor de desarrollo y empaquetador que sirve los módulos al instante y prepara el build optimizado.
categoria: herramienta
tags: [frontend, terminal]
alias: []
relacionados: [bundler, astro]
alternativas: []
web: https://vite.dev
npm: vite
fuentes: [https://vite.dev/guide/]
---

## Qué es

Vite es una herramienta de desarrollo y build que incluye un servidor con recarga casi instantánea y un empaquetador para producción. Durante el desarrollo sirve los módulos nativos del navegador; al construir, agrupa y optimiza.

## Para qué sirve

Acelera el ciclo de trabajo (guardar y ver el cambio al momento) y produce el sitio final minificado. Astro lo usa por debajo, así que aquí aparece a través de su configuración.

## Cuándo usarlo

En cualquier proyecto frontend moderno que quiera un entorno de desarrollo rápido y un build sólido sin configurar un empaquetador a mano.

## Cuándo no

Si ya hay una cadena de build consolidada y funcionando, cambiarla solo por moda añade riesgo. En proyectos sin frontend no aplica.

## Alternativas

Webpack y esbuild cubren el mismo terreno en distintos momentos de su historia; aquí no se busca alternativa porque Astro ya integra Vite.

## Ejemplo

```bash
npm run dev     # servidor de desarrollo con recarga
npm run build   # build de producción
```
