---
titulo: npm
resumen: Gestor de paquetes de Node.js que instala dependencias y ejecuta los scripts definidos en package.json.
categoria: herramienta
tags: [terminal]
alias: []
relacionados: [nodejs]
alternativas: []
web: https://www.npmjs.com
npm: npm
fuentes: [https://docs.npmjs.com/]
---

## Qué es

npm es el gestor de paquetes que viene con Node.js. Instala dependencias desde un registro público, resuelve versiones y ejecuta los scripts definidos en `package.json`.

## Para qué sirve

Es la puerta de entrada al ecosistema: trae Astro, React y el resto de herramientas, y centraliza las tareas (`npm run build`, `npm run validate`…) para que nadie recuerde comandos largos.

## Cuándo usarlo

Siempre que haya dependencias que instalar o scripts que ejecutar en este proyecto. Se instala con `npm ci` para respetar el archivo de bloqueo exacto.

## Cuándo no

En un proyecto sin dependencias externas, otro gestor o ninguno basta. No conviene añadir paquetes sin evaluar su coste de mantenimiento.

## Alternativas

pnpm y Yarn hacen lo mismo con otras prioridades (velocidad, ahorro de disco); aquí se usa npm por venir con Node y evitar dependencias extra.

## Ejemplo

```bash
npm ci          # instala exactamente lo que dice el lockfile
npm run build   # ejecuta el script build
```
