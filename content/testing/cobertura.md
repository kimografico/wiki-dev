---
titulo: "Cobertura"
resumen: "Porcentaje de líneas, ramas, funciones y sentencias ejecutadas por los tests; sirve para priorizar zonas sin comprobar, no para garantizar corrección."
categoria: concepto
tags: ["tests"]
alias: ["coverage"]
relacionados: ["estrategia-de-testing", "regresion", "vitest", "snapshot"]
fuentes: []
autoenlace: true
alternativas: []
---

## Qué es

La cobertura mide qué partes del código se han ejecutado durante una sesión de pruebas. Se expresa como porcentaje sobre cuatro unidades habituales: **sentencias** (instrucciones que se han ejecutado), **ramas** (los caminos de un `if`, por ejemplo el caso verdadero y el falso), **funciones** (cuántas se han llamado) y **líneas** (parecidas a las sentencias, pero no idénticas cuando una instrucción ocupa varias líneas).

Un porcentaje alto responde a una pregunta limitada: «¿este código se ha ejecutado mientras corrían los tests?». No responde a si el resultado era correcto ni a si se comprobaron los casos límite. Un test que llama a una función sin verificar nada ya cuenta esa función como cubierta.

## Para qué sirve

Sirve para localizar zonas que nadie ha ejercitado y decidir dónde escribir la siguiente prueba. En una revisión, un módulo con cobertura baja de ramas es un candidato claro: probablemente faltan casos de error, valores vacíos o caminos alternativos.

También funciona como señal de alerta cuando baja de repente: puede indicar que se añadió código nuevo sin pruebas o que un cambio dejó de ejecutar un camino que antes se comprobaba. Es una brújula para priorizar, no un objetivo en sí mismo.

## Tipos de prueba

La cobertura se mide sobre cualquier suite, pero su lectura cambia según el tipo:

- **Unitaria**: la más fácil de interpretar; cada rama de la lógica pura puede ejercitarse con pocos casos.
- **De integración**: muestra qué módulos se han ejecutado juntos, aunque no diga si la comunicación entre ellos es correcta.
- **De componentes con DOM simulado**: útil para saber qué renderizados se han probado; no sustituye a una comprobación en navegador.
- **Extremo a extremo**: suele dar una cobertura global baja y desigual, porque recorre rutas enteras sin explorar todas las combinaciones internas.

## Ejemplo

```bash
npm run test:coverage
```

El informe suele abrirse como página HTML. Si una rama del validador aparece sin cubrir, se añade un caso para ese valor y se vuelve a ejecutar el comando. La cifra confirma que la rama se alcanza; la aserción del test es la que confirma el resultado esperado.

## Matices

Perseguir el 100 % suele generar pruebas que solo «pasan por» el código. Es mejor cubrir primero las ramas con consecuencias visibles para el usuario y dejar constancia de los casos límite con pruebas de regresión. Cobertura y aserciones son dos señales distintas: la primera dice qué se ejecutó; la segunda, qué se comprobó.
