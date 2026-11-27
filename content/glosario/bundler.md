---
fecha: 2026-10-13
titulo: Bundler
resumen: Herramienta que reúne y transforma muchos archivos de código en unos pocos listos para el navegador.
categoria: concepto
tags: [frontend, rendimiento]
alias: [empaquetador]
relacionados: [build, vite, rollup, code-splitting]
terminoEn: Bundler
---
## Definición

Un *bundler* (o empaquetador) toma los módulos de un proyecto, resuelve sus importaciones, aplica transformaciones y los combina en archivos optimizados para el navegador. Como entrada tiene componentes, hojas de estilo e imágenes repartidos en carpetas; como salida, unos pocos ficheros en `dist/` que el servidor puede entregar sin conocer el código original. Para decidir el orden, construye un grafo de dependencias a partir de las importaciones.

## Por qué importa

El navegador no ejecuta TypeScript ni entiende las importaciones desnudas de Node, y descargar cientos de archivos sueltos multiplica las peticiones. El empaquetador resuelve ambas cosas a la vez. Además ofrece optimizaciones que no conviene hacer a mano: minificar nombres, eliminar ramas inalcanzables y separar fragmentos por ruta. Así una aplicación puede reducir notablemente el código inicial sin cambiar lo que hace.

## Ejemplo

```bash
vite build   # agrupa y optimiza el sitio en dist/
```

## Se confunde con

Con el servidor de desarrollo: Vite ofrece recarga en caliente mientras escribes y, por separado, un modo `build` que genera el artefacto. También se confunde con el builder: empaquetar es una tarea dentro de la construcción, pero un builder puede además comprobar tipos, copiar recursos o preparar la publicación.
