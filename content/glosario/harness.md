---
titulo: "Harness"
resumen: "Entorno de pruebas o marco de ejecución estructurado que proporciona el contexto y los recursos necesarios para probar un componente de software."
categoria: "concepto"
tags: ["tests", "frontend", "backend"]
alias: ["test harness", "harness de pruebas"]
relacionados: ["agente"]
fuentes: ["https://en.wikipedia.org/wiki/Test_harness"]
autoenlace: true
terminoEn: "Test Harness"
---

## Definición

Un *harness* (o *test harness*) es una colección de software, controladores, datos de prueba y configuraciones diseñado para automatizar y facilitar la ejecución de pruebas sobre un módulo o sistema específico. Se encarga de aislar la unidad bajo prueba, inyectarle entradas controladas, capturar sus salidas y comparar los resultados esperados con los obtenidos de manera repetible.

En entornos de desarrollo moderno e inteligencia artificial, el término también se utiliza para describir el armazón o infraestructura que envuelve a un agente o modelo, proporcionándole las herramientas, contexto y límites de ejecución requeridos.

## Por qué importa

Permite probar componentes de código de manera aislada incluso cuando el resto del sistema no está completamente desarrollado o no se encuentra disponible. Esto facilita la detección temprana de errores y garantiza que las pruebas sean consistentes y deterministas.

Además, en arquitecturas compuestas por microservicios o sistemas modulares, un *harness* simula las dependencias externas (stubs/mocks) y automatiza el ciclo de retroalimentación para los desarrolladores.

## Ejemplo

Ejemplo conceptual en JavaScript de cómo un *harness* básico ejecuta una función isolada proporcionándole contexto, entradas y validación de salidas:

```js
// Componente a probar
function calcularDescuento(precio, esVIP) {
  if (precio <= 0) throw new Error('Precio inválido');
  return esVIP ? precio * 0.8 : precio;
}

// Harness de prueba mínimo
function runHarness() {
  const casos = [
    { entrada: [100, true], esperado: 80, nombre: 'Aplica 20% a VIP' },
    { entrada: [100, false], esperado: 100, nombre: 'Sin descuento a no VIP' }
  ];

  casos.forEach(({ entrada, esperado, nombre }) => {
    try {
      const resultado = calcularDescuento(...entrada);
      console.assert(
        resultado === esperado,
        `Fallo en [${nombre}]: esperado ${esperado}, obtenido ${resultado}`
      );
      console.log(`PASÓ: ${nombre}`);
    } catch (error) {
      console.error(`ERROR en [${nombre}]:`, error.message);
    }
  });
}

runHarness();
```

## Se confunde con

* **Framework de pruebas**: Un framework (como Vitest o Jest) proporciona la estructura general y la API para escribir test suites, mientras que el *harness* es el entorno o mecanismo específico configurado para ejecutar una pieza concreta de software dentro de dicho marco.
* **Mock / Stub**: Los *mocks* o *stubs* son objetos simulados individuales que reemplazan dependencias. El *harness* es todo el conjunto o infraestructura que engloba estos stubs junto con la lógica de ejecución y aserción.