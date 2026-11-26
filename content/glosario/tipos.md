---
titulo: "Tipos"
resumen: "Clasificación de los valores de un lenguaje que determina qué operaciones se pueden hacer con ellos."
categoria: lenguaje
tags: ["nivel-0"]
alias: []
relacionados: [typescript, interfaz]
fuentes: ["https://www.typescriptlang.org/docs/handbook/2/everyday-types.html"]
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

## Uniones e intersecciones

Una unión (`|`) dice «uno de estos tipos»; una intersección (`&`) dice «cumple ambos a la vez». La unión es la que más se usa para modelar estados:

```ts
type Carga = { estado: "ok"; datos: string[] } | { estado: "error"; error: Error };

function mostrar(carga: Carga) {
  if (carga.estado === "ok") return carga.datos.join(", ");
  return carga.error.message; // aquí ya sabe que es error
}
```

El campo literal que discrimina (`estado`) es lo que permite estrechar el tipo. Los genéricos y los tipos derivados (`Pick`, `Omit`) están en la ficha de TypeScript.
