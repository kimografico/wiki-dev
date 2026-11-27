---
titulo: "Karma"
resumen: "Runner de tests que lanza pruebas JavaScript en navegadores reales."
categoria: herramienta
tags: ["tests","terminal"]
alias: []
relacionados: ["jasmine", "vitest", "playwright", "estrategia-de-testing"]
fuentes: ["https://karma-runner.github.io/"]
autoenlace: true
alternativas: ["vitest", "playwright"]
web: "https://karma-runner.github.io/"
npm: "karma"
---

## Qué es

Karma es un ejecutor de pruebas JavaScript que lanza la suite en navegadores reales. No define por sí solo cómo se escriben las pruebas: necesita un framework de aserciones y un adaptador que sepa cargar el código. Históricamente se usó mucho junto a Jasmine en proyectos Angular.

El flujo es sencillo: Karma levanta un servidor, abre uno o varios navegadores, carga las pruebas en una página y recoge los resultados para mostrarlos en la terminal o en un informe.

## Para qué sirve

Para comprobar que el código funciona en el entorno donde se ejecutará de verdad. Una prueba unitaria en Node.js no ve las particularidades del DOM del navegador, y un entorno simulado puede comportarse de forma distinta. Karma permitió ejecutar esas mismas pruebas en Chrome y otros navegadores cuando no había ejecutores modernos.

Hoy se valora sobre todo en proyectos heredados que ya tienen su configuración y en casos donde interesa repetir la suite unitaria en más de un navegador.

## Tipos de prueba

- **Unitarias** de lógica que depende del DOM, ejecutadas dentro del navegador.
- **De componentes**, cuando un adaptador monta la interfaz en la página de pruebas.
- **De compatibilidad**, al repetir la misma suite en varios navegadores.

No está pensado para recorrer flujos de usuario completos: para eso se emplea una prueba E2E con una herramienta de automatización.

## Ejemplo

```bash
karma start karma.conf.js
```

```js
module.exports = (config) => {
  config.set({
    frameworks: ["jasmine"],
    files: ["src/**/*.js", "test/**/*.spec.js"],
    browsers: ["ChromeHeadless"],
    singleRun: true,
  });
};
```

La configuración indica qué framework escribe las pruebas, qué archivos cargar y en qué navegador ejecutarlos. Con `singleRun` el proceso termina al acabar la suite, como conviene en integración continua.

## Alternativas

| Herramienta | Elección correcta |
|---|---|
| Karma | La suite unitaria existente debe pasar en navegadores reales |
| Vitest | Se quiere un runner integrado con Vite y ejecución rápida en Node.js |
| Playwright | Se necesita automatizar flujos completos de usuario en el navegador |

La elección depende de la pregunta: compatibilidad real en navegador, corrección de la lógica o flujo completo del usuario.

## Matices

Ejecutar en navegador no convierte una prueba en extremo a extremo: una aserción sobre una función sigue siendo unitaria aunque corra dentro de Chrome. Conviene mantener la distinción al decidir qué se mide y cuánto tarda la suite.
