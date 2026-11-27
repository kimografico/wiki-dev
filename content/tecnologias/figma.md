---
titulo: "Figma"
resumen: "Herramienta de diseño de interfaces en navegador que permite colaboración y prototipado."
categoria: herramienta
tags: ["frontend"]
alias: []
relacionados: [css, accesibilidad-web, tailwindcss, ux-ui]
fuentes: []
autoenlace: true
alternativas: []
---
## Qué es

Figma es una herramienta de diseño de interfaces que funciona en el navegador y guarda los archivos en la nube. Varias personas pueden editar el mismo documento a la vez, dejar comentarios sobre un elemento y ver los cambios en tiempo real. Su unidad básica es el *frame*, un lienzo con un tamaño concreto, y sus componentes reutilizables se organizan en bibliotecas. No es un editor de código: produces una representación visual, no una página funcionando.

## Para qué sirve

Es el lugar donde se acuerdan pantallas, componentes y decisiones visuales antes de escribir CSS. Un diseñador prepara el estado normal, el de hover y el de error de un formulario, con medidas y colores concretos, y quien implementa inspecciona cada capa para obtener sus valores. También sirve para prototipar: enlazar frames y simular la navegación antes de construir la aplicación.

## Cuándo usarla

Úsala cuando una idea visual todavía no está decidida y necesitas que producto, diseño y desarrollo miren lo mismo. Es especialmente útil en equipos remotos, porque el archivo es único y no hay que enviar versiones por correo. Conviene también cuando se documenta un sistema de diseño: tokens de color, tipografía y espaciado compartidos entre pantallas.

## Cuándo no

No hace falta abrir Figma para cambios pequeños y locales: ajustar un espaciado o corregir un color se resuelve antes en el código. Tampoco sustituye a la implementación: un diseño no comprueba que el contraste sea suficiente, que el foco funcione con teclado o que el layout aguante textos largos. Esas decisiones se validan en el navegador con CSS y con las pautas de accesibilidad.

## Ejemplo

Un prototipo con tres estados del mismo botón:

```text
Frame "Formulario / normal"  → botón azul, radio 8px
Frame "Formulario / hover"   → botón más oscuro, sombra ligera
Frame "Formulario / error"   → mensaje rojo bajo el campo
```

Al inspeccionar el botón, quien implementa toma el color y el radio y los lleva a una clase de CSS. El prototipo dice qué debe ocurrir; la clase lo ejecuta en el navegador.

## Matices

| Necesidad | Pieza |
|-----------|-------|
| Definir apariencia y estados | Figma |
| Implementar layout y estilos | CSS |
| Verificar contraste y foco | Accesibilidad web |
| Reutilizar decisiones visuales en código | Tailwind CSS |
