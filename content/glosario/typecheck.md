---
titulo: "Typecheck"
resumen: "Comprobación estática de tipos que detecta usos incorrectos antes de ejecutar el programa."
categoria: herramienta
tags: ["terminal"]
alias: []
relacionados: ["typescript", "tipos", "ci-cd", "build"]
fuentes: ["https://www.typescriptlang.org/docs/handbook/compiler-options.html"]
autoenlace: true
---

## Definición

Typecheck es la comprobación estática de tipos: una herramienta lee el código y verifica su forma antes de ejecutarlo. Detecta, por ejemplo, pasar un número donde se espera una cadena o acceder a una propiedad inexistente. No ejecuta la lógica del programa.

## Por qué importa

Es la primera red de seguridad en un proyecto TypeScript y suele ejecutarse en CI antes del build. Un error de este tipo aparece en el editor o al lanzar `npm run check`, con archivo y línea, en lugar de manifestarse como un fallo confuso en producción. Además, descarga a las pruebas de comprobar errores de forma: ellas pueden centrarse en el comportamiento.

## Ejemplo

```bash
npm run check
```

Equivale a lanzar el comprobador sin generar archivos (`tsc --noEmit`). La misma idea se aplica a los datos: si una entrada declara `tags: ["frontend"]`, el esquema rechaza una etiqueta que no esté en el catálogo.

## Se confunde con

No es un test: el typecheck comprueba formas; el test comprueba resultados en ejecución. Tampoco es lint, que aplica reglas de estilo y convenciones. Ni compilación: compilar produce archivos ejecutables, mientras que comprobar puede limitarse a informar de errores.

## Matices

Los tipos desaparecen en el JavaScript final: una comprobación en verde no demuestra que una API remota devuelva lo esperado. Lo que llega de fuera necesita validación en tiempo de ejecución.
