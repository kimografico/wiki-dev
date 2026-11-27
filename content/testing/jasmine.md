---
titulo: "Jasmine"
resumen: "Framework de pruebas de JavaScript con sintaxis describe/it y expectativas integradas."
categoria: herramienta
tags: ["tests"]
alias: []
relacionados: ["jest", "vitest", "karma", "estrategia-de-testing"]
fuentes: ["https://jasmine.github.io/"]
autoenlace: true
alternativas: ["jest", "vitest"]
web: "https://jasmine.github.io/"
npm: "jasmine"
---

## Qué es

Jasmine es un framework de pruebas para JavaScript que incluye el ejecutor, las estructuras `describe` e `it` y las aserciones `expect` en el propio paquete. No exige un DOM ni un sistema de módulos concreto: ofrece una API pequeña y puede ejecutarse en Node.js o cargarse en una página.

Su sintaxis es reconocible: `describe` agrupa casos, `it` define uno y `expect(valor).toBe(esperado)` comprueba el resultado. Esa forma de escribir pruebas inspiró a varias herramientas posteriores.

## Para qué sirve

Para montar una suite unitaria con muy poca configuración. Encaja en proyectos pequeños o heredados donde ya está instalada y no interesa introducir otra herramienta. También sirve para aprender el modelo de `describe`, `it` y `expect`, porque esa misma estructura aparece en varios frameworks.

Incluye espías propios con `spyOn` para comprobar llamadas sin añadir una biblioteca aparte. Para simulación de red o informes de cobertura suele combinarse con otras piezas.

## Tipos de prueba

- **Unitarias** de funciones y servicios, con aserciones y espías del propio framework.
- **De navegador**, cuando el código se ejecuta en una página y la suite se carga como script.
- **De componentes**, si se integra con un adaptador que monta la interfaz en el entorno de pruebas.

No incluye por sí sola un DOM simulado ni un servidor de pruebas: esas responsabilidades dependen del proyecto y de los adaptadores que se añadan.

## Ejemplo

```js
describe("doble", () => {
  it("duplica un número", () => {
    expect(doble(2)).toBe(4);
  });

  it("registra el mensaje", () => {
    const logger = { log: () => {} };
    spyOn(logger, "log");

    guardar("pedido", logger);

    expect(logger.log).toHaveBeenCalledWith("pedido");
  });
});
```

## Alternativas

| Herramienta | Cuándo conviene | Diferencia principal |
|---|---|---|
| Jasmine | Proyecto pequeño o heredado que ya la usa | API mínima, sin transformación de código |
| Jest | Suite grande que quiere mocks, cobertura y DOM simulado en un paquete | Más funcionalidad integrada |
| Vitest | Proyecto con Vite que busca arranque rápido y una API parecida | Integrada con el ecosistema de Vite |

Si el proyecto ya tiene Jasmine funcionando, cambiar de framework rara vez paga por sí solo. La decisión cambia cuando falta una capacidad concreta, como cobertura o simulación del DOM.

## Matices

`spyOn` sustituye el método por un espía y, por defecto, la lógica original no se ejecuta: hace falta `.and.callThrough()` para conservarla. Esta distinción es la misma que separa un mock de un espía entre los dobles de prueba. Karma fue durante mucho tiempo el ejecutor habitual para correr estas suites en navegadores reales.
