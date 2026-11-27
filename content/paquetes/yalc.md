---
titulo: "yalc"
resumen: "Herramienta que publica un paquete local en un almacén propio para probarlo en otro proyecto como si estuviera publicado."
categoria: herramienta
tags: ["terminal"]
alias: []
relacionados: [pnpm, paquete, workspace, dependencia]
fuentes: [https://github.com/wclr/yalc]
autoenlace: true
alternativas: [npm]
---
## Qué es

yalc es una herramienta de línea de comandos que publica un paquete local en un almacén propio y lo instala en otro proyecto como si viniera de un registro. El consumidor ve un paquete normal en su `node_modules`, con su `package.json` y sus archivos, pero el contenido sale de tu carpeta de desarrollo, no de internet. No cambia la publicación oficial ni altera el registro: es un atajo local para probar antes de publicar.

## Para qué sirve

Cierra el bucle cuando desarrollas una librería y la consumes desde una aplicación. Caso concreto: estás cambiando el componente de un botón en tu biblioteca y quieres verlo en la app que la usa; publicas el paquete con yalc, lo añades a la app, recargas y ves el cambio. Repites el ciclo sin subir una versión nueva ni ensuciar el historial de publicaciones.

## Cuándo usarlo

- Cuando desarrollas una librería y necesitas probarla en un consumidor real con resolución de dependencias normal.
- Cuando el enlace directo a la carpeta te ha dado módulos duplicados o rutas que no se resuelven como en una instalación real.
- Cuando quieres fijar en el consumidor una copia concreta de tu paquete local y actualizarla solo cuando tú lo decidas.

## Cuándo no

- Si el paquete ya está publicado y solo quieres consumirlo: instálalo desde el registro.
- Si desarrollas biblioteca y consumidor en el mismo monorepo: un workspace suele resolverlo sin herramientas extra.
- Si lo que necesitas es publicar de verdad: yalc no sustituye al paso de publicación en el registro.

## Alternativas

La comparación directa es con el enlace de npm.

| Herramienta | Cómo conecta el paquete | Cuándo conviene |
|-------------|-------------------------|-----------------|
| yalc | Copia el paquete a un almacén local y lo instala en el consumidor | Copia estable, actualizada bajo control |
| npm (`npm link`) | Enlace simbólico a la carpeta del paquete | Ver cada cambio al instante, aceptando la resolución por enlace |

La diferencia práctica está en la resolución: el enlace simbólico puede dejar dos copias de una dependencia compartida y provocar errores difíciles de diagnosticar; yalc instala una copia y por eso se parece más a una instalación real. El coste es que hay que volver a publicar tras cada cambio.

## Ejemplo

```bash
# En la carpeta de la librería
yalc publish

# En la carpeta de la aplicación
yalc add mi-libreria
npm install

# Tras cada cambio en la librería
yalc publish
yalc update
```

Para volver al paquete publicado, basta con `yalc remove mi-libreria` y una instalación normal.
