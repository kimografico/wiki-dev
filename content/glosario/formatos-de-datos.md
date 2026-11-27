---
titulo: "Formatos de datos"
resumen: "Maneras acordadas de representar información para intercambiarla: JSON, YAML, CSV y notaciones compactas como TOON."
categoria: datos-api
tags: ["nivel-0","backend"]
alias: []
relacionados: ["base64", "frontmatter", "api", "llm"]
fuentes: [https://github.com/toon-format/toon]
autoenlace: true
---
## Definición

Un formato de datos es una manera acordada de representar información para intercambiarla: JSON, YAML, CSV y notaciones compactas como TOON. Define sintaxis y tipos —qué es un número, qué es una lista, cómo se escapa un texto—, pero no dice cómo se transporta ni qué significa cada campo.

## Por qué importa

Lo que se puede expresar y cuánto pesa condiciona cada petición y cada revisión. JSON es fácil de procesar y es la lengua habitual de las APIs; YAML es más legible para configuración, aunque su indentación sorprende; CSV es mínimo para tablas, pero pierde tipos. Elegir mal encarece el intercambio o introduce errores silenciosos al convertir.

## Ejemplo

```json
{ "estado": "publicado", "lineas": 3 }
```

El mismo contenido en YAML sería `estado: publicado` y `lineas: 3`. TOON (Token-Oriented Object Notation) busca representar datos estructurados con menos tokens para reducir el consumo al pasarlos a un LLM; conviene comprobar que el receptor lo entiende antes de adoptarlo.

## Se confunde con

No es un protocolo: el formato es la representación; el protocolo —HTTP, por ejemplo— define cómo se envía. Tampoco es codificación: Base64 transforma bytes en texto para transportarlos, pero no aporta estructura. Y «más compacto» no significa «mejor»: un formato muy eficiente que nadie más lee solo sirve para casos muy concretos.
