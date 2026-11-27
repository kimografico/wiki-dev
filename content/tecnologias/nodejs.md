---
fecha: 2026-10-13
titulo: Node.js
resumen: "Entorno que ejecuta JavaScript fuera del navegador; base de las herramientas, los tests y el build del proyecto."
categoria: herramienta
tags: [backend, terminal, nivel-0]
alias: [Node]
relacionados: [npm, typescript, vite]
alternativas: []
web: https://nodejs.org
fuentes: [https://nodejs.org/en/learn]
---

## Qué es

Node.js es un entorno de ejecución que permite correr JavaScript fuera del navegador, sobre el motor V8. No es un lenguaje —el lenguaje es JavaScript—, ni un framework —no impone una estructura de aplicación—, ni un gestor de dependencias —eso es npm—. Lo que aporta es acceso a archivos, red, procesos y variables de entorno, además de un sistema de módulos para organizar el código. Gracias a eso, el mismo lenguaje sirve para escribir una página y para automatizar lo que ocurre alrededor de esa página.

## Para qué sirve

En este proyecto es la plataforma que mueve el tooling: instalar dependencias, compilar el sitio, ejecutar los tests y lanzar los scripts que validan el contenido. Un caso concreto: `npm run validate` arranca un proceso Node que lee los archivos Markdown, aplica los esquemas y comprueba que los slugs existan. Ninguna de esas tareas podría hacerla el navegador por sí solo.

## Cuándo usarla

Siempre que haya que ejecutar JavaScript en el terminal: scripts de automatización, herramientas de línea de comandos, servidores HTTP y suites de pruebas. La versión que exige el proyecto se documenta en los requisitos del README y conviene comprobarla antes de instalar nada.

## Cuándo no

Para cómputo intensivo o concurrencia muy alta, otros lenguajes y modelos de ejecución pueden encajar mejor; conviene medir antes de decidir. En el navegador no aplica: allí el motor ya está incluido en la página y Node no existe. Existen otros entornos modernos, como Bun o Deno, pero cambiar de runtime no es gratuito cuando el proyecto depende de las convenciones y las herramientas de Node: la compatibilidad debe verificarse caso por caso.

## Ejemplo

```bash
node --version
node -e "console.log(process.platform)"
npm run check
npm run validate
```

La segunda línea muestra que `process` es propio de Node y no del navegador. Las dos últimas son scripts definidos en `package.json`; Node es quien los ejecuta, aunque el comando que escribas sea `npm`.

## Módulos y entorno

El código se organiza en módulos: con `import` y `export` (ESM) o con `require` (CommonJS). El campo `type` de `package.json` decide cuál se usa por defecto; mezclarlos sin criterio es fuente de errores confusos. Los módulos del propio entorno se nombran con el prefijo `node:`, por ejemplo `node:fs` para archivos. Las credenciales se leen de variables de entorno, nunca se escriben en el código.

## Matices: Node frente al navegador

| Aspecto | Node.js | Navegador |
| --- | --- | --- |
| Objetos globales | `process`, acceso a archivos | `window`, `document`, DOM |
| Módulos | Archivos del sistema con `import` o `require` | Módulos ES cargados por URL |
| Duración | Proceso que termina o servidor que sigue vivo | Página que se abre y se cierra |


