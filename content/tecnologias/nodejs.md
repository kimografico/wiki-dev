---
titulo: Node.js
resumen: Entorno de ejecución de JavaScript fuera del navegador; aquí sirve para ejecutar herramientas y el build del sitio.
categoria: herramienta
tags: [backend, terminal]
alias: [Node]
relacionados: [npm]
alternativas: []
web: https://nodejs.org
fuentes: [https://nodejs.org/en/learn]
---

## Qué es

Node.js ejecuta JavaScript fuera del navegador, sobre el motor V8. Con él, el mismo lenguaje se usa para herramientas de línea de comandos, servidores y scripts de automatización.

## Para qué sirve

Aquí es la plataforma que mueve el ecosistema: con Node se instalan dependencias, se compila el sitio, se ejecutan los tests y se lanzan los scripts de validación.

## Cuándo usarla

Siempre que haya que ejecutar JavaScript en el terminal. Es la base del tooling de este proyecto, desde `npm run build` hasta el script de validación de contenido.

## Cuándo no

Para procesos donde se busca concurrencia intensiva y cómputo pesado, otros lenguajes pueden encajar mejor; y para el navegador no aplica, allí el runtime ya está en la página.

## Alternativas

Bun y Deno son runtimes modernos con objetivos parecidos; pero no es un campo donde este proyecto busque alternativas, ya que todo el ecosistema está en Node.

## Ejemplo

```bash
node --version   # versión del runtime
node scripts/validate-content.ts
```
