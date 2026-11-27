---
titulo: "Bootstrap"
resumen: "Framework de CSS con componentes y rejilla responsive listos para montar interfaces coherentes sin diseñar cada pieza desde cero."
categoria: estilos
tags: ["frontend", "accesibilidad"]
alias: []
relacionados: ["css", "tailwindcss", "accesibilidad-web"]
fuentes: ["https://getbootstrap.com/docs/"]
autoenlace: true
alternativas: ["tailwindcss"]
web: "https://getbootstrap.com/"
---
## Qué es

Bootstrap es una colección de CSS y clases utilitarias que ofrece una rejilla, tipografía, botones, tablas, formularios y componentes como alertas o tarjetas. Incluye además algo de JavaScript para piezas que necesitan comportamiento, como menús o modales. Consta de dos ideas: un sistema de rejilla para distribuir columnas según el ancho de pantalla y un vocabulario de clases que se añaden al HTML. No decide rutas ni estado: solo la presentación.

## Para qué sirve

Da una base visual coherente sin dibujar cada botón. Es útil en un panel interno, una prueba de concepto o una página de administración donde se necesita que la tabla se lea bien en móvil y que los formularios tengan el mismo aspecto en todas las pantallas. En lugar de escribir media queries para cada componente, se usan clases de la rejilla y el resultado ya se adapta al ancho disponible.

## Cuándo usarla

- El objetivo es terminar rápido y el diseño no es el diferenciador del producto.
- Varias personas van a tocar la interfaz y conviene compartir un vocabulario de clases.
- Necesitas componentes frecuentes ya resueltos y probados en distintos anchos.

## Cuándo no

Cuando el producto tiene un sistema visual propio muy específico: pelear contra los estilos de Bootstrap para llegar al diseño deseado suele costar más que partir de CSS propio. Tampoco encaja en una web donde cada byte de CSS cuenta y solo se usan tres clases. Si ya trabajas con utilidades a medida, añadir otro vocabulario de clases crea dos formas de hacer lo mismo.

## Alternativas

| Opción | Criterio para elegirla |
| --- | --- |
| Bootstrap | Quieres componentes terminados y una rejilla ya definida; decides menos y avanzas rápido. |
| Tailwind CSS | Prefieres construir la interfaz combinando utilidades pequeñas y ajustar el diseño sin pelear con estilos previos. |
| CSS propio | El diseño es muy singular o el proyecto es tan pequeño que una librería sería peso muerto. |

La diferencia clave está en el punto de partida: Bootstrap parte de componentes; Tailwind, de utilidades; CSS propio, de una hoja en blanco.

## Ejemplo

```html
<div class="container">
  <div class="row">
    <div class="col-12 col-md-6">
      <div class="alert alert-info">Revisa los enlaces antes de publicar.</div>
      <button type="button" class="btn btn-primary">Guardar</button>
    </div>
  </div>
</div>
```

En pantallas estrechas la columna ocupa los doce espacios y el botón va debajo; desde el ancho `md` ocupa la mitad. Las clases describen el resultado, no el mecanismo de media queries.

## Matices

Usar Bootstrap no exime de accesibilidad: un `button` con clase `btn` sigue necesitando un texto claro, y una alerta que cambia de forma dinámica necesita un anuncio para lectores de pantalla. La librería aporta estilos; la semántica correcta sigue siendo responsabilidad del HTML.
