---
fecha: 2026-11-26
titulo: Adapter
resumen: "Patrón estructural que traduce la interfaz de una dependencia ajena a la que espera su consumidor, sin modificar ninguno de los dos."
categoria: concepto
tags: []
alias: [adaptador]
relacionados: [facade, repository, provider, ddd, mud]
fuentes:
  - "https://refactoring.guru/design-patterns/adapter"
autoenlace: true
familia: estructural
---

## Problema

Una aplicación espera `getUsuario(id)`, pero el proveedor ofrece `fetchUser` y devuelve `identifier` y `displayName` en lugar de `id` y `nombre`. Sus errores, además, tienen otro formato. Modificar el proveedor no está en tus manos, y traducir los campos en cada pantalla repetiría el mismo código: tarde o temprano una pantalla olvidaría hacerlo. El consumidor y la dependencia hablan dialectos distintos, y esa diferencia se filtraría a todos los sitios que usan el servicio.

## Solución

Se introduce una pieza intermedia que expone exactamente la interfaz que el consumidor ya conoce y delega en el proveedor. Esa pieza traduce nombres, formatos y errores; por eso se le llama adaptador. La dependencia sigue intacta y el consumidor no aprende detalles ajenos. Si cambia el proveedor, solo se reescribe el adaptador. La forma habitual es composición: el adaptador guarda una instancia del proveedor y ofrece sus propios métodos. Heredar del proveedor acopla la traducción a su jerarquía y dificulta sustituirlo.

## Estructura

```
Consumidor  ──>  Adapter  ──>  Proveedor ajeno
                     │
                     └─ traduce nombres, formatos y errores
```

## Ejemplo

```ts
type Usuario = { id: string; nombre: string };

type RespuestaProveedor = {
  identifier: string;
  displayName: string;
};

export async function getUsuario(
  id: string,
  consultar: (id: string) => Promise<RespuestaProveedor>,
): Promise<Usuario> {
  const bruto = await consultar(id);

  if (!bruto?.identifier) {
    throw new Error(`Usuario ${id} no encontrado`);
  }

  return { id: bruto.identifier, nombre: bruto.displayName };
}
```

La función de consulta se inyecta: en producción hará una petición HTTP y en las pruebas devolverá una respuesta preparada. El resto de la aplicación sigue llamando a `getUsuario` y no sabe qué servicio hay detrás ni cómo vienen sus campos.

## Cuándo usarlo

Cuando la interfaz ajena es incómoda, cuando se migra de proveedor y conviene mantener estable la interfaz interna, o cuando interesa aislar un servicio externo para probar sin red. No aporta nada si la dependencia ya expone la interfaz deseada, si solo la llama un sitio o si puedes cambiar el contrato en origen: añadir una capa sin una diferencia que traducir solo aumenta el código a mantener.

## Se confunde con

| Patrón | Criterio que lo distingue |
| ------ | ------------------------- |
| Adapter | Hace compatible una interfaz ajena con la que ya espera el consumidor. |
| Facade | Crea una interfaz simple propia delante de un subsistema complejo. |
| Repository (patrón) | Centraliza el acceso a datos y puede apoyarse en un adaptador para hablar con la fuente. |

La diferencia práctica está en quién define la interfaz: en Adapter la define el consumidor; en Facade, quien simplifica.

## En esta wiki

En MuD, los componentes y las features integran su propio Data Manager: añadir adapters por encima repetiría lo que el componente ya trae. Conviene comprobar antes si la dependencia ofrece ya la interfaz necesaria. Esta nota procede de una fuente interna.
