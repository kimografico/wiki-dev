---
fecha: 2026-10-13
titulo: Accesibilidad web
resumen: Conjunto de prácticas que hacen que una web pueda usarla cualquier persona, incluidas las que usan teclado o lector de pantalla.
categoria: concepto
tags: [accesibilidad]
alias: [a11y]
relacionados: [wcag, aria, html-semantico, responsive-web]
fuentes: ["https://www.w3.org/WAI/standards-guidelines/wcag/"]
terminoEn: Web accessibility
---

## Definición

La accesibilidad web es la capacidad de un sitio para ser usado por personas con distintas capacidades y contextos: con teclado, con lector de pantalla, con zoom alto o con movimiento reducido. «a11y» acorta «accessibility». No es una lista de etiquetas especiales: es una propiedad del resultado que se decide desde el diseño, el HTML y las interacciones. WCAG reúne los criterios de referencia para medirla.

## Por qué importa

Un menú que solo se abre al pasar el ratón deja fuera a quien navega con teclado; un enlace sin texto comprensible deja al lector de pantalla sin saber dónde va. Detectar esto al diseñar cuesta poco; corregirlo después de publicar suele obligar a rehacer componentes. Además, un formulario con etiquetas claras y foco visible mejora la experiencia de quien lo rellena desde el móvil o con prisa.

## Ejemplo

```html
<label for="correo">Correo electrónico</label>
<input id="correo" type="email" autocomplete="email" />
```

La etiqueta está asociada al campo, el tipo invita al teclado adecuado y `autocomplete` evita escribir datos ya conocidos. El foco debe verse al tabular.

## Se confunde con

Con el SEO. Ambos se benefician del HTML semántico y del texto alternativo, pero responden a preguntas distintas: la accesibilidad pregunta si una persona puede usar la página; el SEO, si un buscador puede entenderla y posicionarla. Una imagen decorativa con `alt=""` es accesible, aunque no aporte palabras clave.
