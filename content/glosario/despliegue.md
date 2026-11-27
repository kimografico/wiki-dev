---
titulo: "Despliegue"
resumen: "Proceso de llevar una versión construida del software a un entorno donde los usuarios pueden usarla."
categoria: despliegue
tags: ["terminal","nivel-0"]
alias: []
relacionados: [build, entornos, ci-cd, entrega-continua]
fuentes: []
autoenlace: true
---

## Definición

Desplegar es llevar una versión ya construida de software a un entorno donde otros pueden usarla. El proceso empieza después del build: toma los artefactos generados, los publica y deja el entorno apuntando a esa versión. No incluye escribir el código ni probarlo, aunque sí puede incluir comprobaciones finales.

## Por qué importa

Es el eslabón entre un commit correcto y un producto visible. Sin él, el trabajo se queda en la máquina del desarrollador. También es el punto donde aparecen las diferencias de entorno: una variable ausente, una ruta relativa mal resuelta o un runtime distinto pueden romper en producción una aplicación que funcionaba en local.

## Ejemplo

```bash
npm run build      # genera el sitio estático en dist/
# a continuación, el pipeline publica dist/ y actualiza la URL pública
```

Publicar el directorio equivocado, por ejemplo las fuentes en lugar de `dist/`, es un fallo de despliegue, no de build.

## Se confunde con

Con el build. El build transforma código en artefactos; el despliegue los mueve y los hace accesibles. Tampoco es integración continua: la CI valida cada cambio, mientras que el despliegue decide qué versión ven los usuarios.
