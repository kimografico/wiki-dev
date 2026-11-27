---
fecha: 2026-10-13
titulo: Ember
resumen: Framework opinionado con convenciones fuertes que guía la estructura, el enrutado y los datos para que equipos grandes trabajen igual.
categoria: framework
tags: [frontend]
alias: [Ember.js]
relacionados: [angular, react, typescript]
alternativas: [react, angular]
web: https://emberjs.com
fuentes: [https://guides.emberjs.com/]
---

## Qué es

Ember es un framework para aplicaciones web que apuesta por las convenciones fuertes: si sigues la estructura esperada, mucho se resuelve sin configurar. Incluye enrutado, modelos y plantillas en un conjunto coherente. No es una biblioteca de componentes suelta: define dónde va cada archivo y cómo se conectan las piezas. Esa rigidez es deliberada; dos equipos que usen Ember deberían reconocerse el código mutuamente sin leer una guía interna.

## Para qué sirve

Está pensado para aplicaciones ambiciosas y equipos grandes. La uniformidad importa cuando muchas personas cambian las mismas pantallas: si la ruta `/glosario` siempre se apoya en `app/routes/glosario.js` y su plantilla correspondiente, buscar el origen de un dato es predecible. También ayuda el ciclo de actualizaciones cuidado: los cambios de API se acompañan de guías de migración, algo valioso cuando el proyecto va a vivir años.

## Cuándo usarla

- La aplicación tendrá muchas rutas y convivirá con ella un equipo numeroso.
- Valoras que la estructura venga dada y que las actualizaciones estén guiadas.
- Quieres enrutado y gestión de datos resueltos sin elegir bibliotecas por separado.
- El coste de que cada persona invente su propia organización es mayor que aprender las convenciones.

## Cuándo no

Cuando quieres libertad para elegir cada pieza o el proyecto es pequeño: su enfoque opinionado y su peso sobran para una página de contenido. Tampoco es la vía más corta para experimentar: si una idea se probará en una tarde, imponer una estructura completa puede retrasar la respuesta. En una wiki estática, una SPA de este tipo no aporta nada sobre HTML ya generado.

## Alternativas

| Opción | Criterio para elegirla |
| --- | --- |
| React | Prefieres decidir enrutado, estado y estilos por separado y ya tienes experiencia con ese ecosistema. |
| Angular | También es «todo integrado», con inyección de dependencias y señales como rasgos propios. |
| Ember | Buscas convenciones muy marcadas y actualizaciones pensadas para proyectos de larga vida. |

La diferencia entre Ember y Angular no es si son opinionados, sino qué convenciones imponen y qué herramientas consideran propias.

## Ejemplo

Dos archivos que se corresponden por convención:

```js
// app/router.js
import EmberRouter from "@ember/routing/router";

const Router = EmberRouter.extend();

Router.map(function () {
  this.route("glosario");
  this.route("paquetes");
});

export default Router;
```

```js
// app/routes/glosario.js
import Route from "@ember/routing/route";

export default class GlosarioRoute extends Route {
  model() {
    return fetch("/api/glosario").then((respuesta) => respuesta.json());
  }
}
```

La ruta `glosario` busca automáticamente `app/routes/glosario.js` y su plantilla `app/templates/glosario.hbs`. El método `model` prepara los datos que la plantilla recibe como `this.model`.

## Matices

«Convención sobre configuración» no significa ausencia de configuración: significa que lo habitual ya está decidido y solo se ajusta lo excepcional. Por eso conviene seguir la estructura estándar antes de personalizarla; pelear contra las convenciones elimina la principal ventaja de Ember.
