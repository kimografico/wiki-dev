---
titulo: "Reactividad"
resumen: "Modelo en el que la interfaz se actualiza automáticamente cuando cambian los datos de los que depende."
categoria: concepto
tags: ["frontend"]
alias: []
relacionados: [gestion-de-estado, binding, hook, virtual-dom, vue]
fuentes:
  - "https://vuejs.org/api/reactivity-core.html"
autoenlace: true
---

## Definición

Reactividad es el modelo en el que un valor cambia y las partes que dependen de él se actualizan solas. El sistema registra dependencias cuando se lee el dato y vuelve a ejecutar lo necesario cuando cambia. Describe un comportamiento, no una librería concreta.

## Por qué importa

Evita sincronizar a mano el estado con la pantalla: si `total` pasa de 0 a 1, el texto que lo lee se actualiza sin una llamada explícita. El coste está en saber cuándo se dispara ese cambio. Modificar un objeto sin notificar, o leer una propiedad dentro de una condición, puede dejar de registrar la dependencia. En esta wiki, el tema elegido solo se refleja al instante si la señal que lo guarda se actualiza.

## Ejemplo

Con Vue, la dependencia se registra al leer `total.value`:

```js
import { ref, watchEffect } from "vue";

const total = ref(0);
watchEffect(() => console.log("total:", total.value));
total.value = 1; // vuelve a imprimir el valor
```

## Se confunde con

Con binding: binding es la conexión entre una propiedad y una vista; la reactividad es la propagación del cambio a través de esa conexión. Tampoco es renderizado: que el dato cambie no implica redibujar todo el DOM; un framework puede tocar solo los nodos afectados.
