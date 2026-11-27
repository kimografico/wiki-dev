---
titulo: "Skill"
resumen: "Paquete de instrucciones y procedimientos que un agente carga cuando necesita realizar una tarea concreta."
categoria: concepto
tags: ["backend"]
alias: ["skills"]
relacionados: [prompt, agente, mcp, base-de-conocimiento]
fuentes: []
autoenlace: true
alternativas: [prompt, base-de-conocimiento, mcp]
---

## Qué es

Una skill es un paquete de instrucciones, referencias y, si hace falta, scripts que un agente carga cuando la tarea encaja con su descripción. No es un simple prompt pegado al principio: se mantiene aparte y se activa bajo demanda. Tampoco es una librería que se importa: su contenido es procedimiento y criterios, no una API que devuelve valores. La descripción inicial funciona como disparador y decide cuándo merece la pena cargar el resto. El cuerpo suele indicar pasos, plantillas y formas de verificar el resultado.

## Para qué sirve

Centraliza un procedimiento que se repite y evita reescribirlo en cada conversación. La skill `anadir-entrada` resume cómo elegir colección, slug y plantilla antes de crear un archivo; otra skill puede explicar cómo validar una entrada terminada. El agente consulta la descripción, carga solo la que corresponde y mantiene el resto de reglas fuera del camino. Es útil cuando el conocimiento es estable y el trabajo, repetible.

## Ejemplo

```text
.opencode/skills/anadir-entrada/
└── SKILL.md           # cuándo usarla y pasos

specs/plantillas/
└── *.md               # ejemplos de entrada por tipo
```

Las plantillas viven fuera de la skill: `.opencode/` es de sistema y el proyecto las mantiene en `specs/plantillas/`.

```ts
function cargarSkill(tarea: string): string {
  return tarea.includes("entrada")
    ? "Lee la plantilla, elige el slug y valida con el esquema."
    : "No hay skill aplicable: usa una instrucción puntual.";
}

console.log(cargarSkill("crear entrada de IA"));
```

La descripción breve decide la activación; el procedimiento completo se lee solo cuando la tarea encaja. Así una instrucción larga no compite con el resto del trabajo desde el principio.

## Limitaciones

Una skill larga y difusa compite con otras reglas y acaba ignorada. Si dos descripciones se solapan, se carga la equivocada. Un procedimiento desactualizado se aplica con la misma seguridad que uno vigente, así que hay que revisarlo cuando cambian los esquemas o las plantillas. Los scripts que incluya piden permisos y deben ser revisables como cualquier código. Cargar muchas skills también consume contexto: más instrucciones no garantizan mejor resultado.

## Alternativas

| Opción | Qué contiene | Cuándo usarla |
| ------ | ------------ | ------------- |
| Skill | Procedimiento accionable | Tarea repetible con pasos definidos |
| Prompt | Instrucción puntual | Una respuesta concreta sin procedimiento |
| Base de conocimiento | Documentos con evidencia | Necesitas citar y verificar fuentes |
| MCP | Herramientas conectadas | El agente debe consultar sistemas externos |

Skill y Base de conocimiento se complementan: una dice cómo actuar; la otra, en qué apoyarse.
