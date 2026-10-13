---
titulo: unified
resumen: Ecosistema para procesar texto con plugins; encadena analizadores y transformadores sobre un árbol de sintaxis.
categoria: herramienta
tags: [frontend]
alias: []
relacionados: [remark, markdown]
alternativas: [remark]
web: https://unifiedjs.com
npm: unified
fuentes: [https://github.com/unifiedjs/unified]
---

## Qué es

unified es un ecosistema para procesar texto: define un pipeline con un analizador, una serie de transformadores y un generador. remark (Markdown) y rehype (HTML) son proyectos construidos sobre él.

## Para qué sirve

Es el pegamento del procesado de Markdown de Astro. Al fijar el procesador con `unified()` en la configuración, se garantiza que los plugins de remark —como el de menciones— se ejecuten.

## Cuándo usarlo

Cuando necesitas encadenar varios pasos de transformación de texto de forma ordenada y reutilizable, con plugins que comparten un mismo formato de árbol.

## Cuándo no

Para una transformación puntual y simple, montar un pipeline de unified puede ser más de lo necesario.

## Alternativas

remark es el proyecto de Markdown dentro de unified; pipelines hechos a mano con expresiones regulares sirven para casos muy sencillos, pero son frágiles.

## Ejemplo

```ts
import { unified } from "unified";

const procesador = unified().use(remarkMenciones);
```
