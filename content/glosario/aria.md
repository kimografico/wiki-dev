---
titulo: "ARIA"
resumen: "Conjunto de atributos de Accessible Rich Internet Applications que describen rol, estado y relaciones que el HTML nativo no expresa."
categoria: concepto
tags: ["accesibilidad"]
alias: []
relacionados: [accesibilidad-web, html-semantico, wcag, dom]
fuentes: ["https://www.w3.org/WAI/ARIA/apg/"]
autoenlace: true
---
## Definición

ARIA (Accessible Rich Internet Applications) es un conjunto de atributos que añaden información de rol, estado y relación a elementos que el HTML nativo no describe por sí solo. Sirve para que un lector de pantalla sepa que un divisor hace de pestaña, que un control está expandido o que un mensaje es una alerta. No cambia el aspecto ni el comportamiento por sí mismo.

## Por qué importa

Los controles personalizados son habituales: un selector de fechas o un menú desplegable se construye con `div` y estilos. Sin ARIA, el lector de pantalla anuncia texto suelto sin indicar qué se puede hacer. Con `aria-expanded`, `aria-selected` o `aria-live`, el estado anunciado cambia cuando cambia la interfaz. Un atributo mal puesto, en cambio, puede anunciar un rol que el control no cumple y confundir más que ayudar.

## Ejemplo

```html
<button type="button" aria-expanded="false" aria-controls="panel">
  Opciones
</button>
<div id="panel" hidden>...</div>
```

Al abrir el panel se pone `aria-expanded="true"` y se deja de ocultar el contenido.

## Se confunde con

Con HTML semántico. Un `<button>` nativo ya dice «botón», admite foco y responde a Enter o Espacio: añadirle `role="button"` es redundante. ARIA se reserva para lo que el HTML no expresa y no sustituye la gestión del foco ni las pruebas con teclado. Accesibilidad web y ARIA no son sinónimos: esta es una herramienta dentro de aquella.
