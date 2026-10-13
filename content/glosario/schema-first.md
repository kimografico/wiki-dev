---
titulo: Schema-first
resumen: Enfoque en el que el esquema de los datos se define antes que el contenido, de modo que lo que no cumple el esquema no se publica.
categoria: concepto
tags: []
alias: [esquema primero]
relacionados: [zod, content-collection]
terminoEn: Schema-first
---

## Definición

Schema-first («primero el esquema») consiste en describir con precisión la forma que deben tener los datos —campos obligatorios, tipos y valores permitidos— y validarlos automáticamente. El esquema es la regla; el contenido se ajusta a ella.

## Por qué importa

Cuando el contenido lo escriben varias personas o agentes, un esquema evita que se cuele un campo mal escrito, una categoría inventada o un dato faltante. El error aparece en el build, no ante el lector.

## Ejemplo

```ts
const esquema = z.object({
  titulo: z.string(),
  categoria: z.enum(["lenguaje", "framework"]),
});
```

## Se confunde con

Con el tipado de TypeScript. El tipo desaparece al ejecutar; un **esquema** como Zod comprueba los datos en tiempo de ejecución, que es donde llegan desde archivos o peticiones.
