---
titulo: "Paquete"
resumen: "Unidad distribuible de software con nombre, versión y dependencias, que se instala mediante un gestor como npm."
categoria: concepto
tags: ["nivel-0","terminal"]
alias: ["package"]
relacionados: [dependencia, libreria, npm, modulos]
fuentes: []
autoenlace: true
---
## Definición

Un paquete es una unidad de software distribuible con nombre, versión y una lista de dependencias. Un gestor como npm lo descarga, lo registra en el manifiesto del proyecto y lo coloca en un directorio local. El nombre y la versión identifican de forma inequívoca qué código se está ejecutando.

## Por qué importa

Es la unidad en la que se toman decisiones importantes: actualizar, fijar una versión, retirar una dependencia o corregir una vulnerabilidad. Saber dónde está declarado explica por qué el proyecto compila con una API y no con otra. También delimita el alcance: actualizarlo afecta a todo el árbol que lo consume.

## Ejemplo

```bash
npm install zod
```

`package.json` registra el rango de versiones aceptado y `node_modules` contiene el código instalado. Borrar este directorio y reinstalar debe reproducir el mismo resultado si el archivo de bloqueo está presente.

## Se confunde con

- **Librería**: es el contenido; el paquete es el formato en que se publica e instala.
- **Módulo**: un paquete puede contener muchos módulos importables.
- **Dependencia**: lo es respecto de quien lo usa; el mismo paquete es dependencia de unos y herramienta de otros.

Matiz: instalar no es importar. Un paquete puede estar en disco y no usarse, o estar disponible en el navegador sin que el proyecto lo declare si llega desde una CDN.
