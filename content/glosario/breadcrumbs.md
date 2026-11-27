---
titulo: "Breadcrumbs"
resumen: "Navegación secundaria que muestra la ruta desde la raíz hasta la página actual."
categoria: concepto
tags: ["nivel-0"]
alias: ["migas de pan"]
relacionados: [slug, url, html-semantico, aria]
fuentes: []
autoenlace: true
---
## Definición

Las breadcrumbs, o «migas de pan», son una navegación secundaria que muestra la ruta desde la sección raíz hasta la página actual. Suelen ir en horizontal y separarse con `›`. No sustituyen al menú principal: responden a la pregunta «¿dónde estoy dentro de este sitio?», no a «¿qué secciones hay?».

## Por qué importa

En una wiki con cientos de fichas, el lector llega desde un buscador y no conoce la estructura. Una ruta `Inicio › Glosario › Closure` permite volver a Glosario con un clic y muestra que Closure es una ficha del glosario. También ayudan a los lectores de pantalla si se marcan como navegación con `aria-label`, y aportan contexto a los buscadores cuando se usa HTML semántico.

## Ejemplo

```html
<nav aria-label="Ruta de navegación">
  <ol>
    <li><a href="/">Inicio</a></li>
    <li><a href="/glosario/">Glosario</a></li>
    <li aria-current="page">Closure</li>
  </ol>
</nav>
```

El último elemento no enlaza: ya es la página actual.

## Se confunde con

Con el slug. El slug identifica la página en la URL y no suele contener la jerarquía completa; las migas muestran el camino de navegación. Tampoco es un índice: el índice lista secciones, mientras que las migas solo describen la ruta recorrida. En sitios muy planos, añadirlas sin jerarquía real solo añade ruido.
