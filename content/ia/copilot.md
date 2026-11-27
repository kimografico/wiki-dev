---
titulo: "Copilot"
resumen: "Asistente de codificación basado en modelos de lenguaje que sugiere código dentro del editor."
categoria: herramienta
tags: ["terminal"]
alias: []
relacionados: [agente, bot, prompt, skill]
fuentes: []
autoenlace: true
alternativas: []
---

## Qué es

Un copiloto de código es un asistente integrado en el editor que sugiere fragmentos, completa líneas, explica archivos y propone pruebas usando un modelo de lenguaje. Trabaja con el contexto que tiene a mano —el archivo abierto, el diff y, según la herramienta, otras partes del repositorio— y devuelve texto que el desarrollador acepta o descarta. No ejecuta el sistema por su cuenta ni posee la responsabilidad del código: es una herramienta de sugerencia, no un revisor automático.

## Para qué sirve

Acelera trabajo mecánico: escribir la estructura de una función, convertir un objeto, generar la primera versión de un test o explicar una expresión extraña. Sirve también como segunda opinión al revisar una decisión. El caso útil es concreto: pedir una implementación de `normalizarSlug` que respete las convenciones del proyecto y después comprobar que el resultado encaja con los esquemas y las plantillas existentes.

## Ejemplo

```ts
// Sugerencia aceptada tras revisarla: normalizar un slug antes de guardarlo.
export function normalizarSlug(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
```

```bash
npm run check && npm run lint && npm run test:coverage
```

Aceptar la sugerencia sin leerla es el error habitual. La comprobación no es una formalidad: las convenciones del proyecto pueden exigir otro formato de slug y el test puede quedar corto aunque pase.

## Limitaciones

Puede inventar APIs, parámetros o importaciones que no existen. También copia patrones del repositorio aunque sean inadecuados para el caso. No conoce requisitos que no están en el contexto, como una decisión acordada en otro canal. Un test generado puede pasar sin comprobar nada relevante. La responsabilidad sigue siendo de quien acepta el cambio: la salida se juzga con las comprobaciones del proyecto, no con lo convincente que parezca.

## Matices

| Concepto | Criterio que lo distingue |
| -------- | ------------------------- |
| Copilot | Sugerencias dentro del editor; decide el humano. |
| Bot | Conversación en un canal; responde a mensajes. |
| Agente | Elige pasos y llama herramientas dentro de límites. |
| Prompt | Instrucción que se escribe para cualquiera de ellos. |

Cuando hay varias decisiones encadenadas, el relevo natural es el Orquestador.
