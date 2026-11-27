---
titulo: "npm frente a pnpm y Yarn"
resumen: "npm, pnpm y Yarn gestionan las mismas dependencias con decisiones distintas sobre disco, lockfile y workspaces."
categoria: herramienta
tags: ["terminal", "nivel-0"]
alias: []
relacionados: [npm, pnpm, yarn, dependencia, workspace]
fuentes: []
autoenlace: true
entidades: [npm, pnpm, yarn]
contexto: "Tres gestores que resuelven el mismo problema con decisiones distintas sobre copias en disco, lockfile y monorepos."
---

## Contexto

**npm**, **pnpm** y **Yarn** leen `package.json` y producen un lockfile. La decisión no es cuál sabe instalar paquetes —las tres saben—, sino cómo guardan las copias en disco, cómo se fija una instalación reproducible y cómo tratan los monorepos.

Cambiar de gestor a mitad de proyecto es posible, pero dejar dos lockfiles conviviendo es la vía directa a instalaciones distintas en cada máquina.

## Criterios

| Criterio | npm | pnpm | Yarn |
|---|---|---|---|
| Instalación | Incluido con Node.js | Se instala aparte | Se instala aparte |
| Copias en disco | Una por proyecto | Almacén compartido con enlaces | Caché compartida |
| Lockfile | `package-lock.json` | `pnpm-lock.yaml` | `yarn.lock` |
| Workspaces | Soportados | Diseñados como primera clase | Diseñados como primera clase |
| Estructura de `node_modules` | Plana con elevación | Aislada por dependencia | Según configuración |
| Compatibilidad | La que esperan más tutoriales | Muy alta, con matices de elevación | Muy alta |

Una **Dependencia** mal declarada se nota antes con pnpm, porque no puede usar paquetes que no están en su propio manifiesto.

## Cuándo elegir cada una

Elige **npm** cuando no hay requisito especial: es el camino corto, el que asumen muchos tutoriales y el que menos configuración añade. Es una buena elección por defecto para un proyecto pequeño.

Elige **pnpm** cuando varios proyectos comparten dependencias o cuando importa el espacio en disco. También encaja en monorepos: su estructura evita que un paquete use sin declarar algo que solo está instalado por otro **Workspace**.

Elige **Yarn** cuando el equipo ya trabaja con él o cuando sus flujos de workspaces encajan con el repositorio. Cambiar solo por preferencia personal añade coste sin mejorar el resultado.

Regla común: elige uno, guarda el lockfile en **Git** y haz que **CI/CD** use el mismo gestor que la documentación. Mezclar comandos de los tres en un mismo repo rompe la reproducibilidad.

## Ejemplos

```bash
npm install
pnpm install
yarn install
```

```text
package-lock.json   # npm
pnpm-lock.yaml      # pnpm
yarn.lock           # Yarn
```

## Matices

El lockfile no es un detalle: fija versiones exactas de todo el árbol de dependencias. En integración continua conviene usar el modo estricto de cada gestor para que un lockfile desactualizado falle en lugar de reescribirse. La elección de gestor no cambia qué es una **Dependencia**, pero sí cuánto cuesta detectar una mal declarada.
