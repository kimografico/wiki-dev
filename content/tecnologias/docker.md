---
titulo: "Docker"
resumen: "Plataforma que empaqueta una aplicación en imágenes y las ejecuta como contenedores aislados y reproducibles."
categoria: despliegue
tags: [backend, terminal]
alias: []
relacionados: [kaniko, helm, github-actions, despliegue]
alternativas: []
web: "https://www.docker.com/"
fuentes:
  - "https://docs.docker.com/learn/content/what-is-a-container/"
  - "https://docs.docker.com/reference/cli/docker/image/build/"
  - "https://docs.docker.com/reference/cli/docker/container/run/"
  - "https://kubernetes.io/blog/2020/12/02/dont-panic-kubernetes-and-docker/"
autoenlace: true
---

## Qué es

Docker empaqueta una aplicación con todo lo necesario para ejecutarla —código, dependencias y configuración— en una **imagen**. Al arrancar esa imagen se crea un **contenedor**: un proceso aislado que comparte las capas de la imagen y añade una capa escribible propia.

La imagen es inmutable y se distribuye; el contenedor es la ejecución. Borrar un contenedor borra lo que escribió en su capa, pero no cambia la imagen de la que salió.

## Para qué sirve

Permite que el entorno de desarrollo local, el de integración continua y el de producción sean el mismo artefacto. En lugar de describir una lista de pasos de instalación, se construye una imagen una vez y esa imagen se ejecuta donde haga falta.

## Cuándo usarla

Conviene para desarrollar y ejecutar servicios en local, construir imágenes y publicarlas en un registro. Una imagen se identifica como `registro/repositorio:tag`; por ejemplo, `docker.io/library/node:22-slim` se lee como registro `docker.io`, repositorio `library/node` y tag `22-slim`. Si se omite el registro se usa Docker Hub; si se omite el tag se usa `latest`. Un tag puede moverse, mientras que un *digest* identifica bytes concretos.

## Cuándo no

No hace falta para una aplicación estática que se publica como archivos. Tampoco conviene usarlo como runtime dentro de Kubernetes: el soporte de Docker mediante `dockershim` fue eliminado y Kubernetes se apoya en containerd o CRI-O. Eso no impide ejecutar allí imágenes construidas con Docker.

## Alternativas

Para construir imágenes dentro de Kubernetes existen Kaniko —hoy archivado—, BuildKit o Buildah. Para orquestar contenedores en producción se usan otras herramientas: Helm empaqueta manifiestos de Kubernetes, no sustituye a Docker.

## Ejemplo

```bash
docker build .
docker run --name prueba -d nginx:alpine
```

El primer comando crea una imagen a partir del Dockerfile del directorio actual; el segundo arranca un contenedor en segundo plano. `docker build` usa Buildx/BuildKit por defecto salvo en Windows container mode o cuando se define `DOCKER_BUILDKIT=0`.

## Del build al despliegue

Son pasos distintos y suele confundirlos su proximidad:

| Paso | Qué produce | Dónde ocurre |
|---|---|---|
| `docker build` | Una imagen local | La máquina de desarrollo o un runner |
| Integración continua | Validación: build y pruebas sobre el cambio | GitHub Actions u otra plataforma |
| Publicación | La imagen subida a un registro | El workflow tras pasar las comprobaciones |
| Despliegue | La imagen ejecutada en el entorno destino | Kubernetes, una nube o un servidor |

La integración continua valida cambios; el despliegue publica el artefacto. Tener una imagen no implica haberla desplegado.
