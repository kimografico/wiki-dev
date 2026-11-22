---
titulo: "LLM"
resumen: "Modelo de lenguaje a gran escala basado en redes neuronales profundas para procesar, razonar y generar lenguaje natural."
categoria: concepto
tags: [backend]
alias: [Large Language Model, Modelo de lenguaje extenso]
relacionados: []
fuentes: ["https://en.wikipedia.org/wiki/Large_language_model"]
autoenlace: true
terminoEn: "Large Language Model"
---

## Definición

Un **LLM** (*Large Language Model* o modelo de lenguaje a gran escala) es un modelo de aprendizaje automático, habitualmente basado en la arquitectura de *Transformers*, entrenado con enormes volúmenes de texto para predecir probabilidades de secuencias de palabras. Mediante miles de millones de parámetros, un LLM puede capturar relaciones semánticas y gramaticales complejas para comprender instrucciones, redactar texto, traducir idiomas, estructurar datos o generar código de programación.

## Por qué importa

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

## Se confunde con

- **IA General (AGI):** Un LLM no tiene consciencia, capacidad de razonamiento general autónomo ni comprensión real del mundo; se limita a modelar patrones estadísticos en secuencias de texto.
- **Base de datos de conocimiento:** Aunque memoriza información factual durante el entrenamiento, un LLM no es un almacén estructurado y confiable; está sujeto a alucinaciones y datos desactualizados.
- **Motor de búsqueda:** Un buscador indexa y recupera documentos exactos mediante coincidencia y enlaces; un LLM sintetiza y genera lenguaje de forma probabilística.