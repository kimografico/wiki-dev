---
titulo: "Cells"
resumen: "Framework propietario del BBVA para construir interfaces con celdas reactivas."
categoria: framework
tags: ["frontend","bbva"]
alias: []
relacionados: [reactividad, gestion-de-estado, lit, componentizacion]
fuentes: []
autoenlace: true
---
## Definición

Cells es un framework propietario del BBVA para construir interfaces mediante celdas reactivas: unidades de vista declaradas en plantillas que se vuelven a calcular cuando cambian los datos de los que dependen. La fuente de referencia es interna, así que aquí no se detallan versiones ni firmas públicas; lo importante es el modelo mental, no una sintaxis copiable.

## Por qué importa

Al leer código interno del banco, reconocer Cells evita buscar una librería pública que no está en el catálogo. Cambia dónde se pone la lógica: en lugar de actualizar el DOM a mano, se declara la relación entre dato y vista y el motor propaga el cambio. Eso concentra las actualizaciones en un lugar y facilita razonar sobre pantallas con muchas dependencias entre datos.

## Ejemplo

```js
// Equivalente conceptual de una celda que depende del saldo:
let saldo = 1000;
const pintar = () => console.log(`Saldo: ${saldo}`);
saldo = 1500; pintar(); // Cells dispara este paso por dependencia
```

En una plantilla Cells, esa llamada explícita no la escribe quien desarrolla.

## Se confunde con

Con Cells de Apache o con una hoja de cálculo: el nombre coincide, pero no son el mismo producto. Tampoco es una librería de Reactividad de uso general: es una herramienta interna cuya documentación vive fuera de este repositorio, y esa es su fuente autorizada.
