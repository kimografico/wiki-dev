---
titulo: "Tipos"
resumen: "Clasificación de los valores de un lenguaje que determina qué operaciones se pueden hacer con ellos."
categoria: lenguaje
tags: ["nivel-0"]
alias: []
relacionados: []
fuentes: []
autoenlace: true
---
## Definición

Clasificación de los valores de un lenguaje que determina qué operaciones se pueden hacer con ellos.

## Por qué importa

Hacen explícitas las expectativas y permiten detectar errores antes de ejecutar el programa.

## Ejemplo

```ts
type Resultado = { ok: true; dato: string } | { ok: false; error: Error };
```

## Se confunde con

No es una etiqueta: los tipos pertenecen al lenguaje; las etiquetas clasifican entradas de la wiki.
