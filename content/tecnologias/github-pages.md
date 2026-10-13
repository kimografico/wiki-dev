---
titulo: GitHub Pages
resumen: Servicio de GitHub que publica archivos estáticos de un repositorio; aquí es el destino del despliegue.
categoria: despliegue
tags: [frontend]
alias: []
relacionados: [integracion-continua, static-site-generation]
alternativas: []
web: https://pages.github.com
fuentes: [https://docs.github.com/pages]
---

## Qué es

GitHub Pages es un servicio de alojamiento de sitios estáticos integrado en GitHub. Publica archivos (HTML, CSS, JS) desde un repositorio, sin servidor propio ni base de datos.

## Para qué sirve

Sirve para publicar la wiki resultante del build de forma gratuita y sencilla. Un *workflow* construye el sitio y lo despliega en cada cambio de la rama principal.

## Cuándo usarla

Cuando el sitio ya es estático y vive en GitHub: es la vía más directa, sin coste y con despliegue automático. Aquí publica `https://kimografico.github.io/wiki-dev/`.

## Cuándo no

Cuando se necesita lógica en el servidor, usuarios autenticados o procesos por petición: Pages solo sirve archivos y no ejecuta backend.

## Alternativas

Netlify, Vercel y Cloudflare Pages cubren hosting estático con funciones extra; no se usan aquí para mantener todo dentro de GitHub.

## Ejemplo

```yaml
# resumen de deploy.yml
- uses: withastro/action@v6
- uses: actions/deploy-pages@v5
```
