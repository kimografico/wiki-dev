---
fecha: 2026-10-13
titulo: Husky
resumen: Gestor de hooks de git que permite ejecutar comprobaciones automáticamente antes de cada commit o push.
categoria: herramienta
tags: [terminal]
alias: []
relacionados: [integracion-continua, git-hooks, ci-cd]
alternativas: []
web: https://typicode.github.io/husky/
npm: husky
fuentes: [https://typicode.github.io/husky/]
---

## Qué es

Husky instala y gestiona los *hooks* de git dentro del propio repositorio. Un hook es un script que git ejecuta en un momento concreto: antes de confirmar un commit, antes de subir cambios, después de una fusión. Al vivir en `.husky/`, la configuración viaja con el proyecto y no depende de lo que cada persona tenga en su máquina. No ejecuta comprobaciones por sí solo: llama a los comandos que le indiques.

## Para qué sirve

Hacer que las comprobaciones se ejecuten siempre, sin que nadie tenga que acordarse. Caso concreto: antes de confirmar se pasa el análisis y el formateo; antes de subir, los tests con cobertura. Si algo falla, el commit o el envío se detiene y el problema se corrige en local, donde es más barato.

## Cuándo usarlo

- Cuando hay reglas que deben aplicarse en cada cambio y no dependen de la memoria del equipo.
- Cuando quieres adelantar al desarrollo errores que de otro modo aparecerían en la integración continua.
- Cuando el repositorio tiene varios colaboradores y la configuración debe ser idéntica para todos.

## Cuándo no

- Los hooks se pueden saltar con `--no-verify`, así que no son una garantía: la integración continua sigue siendo la fuente de verdad.
- No conviene meter tareas que tarden minutos: el equipo acabará saltándoselas.
- Si el equipo no tiene claras las comprobaciones que quiere automatizar, añadir hooks solo traslada la discusión al hook.

## Alternativas

`simple-git-hooks` y `lefthook` ofrecen lo mismo con enfoques distintos: el primero busca una configuración mínima, el segundo permite tareas en paralelo y más control. Aquí se mantiene Husky por su sencillez y su adopción amplia, suficiente para dos hooks cortos.

## Matices

Un hook no es una política de seguridad: cualquiera puede evitarlo, y en automatizaciones conviene no depender de él. Tampoco debe duplicar lo que ya hace la integración continua: la misma regla puede ejecutarse en ambos sitios, pero el resultado que manda es el de la pipeline. Conviene que los scripts sean cortos y llamen a comandos del proyecto (`npm run ...`), no que repitan instrucciones.

## Hooks de este proyecto

El hook `pre-commit` pasa lint-staged y la validación de contenido; el `pre-push` exige cobertura del 90 % con `npm run test:coverage`. Ningún agente salta estos hooks con `--no-verify`.

## Ejemplo

```bash
# .husky/pre-commit
npx lint-staged
npm run --if-present validate

# .husky/pre-push
npm run test:coverage
```

Si el hook devuelve un código de error, git cancela la operación y deja los cambios en el área de trabajo para que se corrijan.
