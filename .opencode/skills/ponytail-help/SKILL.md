---
name: ponytail-help
description: >
  Referencia rápida de los niveles, skills y comandos de ponytail. Pantalla de
  un solo uso. Usar para /ponytail-help, "ponytail help", "cómo uso ponytail".
license: MIT
metadata:
  opencode/slash: "true"
---

# Ponytail Help

Display this reference card when invoked. One-shot, do NOT change mode,
write flag files, or persist anything.

## Levels

| Level | Trigger | What change |
|-------|---------|-------------|
| **Lite** | `/ponytail lite` | Build what was asked, name the smaller option in one line. |
| **Full** | `/ponytail` | The smallest complete change, a check where the logic needs one, and a reply that names what was skipped and any risk. Default. |
| **Ultra** | `/ponytail ultra` | Also questions the request and pushes back before building. Nunca sobre requisitos de la SDD. |

The level sticks for the session unless changed. `full` is the default.

## Skills

En este proyecto ponytail es **nativo de opencode**: cada skill vive en
`.opencode/skills/` y se invoca como comando `/ponytail*` mediante los
comandos de `.opencode/commands/` (que inyectan la skill correspondiente).
Las referencias normativas son `specs/spec.md` y `specs/design-pattern.md`;
la guarda «la SDD manda» está dentro de cada skill aplicable y en el agente
`wiki-dev`.

| Skill | Trigger | What it does |
|-------|---------|--------------|
| **ponytail** | `/ponytail` | Lazy mode itself: least new code, clear replies that name skipped work and risks. |
| **ponytail-review** | `/ponytail-review` | Quality review of a diff: bugs, security, load, missing tests, speed, what to cut. Each finding says what goes wrong and how to fix it. |
| **ponytail-audit** | `/ponytail-audit` | The same quality review for the whole repo, ranked. |
| **ponytail-debt** | `/ponytail-debt` | Harvest `shortcut:` comments into a tracked ledger. |
| **ponytail-gain** | `/ponytail-gain` | Measured-impact scoreboard: less code, less cost, more speed. |
| **ponytail-help** | `/ponytail-help` | This card. |

## Deactivate

Say "stop ponytail" or "normal mode". Resume anytime with `/ponytail`.

## Default mode en este proyecto

El modo perezoso está **siempre activo para el agente de código** `wiki-dev`
(reglas en su archivo `.opencode/agent/wiki-dev.md` con la guarda SDD). Las
skills de contenido (`resolver-duda`, `anadir-entrada`…) no usan ponytail:
los agentes de contenido tienen denegadas las skills `ponytail*`. Esto no
requiere configuración ni plugin: es la integración documentada en
`specs/agentes-y-skills.md`.

## More

Full docs + examples: https://github.com/DietrichGebert/ponytail