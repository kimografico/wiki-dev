---
titulo: Zod
resumen: Librería de validación y definición de esquemas que comprueba datos en tiempo de ejecución y deduce sus tipos.
categoria: datos-api
tags: [frontend, backend]
alias: []
relacionados: [schema-first, typescript]
alternativas: []
web: https://zod.dev
npm: zod
fuentes: [https://zod.dev/]
---

## Qué es

Zod permite describir la forma que deben tener los datos con un esquema y comprobarlos en tiempo de ejecución. A partir del esquema, además, TypeScript deduce el tipo correspondiente, así que una sola definición sirve para validar y para tipar.

## Para qué sirve

Aquí valida el frontmatter de cada entrada: campos obligatorios, categorías y etiquetas permitidas, resumen con longitud máxima. Si algo no cumple, el build falla con un mensaje claro.

## Cuándo usarlo

Cuando entren datos externos —archivos, respuestas de API, formularios— y no baste con tipos, porque los tipos no existen al ejecutar.

## Cuándo no

Si los datos ya están tipados y garantizados en la misma ejecución, validar otra vez es trabajo redundante.

## Alternativas

Ajv y Valibot resuelven el mismo problema con otras prioridades (estándar JSON Schema, tamaño mínimo); aquí Zod encaja porque ya viene con Astro.

## Ejemplo

```ts
const categoria = z.enum(["framework", "estilos"]);
categoria.parse("framework"); // ok
categoria.parse("moda"); // error
```
