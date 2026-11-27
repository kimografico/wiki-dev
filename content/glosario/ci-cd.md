---
titulo: "CI/CD"
resumen: "Paraguas que engloba la integración continua y la entrega continua de software."
categoria: concepto
tags: ["terminal"]
alias: ["CI CD"]
relacionados: [integracion-continua, entrega-continua, pipeline, github-actions]
fuentes: []
autoenlace: true
---
## Definición

CI/CD es el paraguas que nombra dos prácticas distintas: integración continua (CI) y entrega continua (CD). La primera integra y valida cada cambio en un repositorio compartido; la segunda lleva las versiones ya validadas a un entorno desplegable. El término conjunto sirve para hablar del proceso completo, pero no sustituye a los nombres concretos cuando hay que decidir qué paso ha fallado.

## Por qué importa

Permite separar responsabilidades. Si falla la validación, el problema está en el código o en los tests; si falla la publicación, hay que mirar credenciales, artefactos o configuración del entorno. Un equipo que dice solamente «hay un problema de CI/CD» pierde esa pista. Automatizar ambas fases convierte una secuencia manual y olvidable en un proceso repetible que cualquiera puede ejecutar.

## Ejemplo

```yaml
# Pseudocódigo: validar -> construir -> publicar
- run: npm run validate
- run: npm run build
- run: <comando de publicación del entorno>
```

Los dos primeros pasos son de integración continua y usan scripts reales de este repositorio; el último es pseudocódigo, porque la publicación depende del entorno (aquí, GitHub Pages) y no hay un script `deploy` en `package.json`.

## Se confunde con

Con subir cambios a diario: hacer `push` no es integrarlos si nadie comprueba que siguen funcionando con los demás. Tampoco es despliegue continuo: publicar automáticamente en producción exige compuertas y decisiones que la entrega continua no asume por defecto.
