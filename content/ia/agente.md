---
fecha: 2026-11-23
titulo: "Agente"
resumen: "Entidad de software autónoma que percibe su entorno mediante herramientas o datos y ejecuta acciones para alcanzar un objetivo específico."
categoria: "concepto"
tags: []
alias: ["AI Agent", "Agente Autónomo", "Agente Inteligente"]
relacionados: ["llm"]
fuentes: ["https://en.wikipedia.org/wiki/Intelligent_agent"]
autoenlace: true
---

## Qué es

Un agente es un sistema o programa informático diseñado para percibir su entorno, tomar decisiones de forma autónoma y ejecutar acciones utilizando un conjunto de herramientas o capacidades predefinidas para lograr una meta u objetivo concreto.

En el contexto de la inteligencia artificial moderna y los modelos de lenguaje (LLM), un agente combina la capacidad de razonamiento de un modelo con la ejecución de funciones externas (como realizar peticiones HTTP, consultar bases de datos o ejecutar código) en un bucle interactivo de planificación y acción.

## Para qué sirve

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

## Limitaciones

- **Depende del modelo:** el bucle de decisión es tan bueno como el LLM que lo alimenta; una mala interpretación de la meta lleva a acciones equivocadas.
- **Coste y no determinismo:** cada paso consume tokens y puede dar resultados distintos ante la misma petición, por lo que cuesta testear y controlar.
- **Seguridad:** al ejecutar herramientas reales (HTTP, base de datos, código), un objetivo mal interpretado puede provocar efectos no deseados; hace falta acotar permisos y revisar trazas.
- **No es una AGI:** el agente decide dentro de un conjunto de herramientas y una meta definidas; no comprende el mundo ni actúa fuera de ese marco.

## Alternativas

- **[LLM (Large Language Model)](/ia/llm)**: el LLM es el «cerebro» del agente, pero por sí solo no ejecuta acciones ni guarda contexto de ejecución; combinarlos es el planteamiento habitual, no una opción excluyente.
- **Bot de chat simple:** un bot tradicional sigue un árbol de decisión rígido con reglas fijas; es más barato y predecible cuando el flujo se conoce por completo.
- **Flujos con reglas o BPM:** para procesos deterministas, un motor de reglas o un workflow explícito es auditable y no depende de un modelo probabilístico.
- **Script programado:** si la secuencia de pasos siempre es la misma, un script directo evita el bucle de planificación.

## Relación con prompt y skill

Un prompt es la instrucción concreta; una skill es el procedimiento reutilizable que el agente carga cuando lo necesita. El agente es quien decide en qué orden usarlos y qué herramientas llama en cada paso.
