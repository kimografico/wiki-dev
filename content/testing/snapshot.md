---
titulo: "Snapshot"
resumen: "Test que guarda una representación serializada del resultado y la compara en ejecuciones posteriores."
categoria: concepto
tags: ["tests"]
alias: []
relacionados: ["regresion", "cobertura", "vitest", "storybook"]
fuentes: []
autoenlace: true
alternativas: []
---

## Qué es

Un snapshot es una copia serializada del resultado que produce una pieza de código —el HTML renderizado de un componente, un árbol de nodos o el texto generado por una plantilla— guardada junto al test. En ejecuciones posteriores, el test genera el resultado de nuevo y lo compara con la copia: si difieren, falla.

La copia no es una aserción escrita a mano, sino un registro automático del estado anterior. Por eso responde a una pregunta concreta: «¿ha cambiado la salida respecto a la última vez que se aceptó?». No dice si esa salida era correcta.

## Para qué sirve

Para vigilar estructuras grandes donde escribir aserciones una por una sería impráctico. Detecta cambios inesperados en la forma de componentes, tablas o salidas de generadores: un item que desaparece, un orden que se invierte o un atributo que cambia.

También documenta el cambio cuando este es intencionado. El diferencial entre la copia guardada y el resultado nuevo muestra exactamente qué parte cambió, y el autor decide si lo acepta o si corrige el código.

## Tipos de prueba

- **De componentes**: guarda el HTML o el árbol renderizado y avisa si cambia la estructura.
- **De generadores**: compara la salida de Markdown, configuración o serialización de datos.
- **Visual**: guarda una imagen de la página y la compara con la referencia; es la variante más sensible a cambios de fuentes o de navegador.
- **De regresión**: cualquier snapshot se convierte en prueba de regresión cuando se creó para impedir que reapareciera un fallo concreto.

## Ejemplo

```ts
import { expect, it } from "vitest";

it("mantiene la estructura de la ficha", () => {
  const html = renderizarFicha(entrada);
  expect(html).toMatchSnapshot();
});
```

La primera ejecución crea el archivo de snapshot; las siguientes comparan con él. Si el cambio es correcto, se actualiza la copia y se revisa el diferencial como se revisaría cualquier otro cambio de código.

## Matices

| Señal | Qué comprueba | Qué no comprueba |
|---|---|---|
| Snapshot | Que la salida no cambió respecto a la copia | Que la salida fuera correcta antes de guardarla |
| Regresión | Que un fallo conocido no reaparece | Que la salida completa sea idéntica |
| Cobertura | Que el código se ejecutó | Que exista una aserción sobre el resultado |

Un snapshot aceptado con un error sigue siendo un error: la copia solo congela el estado presente. Por eso conviene acompañarlo de aserciones concretas sobre los datos importantes y leer siempre el diferencial antes de actualizarlo. Si los cambios son grandes y ruidosos en cada ejecución, esa salida probablemente no debe ser un snapshot: una comparación específica dará una señal más clara.
