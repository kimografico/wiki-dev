---
titulo: "Obsidian"
resumen: "Aplicación de notas en Markdown que guarda archivos locales y los conecta con enlaces y backlinks."
categoria: herramienta
tags: ["frontend"]
alias: []
relacionados: [markdown, backlink, git, cms]
fuentes: []
autoenlace: true
alternativas: [cms]
---
## Qué es

Obsidian es una aplicación para tomar notas que guarda archivos Markdown en una carpeta local. Cada nota es un archivo de texto, sin base de datos propietaria: se puede abrir con cualquier editor y versionar con Git. Encima de esos archivos añade enlaces entre notas, *backlinks* —qué notas apuntan a la actual— y un grafo que muestra la red completa. No publica un sitio web por sí sola.

## Para qué sirve

Convierte notas sueltas en una red navegable sin depender de un servicio externo. Una nota sobre CSS puede enlazar a otra sobre cascada y aparecer automáticamente en los backlinks de esa segunda nota. Esa estructura ayuda a descubrir relaciones entre ideas que al escribir parecían independientes. También funciona como taller: redactar en Obsidian y mover después el archivo a `content/` de la wiki.

## Cuándo usarla

Úsalo para documentación personal, apuntes de trabajo o ideas que acabarán convertidas en entradas. Encaja cuando quieres que las notas sigan siendo tuyas y legibles dentro de años: al ser Markdown plano, no necesitas exportar nada para leerlas. También conviene si trabajas sin conexión.

## Cuándo no

No es un CMS ni un generador de sitio: guarda archivos, no gestiona un sitio web con plantillas y despliegue. Tampoco es un sistema de control de versiones: mantiene su propio historial, pero no sustituye a Git para coordinar cambios entre varias personas. Cuidado con los plugins: una dependencia excesiva puede dejar notas que solo se ven bien dentro de Obsidian.

## Alternativas

Un CMS es la alternativa cuando el objetivo es publicar y editar entre varios autores sin tocar archivos. El criterio es quién escribe y dónde vive el contenido: Obsidian gana para notas personales locales en Markdown; un CMS gana para contenido web editado por un equipo con permisos y flujo de aprobación. Si además quieres publicar esas notas, el paso natural es llevar los archivos a un sitio estático y dejar Obsidian como editor.

## Ejemplo

```markdown
# Cascada

El orden de decisión es origen + importancia → capas → especificidad → orden.
Relacionado: [[CSS]], [[Unidades]]
```

`[[CSS]]` crea un enlace aunque el archivo destino aún no exista: Obsidian lo deja como pendiente y lo resuelve cuando lo crees. Esa es la diferencia frente a un enlace Markdown normal, que apunta a una ruta ya existente.
