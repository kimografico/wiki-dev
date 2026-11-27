---
titulo: "Build"
resumen: "Proceso que transforma el código fuente en artefactos listos para publicar."
categoria: concepto
tags: ["terminal","nivel-0"]
alias: []
relacionados: [bundler, builder, despliegue, ci-cd]
fuentes: []
autoenlace: true
---
## Definición

Un build es el proceso que transforma el código fuente de un proyecto en artefactos listos para publicar: archivos estáticos, paquetes o imágenes. No es una sola orden mágica, sino una secuencia de pasos —resolver dependencias, compilar, transformar, minificar y generar la salida— que conviene ejecutar desde una copia limpia del repositorio. El resultado se guarda en un directorio de salida, como `dist/`, y es lo que después se distribuye.

## Por qué importa

Separa lo que se escribe de lo que se publica. Un mismo código puede producir artefactos distintos según el entorno: en desarrollo se conservan mapas de origen y mensajes legibles; en producción se priorizan tamaño y caché. Ejecutar el build con las mismas órdenes en la máquina local y en integración continua reduce el clásico «en mi entorno funciona». Además, es el momento en que aparecen antes los errores de tipos, de rutas o de variables mal configuradas.

## Ejemplo

```bash
npm ci
npm run build
# salida: dist/index.html, dist/assets/...
```

En un sitio estático, esos archivos son los que se suben a GitHub Pages.

## Se confunde con

Con el despliegue: el build fabrica los archivos; el despliegue los transporta y los publica. Tampoco es el servidor de desarrollo, que responde peticiones mientras programas y no genera el artefacto final.
