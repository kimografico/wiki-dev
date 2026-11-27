---
titulo: "Microfrontend"
resumen: "Arquitectura que divide una interfaz grande en aplicaciones pequeñas desplegables de forma independiente."
categoria: framework
tags: ["frontend"]
alias: []
relacionados: [microservicio, componentizacion, monolito, router]
fuentes: []
autoenlace: true
---

## Definición

Un microfrontend divide una interfaz grande en aplicaciones pequeñas que se despliegan por separado y se ensamblan en una misma página. Cada equipo dueño de una parte —catálogo, carrito, cabecera— puede publicar sus cambios sin coordinar un despliegue global.

## Por qué importa

En una tienda con cinco equipos, esperar a que todos terminen para liberar la web entera es un cuello de botella. Al separar por dominio, el equipo del carrito corrige un fallo sin tocar el catálogo. El coste es que la página final ya no es una sola aplicación: hay que acordar contratos, diseñar un shell que componga las piezas y vigilar que cada trozo no cargue su propia copia de React.

## Ejemplo

Un shell en Astro que reserva `<div id="carrito">` e hidrata solo esa isla con la aplicación del carrito, mientras el catálogo sigue siendo HTML estático.

## Se confunde con

Con un Microservicio: ese vive en el servidor y expone una API; el microfrontend vive en el navegador y renderiza interfaz. Tampoco es Componentización: componentizar divide el código dentro de una aplicación; microfrontend divide la aplicación en varias. Frente al Monolito, gana autonomía de despliegue pero añade complejidad de composición; para un sitio pequeño, ese coste rara vez se amortiza.
