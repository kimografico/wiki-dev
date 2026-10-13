---
titulo: Husky
resumen: Gestor de hooks de git que permite ejecutar comprobaciones automáticamente antes de cada commit o push.
categoria: herramienta
tags: [terminal]
alias: []
relacionados: [integracion-continua]
alternativas: []
web: https://typicode.github.io/husky/
npm: husky
fuentes: [https://typicode.github.io/husky/]
---

## Qué es

Husky instala y gestiona los *hooks* de git (scripts que git ejecuta en momentos concretos, como antes de confirmar un cambio) dentro del propio repositorio, sin depender de la configuración local de cada persona.

## Para qué sirve

Permite bloquear un commit con errores: aquí, antes de confirmar, se pasa el lint y el formateo, y antes de subir, los tests. Así los problemas se detectan en tu máquina, no en la CI.

## Cuándo usarlo

Cuando quieras reglas que se apliquen siempre y no dependan de recordar ejecutarlas a mano. Es un complemento de la CI, no un sustituto.

## Cuándo no

Los hooks se pueden saltar (`--no-verify`), así que no son una garantía fuerte: para eso está la CI. No conviene meter en un hook tareas que tarden minutos.

## Alternativas

`simple-git-hooks` y `lefthook` ofrecen lo mismo con otros enfoques; aquí Husky se usa por su sencillez y su adopción amplia.

## Ejemplo

```bash
# .husky/pre-commit
npx lint-staged
npm run --if-present validate
```
