---
titulo: "Negocio"
resumen: "Reglas, procesos y decisiones que definen qué debe hacer el software, y las personas que las proponen y validan."
categoria: concepto
tags: ["nivel-0","frontend"]
alias: []
relacionados: [ddd, entidad, bdd, metodologias-agiles]
fuentes: []
autoenlace: true
---
## Definición

El negocio es el conjunto de reglas, procesos y decisiones que determinan qué debe hacer el software. También designa a las personas que las proponen y validan. Es una fuente de requisitos, no una capa técnica: define qué significa «pedido cancelable» antes de decidir cómo se implementa.

## Por qué importa

Una feature puede ser técnicamente impecable y aun así inútil. Si nadie aclara cuándo un pedido deja de poder cancelarse, el equipo decide por su cuenta y la regla se descubre en producción. Hacerla explícita permite escribir criterios de aceptación comprobables y detectar contradicciones antes de programar. En DDD, ese mismo conjunto de reglas delimita el dominio y su lenguaje.

## Ejemplo

Regla: «Un pedido solo se cancela antes de facturarse».

```gherkin
Scenario: Cancelar un pedido ya facturado
  Given un pedido facturado
  When intento cancelarlo
  Then veo un error y el pedido sigue activo
```

El escenario convierte la regla en algo ejecutable.

## Se confunde con

- **Dominio DNS**: un nombre de red; «dominio de negocio» es un área de responsabilidad.
- **Requisito técnico**: describe cómo se hace; la regla de negocio describe qué debe ocurrir.
- **Caso de uso**: describe una interacción concreta; la regla explica la restricción que la gobierna.

Matiz: cambia por decisiones humanas, no por el framework; por eso vive en la documentación y en las pruebas, no en la interfaz.
