---
titulo: "LLM"
resumen: "Modelo de lenguaje a gran escala basado en redes neuronales profundas para procesar, razonar y generar lenguaje natural."
categoria: concepto
tags: [backend]
alias: [Large Language Model, Modelo de lenguaje extenso]
relacionados: []
fuentes: ["https://en.wikipedia.org/wiki/Large_language_model"]
autoenlace: true
---

## Qué es

Un **LLM** (*Large Language Model* o modelo de lenguaje a gran escala) es un modelo de aprendizaje automático, habitualmente basado en la arquitectura de *Transformers*, entrenado con enormes volúmenes de texto para predecir probabilidades de secuencias de palabras. Mediante miles de millones de parámetros, un LLM puede capturar relaciones semánticas y gramaticales complejas para comprender instrucciones, redactar texto, traducir idiomas, estructurar datos o generar código de programación.

## Para qué sirve

Los LLMs han transformado el desarrollo de software y la interacción humano-máquina. Permiten automatizar tareas cognitivas repetitivas, actuar como asistentes interactivos de programación y habilitar interfaces de usuario conversacionales sin requerir árboles de decisión rígidos. Además, integrados mediante APIs, permiten a las aplicaciones procesar texto no estructurado, extraer entidades y conectar interfaces tradicionales con agentes autónomos.

## Ejemplo

Consumo básico de la API de un LLM utilizando JavaScript moderno (Fetch API) para obtener una respuesta en formato JSON estructurado:

```js
async function clasificarTexto(texto) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'Clasifica el sentimiento en: positivo, neutro o negativo.' },
        { role: 'user', content: texto }
      ],
      temperature: 0.2
    })
  });

  const data = await response.json();
  return data.choices[0].message.content.trim();
}

const resultado = await clasificarTexto('El despliegue fue un éxito total.');
console.log(resultado); // "positivo"
```

## Limitaciones

- **No es una AGI:** un LLM no tiene consciencia ni razonamiento general autónomo; modela patrones estadísticos en secuencias de texto.
- **Alucinaciones:** inventa datos plausibles aunque no los conozca; memoriza conocimiento de entrenamiento que se desactualiza y no es una base de datos fiable.
- **No sustituye a un buscador:** un motor de búsqueda indexa y recupera documentos exactos; un LLM sintetiza de forma probabilística y puede equivocarse en datos concretos.
- **Coste y latencia:** el tamaño del modelo se traduce en inferencia cara y lenta para ciertas cargas, y en un consumo energético notable.

## Alternativas

- **RAG (recuperación aumentada):** combinar el LLM con una base de datos vectorial para responder con documentos verificados en lugar de depender de la memoria del modelo.
- **Modelos pequeños (SLM):** para tareas acotadas (clasificar, extraer entidades) un modelo pequeño es más barato y rápido.
- **Motores de búsqueda e indexado:** cuando hace falta recuperar el documento exacto, el indexado tradicional sigue siendo más fiable.
- **Reglas y árboles de decisión:** si el problema es determinista, un flujo con reglas fijas es predecible y no se equivoca.