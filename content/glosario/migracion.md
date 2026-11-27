---
titulo: "Migración"
resumen: "Cambio de tecnología, formato o modelo por otro distinto conservando el comportamiento, avanzando por pasos verificables."
categoria: concepto
tags: ["frontend"]
alias: []
relacionados: [refactor, dependencia, despliegue, build]
fuentes: []
autoenlace: true
---
## Definición

Una migración sustituye la tecnología, el formato o el modelo de un sistema por otro distinto sin cambiar lo que el sistema hace. Implica mover código, datos o contratos y comprobar que el comportamiento observable sigue igual. Se trabaja en unidades pequeñas —una ruta, un componente, una tabla— para validar cada paso antes de continuar.

## Por qué importa

Casi ningún sistema cambia de base de una vez. Una reescritura concentra el riesgo: semanas sin entregar valor y un día en que todo debe funcionar a la vez. Migrar por capas permite seguir publicando: se traslada una pantalla de una interfaz antigua, se ejecutan sus pruebas y se repite. Si aparece una regresión, la reversión afecta solo a ese paso.

## Ejemplo

```diff
- import { Estado } from "./antiguo/Estado";
+ import { Estado } from "./nuevo/Estado";
```

El componente `Estado` se traslada de una carpeta a otra; la ruta antigua sigue respondiendo mientras tanto, el Router elige cuál se usa y cada traslado se comprueba con sus pruebas.

## Se confunde con

- **Actualización**: subir de versión dentro del mismo sistema; cambia el número, no el modelo.
- **Refactor**: reordena el código sin cambiar tecnología ni comportamiento.
- **Reescritura**: empieza de cero y no garantiza conservar lo que ya funcionaba.

Criterio: si deshaces el paso con un `revert` y las pruebas siguen en verde, es una migración; si no, es una reescritura encubierta.
