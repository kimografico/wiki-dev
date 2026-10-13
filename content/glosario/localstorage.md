---
titulo: localStorage
resumen: Almacén clave-valor del navegador que persiste entre visitas y que aquí solo guarda las preferencias del lector.
categoria: concepto
tags: [frontend, seguridad]
relacionados: [accesibilidad-web]
terminoEn: localStorage
---

## Definición

`localStorage` es una pequeña memoria del navegador que guarda pares clave-valor como cadenas de texto. Los datos sobreviven al cierre de la pestaña y no se envían a ningún servidor.

## Por qué importa

Permite recordar preferencias (tema, entradas aprendidas) sin cuentas ni backend. Al no salir del navegador, respeta la privacidad; a cambio, solo está disponible en el cliente.

## Ejemplo

```js
localStorage.setItem("wiki:tema", "dark");
const tema = localStorage.getItem("wiki:tema");
```

## Se confunde con

Con las *cookies*, que sí se envían al servidor en cada petición. `localStorage` se queda en el navegador; además, puede no estar disponible (modo privado), así que hay que prever ese caso.
