---
titulo: "HTML semántico"
resumen: "Uso de etiquetas que describen el significado del contenido, no solo su aspecto, para que navegadores y lectores entiendan la estructura."
categoria: concepto
tags: ["frontend","accesibilidad"]
alias: []
relacionados: [aria, accesibilidad-web, wcag, dom]
fuentes: []
autoenlace: true
---
## Definición

Escribir HTML semántico significa elegir cada elemento por lo que significa, no por el aspecto que se le quiere dar. `<nav>` indica navegación, `<main>` contenido principal, `<article>` una pieza independiente y `<button>` una acción pulsable. El navegador convierte esa elección en una estructura accesible: roles, puntos de referencia y orden de lectura que otros programas pueden consultar. Poner `class="boton"` a un `<div>` no produce ninguno de esos efectos.

## Por qué importa

Una persona con lector de pantalla puede saltar al menú o al contenido principal sin recorrer toda la página. Caso concreto: un `<div>` con un manejador de clic parece un botón, pero no se enfoca con Tab ni responde a Enter o Espacio; `<button>` da ese comportamiento sin JavaScript adicional. También ayuda a quien mantiene el código: encabezados y secciones se distinguen sin adivinar por clases.

## Ejemplo

```html
<nav aria-label="Principal">
  <a href="/glosario">Glosario</a>
</nav>
<main>
  <article>
    <h1>Accesibilidad web</h1>
    <p>Contenido de la entrada.</p>
  </article>
</main>
```

Cada etiqueta describe su función; el CSS posterior decide cómo se ve.

## Se confunde con

Con CSS: controla la presentación; la semántica vive en el HTML. Con ARIA: añade o corrige información cuando el HTML no basta, sin sustituir al elemento correcto. Con un `div` bien nombrado: el nombre de la clase es texto para el programador, no un papel que el navegador entienda. WCAG mide la accesibilidad.
