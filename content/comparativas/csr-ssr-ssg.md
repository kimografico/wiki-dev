---
titulo: "CSR frente a SSR y SSG"
resumen: "Tres estrategias para decidir cuándo se genera el HTML: en el navegador, en cada petición o durante el build."
categoria: concepto
tags: ["frontend", "rendimiento"]
alias: []
relacionados: [csr, ssr, static-site-generation, hidratacion, core-web-vitals]
fuentes: []
autoenlace: true
entidades: [csr, ssr, static-site-generation]
contexto: "Tres estrategias para decidir dónde y cuándo se genera el HTML de una página y qué coste tiene cada decisión."
---

## Contexto

**CSR**, **SSR** y **Generación de sitio estático** responden a la misma pregunta: ¿cuándo existe el HTML que ve el usuario? En CSR se construye en el navegador después de cargar JavaScript; en SSR se construye en el servidor para cada petición; en SSG se construye una vez durante el build.

No son modos excluyentes de un sitio real: una wiki puede ser estática y tener un editor que funciona solo en cliente. La elección cambia el HTML inicial, la necesidad de servidor y la frescura de los datos.

## Criterios

| Estrategia | Momento del HTML | HTML inicial | Servidor por visita | JavaScript en cliente |
|---|---|---|---|---|
| CSR | Tras cargar el bundle | Casco vacío | No | Mucho |
| SSR | En cada petición | Completo | Sí | Hidratación |
| SSG | En el build | Completo | No | Poco o ninguno |

| Necesidad | Mejor opción |
|---|---|
| Contenido igual para todos y estable | SSG |
| Datos del usuario o muy frescos | SSR |
| Interacción intensiva tras la carga | CSR |

## Cuándo elegir cada una

Elige **Generación de sitio estático** para documentación, blogs y páginas que no cambian por usuario: el resultado se cachea y no depende de un servidor en caliente. El coste es que publicar implica reconstruir.

Elige **SSR** cuando la respuesta depende de la sesión, de permisos o de datos que no pueden esperar al siguiente build. Obtienes HTML útil desde la primera respuesta, pero pagas cómputo por petición.

Elige **CSR** para herramientas internas, editores o paneles donde el valor está en la interacción y el posicionamiento importa poco. Si el contenido es público y necesita buenos **Core Web Vitals**, un casco vacío suele ser mala señal.

La **Hidratación** conecta el HTML ya generado con los componentes interactivos; explica por qué SSR y SSG todavía pueden enviar JavaScript.

## Ejemplos

```astro
---
// SSG: se resuelve durante el build
import { getCollection } from "astro:content";
const entradas = await getCollection("comparativas");
---
<ul>{entradas.map((e) => <li>{e.data.titulo}</li>)}</ul>
```

```tsx
// SSR: se ejecuta en cada petición; el id llega en los parámetros de la ruta
export default async function Pedido({ params }: { params: { id: string } }) {
  const respuesta = await fetch(`${process.env.API_URL}/pedidos/${params.id}`, {
    cache: "no-store",
  });
  const pedido = await respuesta.json();
  return <h1>{pedido.total}</h1>;
}
```

```js
// CSR: se ejecuta en el navegador
useEffect(() => {
  fetch(`/api/pedidos/${id}`).then((r) => r.json()).then(setPedido);
}, [id]);
```

## Matices

Estas siglas describen *cuándo* se renderiza, no qué framework lo hace. **Astro** y **Next.js** pueden combinarlas por ruta. Decide por requisito: si el dato es público y estable, genera antes; si depende de la petición, genera durante ella; si depende del usuario interactuando, genera en el cliente.
