---
titulo: remark
resumen: Procesador de Markdown construido sobre el formato de sintaxis de mdast, extensible con plugins.
categoria: herramienta
tags: [frontend]
alias: []
relacionados: [unified, markdown]
alternativas: [unified]
web: https://remark.js.org
npm: remark
fuentes: [https://github.com/remarkjs/remark]
---

## Qué es

remark es el procesador de Markdown del ecosistema unified. Convierte el texto en un árbol de sintaxis (mdast) que los plugins pueden recorrer y modificar: insertar enlaces, quitar nodos, cambiar el texto.

## Para qué sirve

Aquí es la pieza sobre la que se construye el plugin de menciones (RF-07): este recorre el árbol del Markdown y convierte las menciones a otras entradas en enlaces internos.

## Cuándo usarlo

Cuando necesitas transformar Markdown de forma programática, más allá de lo que hace el conversor por defecto.

## Cuándo no

Para contenido estático sin transformaciones, remark sobra y añade complejidad al build.

## Alternativas

unified es el motor general del que remark forma parte; otros conversores (marked, markdown-it) no comparten el ecosistema de plugins de mdast.

## Ejemplo

```ts
remark().use(() => (tree) => {
  // recorrer y modificar el árbol mdast
});
```
