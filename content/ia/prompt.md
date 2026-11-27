---
titulo: "Prompt"
resumen: "Instrucción en lenguaje natural que se envía a un modelo de lenguaje para condicionar su respuesta."
categoria: concepto
tags: ["backend"]
alias: ["prompts"]
relacionados: [skill, agente, llm, mcp]
fuentes: []
autoenlace: true
alternativas: [skill, agente]
---

## Qué es

Un prompt es la instrucción en lenguaje natural que se envía a un modelo junto con los datos de entrada para condicionar su respuesta. Suele repartirse en un mensaje de sistema, con el rol y las reglas permanentes, y un mensaje de usuario, con el caso concreto. Incluye contexto, formato de salida, restricciones y, a veces, ejemplos. No es código ni configuración: el modelo interpreta el texto, no lo ejecuta. Tampoco es todo el contexto: comparte espacio con documentos recuperados, resultados de herramientas y mensajes anteriores.

## Para qué sirve

Es la interfaz con el modelo. Un prompt bien acotado convierte una petición vaga en una salida utilizable: generar una entrada de la wiki con las secciones obligatorias, los slugs existentes y el rango de palabras acordado. Permite repetir una tarea con una plantilla y cambiar su comportamiento editando texto, sin tocar el modelo. La claridad del formato pedido importa más que la longitud del texto.

## Ejemplo

```ts
const prompt = `
Rol: redactor de una wiki técnica en español.
Contexto: usa solo los slugs existentes del índice.
Formato: Markdown con secciones ## Qué es, ## Para qué sirve, ## Ejemplo, ## Limitaciones.
Restricciones: sin fechas, sin precios, sin inventar datos; entre 320 y 450 palabras.
Entrada: ${JSON.stringify({ titulo: "Prompt", categoria: "concepto" })}
`;

console.log(prompt);
```

Las reglas fijas van en el mensaje de sistema y el caso concreto, en el de usuario. La salida se valida con el esquema antes de publicarse: pedir un formato no garantiza cumplirlo.

## Limitaciones

Una instrucción ambigua produce respuestas distintas ante la misma entrada. Añadir texto no garantiza acierto: las reglas contradictorias compiten entre sí y las que van al final no siempre ganan. El prompt no garantiza veracidad; necesita datos de apoyo y comprobaciones externas. El contenido recuperado puede intentar cambiar las instrucciones —inyección de prompt—, así que las reglas de la aplicación no deben depender de lo que diga un documento. Cambiar un prompt conviene hacerlo con casos de prueba.

## Alternativas

| Opción | Granularidad | Quién decide |
| ------ | ------------ | ------------ |
| Prompt | Una instrucción para una tarea puntual | Quien lo escribe |
| Skill | Procedimiento reutilizable cargado bajo demanda | El agente decide cuándo cargarla |
| Agente | Secuencia de pasos con herramientas | El agente decide el orden |

La comparativa Agente frente a prompt y skill desarrolla estos criterios con ejemplos.
