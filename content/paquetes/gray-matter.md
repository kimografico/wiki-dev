---
titulo: gray-matter
resumen: Librería que separa el frontmatter YAML del cuerpo Markdown en un solo paso.
categoria: herramienta
tags: [terminal]
alias: []
relacionados: [frontmatter, markdown]
alternativas: []
web: https://github.com/jonschlinkert/gray-matter
npm: gray-matter
fuentes: [https://github.com/jonschlinkert/gray-matter]
---

## Qué es

gray-matter lee un archivo con frontmatter y lo divide en dos partes: los datos (el YAML de cabecera) y el contenido (el Markdown restante).

## Para qué sirve

Aquí lo usa el script de validación (RF-10) para extraer el frontmatter de cada archivo y comprobarlo con Zod, sin depender del cargador de Astro.

## Cuándo usarlo

Cuando necesitas procesar archivos con frontmatter por tu cuenta, fuera del framework, como en un script de build o una herramienta de línea de comandos.

## Cuándo no

Dentro de Astro no es necesario: las content collections ya parsean el frontmatter. Usarlo a la vez duplicaría el trabajo.

## Alternativas

`js-yaml` o `yaml` parsean YAML pero hay que separar la cabecera a mano; Frontmatter de Vite está integrado en esa cadena, pero no en un script suelto de Node.

## Ejemplo

```ts
import matter from "gray-matter";

const { data, content } = matter(archivo);
```

## Nota

gray-matter arrastra una dependencia antigua (`sprintf-js`) con avisos de auditoría; se acepta porque solo se usa en el build.
