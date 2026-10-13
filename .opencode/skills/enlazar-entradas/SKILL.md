---
name: enlazar-entradas
description: Mantiene el grafo de relaciones declaradas de la wiki (relacionados, alternativas y comparativas). Úsala tras crear o ampliar una entrada para enlazarla con las existentes.
---

# enlazar-entradas

## Pasos

1. Lista los slugs existentes en `content/`.
2. Completa `relacionados` y `alternativas` (solo slugs existentes).
3. Si hay 2 o más alternativas directas sin comparativa, propón crearla.
4. No dupliques relaciones ni crees auto-referencias.
5. Lista los conceptos mencionados que aún no tienen entrada.

## Alcance

Las menciones dentro del texto se enlazan automáticamente (RF-07 de `specs/spec.md`) y **no** son parte de esta skill.

## Salida

Frontmatter actualizado y lista de entradas pendientes (conceptos mencionados sin entrada).
