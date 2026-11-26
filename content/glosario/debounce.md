---
fecha: 2026-11-26
titulo: "Debounce"
resumen: "Técnica que agrupa una ráfaga de llamadas y ejecuta la función una sola vez, tras la última."
categoria: rendimiento-ux
tags: [frontend, rendimiento]
alias: [throttle, anti-rebote]
relacionados: [event-loop, dom]
fuentes:
  - "https://developer.mozilla.org/en-US/docs/Glossary/Debounce"
  - "https://developer.mozilla.org/en-US/docs/Glossary/Throttle"
  - "https://web.dev/articles/debounce-your-input-handlers"
autoenlace: true
terminoEn: Debounce
---

## Definición

*Debounce* espera a que las llamadas se detengan y ejecuta la función una vez con el último argumento. Es la técnica típica para un campo de búsqueda: no interesa consultar mientras el usuario sigue tecleando.

## Por qué importa

Un evento de `input`, `scroll` o `resize` puede dispararse decenas de veces por segundo. Si cada disparo lanza una petición o recalcula layout, la interfaz se degrada justo cuando el usuario interactúa.

## Ejemplo

```js
function debounce(fn, espera) {
  let temporizador;
  return (...args) => {
    clearTimeout(temporizador);
    temporizador = setTimeout(() => fn(...args), espera);
  };
}

const buscar = debounce((q) => fetch(`/buscar?q=${q}`), 250);
input.addEventListener("input", (event) => buscar(event.target.value));
```

La variante por defecto es *trailing*: ejecuta al final. También existen *leading* (ejecuta en la primera llamada) y *both* (una al principio y otra al final).

## Se confunde con

Con memorizar o con esperar una promesa: ninguna cambia el resultado de la función, solo **cuándo** se llama. Tampoco es lo mismo que *throttle*, aunque los dos limitan la frecuencia.

## Throttle

*Throttle* garantiza como máximo una ejecución por intervalo aunque sigan llegando eventos. No espera a que termine la ráfaga: va soltando ejecuciones periódicamente.

```js
function throttle(fn, espera) {
  let ultima = 0;
  return (...args) => {
    const ahora = Date.now();
    if (ahora - ultima < espera) return;
    ultima = ahora;
    fn(...args);
  };
}

window.addEventListener("scroll", throttle(actualizarProgreso, 100));
```

## Cuál elegir

- **Debounce** para acciones que solo importan cuando el usuario termina: búsquedas, validación de un campo, guardar un borrador.
- **Throttle** para acciones que deben seguir ocurriendo mientras interactúa: progreso de scroll, eventos de ratón, redimensionado.
- Para animaciones ligadas al frame, `requestAnimationFrame` es la herramienta propia, no un intervalo arbitrario.

Elegir la variante equivocada hace que la interfaz parezca que no responde o que responde tarde.
