---
titulo: "Utilidades"
resumen: "Código propio y reutilizable que centraliza una tarea mecánica repetida, sin estado ni lógica de negocio."
categoria: concepto
tags: ["frontend"]
alias: []
relacionados: [funcion, modulos, libreria, utilidades-npm]
fuentes: []
autoenlace: true
---
## Definición

Una utilidad es una **Función** o un valor constante del propio proyecto, agrupado en un archivo compartido, que resuelve una tarea mecánica y repetida: formatear una fecha, normalizar un texto, comprobar un tipo. No guarda estado ni decide sobre el negocio: solo transforma lo que recibe. Se importa desde cualquier módulo sin depender de la interfaz ni del framework.

## Por qué importa

Centraliza una decisión. Una wiki que muestra la fecha de alta de cada entrada en tres sitios formatea el valor de tres maneras distintas si no hay utilidad; un cambio de formato obliga a tocar tres archivos. Con `formatearFecha`, se corrige una vez y las tres vistas lo heredan.

## Ejemplo

```ts
// src/lib/formatos.ts
export function formatearFecha(iso: string): string {
  return new Date(iso).toLocaleDateString("es-ES");
}
```

Desde una vista: `import { formatearFecha } from "../../lib/formatos";`. El archivo no importa React ni Astro, así que sirve igual en el servidor que en el navegador.

## Se confunde con

Con una **Librería** o un **Paquete**: esos se instalan y se versionan desde fuera; las utilidades viven en el repositorio y cambian con él. Tampoco son **Utilidades npm**, que designa los comandos del gestor, no tu código. Si la función decide que un pedido es urgente, eso es dominio, no `utils`.
