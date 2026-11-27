---
titulo: "Workspace"
resumen: "Agrupación de paquetes bajo configuración común, típica de monorepos, con dependencias compartidas."
categoria: herramienta
tags: ["terminal"]
alias: []
relacionados: [repositorio-git, monolito, paquete, dependencia, npm]
fuentes: []
autoenlace: true
---
## Definición

Un workspace es una agrupación de paquetes dentro de un mismo repositorio que comparten configuración, dependencias y comandos. **npm** e **Yarn** lo declaran en el `package.json` raíz con el campo `workspaces`; **pnpm** usa un archivo `pnpm-workspace.yaml`. En los tres casos cada carpeta se trata como un paquete enlazado: `packages/wiki` puede importar `packages/worker` sin publicarlo ni descargarlo de Internet. Cada paquete conserva su propio `package.json` y puede tener scripts propios.

## Por qué importa

Reduce fricción cuando conviven varias aplicaciones. Un cambio compartido se ve al instante en los dos paquetes; una sola instalación evita repetir dependencias. Permite lanzar build, lint y test en todos desde la raíz. La contrapartida es que el límite entre paquetes hay que mantenerlo a mano: si todos importan de todos, el workspace se convierte en un **Monolito** sin fronteras claras.

## Ejemplo

```json
{
  "workspaces": ["packages/*"]
}
```

Con esa declaración, `packages/wiki` y `packages/worker` quedan enlazados entre sí y comparten la carpeta de dependencias de la raíz. En pnpm, la misma declaración se escribe como `packages:` dentro de `pnpm-workspace.yaml`.

## Se confunde con

Con un **Repositorio Git** y con un **Paquete**. El repositorio guarda el historial y las ramas; el workspace es una forma de organizar los paquetes dentro de él. Un paquete es la unidad publicable o ejecutable; el workspace es el contenedor que los coordina. Tampoco es el espacio de trabajo de un editor: ese significado no tiene que ver con dependencias.
