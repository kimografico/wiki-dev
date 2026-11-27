---
titulo: "Helm"
resumen: "Gestor de paquetes para Kubernetes que agrupa manifiestos en charts y permite instalarlos y actualizarlos."
categoria: herramienta
tags: [backend, terminal]
alias: []
relacionados: [docker, kaniko, github-actions, despliegue]
alternativas: []
web: "https://helm.sh/"
fuentes:
  - "https://helm.sh/docs/intro/introduction/"
  - "https://helm.sh/docs/intro/quickstart/"
  - "https://helm.sh/docs/topics/charts/"
  - "https://kubernetes.io/docs/tasks/manage-kubernetes-objects/kustomization/"
autoenlace: true
---

## Qué es

Helm es el gestor de paquetes de Kubernetes. Un **chart** es el paquete: un conjunto de manifiestos con plantillas y valores. Al instalar un chart se crea un **release**, una instalación concreta que se puede actualizar o desinstalar. Los charts se distribuyen desde repositorios o registros OCI.

## Para qué sirve

Agrupa los objetos que forman una aplicación y permite parametrizarlos por entorno con un archivo `values.yaml`. Así el mismo chart sirve para desarrollo y producción cambiando valores, sin editar cada manifiesto.

## Cuándo usarlo

Cuando una aplicación necesita varios recursos de Kubernetes que deben instalarse, actualizarse y revertirse como un conjunto. También conviene para consumir charts publicados por terceros.

## Cuándo no

Cuando solo se necesita personalizar manifiestos propios sin gestionar versiones de release: Kustomize, integrado en `kubectl`, resuelve ese caso con `kubectl apply -k`. Helm no construye imágenes —para eso está Docker— y tampoco es un paquete npm.

## Alternativas

Kustomize es la alternativa directa para personalizar objetos de Kubernetes. Ninguno de los dos sustituye al otro en todos los casos: Helm aporta releases y plantillas; Kustomize se apoya en capas sobre manifiestos.

## Ejemplo

```bash
helm install mi-podinfo oci://ghcr.io/stefanprodan/charts/podinfo
helm list
helm uninstall mi-podinfo
```

El primer comando instala un chart desde un registro OCI, el segundo lista los releases y el tercero elimina el indicado. La documentación de Helm muestra ejemplos con versiones concretas; conviene comprobar la vigente antes de fijar una.

## Helm en el ciclo

Un workflow de GitHub Actions puede invocar Helm como paso de despliegue: primero valida y construye, después aplica el chart. Helm se queda en la parte de packaging y release; la decisión de cuándo lanzar corresponde al workflow y a la política del equipo.
