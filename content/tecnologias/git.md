---
titulo: "Git"
resumen: "Sistema de control de versiones distribuido que guarda el historial de un proyecto como una sucesión de commits."
categoria: herramienta
tags: ["terminal","nivel-0"]
alias: []
relacionados: [github, gitlab, bitbucket, pull-request, git-hooks]
fuentes: ["https://git-scm.com/doc"]
autoenlace: true
alternativas: []
web: "https://git-scm.com/"
---
## Qué es

Git es un sistema de control de versiones distribuido: guarda el historial de un proyecto como una sucesión de instantáneas, llamadas *commits*, y cada persona que clona el repositorio se lleva una copia completa de ese historial. No es un servicio web ni un editor: es un programa que se ejecuta en local y que entiende de archivos, ramas y diferencias. La unidad de trabajo es el commit, que registra qué cambió, quién lo cambió y por qué.

## Para qué sirve

Permite trabajar en ramas aisladas, revisar cambios antes de integrarlos y recuperar cualquier estado anterior. Resuelve dudas muy concretas: qué línea introdujo un fallo, en qué commit dejó de pasar una prueba o cómo deshacer un cambio que aún no se ha compartido. Como el historial viaja con el repositorio, esa información no depende de que un servidor esté disponible.

## Cuándo usarla

Úsalo para cualquier proyecto de código, incluso personal. El coste de iniciar un repositorio es bajo y el historial es documentación: explica decisiones que el código final ya no muestra. También es la base de las pull requests, de la integración continua y de la revisión entre compañeros.

## Cuándo no

No es una plataforma de repositorios: Git funciona localmente; GitHub, GitLab o Bitbucket son servicios que alojan copias y añaden interfaz, permisos y revisiones. Tampoco sustituye a las copias de seguridad: un `push` sincroniza historial, pero no protege un trabajo que nadie más ha guardado.

## Matices

| Capa | Qué aporta | Dónde vive |
|------|------------|------------|
| Git | Historial, ramas, commits | En cada copia local |
| GitHub, GitLab o Bitbucket | Repositorio remoto, PRs, permisos | En el servicio |
| Git Flow | Convención de ramas | En el acuerdo del equipo |

La confusión habitual es llamar «Git» a la web donde se sube el código. El criterio para distinguirlos es sencillo: si escribes un comando en la terminal, es Git; si pulsas un botón en una interfaz, es la plataforma que lo aloja.

## Ejemplo

```bash
git switch -c feature/buscar
git add content/tecnologias/git.md
git commit -m 'añade búsqueda'
git push -u origin feature/buscar
```

La rama aísla el trabajo, `add` prepara solo ese archivo, `commit` guarda la instantánea y `push` la comparte con el resto del equipo.

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
