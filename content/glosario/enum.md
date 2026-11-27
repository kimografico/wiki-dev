---
titulo: "Enum"
resumen: "Tipo que restringe un valor a una lista cerrada de opciones con nombre."
categoria: lenguaje
tags: ["nivel-0"]
alias: []
relacionados: ["tipos", "literales", "schema-first", "zod"]
fuentes: []
autoenlace: true
---
## Definición

Un enum es un tipo que restringe un valor a una lista cerrada de opciones con nombre. En TypeScript se expresa como una unión de literales (`'borrador' | 'publicado'`); en Zod, con `z.enum([...])`. En ambos casos la lista es el contrato, pero el momento de la comprobación cambia: la unión de literales rechaza cualquier otro valor al compilar, antes de ejecutarse; `z.enum(...)` valida en tiempo de ejecución, cuando se llama a `parse`.

## Por qué importa

En TypeScript convierte errores que aparecerían en tiempo de ejecución en errores detectados al escribir el código. Si `estado` solo admite dos valores, el editor avisa al compararlo con uno inexistente y el compilador impide asignar un string cualquiera. Zod sigue el camino inverso: comprueba el dato al ejecutarse. Además, la lista documenta por sí sola qué estados existen, sin hojas de cálculo ni comentarios que se quedan desfasados.

## Ejemplo

```ts
type Estado = 'borrador' | 'publicado';

function publicar(estado: Estado) {
  if (estado === 'borrador') return 'publicado';
  return estado;
}
```

Pasar `'archivado'` falla en tiempo de escritura. Con `z.enum(...)`, el rechazo ocurre al ejecutar `parse`: en los esquemas de contenido, esa comprobación evita que una categoría inventada llegue al build.

## Se confunde con

No es una unión cualquiera: `string | number` también es una unión, pero no enumera opciones con nombre. Tampoco es un array de constantes: el array permite cualquier índice y no comprueba el valor asignado. Ojo con el `enum` de TypeScript: genera código en tiempo de ejecución, mientras que la unión de literales desaparece al compilar; para contratos de datos, la unión suele ser suficiente.
