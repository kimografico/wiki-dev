---
titulo: "Yarn"
resumen: "Gestor de dependencias de npm con foco en velocidad, determinismo y workspaces."
categoria: herramienta
tags: ["terminal","nivel-0"]
alias: []
relacionados: ["npm", "pnpm", "npm-pnpm-yarn", "workspace"]
fuentes: ["https://yarnpkg.com/"]
autoenlace: true
alternativas: ["npm", "pnpm"]
web: "https://yarnpkg.com/"
npm: "yarn"
---

## Qué es

Yarn es un gestor de dependencias para Node.js. Resuelve versiones, instala paquetes y ejecuta scripts definidos en `package.json`, como hacen los otros gestores, pero con sus propios comandos y su propio archivo de bloqueo. Su unidad de trabajo es el workspace: varios paquetes dentro de un mismo repositorio que comparten instalación y configuración.

## Para qué sirve

Ofrece una alternativa madura a npm con foco en instalaciones reproducibles y workspaces. Permite ejecutar un script en un paquete concreto del monorepo desde la raíz y compartir dependencias comunes sin repetir la configuración en cada paquete. El archivo de bloqueo fija la resolución para que otra persona obtenga el mismo árbol.

## Cuándo usarlo

Cuando el equipo ya lo usa y existe una convención sobre su archivo de bloqueo, o cuando sus workspaces encajan mejor con la estructura del repositorio. Introducirlo en un proyecto que no tiene dependencias compartidas aporta poco.

## Cuándo no

No conviene dejar que convivan lockfiles de npm y Yarn sin una decisión explícita: cada uno instala un árbol distinto y el resultado depende de quién ejecutó la última orden. Tampoco ayuda a mezclar comandos de varios gestores en la documentación, porque cada persona acaba usando el que recuerda.

## Alternativas

npm es la opción que acompaña a Node.js y requiere menos decisiones. pnpm se centra en ahorrar disco mediante enlaces y en una estructura de dependencias estricta. Yarn destaca por sus workspaces y por una experiencia de uso consolidada. Si el repositorio ya tiene un lockfile de npm, la decisión práctica es mantenerlo salvo que haya un motivo claro para migrar; la comparativa npm frente a pnpm y Yarn reúne los criterios.

## Ejemplo

```bash
yarn install
yarn add zod
yarn run build
```

El repositorio es un único paquete llamado `wiki-dev` y no tiene workspaces, así que no existen comandos `yarn workspace wiki …`: todo se ejecuta desde la raíz.

## Matices

El archivo de bloqueo es la fuente de la instalación reproducible, no `package.json`. Cambiar un rango de versión sin actualizar el lockfile puede dejar a dos personas con dependencias distintas aunque ambas crean haber instalado lo mismo.
