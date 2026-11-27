---
titulo: "Dependencia"
resumen: "Paquete o módulo externo que un proyecto necesita para funcionar o compilarse."
categoria: concepto
tags: ["nivel-0","terminal"]
alias: []
relacionados: [paquete, modulos, libreria, vulnerabilidad]
fuentes: [https://docs.npmjs.com/cli/v11/configuring-npm/package-json]
autoenlace: true
---

## Definición

Una dependencia es un paquete o módulo externo que un proyecto declara para poder compilarse o ejecutarse. La declaración vive en el manifiesto y determina qué se instala; el uso real se hace después con `import`. Sin esa declaración, el mismo código funciona en una máquina y falla en otra.

## Por qué importa

Cada dependencia añade superficie de mantenimiento: actualizaciones, licencias, tamaño del bundle y posibles vulnerabilidades. Conviene distinguir tres ámbitos: `dependencies` para lo que necesita producción, `devDependencies` para herramientas de desarrollo y `peerDependencies` para bibliotecas que esperan que el proyecto proporcione el paquete. Una herramienta de desarrollo metida en producción infla el despliegue sin aportar nada al usuario.

## Ejemplo

```bash
npm install zod          # dependencia de producción
npm install -D prettier  # dependencia de desarrollo
```

En npm 7 o posterior, `peerDependencies` se instala automáticamente al resolver el árbol de dependencias: declara un requisito que debe satisfacer quien use la biblioteca. En versiones anteriores o en otros gestores, puede hacer falta instalarlo a mano.

## Se confunde con

Con una importación. Importar es usar el código en un archivo concreto; la dependencia es la declaración que garantiza que ese código esté disponible tras instalar. Tampoco es lo mismo que una librería en general: la librería es el producto y la dependencia es la relación del proyecto con ella.
