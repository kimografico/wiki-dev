---
titulo: "Pipeline"
resumen: "Secuencia automática de etapas que transforma o verifica un cambio desde que se dispara hasta que termina."
categoria: despliegue
tags: ["terminal"]
alias: []
relacionados: [ci-cd, integracion-continua, entrega-continua, build, workflow]
fuentes: []
autoenlace: true
---
## Definición

Un pipeline es una secuencia automática de etapas que transforman o verifican un cambio desde que se dispara hasta que termina. Cada etapa consume el resultado de la anterior: comprobar tipos, ejecutar pruebas, generar el artefacto y publicarlo. Si una falla, la cadena se detiene y el cambio no avanza.

## Por qué importa

Hace repetible el camino a producción. Sin pipeline, cada persona ejecuta los comandos en un orden distinto y un fallo se descubre en el último momento. Al ejecutar siempre las mismas comprobaciones, cada fallo se convierte en una señal temprana y cercana al cambio que lo introdujo. También queda un registro de qué ocurrió, útil cuando algo se rompe.

## Ejemplo

```yaml
steps:
  - run: npm run check
  - run: npm run lint
  - run: npm run test:coverage
  - run: npm run build
```

El build solo se ejecuta si las etapas anteriores han terminado bien.

## Se confunde con

- **Workflow**: en GitHub Actions es la definición YAML de trabajos y pasos; el pipeline describe la secuencia de etapas, una idea más amplia que puede ejecutarse fuera de ese sistema.
- **CI/CD**: son prácticas; el pipeline es el mecanismo que las implementa.
- **Cron job**: dispara tareas periódicas, no encadena verificaciones de un cambio.

Matiz: un pipeline no garantiza que el código sea correcto; garantiza que se ejecutaron las comprobaciones definidas. Ampliar esas comprobaciones es lo que lo hace fiable.
