---
titulo: "BDD"
resumen: "Metodología que acuerda el comportamiento esperado con escenarios compartidos antes de implementarlo."
categoria: concepto
tags: ["tests","backend"]
alias: ["Behavior-Driven Development"]
relacionados: [tdd, cucumber-gherkin, metodologias-agiles, estrategia-de-testing]
fuentes: []
autoenlace: true
---
## Definición

BDD (Behavior-Driven Development) es una forma de trabajar en la que el comportamiento esperado se describe antes de implementarse, con escenarios comprensibles para negocio, desarrollo y testing. Cada escenario sigue una estructura de contexto, acción y resultado. No es solo escribir pruebas: es acordar qué significa «hecho» usando ejemplos compartidos.

## Por qué importa

Reduce interpretaciones distintas de una misma historia. «El usuario puede recuperar su contraseña» admite muchas lecturas; un escenario con un correo sin sesión, una petición de restablecimiento y un mensaje concreto fija el acuerdo. Cuando ese escenario queda automatizado, cualquier cambio que lo rompe se detecta sin esperar a producción. El beneficio está en la conversación previa, no en la sintaxis elegida.

## Ejemplo

```gherkin
Dado un usuario sin sesión
Cuando intenta entrar al panel
Entonces ve el formulario de acceso
```

Ese mismo texto puede servir de documentación y de prueba ejecutable con Cucumber y Gherkin.

## Se confunde con

Con TDD. TDD empieza por un test unitario fallido y se centra en el diseño del código; BDD empieza por un escenario de comportamiento y se centra en un acuerdo compartido. Tampoco es sinónimo de Gherkin: Gherkin es el lenguaje de los escenarios, no la metodología. Un equipo puede hacer BDD sin escribir una sola línea en Gherkin.
