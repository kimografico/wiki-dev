---
fecha: 2026-10-13
titulo: npm
resumen: Gestor de paquetes de Node.js que instala dependencias y ejecuta los scripts definidos en package.json.
categoria: herramienta
tags: [terminal, nivel-0]
alias: []
relacionados: [nodejs, pnpm, yarn, npm-pnpm-yarn]
alternativas: [pnpm, yarn]
web: https://www.npmjs.com
npm: npm
fuentes: [https://docs.npmjs.com/]
---

## Qué es

npm es el gestor de paquetes que se instala con Node.js. Instala dependencias en `node_modules`, resuelve qué versión concreta corresponde a cada rango declarado en `package.json` y deja constancia de esa resolución en el archivo de bloqueo. Además ejecuta los scripts del proyecto, de modo que un mismo comando funciona en el portátil de cada persona y en la integración continua. No es un registro de código ni un editor: es la herramienta que descarga, coloca y lanza.

## Para qué sirve

En esta wiki trae Astro, Zod, Vitest y el resto de herramientas con una sola orden. Centraliza además las tareas repetitivas: `npm run build`, `npm run check` o `npm run validate` son nombres estables aunque por debajo haya comandos largos. Cuando una persona clona el repositorio, el archivo de bloqueo le permite reproducir el mismo árbol de dependencias sin negociar versiones a mano.

## Cuándo usarlo

Se usa siempre que el proyecto tenga dependencias o scripts. Para instalaciones limpias y reproducibles, `npm ci` es la orden habitual: exige que `package.json` y el archivo de bloqueo estén de acuerdo y no reescribe el bloqueo. `npm install` sirve para añadir o actualizar una dependencia; conviene usarlo cuando se quiere cambiar ese archivo, no para repetir una instalación.

## Cuándo no

En un proyecto sin dependencias externas, instalar un gestor añade ruido. Tampoco conviene alternar gestores en el mismo repositorio: cada uno escribe su propio archivo de bloqueo y mezclarlos hace que dos personas instalen árboles distintos con la misma carpeta. Antes de añadir un paquete, conviene preguntarse si lo resuelve una función propia de unas pocas líneas.

## Alternativas

pnpm y Yarn resuelven el mismo problema con prioridades distintas. pnpm comparte los paquetes en un almacén y los enlaza en cada proyecto; suele ahorrar disco y acelerar instalaciones grandes. Yarn ofrece sus propios comandos y formato de bloqueo, con buen soporte de workspaces. npm gana por venir con Node.js y por ser la opción que este repositorio usa: cambiar de gestor solo por preferencia obligaría a migrar el archivo de bloqueo y a revisar la integración continua. La comparativa npm frente a pnpm y Yarn recoge los criterios completos.

## Ejemplo

```bash
npm ci             # instalación exacta desde el archivo de bloqueo
npm run dev        # arranca el servidor definido en package.json
npm run build      # genera el sitio
```

## Matices

Los scripts no son atajos opcionales: son la interfaz pública del proyecto. Si una tarea se ejecuta en la terminal, en la integración continua y en Git hooks, conviene que los tres llamen al mismo script para que no diverjan.
