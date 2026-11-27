---
titulo: "Repositorio Git"
resumen: "Directorio que contiene el historial completo de un proyecto, con commits, ramas y referencias."
categoria: herramienta
tags: ["terminal","nivel-0"]
alias: ["repo Git"]
relacionados: [pull-request, git-hooks, git-flow, workspace, git]
fuentes: []
autoenlace: true
---

## Definición

Un repositorio Git es un directorio que guarda el historial de un proyecto: commits, ramas, etiquetas y referencias. Incluye una carpeta `.git` con objetos y punteros; los demás archivos forman el árbol de trabajo que se edita. Borrar esa carpeta deja una copia de archivos sin historial.

## Por qué importa

Permite reconstruir cualquier versión, comparar cambios y usar bisección para localizar el commit que introdujo un fallo. Al clonarlo se obtiene el historial, no solo los archivos finales; por eso se puede trabajar en ramas aisladas y abrir una Pull request sin copiar el proyecto a mano. El remoto es la copia compartida; el local es la que se usa cada día. El historial también es responsabilidad: lo que se commiteó queda registrado.

## Ejemplo

```bash
git clone https://github.com/kimografico/wiki-dev.git
git log --oneline -5
```

## Se confunde con

Con Repository (patrón): aquí «repositorio» es el almacén de Git; allí es una capa de código que abstrae el acceso a datos. Tampoco es el workspace: un workspace puede contener varios repositorios, y un repositorio puede tener varios directorios de trabajo.
