---
titulo: "Feature flag"
resumen: "Interruptor en código o configuración que activa o desactiva una funcionalidad sin desplegar de nuevo."
categoria: concepto
tags: ["frontend","backend"]
alias: []
relacionados: ["entornos", "despliegue", "fallback", "entrega-continua"]
fuentes: []
autoenlace: true
---
## Definición

Un feature flag es un interruptor, en código o en configuración, que activa o desactiva una funcionalidad sin volver a desplegar. La función ya está incluida en el artefacto; lo que cambia es la decisión de mostrarla, normalmente según entorno, usuario o porcentaje de tráfico.

## Por qué importa

Permite separar desplegar de activar. Puedes publicar una funcionalidad a medias, probarla con un grupo pequeño y apagarla si algo va mal, sin esperar a corregir y publicar de nuevo. Es especialmente útil cuando un cambio afecta a muchas personas a la vez y conviene observar primero cómo se comporta con unas pocas.

## Ejemplo

```js
if (flags.nuevoBuscador) {
  renderizarBuscadorNuevo();
} else {
  renderizarBuscadorActual();
}
```

El valor de `flags` llega desde configuración del entorno o del usuario. Ambas ramas deben quedar probadas: apagar el flag también es un camino de ejecución.

## Se confunde con

No es la funcionalidad: la feature es lo que hace; el flag es el mecanismo para activarla de forma gradual. Tampoco es un entorno: el entorno separa instancias completas del sistema; un flag convive con la otra versión en la misma instancia. Y no sustituye a las pruebas: un interruptor no arregla una rama rota. Los flags temporales deben retirarse cuando la función se estabiliza; si no, el código acumula ramas que nadie recuerda.
