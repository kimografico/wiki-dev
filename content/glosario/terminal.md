---
titulo: "Terminal"
resumen: "Programa que abre una sesión de texto con el sistema operativo, normalmente a través de un shell."
categoria: herramienta
tags: ["terminal","nivel-0"]
alias: ["consola"]
relacionados: ["cli", "entornos", "git", "build"]
fuentes: []
autoenlace: true
---

## Definición

La terminal es una ventana de texto que permite ejecutar comandos en el sistema operativo. Dentro de esa ventana corre un shell —Bash, PowerShell, Zsh— que interpreta las órdenes, expande argumentos y lanza procesos. La terminal dibuja la interfaz; el shell decide qué hacer con lo escrito.

## Por qué importa

Los comandos son instrucciones reproducibles: `npm run check && npm run validate` se puede pegar en la máquina de otra persona y también en CI/CD, con el mismo resultado. Eso no ocurre con una secuencia de clics: por eso los scripts se documentan como comandos reproducibles.

## Ejemplo

```bash
npm run check && npm run validate
```

`&&` encadena el segundo comando solo si el primero termina correctamente. Otro uso habitual es `cd content/glosario` para trabajar en una carpeta concreta: el directorio actual afecta a todo lo que se ejecute después.

## Se confunde con

No es el shell: la terminal es el programa que muestra la sesión; el shell es el intérprete que hay dentro. Tampoco es la consola del navegador, donde se ejecuta JavaScript sobre la página. Ni una CLI en abstracto: una CLI es un programa pensado para usarse desde la terminal.

## Matices

El historial con la flecha arriba y la finalización con `Tab` son funciones del shell, no de la terminal: cambiar de shell cambia esos atajos.
