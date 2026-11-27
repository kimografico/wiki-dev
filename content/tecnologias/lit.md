---
fecha: 2026-10-13
titulo: Lit
resumen: "Librería para componentes web estándar con plantillas reactivas: portable entre frameworks y sin imponer uno propio."
categoria: framework
tags: [frontend]
alias: []
relacionados: [arquitectura-de-islas, react, vue, shadow-dom]
alternativas: [react, vue]
web: https://lit.dev
fuentes: [https://lit.dev/docs/]
---

## Qué es

Lit es una librería para escribir componentes web según el estándar del navegador: *custom elements*. Sobre esas API nativas añade plantillas reactivas y declaración de propiedades con poco código, sin imponer un framework completo ni un sistema de enrutado. Lo que se crea con Lit es un elemento HTML con nombre propio, por ejemplo `<mi-contador>`, que el navegador entiende por sí mismo. La duda habitual es si hace falta React o Vue para usarlo: no; Lit define el elemento y la página lo emplea como cualquier otra etiqueta.

## Para qué sirve

Sirve para piezas reutilizables que deben sobrevivir a cambios de framework: un selector de idioma, un visor de datos o un botón compartido por varias aplicaciones. También permite añadir interactividad a una página ya existente sin cargar una aplicación entera, algo útil en sitios donde la mayor parte del contenido es texto que solo se lee.

## Cuándo usarla

Cuando la portabilidad es un requisito real (el componente se consume desde proyectos distintos), cuando se quiere minimizar el JavaScript enviado al navegador o cuando el equipo prefiere apoyarse en estándares antes que en una API propia. Encaja también para un sistema de diseño que deba funcionar con herramientas diferentes dentro de unos años.

## Cuándo no

Si el proyecto ya tiene una aplicación consolidada en otro framework, introducir Lit añade una segunda forma de hacer lo mismo. Si se necesitan enrutado, datos del servidor o un ecosistema amplio de extensiones, un framework completo lo resuelve sin pegar piezas. 

## Ejemplo

```ts
import { LitElement, html, css } from "lit";

class MiContador extends LitElement {
  static properties = { n: { type: Number } };
  static styles = css`button { font: inherit; }`;

  n = 0;

  render() {
    return html`<button @click=${() => this.n++}>${this.n}</button>`;
  }
}

customElements.define("mi-contador", MiContador);
```

Tras definirlo, basta con escribir `<mi-contador></mi-contador>` en cualquier HTML. `html` crea una plantilla y Lit actualiza solo las partes que cambian; `@click` enlaza el evento. Asignar `this.n` provoca una nueva renderización.

## Frente a React y Vue

| Opción | Modelo | Criterio de decisión |
| --- | --- | --- |
| Lit | Elementos personalizados del navegador | Elegirla si el componente debe reutilizarse fuera de una aplicación concreta |
| React | Componentes con estado y Virtual DOM | Elegirla si se construye una aplicación interactiva amplia |
| Vue | Plantillas y reactividad dentro de un framework | Elegirla si se quiere una curva suave y una app completa |

Las tres resuelven interactividad; la diferencia está en qué parte del ecosistema se acepta como propia.

## Matices: encapsulamiento y ciclo de vida

Los estilos declarados con `css` quedan dentro del componente: el CSS global de la página no atraviesa ese límite salvo que se usen variables CSS o estilos expuestos. Suscríbete en `connectedCallback` y libera recursos en `disconnectedCallback`: el elemento puede aparecer y desaparecer varias veces.
