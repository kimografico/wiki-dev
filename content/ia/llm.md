---
fecha: 2026-11-23
titulo: "LLM"
resumen: "Modelo de lenguaje a gran escala basado en redes neuronales profundas para procesar, razonar y generar lenguaje natural."
categoria: concepto
tags: [backend]
alias: [Large Language Model, Modelo de lenguaje extenso]
relacionados: [prompt, agente, base-de-conocimiento, machine-learning, mcp, big-data]
fuentes:
  - "https://en.wikipedia.org/wiki/Large_language_model"
  - "https://platform.claude.com/docs/en/build-with-claude/context-windows"
  - "https://platform.claude.com/docs/en/build-with-claude/compaction"
  - "https://www.anthropic.com/engineering/claude-code-best-practices"
  - "https://platform.openai.com/docs/guides/prompt-engineering"
  - "https://vitest.dev/guide/learn/writing-tests-with-ai"
autoenlace: true
---

## Qué es

Un **LLM** (*Large Language Model* o modelo de lenguaje a gran escala) es un modelo de aprendizaje automático, habitualmente basado en la arquitectura de *Transformers*, entrenado con enormes volúmenes de texto para predecir probabilidades de secuencias de *tokens*. Mediante miles de millones de parámetros, un LLM puede capturar relaciones semánticas y gramaticales complejas para comprender instrucciones, redactar texto, traducir idiomas, estructurar datos o generar código de programación.

## Para qué sirve

Los LLMs han transformado el desarrollo de software y la interacción humano-máquina. Permiten automatizar tareas cognitivas repetitivas, actuar como asistentes interactivos de programación y habilitar interfaces de usuario conversacionales sin requerir árboles de decisión rígidos. Además, integrados mediante APIs, permiten a las aplicaciones procesar texto no estructurado, extraer entidades y conectar interfaces tradicionales con agentes autónomos.

## Ejemplo

Consumo básico de la API de un LLM desde un entorno de servidor (Node 18+ ya incluye `fetch`). La clave se lee de variables de entorno y no se envía al navegador: exponerla en código cliente permitiría a cualquiera usarla.

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
- **Alucinaciones:** inventa datos plausibles aunque no los conozca; ver «Alucinaciones» más abajo para cómo detectarlas.
- **No sustituye a un buscador:** un motor de búsqueda indexa y recupera documentos exactos; un LLM sintetiza de forma probabilística y puede equivocarse en datos concretos.
- **Coste y latencia:** el tamaño del modelo se traduce en inferencia cara y lenta para ciertas cargas, y en un consumo energético notable.

## Alternativas

- **RAG (recuperación aumentada):** combinar el LLM con una base de datos vectorial para responder con documentos verificados en lugar de depender de la memoria del modelo.
- **Modelos pequeños (SLM):** para tareas acotadas (clasificar, extraer entidades) un modelo pequeño es más barato y rápido.
- **Motores de búsqueda e indexado:** cuando hace falta recuperar el documento exacto, el indexado tradicional sigue siendo más fiable.
- **Reglas y árboles de decisión:** si el problema es determinista, un flujo con reglas fijas es predecible y no se equivoca.

## Ventana de contexto

La ventana de contexto es el conjunto de tokens que el modelo puede tener en cuenta en una interacción. Cuenta **todo**: instrucciones del sistema, mensajes, resultados de herramientas, definiciones de esas herramientas y la propia respuesta. No es solo lo que escribió el usuario, y su tamaño exacto depende del modelo, así que conviene consultarlo en la documentación oficial antes de dar cifras.

Más contexto no garantiza más acierto. La recuperación se degrada a medida que crece la ventana (*context rot*, «podredumbre de contexto»), y un modelo que encuentra un dato aislado en un prompt largo puede fallar cuando hay varios datos parecidos. En prompts extensos, la pregunta concreta suele funcionar mejor al final.

## Pérdida de contexto y compactación

En sesiones largas, los modelos suelen compactar: sustituyen turnos antiguos por un resumen generado por ellos mismos y conservan los recientes tal cual. Compactar no es recortar por orden: hay que decidir qué se conserva (arquitectura, decisiones tomadas, bugs sin resolver) y qué se descarta (salidas crudas de herramientas). Limpiar resultados de herramientas es una técnica distinta y complementaria.

Cuando el trabajo cambia de tema, empezar una conversación nueva suele ser más sano que arrastrar un historial enorme. Para un repositorio grande, aporta más seleccionar los archivos y el `diff` relevantes que pegar el árbol completo: ver Agente para el bucle de herramientas y Base de conocimiento para la recuperación verificable.

## Alucinaciones

Una alucinación es una respuesta plausible y falsa. En código se manifiesta como APIs que no existen, símbolos inventados, parámetros inexistentes o tests que comprueban poco. El fallo más peligroso no es el código que no compila, sino el que parece terminado: una herramienta puede incluso informar de éxito mientras su parche falló.

Decir «no inventes» no basta. Para hechos y cálculos, el *grounding* —apoyar la respuesta en fuentes consultadas en lugar de la memoria del modelo— y la ejecución real de código son mejores defensas que la instrucción. En esta wiki, cada entrada generada por un agente se revisa en el `diff` antes de aceptarse: la misma idea vale para cualquier código generado.

## Verificar código generado

La comprobación es una lista corta, no un sentimiento:

1. Pedir el comando ejecutado y su **salida**, no un «todos los tests pasan».
2. Ejecutar la comprobación de forma no interactiva y leer el resultado.
3. Revisar que las aserciones discriminan casos: un `toBeDefined()` casi nunca detecta un error de lógica.
4. Desconfiar de mocks excesivos, de mocks que no se restauran y de mezclar APIs de otro runner.
5. Si el cambio es grande, pedir una revisión a otro agente que no haya visto el razonamiento original.

Pasar tests con aserciones débiles no demuestra corrección: solo demuestra que esas aserciones pasaron. La cobertura mide líneas ejecutadas, no casos de uso cubiertos (ver Estrategia de testing).

## En el ecosistema de IA

Un LLM es un caso concreto de Machine Learning: se entrena con grandes volúmenes de texto y aplica lo aprendido a secuencias nuevas. Machine Learning es el paraguas; el LLM es una técnica dentro de él, y Big Data describe el volumen de datos que suele haber detrás de ese entrenamiento.

Cuando el modelo necesita usar herramientas externas, MCP ofrece un protocolo común para conectarlas. El bucle que decide cuándo llamarlas es un Agente; el protocolo no decide, solo estandariza la conexión.