---
fecha: 2026-11-26
titulo: Machine Learning
resumen: "Subcampo de la inteligencia artificial en el que los sistemas aprenden patrones de los datos en lugar de seguir solo reglas escritas a mano."
categoria: concepto
tags: [backend]
alias: [aprendizaje automático, ML]
relacionados: [llm, big-data, agente, modelos, base-de-conocimiento]
fuentes:
  - "https://cloud.google.com/learn/what-is-machine-learning"
  - "https://www.ibm.com/think/topics/machine-learning"
autoenlace: true
alternativas: []
---

## Qué es

Machine Learning (aprendizaje automático) es la parte de la inteligencia artificial que construye sistemas capaces de aprender de los datos. En lugar de escribir una regla para cada caso, se entrena un modelo con ejemplos y ese modelo aplica lo aprendido a datos nuevos.

La relación entre términos es lo que más confunde: el aprendizaje automático es un subconjunto de la IA, y el aprendizaje profundo (*deep learning*) es un subconjunto del aprendizaje automático. IBM lo resume diciendo que todo Machine Learning es IA, pero no toda IA es Machine Learning. Un LLM es un caso concreto de Machine Learning entrenado con texto.

## Para qué sirve

Para resolver tareas donde las reglas son difíciles de escribir a mano pero hay muchos ejemplos: clasificar incidencias, detectar anomalías, recomendar contenidos o predecir una magnitud a partir de datos pasados.

En desarrollo software aparece detrás de asistentes de código, clasificadores de texto y sistemas que detectan patrones en registros o métricas. No sustituye a una comprobación determinista cuando el resultado debe ser exacto siempre.

## Ejemplo

Clasificar las incidencias de un equipo por el texto de su descripción. Se recogen ejemplos ya etiquetados como «fallo de interfaz», «fallo de datos» o «consulta»; se entrena un modelo con ellos y, al llegar una incidencia nueva, el modelo propone una categoría.

```ts
const categoria = await modelo.clasificar("El botón de guardar no responde");
// "fallo de interfaz"
```

El modelo no recibe una regla que diga qué palabras significan «interfaz»: lo infiere de los ejemplos de entrenamiento.

## Limitaciones

- **Depende de los datos:** con ejemplos sesgados, incompletos o mal etiquetados, el modelo aprende ese sesgo.
- **Generaliza, no garantiza:** acierta con probabilidad sobre datos parecidos a los de entrenamiento; con casos muy distintos puede fallar.
- **Explicabilidad:** un modelo complejo puede dar una respuesta sin que sea fácil explicar por qué. En dominios regulados eso importa.
- **Coste:** entrenar y mantener modelos consume datos, cómputo y revisión humana.

## Alternativas

- **Reglas explícitas:** si cada caso se puede describir con una condición, un `if` o un motor de reglas es predecible y auditable.
- **Consultas y agregaciones:** para responder «cuántos pedidos hubo ayer», una consulta a la base de datos es exacta y mucho más barata.
- **Sistemas expertos clásicos:** otra forma de IA que representa conocimiento como reglas escritas por personas, sin aprender de ejemplos.
- **LLM genérico:** útil como punto de partida para texto, pero no siempre compensa entrenar un modelo propio.
