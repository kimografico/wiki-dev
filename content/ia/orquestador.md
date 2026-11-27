---
titulo: "Orquestador"
resumen: "Componente que decide qué agente, herramienta o paso se ejecuta a continuación para completar una meta."
categoria: concepto
tags: ["backend"]
alias: []
relacionados: [agente, llm, skill, mcp]
fuentes: []
autoenlace: true
alternativas: [agente, workflow]
---

## Qué es

Un orquestador es la pieza que decide qué paso, herramienta o agente se ejecuta a continuación para completar una meta. Mantiene el estado del trabajo, observa el resultado de cada acción y elige entre continuar, reintentar, cambiar de rumbo o parar. No es el modelo que razona ni la herramienta que hace la tarea: es el bucle de control que los coordina. Puede estar escrito como código determinista o como un bucle guiado por un LLM; ambas versiones comparten la responsabilidad de acotar el trabajo.

## Para qué sirve

Convierte una intención amplia en pasos observables. En la wiki, descomponer «ampliar una entrada» en investigar, redactar, enlazar y revisar permite ver en qué paso falló y reanudarlo. También sirve para distribuir trabajo entre agentes especializados, limitar intentos y dejar una traza con lo ocurrido. Sin esa capa, cada agente tendría que conocer el flujo completo y decide por su cuenta cuándo ha terminado.

## Ejemplo

```ts
type Paso = "investigar" | "redactar" | "enlazar" | "revisar";

const siguiente: Record<Paso, Paso | null> = {
  investigar: "redactar",
  redactar: "enlazar",
  enlazar: "revisar",
  revisar: null,
};

async function ejecutar(objetivo: string, maxPasos = 4) {
  let paso: Paso | null = "investigar";
  const trazas: string[] = [];

  while (paso && trazas.length < maxPasos) {
    trazas.push(`${paso}: ${objetivo}`);
    paso = siguiente[paso];
  }

  return trazas;
}

console.log(await ejecutar("ampliar ia/prompt"));
```

Aquí el orden es fijo. Un orquestador real sustituye esa tabla por decisiones según el resultado de cada paso y llama a las herramientas correspondientes.

## Limitaciones

Un bucle sin límite repite trabajo y consume tokens; por eso hacen falta un máximo de pasos, presupuesto y criterios de parada explícitos. Un fallo en un paso temprano se propaga a los siguientes si no se valida cada resultado. La concurrencia mal gestionada duplica escrituras. Para depurar hay que registrar entradas, salidas y decisiones del bucle. Cuando la secuencia es fija y conocida, un flujo determinista es más barato y auditable que dejar la decisión a un modelo.

## Alternativas

| Opción | Cuándo conviene |
| ------ | --------------- |
| Orquestador | Varias herramientas o agentes y hay que decidir orden y parada. |
| Agente | Un solo actor puede planificar y ejecutar con herramientas. |
| Workflow | La secuencia está definida y no cambia según el resultado. |

Un orquestador dirige al agente sin sustituirlo; con una sola llamada añade una capa sin beneficio.
