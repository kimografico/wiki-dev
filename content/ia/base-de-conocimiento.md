---
titulo: "Base de conocimiento"
resumen: "Conjunto de documentos estructurados que un agente o un sistema RAG puede recuperar para responder con evidencia."
categoria: concepto
tags: ["backend"]
alias: []
relacionados: [llm, agente, mcp, skill]
fuentes: []
autoenlace: true
alternativas: [llm, mcp]
---

## Qué es

Una base de conocimiento es un conjunto de documentos preparados para que un sistema recupere fragmentos concretos y los entregue como contexto a un modelo. Puede contener fichas de una wiki, manuales, reglas de negocio o decisiones ya tomadas. Se organiza en fragmentos con metadatos —título, slug, sección— para poder citar la fuente de cada respuesta. La sigla RAG (*retrieval augmented generation*, generación aumentada por recuperación) nombra el patrón: buscar primero, redactar después. No es la memoria del modelo ni un volcado de archivos sin índice: es un corpus mantenido con criterio.

## Para qué sirve

Sirve para responder con evidencia verificable. En esta wiki, un agente puede consultar la entrada de Prompt y citar su sección en lugar de reconstruir la definición de memoria. También permite corregir una respuesta editando un documento, sin volver a entrenar nada, y respetar información privada que no debe formar parte del entrenamiento. La trazabilidad es la razón principal: cada afirmación se puede seguir hasta un archivo y una sección concretos.

## Ejemplo

```ts
type Documento = {
  slug: string;
  titulo: string;
  texto: string;
};

const documentos: Documento[] = [
  {
    slug: "prompt",
    titulo: "Prompt",
    texto: "Instrucción en lenguaje natural enviada al modelo.",
  },
  {
    slug: "skill",
    titulo: "Skill",
    texto: "Procedimiento reutilizable que el agente carga cuando hace falta.",
  },
];

function buscar(terminos: string[]): Documento[] {
  return documentos.filter((documento) =>
    terminos.every((termino) =>
      documento.texto.toLowerCase().includes(termino),
    ),
  );
}

console.log(buscar(["procedimiento"]).map((documento) => documento.slug));
// ["skill"]
```

Es una búsqueda literal mínima. Un sistema real indexa fragmentos y los ordena por similitud, pero la idea es la misma: devolver el documento junto con la respuesta que se apoya en él.

## Limitaciones

Un documento desactualizado se recupera con la misma facilidad que uno vigente: la base exige dueño, revisiones y control de cambios. Fragmentar mal rompe el contexto y deja frases sin su encabezado. La recuperación puede traer el pasaje equivocado cuando dos entradas usan palabras parecidas. Hay que respetar permisos: indexar todo sin filtrar expone datos internos. Y citar una fuente no demuestra que el modelo la haya interpretado bien: la respuesta sigue necesitando verificación.

## Alternativas

| Opción | Qué aporta | Cuándo conviene |
| ------ | ---------- | --------------- |
| Base de conocimiento | Evidencia escrita y citable | Respuestas ancladas a documentos que cambian |
| LLM | Generación a partir de lo aprendido en entrenamiento | Tareas abiertas sin fuente exacta |
| MCP | Conexión estandarizada con herramientas y datos | Cuando el agente debe consultar sistemas externos |

La base decide qué texto se considera documentado: ni el LLM ni MCP la sustituyen.
