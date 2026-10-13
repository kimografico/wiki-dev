---
name: evolucionar-esquema
description: Cambia el modelo de contenido (esquema, categorías o etiquetas) sin romper las entradas existentes. Úsala al añadir o modificar campos, categorías o etiquetas del catálogo.
---

# evolucionar-esquema

## Pasos

1. Propón el cambio y su impacto.
2. Actualiza `src/content.config.ts` y los documentos de `specs/`.
3. Actualiza las plantillas de `specs/plantillas/`.
4. Migra las entradas afectadas con un script.
5. Ejecuta `npm run validate` y `npm run build`.
6. Actualiza los ejemplos de `specs/design-pattern.md`.

## Salida

Cambio de esquema + migración + validación en verde.
