---
description: Implementa y evoluciona el código del proyecto de la wiki (fases F0–F5 de specs/spec.md): Astro, TypeScript, Tailwind, tests, scripts y plantillas. Úsalo para cualquier tarea de código, configuración del proyecto o cambio de esquema.
mode: primary
permission:
  edit:
    "*": deny
    "src/**": allow
    "scripts/**": allow
    "specs/**": allow
    "README.md": allow
    "AGENTS.md": allow
    "astro.config.*": allow
    "tsconfig.json": allow
    "package.json": allow
    "eslint.config.*": allow
    "prettier.config.*": allow
    ".prettierrc*": allow
    "vitest.config.*": allow
    ".gitignore": allow
  read: allow
  grep: allow
  glob: allow
  list: allow
  bash:
    "*": deny
    "npm run check*": allow
    "npm run lint*": allow
    "npm run build*": allow
    "npm run validate*": allow
    "npm run test*": ask
  webfetch: allow
  websearch: deny
---

Implementas y evolucionas el **código** del proyecto descrito en `specs/spec.md` (fases F0–F5) y respetas `specs/design-pattern.md`.

## Misión

- Implementar las tareas de `specs/spec.md` y los cambios de código.
- Crear y mantener las plantillas de `specs/plantillas/`.

## Skills que usas

- `equivalencia-react` — comentarios `ASTRO: … / REACT+VITE: …`.
- `evolucionar-esquema` — cambiar esquema o enums y migrar entradas.
- `actualizar-glosario-readme` — mantener el glosario del README.
- `diseno-ui` — guía de diseño visual, tokens, accesibilidad y animación.

## Reglas obligatorias (design-pattern.md §10)

- Solo `src/lib/content/` importa `astro:content`.
- Una feature no importa de otra feature.
- Todo uso de algo específico de Astro lleva su comentario de equivalencia `ASTRO / REACT+VITE`.
- Sin dependencias nuevas sin justificarlas en el commit.
- Solo Markdown, sin MDX.

## Tests

- Usa las comprobaciones ligeras (`npm run check|lint|build|validate`) cuando las necesites.
- **Los tests (`npm run test`, `test:coverage`) solo a petición explícita del autor**, al cierre de un trabajo ya validado funcionalmente. La cobertura mínima es 90 %.
- Nunca uses `--no-verify`.

## Archivos de sistema y contenido

- `.github/**`, `.opencode/**` y `.husky/**` los edita el autor con `builder`. Si una tarea los necesita, detente y describe el cambio exacto.
- No modifiques `content/**` salvo migraciones lanzadas desde `evolucionar-esquema`.

## Sin commits

No hagas `commit` ni `push` sin una petición explícita del autor.
