---
titulo: "Agente"
resumen: "Entidad de software autónoma que percibe su entorno mediante herramientas o datos y ejecuta acciones para alcanzar un objetivo específico."
categoria: "concepto"
tags: []
alias: ["AI Agent", "Agente Autónomo", "Agente Inteligente"]
relacionados: ["glosario/llm"]
fuentes: ["https://en.wikipedia.org/wiki/Intelligent_agent"]
autoenlace: true
terminoEn: "Agent"
---

## Definición

Un agente es un sistema o programa informático diseñado para percibir su entorno, tomar decisiones de forma autónoma y ejecutar acciones utilizando un conjunto de herramientas o capacidades predefinidas para lograr una meta u objetivo concreto.

En el contexto de la inteligencia artificial moderna y los modelos de lenguaje (LLM), un agente combina la capacidad de razonamiento de un modelo con la ejecución de funciones externas (como realizar peticiones HTTP, consultar bases de datos o ejecutar código) en un bucle interactivo de planificación y acción.

## Por qué importa

Los agentes permiten ir más allá de los modelos de lenguaje tradicionales que solo generan texto estático. Al dotar a un sistema de la capacidad de usar herramientas y tomar decisiones en cascada, es posible automatizar flujos de trabajo complejos de principio a fin sin intervención humana constante.

Son clave en el desarrollo de asistentes virtuales avanzados, sistemas de resolución de incidencias en código, automatización de pruebas y flujos de análisis de datos en tiempo real.

## Ejemplo

Un agente programado en JavaScript/TypeScript para responder a consultas de usuarios consultando una base de datos o APIs externas según sea necesario:

```typescript
import { OpenAI } from "openai";

interface AgentTool {
  name: string;
  execute: (input: string) => Promise<string>;
}

// Herramienta disponible para el agente
const searchDatabaseTool: AgentTool = {
  name: "searchDatabase",
  execute: async (query: string) => {
    return `Resultados para: ${query}`;
  }
};

// Ciclo de decisión del agente
async function runAgent(goal: string) {
  console.log(`Objetivo del agente: ${goal}`);
  
  // El agente evalúa si necesita usar herramientas para cumplir el objetivo
  const needsTool = true; 
  
  if (needsTool) {
    const result = await searchDatabaseTool.execute("pedidos pendientes");
    console.log(`Acción ejecutada. Resultado: ${result}`);
  }
}

runAgent("Obtener el estado de los pedidos del usuario");
```

## Se confunde con

- **[LLM (Large Language Model)](/glosario/llm)**: El LLM es el "cerebro" o motor de procesamiento del lenguaje dentro del agente, pero por sí solo no ejecuta acciones ni guarda contexto de ejecución activa. El agente incluye la lógica envolvente, las herramientas y el bucle de toma de decisiones.
- **Bot de chat simple**: Un bot tradicional sigue un árbol de decisión rígido basado en reglas fijas, mientras que un agente analiza la meta dada y decide de forma dinámica qué pasos y herramientas utilizar para resolverla.