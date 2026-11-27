---
fecha: 2026-10-13
titulo: ESLint
resumen: Analizador estático de JavaScript y TypeScript que señala errores y prácticas dudosas según reglas configurables.
categoria: herramienta
tags: [frontend, terminal, nivel-0]
alias: []
relacionados: [prettier, typescript, astro, ci-cd]
alternativas: []
web: https://eslint.org
npm: eslint
fuentes: [https://eslint.org/docs/latest/]
---

## Qué es

ESLint es un analizador estático: recorre el código sin ejecutarlo y aplica reglas que señalan desde variables sin usar hasta comparaciones sospechosas o patrones incorrectos en Astro y React. No es un comprobador de tipos ni un formateador: no sabe si un valor coincide con una interfaz y no decide dónde van los espacios. Las reglas se configuran y se pueden ampliar con plugins, por lo que cada proyecto define qué considera un error.

## Para qué sirve

Detectar errores antes de ejecutar y mantener acuerdos del equipo de forma automática. Caso concreto: alguien escribe `if (x = 1)` en lugar de `if (x === 1)`; el analizador lo marca antes de que nadie abra la página. Aquí forma parte de las comprobaciones de calidad del build y de la integración continua, junto al formateo y la validación de contenido.

## Cuándo usarlo

- En cualquier proyecto con JavaScript o TypeScript, para cazar patrones propensos a error sin esperar a los tests.
- En un equipo, para convertir convenciones discutidas en reglas automáticas y revisables en el repositorio.
- Cuando un framework tiene reglas propias (Astro, React, hooks) que conviene respetar.

## Cuándo no

- No sustituye a los tests: comprobar la forma del código no demuestra su comportamiento.
- No sustituye al comprobador de tipos: TypeScript detecta errores de tipos que un analizador ve como sintaxis válida.
- Conviene no llenarlo de reglas discutibles: si el equipo no está de acuerdo, el ruido desplaza a los errores reales.

## Alternativas

Biome reúne análisis y formato en una sola herramienta y suele ser más rápida; la decisión aquí se inclinó por ESLint por su ecosistema de plugins y su soporte de Astro. Otra vía es usar solo el comprobador de tipos y el formateador, sin analizador, cuando el equipo quiere menos herramientas y acepta renunciar a reglas como las de hooks de React.

## Reglas en este proyecto

Las reglas se ejecutan en local con `npm run lint` y en CI antes del build. Prettier se encarga del formato, así que ESLint se reserva para errores y prácticas arriesgadas, no para discusiones de espacios. Los hooks de git de Husky pueden adelantar la comprobación al momento del commit.

## Ejemplo

```bash
npm run lint        # revisa el proyecto
npx eslint --fix .  # corrige lo que se puede automáticamente
```

```js
// eslint.config.js — regla mínima, sin plugins
export default [
  { rules: { "no-unused-vars": "error", "eqeqeq": "error" } },
];
```

Con `eqeqeq` activa, `==` se marca como error y `===` pasa sin avisos.
