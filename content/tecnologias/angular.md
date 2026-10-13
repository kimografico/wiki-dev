---
titulo: Angular
resumen: Framework completo, con TypeScript de serie, que trae enrutado, formularios y herramientas bajo un mismo enfoque opinionado.
categoria: framework
tags: [frontend]
alias: []
relacionados: [typescript, react]
alternativas: [react, vue]
web: https://angular.dev
fuentes: [https://angular.dev/overview]
---

## Qué es

Angular es un framework de plataforma completa para aplicaciones de una sola página. Incluye inyección de dependencias, enrutado, formularios y un conjunto de herramientas oficiales, todo sobre TypeScript.

## Para qué sirve

Está pensado para aplicaciones grandes y equipos numerosos: ofrece estructura, convenciones y herramientas integradas, de modo que no hay que elegir y ensamblar cada pieza por separado.

## Cuándo usarla

Cuando el proyecto es una aplicación grande y de larga vida, y se valora un framework opinado con todo integrado y soporte empresarial.

## Cuándo no

Para una wiki de lectura es demasiado: su peso y su curva de aprendizaje no compensan cuando apenas hay interactividad.

## Alternativas

React ofrece más libertad a cambio de decidir más piezas tú mismo; Vue queda en un punto medio; Lit evita el framework y trabaja con el estándar del navegador.

## Ejemplo

```ts
import { Component, signal } from "@angular/core";

@Component({
  selector: "app-contador",
  template: `<button (click)="n.set(n() + 1)">{{ n() }}</button>`,
})
export class Contador {
  n = signal(0);
}
```
