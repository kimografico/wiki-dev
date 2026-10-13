---
titulo: Lit
resumen: Librería ligera para crear componentes web estándar (custom elements) que funcionan en cualquier framework o sin ninguno.
categoria: framework
tags: [frontend]
alias: []
relacionados: [arquitectura-de-islas]
alternativas: [react]
web: https://lit.dev
fuentes: [https://lit.dev/docs/]
---

## Qué es

Lit es una librería para escribir componentes web conforme al estándar del navegador (*custom elements*). Añade plantillas reactivas y un sistema de propiedades ligerísimo sobre APIS nativas, sin imponer un framework completo.

## Para qué sirve

Permite construir componentes reutilizables que funcionan en cualquier página, con cualquier framework o con ninguno, apoyándose en el propio navegador en lugar de una capa propia.

## Cuándo usarla

Cuando quieres componentes portables y ligeros, con poca sobrecarga, o integrar piezas en sitios ya existentes sin arrastrar un framework entero.

## Cuándo no

Si el equipo ya tiene un framework maduro y no necesita portabilidad entre proyectos, Lit añade una forma distinta de hacer lo mismo.

## Alternativas

React, Vue o Angular ofrecen ecosistemas mayores; Lit se elige por ligereza y por apoyarse en el estándar de componentes web.

## Ejemplo

```ts
import { LitElement, html } from "lit";

class Saludo extends LitElement {
  render() {
    return html`<p>Hola</p>`;
  }
}
customElements.define("mi-saludo", Saludo);
```
