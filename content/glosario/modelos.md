---
titulo: "Modelos"
resumen: "Estructuras de datos con reglas que describen la información de una aplicación y permiten validar entradas y compartir vocabulario."
categoria: datos-api
tags: ["backend"]
alias: []
relacionados: [data-layer, machine-learning, api, zod]
fuentes: []
autoenlace: true
---
## Definición

Un modelo describe la forma de un dato y las reglas que debe cumplir: qué campos existen, de qué tipo son y qué relaciones tiene. No es solo una interfaz de tipos: cuando se usa para validar, comprueba en tiempo de ejecución que los datos recibidos encajan con esa forma. Separa la representación de la información del código que la procesa.

## Por qué importa

Un mismo pedido circula por la interfaz, la API y la base de datos. Sin una definición compartida, cada capa asume campos distintos y el error aparece lejos de donde se originó: un `null` que nadie esperaba al renderizar. Definir el modelo una vez hace explícito el contrato y permite rechazar una entrada inválida en la frontera, antes de que se propague al resto del sistema.

## Ejemplo

```ts
const Usuario = z.object({
  id: z.string(),
  email: z.string().email(),
  activo: z.boolean().default(true),
});
const entrada = Usuario.parse(await request.json());
```

`parse` devuelve el dato validado o lanza un error que señala el campo que falla.

## Se confunde con

- **Modelo de IA**: en Machine Learning es el resultado de entrenar con datos y sirve para predecir; aquí describe y valida información.
- **Entidad**: nombra un concepto del negocio; el modelo es su representación en código.

## Matices

En esta wiki el término se documenta bajo la etiqueta backend. La etiqueta organiza el catálogo y no define el término.
