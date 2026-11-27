---
titulo: "Vercel"
resumen: "Plataforma de despliegue web con vistas previas por rama y funciones bajo demanda; cuándo compensa frente a GitHub Pages."
categoria: despliegue
tags: ["frontend", "backend"]
alias: []
relacionados: ["github-pages", "nextjs", "github", "cloudflare-worker"]
fuentes: ["https://vercel.com/docs"]
autoenlace: true
alternativas: ["github-pages"]
web: "https://vercel.com/"
---

## Qué es

Vercel es una plataforma de despliegue para aplicaciones web: toma un repositorio, ejecuta el build y publica el resultado en una URL. También permite desplegar funciones que se ejecutan bajo demanda cuando llega una petición. No es un framework: Next.js es el framework y Vercel uno de los lugares donde puede desplegarse, aunque la integración entre ambos sea estrecha. La duda habitual es si son lo mismo; no. Un sitio estático también puede publicarse allí, y una aplicación Next.js puede hospedarse en otra plataforma.

## Para qué sirve

Un caso concreto: al abrir una rama, la plataforma construye el proyecto y genera una URL de vista previa. El equipo puede probar el cambio antes de fusionarlo, sin crear un entorno manual. Después de la fusión, se promociona el mismo build a producción. La plataforma gestiona además variables de entorno por entorno, caché de las respuestas y registros de ejecución.

## Cuándo usarla

Cuando el proyecto es una aplicación con Next.js y se quiere una vista previa por pull request; cuando hacen falta endpoints ligeros sin administrar servidores; o cuando el equipo prefiere que build, publicación y observabilidad estén en un mismo servicio.

## Cuándo no

Para una wiki estática que ya se publica en GitHub Pages: no hay funciones ni vistas previas que justifiquen otro sistema. Si el sitio no tiene build ni necesita ejecutar código en el servidor, una opción más simple cubre el trabajo. Tampoco es la elección natural si la organización debe mantener el despliegue dentro de su propia infraestructura por requisitos internos.

## Ejemplo

```bash
npx vercel           # despliegue de vista previa desde el directorio actual
npx vercel --prod    # promoción a producción
```

En un flujo con Git, esas acciones las dispara la plataforma al detectar un commit o una fusión. Los valores sensibles se configuran como variables de entorno del proyecto; nunca se incluyen en el repositorio.

## Frente a GitHub Pages

| Criterio | Vercel | GitHub Pages |
| --- | --- | --- |
| Tipo de salida | Sitios con build y funciones bajo demanda | Archivos estáticos |
| Revisión de cambios | URL de vista previa por rama | Publicación tras fusionar |
| Decisión | Elegirla si hay código en servidor o previews | Elegirla si solo se publica HTML, CSS y JS |

Ambas publican un sitio; la diferencia está en qué ocurre entre el commit y la URL final.

## Matices: build y ejecución

Conviene no confundir el build con el servidor. Un sitio generado estáticamente se compila una vez y después solo entrega archivos; las funciones se ejecutan cuando alguien pide una ruta dinámica. Saber qué parte del proyecto cae en cada categoría evita pagar complejidad que no se usa y ayuda a decidir qué se puede cachear.
