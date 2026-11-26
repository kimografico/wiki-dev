---
titulo: "Git"
resumen: "Sistema de control de versiones distribuido que guarda el historial de un proyecto como una sucesión de commits."
categoria: herramienta
tags: ["terminal","nivel-0"]
alias: []
relacionados: []
fuentes: ["https://git-scm.com/doc"]
autoenlace: true
alternativas: []
web: "https://git-scm.com/"
---
## Qué es

Sistema de control de versiones distribuido que guarda el historial de un proyecto como una sucesión de commits.

## Para qué sirve

Permite trabajar en ramas aisladas, revisar cambios y recuperar cualquier estado anterior.

## Cuándo usarla

Úsalo para cualquier proyecto de código, incluso personal, porque el historial es documentación.

## Cuándo no

No es una plataforma de repositorios: Git funciona localmente; GitHub o GitLab son servicios que lo alojan.

## Alternativas

No hay una alternativa directa dentro del catálogo: la decisión depende del requisito concreto.

## Ejemplo

```bash
git switch -c feature/buscar
git add .
git commit -m 'añade búsqueda'
```

## Comandos básicos

- `git init` crea un repositorio nuevo.
- `git clone <url>` copia un repositorio remoto.
- `git status` muestra archivos modificados y sin seguimiento.
- `git add <archivo>` prepara cambios para el commit.
- `git commit -m "mensaje"` guarda una instantánea preparada.
- `git diff` compara cambios no preparados con el último commit.
- `git checkout <rama>` cambia de rama o restaura archivos; `git switch` es la forma moderna de cambiar de rama.
- `git stash` guarda cambios temporales y los retira del árbol de trabajo.
- `git merge <rama>` integra otra rama en la actual.
- `git rebase <rama>` reaplica commits encima de otra base para historial lineal.
- `git branch` lista, crea o borra ramas.
- `git cherry-pick <commit>` aplica un commit concreto en otra rama.
- `git pull` actualiza desde el remoto; `git push` envía commits locales.
