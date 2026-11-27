---
titulo: "Convenciones de nombres"
resumen: "Reglas acordadas para nombrar identificadores, archivos y rutas de forma coherente."
categoria: concepto
tags: ["nivel-0"]
alias: ["naming conventions"]
relacionados: [slug, frontmatter, scope, tipos]
fuentes: []
autoenlace: true
---

## Definición

Una convención de nombres es una regla acordada para escribir identificadores, archivos y rutas: qué mayúsculas se usan, qué separador une las palabras y qué prefijos tienen un significado reservado. No la impone el lenguaje: es un acuerdo del equipo que se apoya en el linter y en la revisión para cumplirse.

## Por qué importa

Reduce la carga de decidir lo mismo en cada archivo. Cuando todos los componentes van en PascalCase y todas las rutas en kebab-case, un nombre mal escrito destaca y suele señalar un error real. En una wiki, además, el slug del archivo es la URL pública: cambiar su estilo rompe enlaces y menciones automáticas.

## Ejemplo

```ts
const nombreUsuario = "Ada"; // camelCase para variables
const UsuarioTarjeta = () => null; // PascalCase para componentes
const slug = "convenciones-de-nombres"; // kebab-case para rutas
```

La misma regla se aplica al contenido: el frontmatter usa los nombres que define el esquema, sin inventar variantes.

## Se confunde con

Con la sintaxis del lenguaje. JavaScript permite tanto `nombre_usuario` como `nombreUsuario`; la convención decide cuál se usa. Tampoco es un linter: la herramienta detecta la desviación, pero la regla la decide el equipo.
