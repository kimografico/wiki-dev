---
titulo: "Kaniko"
resumen: "Herramienta para construir imágenes de contenedor desde un Dockerfile dentro de Kubernetes, sin daemon Docker."
categoria: herramienta
tags: [backend, terminal]
alias: []
relacionados: [docker, helm, github-actions]
alternativas: []
web: "https://github.com/GoogleContainerTools/kaniko"
fuentes:
  - "https://github.com/GoogleContainerTools/kaniko/blob/main/README.md"
  - "https://api.github.com/repos/GoogleContainerTools/kaniko"
autoenlace: true
---

## Qué es

Kaniko construye imágenes de contenedor a partir de un Dockerfile sin necesidad de un daemon Docker. Ejecuta cada instrucción en espacio de usuario: extrae el sistema de archivos de la imagen base, aplica los cambios y añade capas.

Se distribuye como la imagen `gcr.io/kaniko-project/executor`. No es un paquete npm: la entrada está en la colección de paquetes porque es una herramienta de un ecosistema, no porque se instale con `npm install`.

## Para qué sirve

Resuelve el caso de construir imágenes **dentro de un clúster Kubernetes**, donde levantar un daemon Docker dentro de un contenedor —el patrón *Docker-in-Docker*— complica la configuración y el aislamiento.

## Cuándo usarlo

Cuando el pipeline corre en Kubernetes y necesita producir una imagen allí. El repositorio está archivado y su README indica que el proyecto ya no se desarrolla ni se mantiene; conviene verificar ese estado antes de adoptarlo y valorar alternativas como BuildKit o Buildah.

## Cuándo no

Cuando se construye en local o en un runner que ya dispone de Docker: el propio `docker build` es la vía directa. Tampoco aporta nada si lo único que se necesita es ejecutar una imagen ya construida.

## Alternativas

BuildKit y Buildah construyen imágenes sin daemon. Kaniko aparece en la comparativa de herramientas de su propio repositorio junto a `img`, `umoci` y otras opciones; su estado archivado inclina la balanza hacia las alternativas mantenidas.

## Ejemplo

```bash
docker run -v "$HOME/.config/gcloud:/root/.config/gcloud" \
  -v /path/to/context:/workspace \
  gcr.io/kaniko-project/executor:latest \
  --dockerfile /workspace/Dockerfile \
  --destination "gcr.io/$PROJECT_ID/$IMAGE_NAME:$TAG" \
  --context dir:///workspace/
```

El ejemplo procede del README oficial: monta el contexto y las credenciales, y entrega la imagen resultante al destino indicado. La etiqueta `:latest` es la que usa la documentación; no debe tomarse como una versión concreta.

## Kaniko y Docker

Ambos leen el mismo Dockerfile, pero no son intercambiables. Docker necesita un daemon; Kaniko no y por eso cabe en un pod de Kubernetes. Al revés que un workflow de GitHub Actions, Kaniko solo construye la imagen: no decide cuándo se dispara ni la despliega.
