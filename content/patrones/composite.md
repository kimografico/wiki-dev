---
titulo: "Composite"
resumen: "Patrón estructural que trata hojas y agrupaciones con la misma interfaz para recorrer árboles sin condicionales por tipo."
categoria: concepto
tags: ["frontend"]
alias: []
relacionados: [facade, adapter, contenedor-presentacional, react, componentizacion]
fuentes: []
autoenlace: true
familia: estructural
---

## Problema

Un menú, un árbol de directorios o una interfaz con paneles anidados mezcla hojas y grupos. Si cada recorrido pregunta `if (esCarpeta) ... else ...`, la misma condición se repite al calcular tamaños, dibujar y buscar. Añadir un tipo de nodo obliga a revisar todos esos recorridos, y olvidar uno produce un resultado parcial que no salta ningún error.

## Solución

Se define una interfaz común para hojas y compuestos con las operaciones que el cliente necesita. La hoja las implementa directamente; el compuesto guarda hijos tipados como la interfaz y delega en ellos. Desde fuera, llamar a `tamano()` o `dibujar()` funciona igual en un archivo que en una carpeta: la recursión queda dentro del compuesto. El cliente ya no decide según el tipo; la estructura decide por él. Es estructural porque compone objetos en árboles sin cambiar su interfaz.

## Estructura

```
Interfaz Nodo
   ├── Hoja       → implementa tamano() y dibujar()
   └── Compuesto  → hijos: Nodo[] y delega en cada hijo
```

## Ejemplo

```ts
interface Nodo {
  tamano(): number;
  dibujar(nivel?: number): string;
}

class Archivo implements Nodo {
  constructor(private nombre: string, private bytes: number) {}

  tamano() {
    return this.bytes;
  }

  dibujar() {
    return `${this.nombre} (${this.bytes} B)`;
  }
}

class Carpeta implements Nodo {
  private hijos: Nodo[] = [];

  constructor(private nombre: string) {}

  anadir(hijo: Nodo) {
    this.hijos.push(hijo);
    return this;
  }

  tamano() {
    return this.hijos.reduce((total, hijo) => total + hijo.tamano(), 0);
  }

  dibujar(nivel = 0) {
    const sangria = "  ".repeat(nivel);
    return [
      `${sangria}${this.nombre}/`,
      ...this.hijos.map((hijo) => hijo.dibujar(nivel + 1)),
    ].join("\n");
  }
}

const arbol = new Carpeta("src")
  .anadir(new Archivo("index.ts", 120))
  .anadir(new Carpeta("lib").anadir(new Archivo("content.ts", 340)));

console.log(arbol.tamano()); // 460
console.log(arbol.dibujar());
```

Nadie pregunta si cada hijo es archivo o carpeta: cada uno responde por su cuenta.

## Cuándo usarlo

Cuando los datos forman un árbol y una misma operación debe aplicarse a hojas y ramas: sistema de archivos, menús, bloques de interfaz o documentos con secciones. Encaja menos si la lista es plana, si cada nodo expone operaciones incompatibles o si la interfaz común obliga a métodos vacíos en las hojas. Decidir qué significa `anadir()` en una hoja es parte del diseño: lanzar un error explícito suele ser más claro que aceptar silenciosamente un hijo que nunca se podrá mostrar.

## Se confunde con

| Patrón | Criterio que lo distingue |
| ------ | ------------------------- |
| Facade | Una interfaz simple delante de un subsistema complejo. |
| Contenedor / presentacional | Separa quién obtiene datos de quién los pinta. |

Un Composite puede contener componentes presentacionales: no compiten, resuelven dudas distintas.
