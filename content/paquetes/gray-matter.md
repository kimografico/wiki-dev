---
fecha: 2026-10-13
titulo: gray-matter
resumen: Librería que separa el frontmatter YAML del cuerpo Markdown en un solo paso.
categoria: herramienta
tags: [terminal]
alias: []
relacionados: [frontmatter, markdown, zod, astro]
alternativas: []
web: https://github.com/jonschlinkert/gray-matter
npm: gray-matter
fuentes: [https://github.com/jonschlinkert/gray-matter]
---

## Qué es

gray-matter es una librería que separa un archivo con frontmatter en dos partes: los datos de la cabecera YAML y el cuerpo Markdown. Devuelve un objeto con `data` y `content`, sin interpretar el Markdown ni decidir qué campos son válidos. No es un validador de esquemas: solo extrae y entrega. Por eso suele combinarse con una biblioteca de validación como Zod.

## Para qué sirve

Leer contenido desde un script que no está dentro de Astro. Caso concreto: el script de validación de esta wiki recorre los archivos de contenido, extrae la cabecera con gray-matter y comprueba cada campo con Zod. Así las reglas se ejecutan igual en local y en integración continua, sin depender de los cargadores del framework.

## Cuándo usarlo

- Cuando escribes una herramienta de línea de comandos, un script de build o una tarea que lee Markdown con cabecera.
- Cuando necesitas separar datos y cuerpo antes de validar, transformar o publicar el contenido.
- Cuando trabajas con archivos que no pertenecen a una colección de contenido y quieres el mismo formato.

## Cuándo no

- Dentro de Astro no hace falta: las colecciones de contenido ya parsean la cabecera y entregan los datos tipados.
- Si solo quieres analizar YAML suelto, sin delimitadores `---`: un parser de YAML directo es más simple.
- Si el archivo no tiene cabecera: la librería devolverá datos vacíos y no aporta nada.

## Alternativas

`js-yaml` o `yaml` analizan YAML, pero hay que detectar y recortar la cabecera a mano. El complemento de frontmatter de Vite está integrado en esa cadena de build, no en un script suelto de Node. gray-matter ocupa el punto medio: hace la separación por ti y deja la validación a otra pieza.

## Matices

La librería no conoce los esquemas del proyecto: extrae lo que encuentra y confía en la validación posterior. Conviene por tanto no repetir reglas en dos sitios: el esquema vive en `src/lib/content/esquemas.ts` y se lee del checkout. Ojo con los formatos de fecha del YAML: una fecha sin comillas puede convertirse en objeto de fecha antes de que el validador la vea. También hay que decidir quién cuenta las palabras del cuerpo: sin la cabecera separada sería imposible medir solo el texto.

## Ejemplo

```ts
import matter from "gray-matter";
import { esquemaPaquetes } from "../src/lib/content/esquemas";

const { data, content } = matter(archivo);
const resultado = esquemaPaquetes.safeParse(data);
if (!resultado.success) console.error(ruta, resultado.error.issues);
```

La misma separación sirve para contar palabras del cuerpo sin incluir la cabecera, como hace el validador de extensión.
