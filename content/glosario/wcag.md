---
fecha: 2026-10-13
titulo: WCAG
resumen: "Pautas del W3C para accesibilidad web: el nivel AA fija criterios comprobables de contraste, teclado y estructura."
categoria: concepto
tags: [accesibilidad]
alias: [WCAG 2.1]
relacionados: [accesibilidad-web, aria, html-semantico, core-web-vitals]
terminoEn: Web Content Accessibility Guidelines
fuentes: ["https://www.w3.org/WAI/WCAG21/quickref/"]
autoenlace: true
---

## Definición

Las *Web Content Accessibility Guidelines* (WCAG) son el estándar del W3C para la accesibilidad web. Se organizan en principios —percibible, utilizable, comprensible, robusto— y en niveles A, AA y AAA. Cada pauta es un criterio comprobable con número y título, no una recomendación general.

## Por qué importa

Convierten una intención en requisitos revisables en una revisión de código. Apuntar a **AA** es el objetivo habitual: cubre contraste, navegación por teclado, etiquetas de controles y estructura de encabezados sin llegar al rigor de AAA. Si un diseño propone gris sobre blanco, se mide el valor y se decide. Aquí eso afecta a los tokens de color de ambos temas.

## Ejemplo

El criterio de contraste AA exige **4,5:1** para texto normal y **3:1** para texto grande y componentes de interfaz. Sobre fondo blanco, un gris claro como `#999` no llega: hay que oscurecerlo. Se comprueba con una herramienta y se confirma en la página real.

## Se confunde con

Con el uso exclusivo de una herramienta automática. Lighthouse o axe detectan parte de los fallos, pero no saben si el orden de tabulación tiene sentido ni si un enlace describe su destino. Tampoco es **ARIA**: este añade información a elementos; WCAG evalúa el resultado para la persona. **HTML semántico** y **Accesibilidad web** son la vía y el objetivo respectivamente, no etiquetas intercambiables.
