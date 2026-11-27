---
titulo: "pnpm"
resumen: "Gestor de dependencias que usa enlaces y un almacén global para evitar duplicar paquetes en cada proyecto."
categoria: herramienta
tags: ["terminal","nivel-0"]
alias: []
relacionados: ["npm", "yarn", "npm-pnpm-yarn", "workspace"]
fuentes: ["https://pnpm.io/"]
autoenlace: true
alternativas: ["npm", "yarn"]
web: "https://pnpm.io/"
npm: "pnpm"
---

## Qué es

pnpm es un gestor de dependencias para Node.js. En lugar de copiar cada paquete dentro de cada `node_modules`, guarda una sola copia en un almacén local y crea enlaces hacia ella desde los proyectos. La estructura resultante es estricta: un paquete solo ve las dependencias que declaró, no las que estén colgadas por casualidad. El archivo de bloqueo registra las versiones exactas, igual que en otros gestores.

## Para qué sirve

Ahorra disco cuando varios proyectos comparten las mismas dependencias y acelera las instalaciones posteriores, porque reutiliza lo ya descargado. Brilla en monorepos: con workspaces puede instalar todo el conjunto y ejecutar un script en un paquete concreto sin entrar en su carpeta. En una wiki con una sola aplicación el ahorro es menor, pero la instalación sigue siendo reproducible.

## Cuándo usarlo

Encaja cuando el equipo trabaja con varios paquetes en un mismo repositorio, cuando el disco se llena de copias repetidas o cuando se quiere evitar que el código acceda a dependencias no declaradas. Para incorporarlo a un proyecto existente hay que decidir primero qué archivo de bloqueo manda: pnpm genera el suyo propio y no debe convivir con el de otro gestor.

## Cuándo no

No conviene introducirlo en un repositorio que ya usa otro gestor sin migrar lockfile, documentación e integración continua en el mismo cambio. Tampoco aporta mucho a un proyecto sin dependencias o a uno tan pequeño que la instalación tarda segundos. Si una herramienta interna asume la estructura plana de `node_modules`, puede necesitar ajustes.

## Alternativas

npm viene con Node.js y es la opción por defecto; su instalación es predecible y no exige añadir otra herramienta. Yarn ofrece una experiencia madura con sus propios workspaces y formato de bloqueo. pnpm gana cuando hay muchos paquetes repetidos o un monorepo amplio; pierde cuando el equipo quiere cero decisiones extra. La comparativa npm frente a pnpm y Yarn detalla el criterio: elige uno y conserva un solo archivo de bloqueo.

## Ejemplo

```bash
pnpm install       # instala las dependencias desde el lockfile
pnpm add zod       # añade una dependencia al proyecto
pnpm run build     # ejecuta el script build de este repositorio
```

Esta wiki es un único paquete llamado `wiki-dev` y no define workspaces, así que no hay comandos `pnpm --filter wiki …`: las órdenes se lanzan desde la raíz del repositorio.

## Matices

La instalación estricta es una ventaja y una fuente de sorpresas: un paquete que antes funcionaba porque encontraba una dependencia ajena dejará de hacerlo. La solución es declarar esa dependencia explícitamente, no relajar la configuración del gestor.
