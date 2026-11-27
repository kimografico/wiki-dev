---
titulo: "Codespace"
resumen: "Entorno de desarrollo alojado en la nube que se crea a partir de un repositorio."
categoria: herramienta
tags: ["terminal"]
alias: []
relacionados: [github, git, docker, npm]
fuentes: []
autoenlace: true
alternativas: [docker]
---
## Qué es

Un Codespace es un entorno de desarrollo que vive en la nube y se crea a partir de un repositorio de GitHub. La definición del entorno viaja en el propio repositorio, normalmente en un archivo de configuración de contenedor, de modo que quien abre el proyecto obtiene el mismo sistema, las mismas herramientas y las dependencias instaladas. No es una máquina virtual que se configura a mano ni un simple editor en línea.

## Para qué sirve

Permite abrir el proyecto ya configurado desde cualquier ordenador, table o incluso el navegador del móvil, sin instalar Node, sin pelear con versiones de Python y sin copiar variables locales. También ayuda a revisar la rama de un compañero: abres esa rama en su propio entorno y ejecutas las comprobaciones sin contaminar el tuyo.

## Cuándo usarla

Úsalo cuando cambias de equipo, cuando el equipo comparte una configuración compleja o cuando necesitas un entorno limpio y reproducible para reproducir un fallo. Encaja especialmente bien en proyectos que ya viven en GitHub y cuyo flujo se basa en pull requests: cada rama puede tener su propio entorno aislado.

## Cuándo no

No sustituye al entorno local si dependes de herramientas gráficas concretas, licencias de escritorio o hardware especial. Tampoco es la mejor opción con conexiones lentas: la latencia se nota al escribir y al arrancar el servidor. Y los secretos nunca se guardan en el repositorio: se configuran en el entorno o se cargan como secretos del servicio.

## Alternativas

Docker ofrece una alternativa con la misma idea de base —un entorno definido en un archivo y reproducible—, pero ejecutándolo en tu máquina. La diferencia práctica está en dónde corre y quién lo mantiene: Codespace elimina la instalación y facilita trabajar desde cualquier sitio, a cambio de depender de la red y del servicio; Docker funciona sin conexión y da control total sobre volúmenes y recursos, a cambio de configurar y mantener el equipo.

## Ejemplo

```bash
# Dentro del repositorio, tras abrir el Codespace:
npm install
npm run dev
```

El entorno ya trae Git, Node y el editor; esas dos líneas bastan para tener la wiki sirviendo en el puerto local. No hace falta explicar a cada persona del equipo cómo instalar las dependencias.

## Matices

| Situación | Mejor opción |
|-----------|--------------|
| Trabajar desde varios equipos | Codespace |
| Trabajar sin conexión | Docker en local |
| Repetir un fallo exacto | Entorno definido en archivo, en cualquiera de los dos |
