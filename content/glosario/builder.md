---
titulo: "Builder"
resumen: "Herramienta o configuración que ejecuta un build y decide qué entra en el resultado final."
categoria: herramienta
tags: ["frontend","terminal"]
alias: []
relacionados: [build, bundler, vite, webpack, rollup]
fuentes: []
autoenlace: true
---
## Definición

Un builder es la herramienta —o la configuración que la gobierna— que ejecuta un build y decide qué entra en el resultado final. En proyectos JavaScript suele combinar un empaquetador, transformadores y tareas de copia de recursos. La palabra también existe en patrones de diseño con otro sentido; aquí designa siempre la construcción del proyecto.

## Por qué importa

La elección afecta a tres cosas que se notan cada día: cuánto tarda en arrancar el entorno local, qué tamaño tiene el código enviado al navegador y en qué momento aparecen los errores. Cambiar de builder sin revisar la configuración puede dejar fuera estilos, romper alias de importación o producir un artefacto que falla en producción aunque el servidor de desarrollo responda bien. Por eso la configuración se versiona junto al código.

## Ejemplo

```js
// vite.config.js
import { defineConfig } from "vite";
export default defineConfig({ build: { outDir: "dist" } });
```

Esa configuración indica al builder dónde deja los archivos generados.

## Se confunde con

Con el patrón Builder de diseño creacional: aquél es una clase que construye objetos paso a paso; éste es un ejecutor de tareas. Tampoco es el empaquetador: agrupar módulos es una de las cosas que un builder puede hacer, además de compilar tipos o copiar recursos.
