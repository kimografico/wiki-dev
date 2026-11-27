---
titulo: "Fullstack"
resumen: "Trabajo o persona que cubre frontend, backend y capa de datos de un mismo sistema; describe alcance, no una lista de tecnologías."
categoria: concepto
tags: ["frontend","backend"]
alias: []
relacionados: [stack, frontend, data-layer, api]
fuentes: []
autoenlace: true
---
## Definición

Fullstack describe el alcance de un trabajo o de una persona: abarca la interfaz, la lógica del servidor y la capa de datos de un mismo sistema. No es una lista de tecnologías ni garantía de dominio profundo en cada capa. Puede haber especialización, pero la funcionalidad se sigue de extremo a extremo.

## Por qué importa

El valor aparece en cambios que cruzan capas. Un formulario de alta necesita validación en el navegador, un endpoint que vuelva a validar y una escritura en la base de datos; quien conoce las tres partes decide dónde va cada comprobación y por qué la del cliente nunca basta. Reduce esperas, pero aumenta la responsabilidad: un cambio en la vista obliga a revisar contrato, errores y persistencia.

## Ejemplo

```ts
async function alta(datos) {
  if (!datos.email) return { error: "email obligatorio" };
  return fetch("/api/usuarios", { method: "POST", body: JSON.stringify(datos) });
}
```

El endpoint valida de nuevo y escribe en la tabla.

## Se confunde con

Con Stack: el stack es el conjunto de herramientas elegidas; fullstack describe qué partes del sistema se cubren con él. Con Frontend o Data Layer tomadas por separado: son capas, no el alcance completo. Aquí se clasifica con las etiquetas `frontend` y `backend`; las etiquetas ordenan el catálogo, no definen el término.
