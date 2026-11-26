---
fecha: 2026-11-26
titulo: Adapter
resumen: "Patrón estructural que traduce la interfaz de un sistema a la que espera quien lo consume, sin modificar ninguno de los dos."
categoria: concepto
tags: []
alias: [adaptador]
relacionados: [facade, repository, provider, ddd, mud, data-manager]
fuentes:
  - "https://refactoring.guru/design-patterns/adapter"
autoenlace: true
familia: estructural
---

## Problema

El código necesita usar una librería o servicio cuya interfaz no coincide con lo que espera: nombres distintos, formatos distintos o una forma de llamar incómoda. Modificar esa dependencia no está en tu mano, y adaptar todos los consumidores repetiría la misma traducción.

## Solución

Se coloca una pieza intermedia que expone la interfaz que el consumidor entiende y traduce cada llamada a la interfaz real. Ni el consumidor ni la dependencia cambian: el adaptador absorbe la diferencia.

## Estructura

```
Consumidor  ──>  Adapter  ──>  Sistema con otra interfaz
                    │
                    └─ traduce nombres, formatos y errores
```

## Ejemplo

La aplicación espera `getUsuario(id)`, pero la API externa devuelve `GET /v2/users/:id` con otro formato:

```ts
export async function getUsuario(id: string) {
  const respuesta = await fetch(`/v2/users/${id}`);
  const { user } = await respuesta.json();
  return { id: user.identifier, nombre: user.displayName };
}
```

El resto del código sigue usando `getUsuario` y no conoce la versión de la API.

## Cuándo usarlo

Cuando la interfaz ajena es incómoda, cuando se migra de proveedor y conviene mantener una interfaz estable, o cuando se quiere aislar un sistema externo en pruebas.

En MuD los componentes y las features ya integran su propio Data Manager y se evita añadir adapters por encima: una capa extra repetiría lo que el componente ya trae. Conviene comprobar primero si la dependencia ya ofrece la interfaz necesaria.
