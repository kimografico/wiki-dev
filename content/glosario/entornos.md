---
titulo: "Entornos"
resumen: "Instancias separadas del mismo sistema: desarrollo, pruebas, preproducción y producción."
categoria: despliegue
tags: ["nivel-0","terminal"]
alias: []
relacionados: ["despliegue", "secreto", "entrega-continua", "git-flow"]
fuentes: []
autoenlace: true
---
## Definición

Un entorno es una instancia separada del mismo sistema con su propia configuración y datos: desarrollo, pruebas, preproducción y producción. Comparten código, pero no necesariamente secretos, base de datos ni dominio. La separación es operativa: lo que haces en uno no debería alterar lo que ven las personas usuarias de otro.

## Por qué importa

Aísla los experimentos. Probar una migración en local nunca debe borrar datos reales; una funcionalidad a medio terminar puede vivir en desarrollo sin llegar a producción. También permite dar pasos intermedios: preproducción sirve para comprobar el despliegue con datos parecidos a los reales antes del salto final.

## Ejemplo

```bash
NODE_ENV=development npm run dev
```

La variable distingue el modo de ejecución y activa comprobaciones distintas: mensajes de error detallados en desarrollo, optimizaciones y silencio en producción. Los secretos se cargan por entorno, nunca se escriben en el repositorio.

## Se confunde con

No es una rama Git: la rama separa versiones del código; el entorno separa ejecución y datos. Puedes desplegar la misma rama en dos entornos con resultados distintos por su configuración. Tampoco es un puerto distinto en la misma máquina: cambiar el puerto evita colisiones locales, pero no crea por sí solo un entorno aislado.
