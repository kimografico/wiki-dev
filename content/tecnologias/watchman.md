---
titulo: Watchman
resumen: Servicio de vigilancia de archivos de Meta que registra cambios y dispara acciones cuando coincide un patrón.
categoria: herramienta
tags: [terminal]
alias: []
relacionados: [watcher]
alternativas: []
web: https://meta.github.io/watchman/
fuentes: [https://meta.github.io/watchman/, https://github.com/meta/watchman]
autoenlace: true
---

## Qué es

Watchman es un servicio de vigilancia de archivos creado por Meta. Se instala como programa aparte y se maneja desde la terminal: mantiene vigilados uno o varios directorios, registra cuándo cambian y puede ejecutar una acción cuando un archivo coincide con un patrón.

## Para qué sirve

Sirve para reaccionar a cambios sin recorrer el árbol de archivos en cada consulta. Permite preguntar qué ha cambiado desde la última vez y suscribirse a cambios futuros; de ahí que encaje en flujos de construcción o de pruebas que se relanzan al guardar.

## Cuándo usarla

Cuando un flujo necesita reaccionar a cambios en proyectos grandes y quiere una respuesta fiable sobre qué archivos cambiaron. Es útil también cuando se necesita una acción automática, por ejemplo recompilar los recursos al modificar un archivo CSS.

## Cuándo no

Cuando basta con el observador que ya trae la herramienta de desarrollo: añadir un demonio y sus reglas tiene coste. Tampoco conviene sobre sistemas de archivos remotos o distribuidos: la documentación oficial avisa de que los resultados suelen ser malos, porque Watchman depende de las notificaciones del sistema operativo.

## Alternativas

No hay una alternativa directa con entrada en esta wiki. En el ecosistema JavaScript, `chokidar` es la biblioteca habitual dentro del proceso y `fs.watch` es la API nativa de Node; ambas evitan instalar un demonio, pero no guardan un registro consultable de cambios entre dos peticiones.

## Ejemplo

```bash
watchman version
watchman watch ~/src
watchman -- trigger ~/src buildme '*.css' -- minify-css
```

Las comillas en `'*.css'` son importantes: el patrón debe llegar a Watchman sin que la shell lo expanda.

## Frente a un watcher

Watcher es la idea general: observar archivos y reaccionar a sus cambios. Watchman es un servicio concreto con tres rasgos propios: funciona como demonio, permite consultar cambios desde un punto anterior y dispara acciones mediante reglas. No sigue enlaces simbólicos —los ve como archivos normales— y espera a que el directorio se estabilice antes de empezar a notificar, para no disparar acciones a medias.
