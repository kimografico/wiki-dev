---
titulo: "Skeleton"
resumen: "Pantalla esqueleto que muestra bloques con la forma del contenido mientras este todavía se está cargando."
categoria: rendimiento-ux
tags: ["frontend","rendimiento"]
alias: []
relacionados: ["lazy-load", "core-web-vitals", "ssr"]
fuentes: []
autoenlace: true
---

## Definición

Un skeleton es una interfaz de carga provisional que dibuja bloques con la forma del contenido que aún no existe: una línea para el título, tres para el texto, un rectángulo para la imagen. Es una maqueta vacía, sin datos reales, que se sustituye al llegar la respuesta.

## Por qué importa

Una lista que pasa de "nada" a veinte tarjetas en un segundo provoca un salto: la persona empieza a leer y el contenido se mueve bajo el cursor. Reservar desde el principio el mismo espacio que ocupará el resultado mantiene estables las posiciones y da una pista de la estructura que viene. En una búsqueda con latencia variable, esa pista reduce la sensación de espera sin fingir que los datos ya están disponibles.

## Ejemplo

```html
<div class="skeleton" aria-hidden="true">
  <span class="linea titulo"></span>
  <span class="linea"></span>
  <span class="linea corta"></span>
</div>
```

El brillo se desactiva con `prefers-reduced-motion`; mientras tanto, el lector de pantalla necesita un texto como «Cargando resultados».

## Se confunde con

No es un spinner: el girador comunica que hay actividad, pero no dice dónde aparecerá el contenido. Tampoco es el *placeholder* de un campo, que es texto de ayuda dentro del control. Un skeleton no acelera la red: solo cambia la percepción; si la espera se alarga, debe dar paso a un mensaje o a un error.
