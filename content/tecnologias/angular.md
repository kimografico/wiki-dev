---
fecha: 2026-10-13
titulo: Angular
resumen: Framework completo sobre TypeScript que integra enrutado, formularios, inyección de dependencias y señales bajo convenciones compartidas.
categoria: framework
tags: [frontend]
alias: []
relacionados: [typescript, ember, react]
alternativas: [react, vue, lit]
web: https://angular.dev
fuentes: [https://angular.dev/overview]
---

## Qué es

Angular es un framework para aplicaciones de una sola página que cubre casi todas las decisiones estructurales: componentes, enrutado, formularios e inyección de dependencias. Se apoya en TypeScript y en señales (*signals*) para expresar estado reactivo. No es una librería de interfaz ni un generador de HTML estático: su terreno es una aplicación que sigue viva en el navegador durante toda la sesión. Los componentes *standalone* permiten arrancar sin declarar módulos, pero la filosofía no cambia: convenciones compartidas por todo el equipo.

## Para qué sirve

Imagina un panel de administración con treinta pantallas, formularios complejos, permisos por rol y varias personas tocando el mismo código. Angular da una estructura común: cada pantalla es un componente, la navegación vive en el enrutador y los servicios se inyectan donde hacen falta. Eso reduce las discusiones sobre dónde va cada archivo y facilita que una persona nueva encuentre el código. También conviene cuando se quiere un conjunto de herramientas oficial que llegue hasta los tests y el build sin ensamblar piezas de terceros.

## Cuándo usarla

- La aplicación es larga, con muchas rutas y estado compartido entre pantallas.
- El equipo es grande o va a crecer y necesita convenciones explícitas.
- Se valora que enrutado, formularios y gestión de dependencias estén resueltos de forma uniforme.
- El proyecto ya usa TypeScript y quiere tipado en toda la cadena.

## Cuándo no

Para una wiki, una landing o un catálogo de lectura, Angular es excesivo: descarga código para hidratar páginas que apenas cambian. Tampoco brilla en prototipos de una sola pantalla donde nadie discutirá la arquitectura. Si lo único que necesitas es una tabla o un botón dentro de HTML ya generado, una isla con React o Lit encaja mejor que levantar una aplicación completa.

## Alternativas

| Opción | Criterio para elegirla |
| --- | --- |
| React | Deja libertad para elegir enrutado, estado y estilos; conviene si el equipo ya domina ese ecosistema. |
| Vue | Punto medio: más guía que React, menos estructura que Angular. |
| Lit | Componentes web del navegador sin framework; ideal para islas pequeñas. |

La decisión no es cuál es mejor, sino cuántas decisiones quieres que el framework tome por ti. Angular toma muchas; React, pocas.

## Ejemplo

```ts
import { Component, computed, signal } from "@angular/core";

@Component({
  selector: "app-contador",
  standalone: true,
  template: `
    <button (click)="incrementar()">Añadir</button>
    <p>Valor doblado: {{ doble() }}</p>
  `,
})
export class Contador {
  readonly n = signal(0);
  readonly doble = computed(() => this.n() * 2);

  incrementar(): void {
    this.n.update((valor) => valor + 1);
  }
}
```

`n()` lee la señal y `update` la escribe; `computed` recalcula `doble` cuando `n` cambia. El enlace `(click)` pertenece a la plantilla del componente, no a un `addEventListener` manuscrito.
