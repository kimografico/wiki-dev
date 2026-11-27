---
fecha: 2026-10-13
titulo: localStorage
resumen: Almacén clave-valor del navegador que persiste entre visitas y que aquí solo guarda las preferencias del lector.
categoria: concepto
tags: [frontend, seguridad]
relacionados: [cookies, sessionstorage, accesibilidad-web, almacenamiento-en-el-navegador]
terminoEn: localStorage
---

## Definición

`localStorage` es una memoria del navegador que guarda pares clave-valor como cadenas de texto. Los datos sobreviven al cierre de la pestaña y del navegador, y no se envían a ningún servidor. Está limitado al origen —esquema, host y puerto— que lo escribió.

## Por qué importa

Permite recordar preferencias, como el tema claro u oscuro o las entradas aprendidas, sin cuentas ni backend. Al no salir del navegador, respeta la privacidad del lector. El coste es que solo existe en el cliente: otro dispositivo no ve esos datos y cualquier script de la misma página puede leerlos, así que nunca es lugar para secretos. Acceder con el almacenamiento desactivado puede lanzar una excepción; conviene envolver la lectura en `try/catch`.

## Ejemplo

```js
localStorage.setItem("wiki:tema", "dark");
const tema = localStorage.getItem("wiki:tema"); // "dark" o null
```

## Se confunde con

Con las Cookies, que sí se envían al servidor en cada petición y pueden tener fecha de caducidad. `localStorage` se queda en el navegador y no caduca salvo borrado explícito. Tampoco es una base de datos: no tiene consultas ni índices, solo `getItem`, `setItem` y `removeItem`.

## Frente a SessionStorage

Ambos viven en el navegador y guardan cadenas. La diferencia es la duración: localStorage sobrevive al cierre y se comparte entre pestañas del mismo origen; SessionStorage muere con la pestaña y no se comparte. La comparativa Almacenamiento en el navegador reúne las distintas opciones.
