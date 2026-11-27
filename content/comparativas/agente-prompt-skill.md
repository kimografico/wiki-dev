---
titulo: "Agente frente a prompt y skill"
resumen: "Prompt, Skill y Agente no compiten: son capas distintas. La diferencia está en quién decide el siguiente paso y dónde vive el procedimiento."
categoria: concepto
tags: ["backend"]
alias: []
relacionados: ["agente", "prompt", "skill", "orquestador", "copilot"]
fuentes: []
autoenlace: true
entidades: ["agente", "prompt", "skill"]
contexto: "Al configurar un asistente se mezclan tres capas: el mensaje de una respuesta, el procedimiento reutilizable y el componente que elige pasos y usa herramientas."
---

## Contexto

Un **Prompt** es el texto que se envía al modelo en una intervención. Una **Skill** es un procedimiento guardado que se carga cuando hace falta. Un **Agente** es el componente que observa, elige herramientas y encadena pasos hasta completar un objetivo. Confundirlos lleva a meter procedimientos largos en un mensaje, o a construir un orquestador para una tarea de una sola línea.

La distancia entre ellos no es de tamaño, sino de responsabilidad. Cambiar un Prompt afecta a una respuesta; cambiar una Skill afecta a todas las tareas que la invocan; cambiar un Agente afecta a cómo se toman las decisiones.

## Criterios

| Pieza | Quién decide el siguiente paso | Alcance | Dónde vive | Señal de que la necesitas |
|---|---|---|---|---|
| **Prompt** | El modelo, dentro de una respuesta | Una intervención | Mensaje o historial | «Resume este apartado» |
| **Skill** | El procedimiento escrito | Tareas repetibles | Archivo versionado | «Cada alta sigue estos pasos» |
| **Agente** | El bucle de control | Objetivo completo | Código, herramientas y memoria | «Investiga, redacta y revisa» |

El **Orquestador** coordina varios agentes o herramientas; no es sinónimo de Agente. **Copilot** puede usar las tres capas a la vez, sin igualarlas.

## Cuándo elegir cada una

Elige un **Prompt** para una respuesta puntual, sin efectos externos y sin pasos condicionales. Es la opción más barata y la más fácil de corregir: editas el texto y vuelves a intentar.

Elige una **Skill** cuando la misma secuencia se repite y la calidad depende de seguirla: crear una entrada, revisar un diff o migrar un esquema. Guarda la Skill en el repositorio para que pueda revisarse como cualquier otro archivo.

Elige un **Agente** cuando el siguiente paso depende del resultado del anterior y hacen falta herramientas: leer archivos, consultar fuentes, ejecutar validaciones. La decisión no es «más potencia», sino quién posee el hilo de la tarea.

Regla práctica: salida en un mensaje → Prompt; pasos conocidos → Skill; objetivo con pasos por decidir → Agente.

## Ejemplos

```text
Prompt: "Resume en tres viñetas el apartado Criterios de esta entrada."
Skill:  anadir-entrada → plantilla → frontmatter → secciones → validación
Agente: investigar → redactar → enlazar → validar → publicar
```

```yaml
bucle:
  - observar: "¿qué falta para publicar?"
  - elegir: "¿busco fuentes o escribo el cuerpo?"
  - ejecutar: "herramienta de lectura o escritura"
  - comprobar: "¿cumple las secciones obligatorias?"
```

## Matices

Una Skill no ejecuta nada por sí sola: alguien debe cargarla. Un Prompt no es una política: si la instrucción se repite, muévela a la Skill. Un Agente sin herramientas es solo un Prompt con más vueltas.
