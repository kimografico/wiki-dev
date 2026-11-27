---
titulo: "DevTools"
resumen: "Herramientas de desarrollo integradas en el navegador para inspeccionar DOM, estilos, red, consola y rendimiento."
categoria: herramienta
tags: ["frontend","terminal"]
alias: []
relacionados: ["dom", "debug", "cabeceras-http", "frontend"]
fuentes: []
autoenlace: true
---
## Definición

DevTools son los paneles integrados en el navegador —Elementos, Consola, Red, Fuentes, Rendimiento y Almacenamiento— que muestran el estado real de una página mientras se ejecuta. No editan el código del proyecto: lo que cambias en el panel de Elementos vive solo en memoria y desaparece al recargar. Es una observación en vivo, no una segunda copia del sitio.

## Por qué importa

Cuando el código compila pero el botón no responde, la respuesta está en la página ejecutada: el panel de Elementos revela un `disabled` que nadie recordaba, la Consola muestra el error que detuvo el script y Red confirma si el JavaScript llegó o devolvió un 404. Sin esa vista, depurar es probar hipótesis a ciegas y cambiar archivos que quizá no tenían culpa.

## Ejemplo

```js
// En la Consola, con la página abierta:
const boton = document.querySelector('#enviar');
boton?.disabled;          // estado real del elemento
getEventListeners(boton); // utilidad de Chromium: manejadores activos
```

Después, en Red, filtra por «Fetch/XHR» y abre la petición fallida para leer las cabeceras y el cuerpo.

## Se confunde con

No es un IDE: el IDE escribe y organiza código; DevTools observa el resultado. Tampoco es sinónimo de Debug: depurar es localizar un fallo, y DevTools es una herramienta para hacerlo. El panel de Red no sustituye al servidor: muestra lo que el navegador recibió, no cómo se generó.
