---
titulo: "Cloudflare"
resumen: "Plataforma de red que ofrece DNS, CDN, protección y ejecución de código en el perímetro delante del origen de un sitio."
categoria: despliegue
tags: ["backend", "rendimiento", "seguridad"]
alias: []
relacionados: ["cloudflare-worker", "github-pages", "dns", "cache", "cabeceras-http"]
fuentes: ["https://developers.cloudflare.com/"]
autoenlace: true
alternativas: ["vercel"]
web: "https://www.cloudflare.com/"
---
## Qué es

Cloudflare es una plataforma de red que se coloca entre quien visita un sitio y el servidor de origen. Ofrece DNS gestionado, CDN con caché, protección frente a tráfico indeseado y ejecución de código en el perímetro. No es un hosting tradicional: no alquila una máquina con un proceso persistente que escuche en un puerto. Tampoco es un único producto; es un conjunto de servicios que se activan alrededor de un dominio.

## Para qué sirve

Reduce la distancia entre el contenido y el lector: una respuesta cacheada se sirve desde un punto cercano, sin llegar al origen. También absorbe picos de tráfico y filtra peticiones antes de que carguen el servidor. En un sitio estático publicado en GitHub Pages, Cloudflare puede gestionar el DNS, añadir caché y terminar TLS, mientras el origen sigue siendo solo almacenamiento de archivos. La separación importa: si el origen se cae, la caché puede seguir sirviendo páginas ya guardadas.

## Cuándo usarla

- El sitio recibe visitas desde varias regiones y la latencia se nota.
- Quieres delegar el DNS y gestionar certificados sin configurarlos a mano.
- Necesitas una capa delante del origen para cachear, redirigir o limitar peticiones.
- Vas a ejecutar lógica ligera en el borde con un Cloudflare Worker.

## Cuándo no

Si la aplicación exige un proceso con estado en memoria, conexiones largas o una base de datos transaccional en el mismo lugar, Cloudflare por sí solo no sustituye a ese servidor. Para un proyecto local que nadie visita, añadir una capa intermedia solo complica el diagnóstico.

## Alternativas

| Opción | Criterio para elegirla |
| --- | --- |
| Cloudflare | Priorizas CDN, DNS y protección como capa independiente del proveedor de hosting. |
| Vercel | Buscas una plataforma donde el frontend y la ejecución de funciones se despliegan juntos. |
| Sin capa intermedia | El tráfico es pequeño y el hosting ya incluye caché suficiente. |

La decisión suele empezar por el dominio: quién gestiona el DNS y dónde se termina la conexión condiciona el resto.

## Ejemplo

Comprobación básica tras configurar un registro y activar la caché:

```bash
dig www.example.com CNAME +short
curl -I https://www.example.com
```

`dig` confirma que el nombre resuelve donde esperas; `curl -I` muestra solo cabeceras y permite revisar las relativas a caché y seguridad sin descargar la página. Cambia `www.example.com` por tu dominio.

## Matices

«Estar detrás de Cloudflare» no significa que el contenido se hospede allí. El origen puede ser GitHub Pages, un servidor propio o cualquier otro destino. Cloudflare decide qué sirve desde caché y qué reenvía; por eso, al depurar una página desactualizada, hay que distinguir entre el archivo del origen y la copia cacheada.
