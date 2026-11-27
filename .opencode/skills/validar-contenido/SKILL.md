---
name: validar-contenido
description: Valida una entrada de la wiki contra el esquema, slugs, referencias, secciones obligatorias y estilo. Úsala antes de dar por terminada cualquier entrada creada o modificada.
---

# validar-contenido

## Comprobaciones automáticas

Ejecuta `npm run validate` y verifica:

- Esquema válido; slugs únicos **globalmente**.
- Referencias existentes (`relacionados`, `alternativas`, `entidades`).
- Enlaces internos no rotos.
- Secciones obligatorias presentes y ausencia de `## Relacionados`.
- Avisos de extensión: glosario ≥ 150 palabras, fichas ≥ 250 (objetivo 250–600).
- Alias sin conflicto (con otro alias, slug o título).
- Etiquetas y categorías del catálogo (`src/content.config.ts`).

## Checklist de estilo

Revisa `specs/MANUAL.md` y el checklist de `specs/agentes-y-skills.md` §7: extensión, `Alternativas` condicional, conceptos compuestos, resumen ≤ 200, sin pregunta/respuesta, términos definidos al primer uso, ejemplos con lenguaje indicado, fuentes registradas y español claro.

## Salida

Informe de revisión (`specs/agentes-y-skills.md` §6.2).
