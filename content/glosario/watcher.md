---
titulo: "Watcher"
resumen: "Proceso que vigila archivos y repite una tarea al detectar cambios; base del bucle guardar y ver en desarrollo."
categoria: herramienta
tags: ["terminal"]
alias: []
relacionados: [build, cli, watchman, debug, integracion-continua]
fuentes: []
autoenlace: true
---
## Definición

Un watcher es un proceso que vigila el sistema de archivos y vuelve a ejecutar una tarea cuando detecta cambios: recompilar, recargar la página o repetir un subconjunto de pruebas. Vive solo mientras está abierto el servidor de desarrollo y recibe el aviso del sistema de archivos, no de un temporizador.

## Por qué importa

Cierra el ciclo más caro del desarrollo: sin él, cada cambio exige lanzar el **Build** y recargar; con él, basta guardar. El ahorro se nota con pasos encadenados: transformar TypeScript, generar estilos y reconstruir un índice de búsqueda. Un watcher bien configurado recalcula solo lo afectado; uno mal configurado recompila medio proyecto en cada pulsación y acaba siendo más lento que el comando manual.

## Ejemplo

```bash
npm run dev   # inicia el servidor y su watcher
# Al guardar content/glosario/watcher.md se reconstruye la página.
```

También existe un modo vigilancia de pruebas: ejecuta solo los tests relacionados con el módulo cambiado.

## Se confunde con

Con un test en modo vigilancia y con la **Integración continua**. El watcher de archivos observa el disco; el de pruebas decide qué tests repetir a partir de ese aviso. La integración continua también reacciona a cambios, pero en un servidor compartido y tras un push, no en tu máquina. **Watchman** es una herramienta concreta para esta vigilancia; **Debug** investiga fallos, no detecta cambios.
