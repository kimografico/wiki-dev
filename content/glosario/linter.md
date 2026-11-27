---
titulo: "Linter"
resumen: "Herramienta de análisis estático que detecta errores probables y prácticas arriesgadas sin ejecutar el programa."
categoria: herramienta
tags: ["terminal"]
alias: []
relacionados: [eslint, prettier, code-review, typecheck, git-hooks]
fuentes: []
autoenlace: true
---

## Definición

Un linter es una herramienta de análisis estático: lee el código fuente sin ejecutarlo y aplica reglas que detectan errores probables, convenciones incumplidas y prácticas arriesgadas. No reescribe nada: emite avisos con archivo, línea y una explicación.

## Por qué importa

Un `console.log` olvidado o una variable sin usar sobreviven fácilmente a un Code review; el linter los señala en el editor y, mejor aún, en CI antes de fusionar. Convierte normas del equipo («usamos `const`, no `var`») en reglas automáticas, para que las discusiones de estilo desaparezcan de la revisión. Un `if (total = 0)` que asigna en vez de comparar se detecta antes de llegar a producción.

## Ejemplo

```js
// ESLint: 'total' is assigned a value but never used
const total = 0;
```

También se ejecuta en terminal: `npx eslint src/**/*.js`.

## Se confunde con

Con un formateador. Prettier reescribe el código para darle una forma uniforme; ESLint señala problemas de fondo. Se usan juntos: el formateador arregla la forma y el linter vigila el resto. Tampoco es Typecheck: TypeScript comprueba tipos; un linter puede avisar de estilo incluso en JavaScript sin tipos. Los Git hooks son el sitio habitual para ejecutarlo antes de cada commit.
