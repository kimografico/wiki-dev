---
titulo: "CLI"
resumen: "Interfaz de línea de comandos: programa que se maneja escribiendo órdenes en una terminal."
categoria: herramienta
tags: ["terminal","nivel-0"]
alias: []
relacionados: [terminal, npm, git, ci-cd]
fuentes: []
autoenlace: true
---
## Definición

Una CLI (interfaz de línea de comandos) es un programa que se maneja con texto en una terminal. Quien la usa escribe un comando —nombre, subcomandos, opciones y argumentos— y el programa lo interpreta y devuelve una salida. A diferencia de una interfaz gráfica, no hay botones visibles; la interfaz es el texto que acepta y el texto que devuelve, incluidos los códigos de salida que indican éxito o fallo.

## Por qué importa

Es la forma más reproducible de automatizar tareas de desarrollo. Una orden escrita a mano se convierte en un script, ese script entra en el repositorio y el mismo se ejecuta en otra máquina o en un pipeline sin adaptaciones. Además, la salida por texto se puede filtrar, redirigir a un archivo o usar como entrada de otra herramienta, algo difícil de hacer con ventanas y clics.

## Ejemplo

```bash
npm run validate   # orden y configuración del proyecto
git status --short
```

## Se confunde con

Con la terminal: la terminal es el programa que muestra la línea de texto; la CLI es el programa que se invoca escribiendo un comando dentro. Tampoco es un shell: el shell interpreta la línea y encadena procesos, mientras que una CLI resuelve una tarea concreta. Y no es lo mismo que el comando: `git status` es una orden que se escribe, mientras que `git` es la CLI que la ejecuta.
