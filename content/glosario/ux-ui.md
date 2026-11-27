---
titulo: "UX/UI"
resumen: "Dos capas del producto: la experiencia de uso (UX) y la presentación visual e interactiva (UI)."
categoria: rendimiento-ux
tags: ["frontend","accesibilidad"]
alias: []
relacionados: [accesibilidad-web, wcag, html-semantico, responsive-web, core-web-vitals]
fuentes: []
autoenlace: true
---
## Definición

UX (*user experience*) describe cómo se siente y cuánto cuesta usar un producto: encontrar la información, entender qué ocurrió tras pulsar, recuperarse de un error. UI (*user interface*) es la capa visible: colores, tipografía, espaciado, iconos y estado de los controles. Coinciden en el mismo botón: la UX decide qué hace; la UI, cómo se reconoce.

## Por qué importa

Un cambio puede arreglar una capa y romper la otra. Un formulario de cinco pasos con campos preciosos sigue fallando en UX si el usuario no sabe en qué paso está; uno de dos pasos con texto gris sobre gris falla en UI aunque se complete rápido. Separarlas permite diagnosticar: "no encuentro..." es UX; "no leo..." es UI. En esta wiki el modo oscuro es UI y el orden de navegación es UX.

## Ejemplo

```html
<button type="submit" class="btn-primario">Guardar cambios</button>
```

La etiqueta clara y el momento en que aparece son UX; la clase, el contraste y el foco visible son UI.

## Se confunde con

Con la **Accesibilidad web** y con el rendimiento. La accesibilidad comparte herramientas con la UI —contraste, foco, estructura— pero responde a otra pregunta: si una persona con teclado o lector de pantalla puede completar el flujo, y **WCAG** lo mide con criterios. El rendimiento mide tiempo, no comprensión: una página que carga en un segundo puede exigir seis clics para leer un dato.
