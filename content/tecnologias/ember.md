---
titulo: Ember
resumen: Framework opinionado con convenciones fuertes («convention over configuration») y un ciclo de desarrollo muy guiado.
categoria: framework
tags: [frontend]
alias: [Ember.js]
relacionados: [angular]
alternativas: [react, angular]
web: https://emberjs.com
fuentes: [https://guides.emberjs.com/]
---

## Qué es

Ember es un framework para aplicaciones web que apuesta por las convenciones fuertes: si sigues las convenciones, mucho se resuelve sin configurar. Incluye enrutado, datos y herramientas en un mismo conjunto coherente.

## Para qué sirve

Está pensado para aplicaciones ambiciosas y equipos grandes: la uniformidad de estructura facilita que varias personas trabajen en el mismo código sin acordar cada detalle.

## Cuándo usarla

Cuando valoras convenciones estables, actualizaciones cuidadas y una comunidad que prioriza la coherencia a largo plazo.

## Cuándo no

Cuando quieres libertad para elegir piezas o el proyecto es pequeño: su enfoque opinionado y su peso sobran para una página de contenido.

## Alternativas

Angular es el otro framework «todo integrado»; React deja más decisiones al equipo; Lit renuncia al framework y usa el estándar del navegador.

## Ejemplo

```js
// app/router.js
Router.map(function () {
  this.route("glosario");
  this.route("paquetes");
});
```
