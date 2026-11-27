---
titulo: "Cloudflare Worker"
resumen: "Función que se ejecuta en la red perimetral de Cloudflare y responde peticiones HTTP sin gestionar servidores propios."
categoria: despliegue
tags: ["backend", "rendimiento"]
alias: ["Worker de Cloudflare"]
relacionados: ["cloudflare", "binding", "github-actions", "webhook"]
fuentes: ["https://developers.cloudflare.com/workers/"]
autoenlace: true
alternativas: ["vercel"]
web: "https://workers.cloudflare.com/"
---
## Qué es

Un Cloudflare Worker es una función que se ejecuta en los servidores perimetrales de Cloudflare cuando llega una petición HTTP. No es un contenedor ni un proceso que permanece encendido: recibe la petición, hace su trabajo y responde. Tampoco es un framework: la interfaz de entrada es el estándar `fetch` de JavaScript, aunque puedes añadir bibliotecas si lo necesitas. Su unidad es la petición, no la sesión de usuario.

## Para qué sirve

Permite colocar lógica ligera delante de una aplicación o de un sitio estático: validar un webhook, redirigir según la ruta, añadir cabeceras, cachear una respuesta o reescribir una URL. Resulta útil cuando esa lógica debe estar cerca de quien hace la petición y no justifica un servidor propio. Esta wiki, por ejemplo, es estática; un Worker podría comprobar un token antes de reenviar un aviso a una automatización externa sin añadir backend al sitio.

## Cuándo usarla

- La tarea cabe en una petición: validar, transformar, redirigir o responder.
- Quieres ejecutar código sin aprovisionar ni mantener instancias.
- La latencia importa y conviene responder desde el punto de la red más cercano al usuario.
- Ya usas Cloudflare para DNS, caché o protección y quieres aprovechar la misma plataforma.

## Cuándo no

Para un servicio con estado complejo, transacciones o trabajos de larga duración, un servidor convencional encaja mejor. Un Worker tampoco sustituye a una base de datos: para persistencia necesitas enlaces (Binding) específicos, que se configuran aparte. Si tu aplicación ya corre en otro proveedor y la lógica depende de su entorno, mover solo esa función al perímetro puede crear más piezas de las que quitas.

## Alternativas

| Opción | Criterio para elegirla |
| --- | --- |
| Cloudflare Worker | La lógica vive junto a DNS, caché y protección de Cloudflare y se reparte por su red. |
| Vercel | Compute asociado a despliegues de frontend y a su propia plataforma de aplicaciones. |
| Sin función | El sitio es puramente estático y no hay nada que validar ni transformar. |

La comparación depende de dónde vive el resto del proyecto y de si la función necesita integrarse con otros servicios del proveedor.

## Ejemplo

```js
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname !== "/webhook") {
      return new Response("No encontrado", { status: 404 });
    }
    if (request.headers.get("x-token") !== env.WEBHOOK_TOKEN) {
      return new Response("No autorizado", { status: 401 });
    }
    return new Response("Aceptado", { status: 200 });
  },
};
```

El secreto se lee de `env`, no del código: así no queda escrito en el repositorio. Cualquier petición a otra ruta devuelve 404 antes de comprobar credenciales.

## Matices

Cloudflare es la plataforma; el Worker es una de sus funciones. Decir «usamos Cloudflare» no implica tener Workers, y desplegar un Worker no sustituye a la caché ni al DNS.
