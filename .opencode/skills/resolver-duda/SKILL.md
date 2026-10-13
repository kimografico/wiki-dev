---
name: resolver-duda
description: Orquesta el flujo completo "de la duda a la entrada" de la wiki: intake, inventario, investigación, redacción, enlazado, revisión e informe. Úsala cuando el autor plantee una duda conceptual o pida contenido y haya que crear o ampliar entradas en content/.
---

# resolver-duda

Ejecuta el flujo de `specs/agentes-y-skills.md` §2 de extremo a extremo.

## Pasos

1. Extrae de la duda: conceptos implicados, tipo(s) de entrada y la confusión concreta.
2. Inventaría: busca en `content/` por título, alias, etiquetas y categoría (grep/glob); decide crear o ampliar (prefiere ampliar).
3. Aplica la regla de autonomía: ≤ 3 archivos, directo; > 3, muestra un plan y espera confirmación.
4. Invoca `content-researcher` con los conceptos y la confusión.
5. Redacta con `anadir-entrada` y `redactar-orientado-a-duda`.
6. Enlaza con `enlazar-entradas`.
7. Invoca `content-reviewer`; aplica los cambios (máx. 2 rondas).
8. Ejecuta `npm run validate` y emite el informe final.

## Salida

Informe final: entradas creadas, entradas ampliadas, pendientes y "sin commit; revisar con git diff".
