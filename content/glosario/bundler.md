---
titulo: Bundler
resumen: Herramienta que reúne y transforma muchos archivos de código en unos pocos listos para el navegador.
categoria: concepto
tags: [frontend, rendimiento]
alias: [empaquetador]
relacionados: [vite]
terminoEn: Bundler
---

## Definición

Un *bundler* (o empaquetador) toma los muchos módulos de un proyecto, resuelve sus importaciones, los transforma (por ejemplo, TypeScript a JavaScript) y los agrupa en archivos optimizados para servir al navegador.

## Por qué importa

El navegador no entiende módulos Node ni TypeScript, y descargar cientos de archivos sueltos es lento. El bundler resuelve ambas cosas y además permite optimizaciones (minificar, dividir el código).

## Ejemplo

```bash
vite build   # agrupa y optimiza el sitio en dist/
```

## Se confunde con

Con el *servidor de desarrollo*. Muchos bundlers modernos, como Vite, incluyen ambos: un servidor con recarga en caliente para desarrollar y un modo `build` para empaquetar.
