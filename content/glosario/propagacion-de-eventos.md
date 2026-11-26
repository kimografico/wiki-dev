---
fecha: 2026-11-26
titulo: "Propagación de eventos"
resumen: "Recorrido de un evento por el árbol del DOM: fase de captura, objetivo y fase de burbujeo."
categoria: concepto
tags: [frontend]
alias: [bubbling, capturing, delegación de eventos]
relacionados: [dom, hook]
fuentes:
  - "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction#event_delegation"
  - "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener"
autoenlace: true
terminoEn: Event propagation
---

## Definición

Cuando ocurre un evento en un elemento, no avisa solo a ese nodo. El evento baja desde `window` hasta el elemento (**captura**), llega a él (**objetivo**) y sube de vuelta por sus antecesores (**burbujeo**). Un listener se registra en una fase u otra con el tercer argumento de `addEventListener`.

## Por qué importa

Explica por qué un clic en un botón también dispara el handler del contenedor, y por qué un `stopPropagation` en un hijo puede «romper» un handler del padre que nadie tocó. Es el mecanismo que usan los frameworks para gestionar eventos sin poner un listener por elemento.

## Ejemplo

```js
contenedor.addEventListener("click", () => console.log("captura"), true);
boton.addEventListener("click", () => console.log("objetivo"));
contenedor.addEventListener("click", () => console.log("burbujeo"));

// Al pulsar el botón: captura → objetivo → burbujeo
```

Sin el `true`, el listener del contenedor también se ejecuta, pero en la subida. No todos los eventos burbujean: si `event.bubbles` es `false`, el recorrido termina en el objetivo.

## Se confunde con

`stopPropagation()` corta el recorrido; `preventDefault()` impide la acción por defecto del navegador (seguir un enlace, enviar un formulario), y solo funciona si `event.cancelable` es `true`. Son cosas distintas y las dos se usan mal. Tampoco es lo mismo `event.target` (el nodo que originó el evento) que `event.currentTarget` (el nodo donde está el listener que se está ejecutando). En un handler de función clásica, `this` equivale a `currentTarget`; con una función flecha, `this` es léxico y ya no apunta al elemento.

## Delegación

En lugar de suscribir cada botón de una lista, se suscribe al contenedor y se pregunta qué hijo fue:

```js
lista.addEventListener("click", (event) => {
  const boton = event.target.closest("button[data-id]");
  if (!boton) return;
  abrir(boton.dataset.id);
});
```

Funciona con elementos que se añaden después, porque el listener vive en el contenedor. Es la técnica que hay detrás de muchos manejadores de eventos de React.

## Orden y trampas

Los listeners de la misma fase se ejecutan en orden de registro. `stopImmediatePropagation()` también corta los demás listeners del mismo nodo; `stopPropagation()` no. Conviene no abusar de cualquiera de los dos: si un componente necesita impedir que su padre reaccione, probablemente los dos están haciendo demasiado trabajo en el mismo clic.
