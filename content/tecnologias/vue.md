---
titulo: Vue
resumen: Framework progresivo de componentes con plantillas declarativas, adoptable desde una página suelta hasta una app completa.
categoria: framework
tags: [frontend]
alias: [Vue.js]
relacionados: [react]
alternativas: [react, angular]
web: https://vuejs.org
fuentes: [https://vuejs.org/guide/introduction.html]
---

## Qué es

Vue es un framework para construir interfaces. Combina plantillas declarativas en HTML con estado reactivo en JavaScript, y se describe como «progresivo» porque se puede adoptar poco a poco: desde un widget en una página hasta una aplicación entera.

## Para qué sirve

Es cómodo para añadir interactividad a una vista sin reescribir toda la arquitectura, y su API de composición escala bien cuando el componente crece.

## Cuándo usarla

Cuando quieres un framework completo pero con una curva de entrada suave y plantillas cercanas a HTML. Encaja bien en equipos que vienen de HTML y CSS.

## Cuándo no

Si el equipo ya domina otro modelo (por ejemplo React) o si el proyecto no necesita interactividad: en ambos casos añade complejidad sin beneficio.

## Alternativas

React es la opción más extendida; Angular apuesta por una solución más opinionada y empresarial; Lit se queda en el estándar de componentes web.

## Ejemplo

```vue
<script setup>
import { ref } from "vue";
const n = ref(0);
</script>

<template>
  <button @click="n++">{{ n }}</button>
</template>
```
