---
titulo: "CMS"
resumen: "Content Management System: aplicación que permite crear y editar contenido sin tocar código."
categoria: concepto
tags: ["backend","frontend"]
alias: []
relacionados: [astro, github-pages, markdown, frontmatter]
fuentes: []
autoenlace: true
alternativas: [astro]
---
## Qué es

CMS son las siglas de *Content Management System* (sistema de gestión de contenidos): una aplicación con interfaz web para crear, editar y publicar texto e imágenes sin escribir código. Guarda el contenido en una base de datos o en archivos y se encarga de presentarlo o de entregarlo a otro sitio mediante una API. No es un editor de texto ni un framework: es una capa de edición que se sitúa delante de la publicación.

## Para qué sirve

Resuelve el caso concreto de un equipo en el que quien escribe no es desarrollador: un redactor entra con su cuenta, rellena un formulario, sube una imagen y publica sin saber Markdown ni Git. También sirve cuando el contenido se reutiliza: la misma entrada puede mostrarse en la web y enviarse a otra aplicación a través de una API, sin copiar y pegar.

## Cuándo usarla

Conviene cuando hay varios autores con permisos distintos, hace falta una cola de borradores y aprobaciones, o el contenido debe cambiar sin desplegar código. Es la elección natural en un blog corporativo editado por comunicación o en un catálogo de productos que actualiza el equipo de negocio.

## Cuándo no

No hace falta en una wiki técnica cuyo contenido son archivos versionados en Git: ahí el repositorio es el historial, los cambios se revisan con pull requests y el build genera el sitio. Añadir un CMS en ese escenario crea una segunda copia del contenido que hay que sincronizar y una dependencia más que mantener.

## Alternativas

La alternativa dentro del catálogo es el modelo de sitio estático que representa Astro: contenido en archivos Markdown con esquemas, publicado mediante un build. La decisión se resume en quién edita y dónde vive el contenido. Elige CMS si manda la comodidad de edición de personas sin Git; elige Astro si mandan el versionado, las revisiones y un despliegue reproducible. Ambas piezas pueden combinarse con un CMS que solo entrega datos y un generador estático que los consume, aunque entonces mantienes dos sistemas.

## Ejemplo

```markdown
---
titulo: "CSS"
categoria: estilos
tags: [frontend, nivel-0]
---

Lenguaje de estilos que describe cómo se presenta un documento HTML.
```

Esto es lo que un CMS oculta detrás de su formulario: un archivo con metadatos y un cuerpo. En esta wiki se edita directamente; en un CMS lo genera la interfaz.

## Matices

| Modelo | Quién edita | Cómo se publica |
|--------|-------------|-----------------|
| CMS | Redactor sin Git | Interfaz web y base de datos |
| Sitio estático | Desarrollador con Git | Build a partir de archivos |
