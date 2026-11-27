---
titulo: "Redux"
resumen: "Estado compartido predecible mediante acciones y reducers; criterios para usar Redux, Zustand o solo estado local."
categoria: estado
tags: ["frontend"]
alias: []
relacionados: ["zustand", "react", "gestion-de-estado", "estado-local-frente-a-estado-de-servidor"]
fuentes: ["https://redux.js.org/introduction/getting-started", "https://redux-toolkit.js.org/"]
autoenlace: true
alternativas: ["zustand"]
---

## Qué es

Redux es una biblioteca para gestionar estado compartido con un flujo unidireccional: la interfaz despacha una acción, un reducer calcula el estado siguiente y la interfaz se actualiza. Un reducer es una función `(estado, acción) => estadoSiguiente`: no hace peticiones ni lee el reloj; con los mismos argumentos devuelve el mismo resultado. Eso permite que cada cambio esté descrito por una acción y pueda reproducirse en un test. No es una base de datos, no guarda el estado entre recargas por sí solo y no sustituye a la caché de datos del servidor.

## Para qué sirve

Un caso reconocible: el carrito de una tienda lo consultan la cabecera, la página de producto y un modal. Si cada componente guarda su propia copia, las copias se desincronizan. Con Redux hay una sola fuente de verdad: los componentes leen el mismo valor y despachan las mismas acciones para modificarlo, de modo que se puede responder qué hizo cambiar el total.

## Cuándo usarla

Cuando varios componentes lejanos necesitan el mismo dato; cuando las actualizaciones siguen reglas que conviene centralizar y probar; o cuando interesa inspeccionar el historial de acciones para depurar. También ayuda si distintas ramas de la aplicación deben reaccionar al mismo evento, por ejemplo una sesión que se cierra desde varios sitios.

## Cuándo no

En un formulario con dos variables, el estado local de React basta y evita ceremonia. En una web estática, no hay estado compartido que gestionar. Los datos del servidor se manejan mejor con caché específica, sin duplicarlos en la tienda global. La comparación Estado local frente a estado de servidor delimita esa decisión.

## Ejemplo

```js
import { configureStore, createSlice } from "@reduxjs/toolkit";

const contador = createSlice({
  name: "contador",
  initialState: { valor: 0 },
  reducers: {
    sumar: (state) => {
      state.valor += 1;
    },
  },
});

export const { sumar } = contador.actions;
export const store = configureStore({ reducer: { contador: contador.reducer } });

store.dispatch(sumar());
console.log(store.getState().contador.valor); // 1
```

`createSlice` genera la acción y el reducer a la vez; `configureStore` crea la tienda y `dispatch` es la única vía de cambio.

## Alternativas

| Opción | Forma de trabajar | Criterio de decisión |
| --- | --- | --- |
| Redux | Acciones, reducers y flujo explícito | Elegirlo si el equipo valora trazabilidad y tests del estado |
| Zustand | Tienda pequeña con menos plantilla | Elegirlo si se quiere compartir estado sin montar toda la estructura |



## Matices: pureza y mutación

En el ejemplo, `state.valor += 1` parece mutar el estado. Redux Toolkit usa internamente Immer, de modo que esa escritura se convierte en un estado nuevo e inmutable: la regla de pureza se mantiene aunque el código sea más corto. Lo que nunca debe hacerse dentro de un reducer es lanzar una petición o esperar una promesa; esas operaciones van antes de despachar la acción.
