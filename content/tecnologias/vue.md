---
fecha: 2026-10-13
titulo: Vue
resumen: "Framework progresivo de componentes con plantillas y estado reactivo; cuándo elegirlo frente a React, Angular o Lit."
categoria: framework
tags: [frontend]
alias: [Vue.js]
relacionados: [react, angular, lit, reactividad]
alternativas: [react, angular, lit]
web: https://vuejs.org
fuentes: ["https://vuejs.org/guide/introduction.html", "https://vuejs.org/api/reactivity-core.html"]
---

## Qué es

Vue es un framework para construir interfaces. Combina plantillas declarativas parecidas a HTML con estado reactivo en JavaScript. Se describe como «progresivo» porque admite adopción gradual: se puede montar un widget en una página existente o construir una aplicación completa con componentes de un solo archivo, enrutado y gestión de estado. Las plantillas no limitan al framework: también hay funciones de renderizado; y la reactividad sigue dependencias automáticamente.

## Para qué sirve

Sirve para añadir interactividad sin reescribir una vista entera: un filtro sobre una tabla, un formulario por pasos o un panel que reacciona a las opciones del usuario. Cuando el proyecto crece, los mismos componentes se organizan en archivos y se combinan con el resto del ecosistema sin cambiar de modelo mental.

## Cuándo usarla

Cuando el equipo viene de HTML y CSS y quiere plantillas legibles; cuando se necesita una curva de entrada suave sin renunciar a una aplicación completa; o cuando se valora combinar componentes propios con bibliotecas externas dentro de una convención clara.

## Cuándo no

Si el equipo ya domina otro modelo, mantener Vue junto a él añade coste sin beneficio. Si la página es contenido estático, no hay estado que justifique un framework. 

## Ejemplo

```vue
<script setup>
import { computed, ref } from "vue";

const q = ref("");
const items = ["Astro", "React", "Vue"];
const visibles = computed(() =>
  items.filter((item) => item.toLowerCase().includes(q.value.toLowerCase())),
);
</script>

<template>
  <input v-model="q" placeholder="Buscar" />
  <p>{{ visibles.length }} resultados</p>
  <ul>
    <li v-for="item in visibles" :key="item">{{ item }}</li>
  </ul>
</template>
```

`v-model` enlaza el campo con `q`; `computed` deriva la lista filtrada y se recalcula cuando `q` cambia. En el script se escribe `q.value`, pero en la plantilla basta con `q`.

## Frente a React, Angular y Lit

| Opción | Estilo de componente | Criterio de decisión |
| --- | --- | --- |
| Vue | Plantillas HTML y reactividad automática | Elegirla si se quiere adoptar poco a poco |
| React | Funciones que devuelven marcado (JSX) | Elegirla si el equipo ya piensa en componentes React |
| Angular | Solución completa y convenciones estrictas | Elegirla en proyectos grandes que quieren una estructura fija |
| Lit | Web components con plantillas etiquetadas | Elegirla si se necesitan componentes nativos reutilizables en cualquier página |

La comparativa React frente a Vue y Angular desarrolla el contraste con React y Angular. Frente a Lit, la decisión es distinta: Vue ofrece un modelo de aplicación con reactividad y herramientas propias, mientras que Lit produce componentes estándar que conviven con cualquier framework o con HTML sin más. Si el objetivo es publicar piezas interoperables, Lit encaja; si se va a construir una interfaz completa, Vue da más estructura.

## Matices: `ref` frente a `reactive`

Para valores primitivos se usa `ref` y se accede con `.value`; para objetos se usa `reactive`, que envuelve las propiedades en proxies y permite leerlas directamente. Extraer una propiedad de un objeto reactivo a una variable normal rompe el seguimiento, así que conviene conservar el objeto o usar utilidades específicas. Entender este detalle explica por qué una vista a veces no se actualiza aunque el dato haya cambiado.
