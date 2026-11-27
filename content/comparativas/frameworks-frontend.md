---
fecha: 2026-10-13
titulo: React frente a Vue y Angular
resumen: "React, Vue y Angular resuelven lo mismo con distintos grados de libertad: biblioteca, marco progresivo y plataforma completa."
categoria: framework
tags: [frontend]
alias: []
relacionados: [react, vue, angular, typescript, arquitectura-de-islas]
fuentes: []
autoenlace: true
entidades: [react, vue, angular]
contexto: "Elegir framework de interfaz según el tamaño del proyecto, la experiencia del equipo y cuánta guía se quiere recibir."
---

## Contexto

**React**, **Vue** y **Angular** construyen interfaces con estado. La comparación útil no es cuántas cosas sabe hacer cada una, sino cuántas decisiones te quita: React es una biblioteca mínima, Vue un marco progresivo y Angular una plataforma con convenciones fuertes.

En esta wiki **React** aparece solo como una isla dentro de **Astro**; eso recuerda que el framework se elige según la forma del proyecto, no por costumbre.

## Criterios

| Criterio | React | Vue | Angular |
|---|---|---|---|
| Naturaleza | Biblioteca de interfaz | Marco progresivo | Plataforma completa |
| Plantillas | JSX | HTML con directivas | HTML con directivas y **TypeScript** |
| Estado | Hooks y stores externos | Reactividad y store propio | Servicios y **RxJS** |
| Arquitectura | La decide el equipo | Parte oficial, parte abierta | Marcada por el framework |
| Curva inicial | Rápida; luego hay que elegir | Suave desde HTML | Más conceptos desde el inicio |
| Mejor encaje | Ecosistema flexible | Migración incremental | Aplicaciones largas y grandes |

La **Gestión de estado** es donde más se nota la diferencia: en React se decide biblioteca; en Angular hay una forma prevista desde el principio.

## Cuándo elegir cada una

Elige **React** si el equipo domina JavaScript y quiere libertad para componer el stack. Conviene acordar pronto router, estado y convenciones; de lo contrario cada desarrollador escogerá una pieza distinta. **TanStack** o **Zustand** suelen entrar en esa conversación.

Elige **Vue** si vienes de HTML y buscas una entrada suave sin renunciar a router y estado oficiales. Es cómodo para adoptar por partes sobre una página existente.

Elige **Angular** para aplicaciones de larga vida con mucha gente tocando el mismo código: la estructura repetida reduce discusiones y facilita tests. Aceptas más ceremonia a cambio de menos variación.

Evita **Angular** para un widget de tres líneas y evita **React** para un equipo que no ha decidido aún cómo estructura la aplicación.

## Ejemplos

```tsx
import { useState } from "react";

export function Contador() {
  const [n, setN] = useState(0);
  return <button onClick={() => setN(n + 1)}>{n}</button>;
}
```

```vue
<script setup>
import { ref } from "vue";
const n = ref(0);
</script>
<template><button @click="n++">{{ n }}</button></template>
```

```ts
import { Component } from "@angular/core";

@Component({
  selector: "app-contador",
  standalone: true,
  template: `<button (click)="n++">{{ n }}</button>`,
})
export class Contador { n = 0; }
```

## Matices

Los tres pueden crear la misma aplicación; lo que cambia es el coste de mantenerla. En una **Arquitectura de islas** cualquiera de ellos puede convivir con HTML estático: cambiar de framework no corrige un mal modelo de datos ni una interfaz confusa.
