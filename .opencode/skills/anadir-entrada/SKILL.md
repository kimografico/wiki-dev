---
name: anadir-entrada
description: Crea un archivo de entrada válido en content/ a partir de la plantilla de su tipo (glosario, tecnología, paquete, comparativa o patrón). Úsala al crear una entrada nueva de la wiki.
---

# anadir-entrada

Crea un archivo válido a partir de la plantilla del tipo.

## Pasos

1. **Elige la colección:**
   - *paquete*: dependencia o CLI de un ecosistema (`mermaid`, `eslint`, `vite`, `npm`).
   - *tecnología*: lenguaje, framework de aplicación, plataforma o servicio (React, Astro, Git, GitHub Pages).
   - *glosario*: concepto.
   - *comparativa*: contrasta 2 o más entradas.
2. **Lee la plantilla** correspondiente de `specs/plantillas/`.
3. **Genera el slug**: kebab-case, sin acentos, singular, nombre canónico (`zod`, `static-site-generation`). Comprueba que **no existe** como slug ni como alias en ninguna colección.
4. **Rellena el frontmatter.** No copies los enums: léelos de `src/content.config.ts`. Campos comunes: `titulo`, `resumen` (≤ 200), `categoria`, `tags`, `alias` si procede; y los de la colección (`npm`, `web`, `terminoEn`, `entidades`, `contexto`, `familia`).
5. **Crea las secciones obligatorias** del tipo (`specs/spec.md` §7.4), **sin** `## Relacionados`.
6. Usa `autoenlace: false` solo si el título es una palabra común que no debe enlazarse sola.

## Salida

Archivo en `content/<coleccion>/<slug>.md`.
