---
titulo: "Dry run"
resumen: "Ejecución de prueba que simula una acción sin aplicar sus efectos reales."
categoria: herramienta
tags: ["terminal"]
alias: []
relacionados: ["entornos", "terminal", "cli", "despliegue"]
fuentes: []
autoenlace: true
---
## Definición

Un dry run es una ejecución de prueba que recorre los pasos de una acción y muestra qué haría, sin aplicar sus efectos. Es una simulación ofrecida por el propio comando, no un modo universal: solo existe si quien implementó la orden decidió incluirlo. La salida suele ser un listado de cambios pendientes o un aviso de errores antes de tocar nada.

## Por qué importa

Antes de borrar archivos o publicar, permite comprobar el alcance: `git clean --dry-run` lista qué archivos no rastreados se eliminarían, y `git push --dry-run` comprueba la referencia y los permisos sin mover la rama remota. Es una red de seguridad barata cuando la operación real es irreversible o la compartes con otras personas.

## Ejemplo

```bash
git clean --dry-run             # qué archivos se borrarían
git push --dry-run origin main  # qué referencia se enviaría
```

Compara la salida con lo que esperabas. Si aparece un archivo que no debía, corrige el filtro antes de quitar `--dry-run`.

## Se confunde con

No es un entorno de pruebas: ese entorno sí aplica cambios, pero en una instancia aislada; el dry run no despliega nada en ningún sitio. Tampoco garantiza el éxito: puede pasar la simulación y fallar la ejecución real por permisos, red o cambios entre medias. Añadir `--dry-run` a una orden que no lo entiende puede ignorarse o provocar un error.
