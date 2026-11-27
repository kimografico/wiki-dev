---
titulo: "SonarQube"
resumen: "Plataforma de análisis estático que recoge hallazgos de calidad y seguridad y decide con un quality gate si un cambio está listo para publicarse."
categoria: herramienta
tags: ["backend", "seguridad"]
alias: []
relacionados: [ci-cd, integracion-continua, code-review, linter, deuda-tecnica, github-actions]
alternativas: []
web: "https://docs.sonarsource.com/sonarqube-server"
fuentes:
  - "https://docs.sonarsource.com/sonarqube-server"
  - "https://docs.sonarsource.com/sonarqube-server/user-guide/issues/introduction.md"
  - "https://docs.sonarsource.com/sonarqube-server/quality-standards-administration/managing-quality-gates/introduction-to-quality-gates"
  - "https://docs.sonarsource.com/sonarqube-server/analyzing-source-code/ci-integration.md"
autoenlace: true
---

## Qué es

SonarQube es una plataforma de análisis estático de código: lee el código sin ejecutarlo y devuelve hallazgos de calidad y seguridad. La documentación vigente reserva el nombre SonarQube Server para la edición autoalojada y convive con SonarQube Cloud y SonarQube Community Build, que no tienen el mismo alcance. Cuando se rompe una regla de codificación, el análisis levanta un *issue* —un hallazgo— asociado al código.

## Para qué sirve

Poner una puerta objetiva antes de fusionar o publicar. El análisis puede ejecutarse en el IDE, en la pull request y en la tubería de integración continua; el resultado se publica como hallazgos que el equipo puede priorizar. Un problema recurrente —código duplicado, una ruta sin comprobar, un patrón propenso a error— se convierte en una tarea visible en lugar de quedar escondido en una revisión.

## Cuándo usarla

- Cuando el equipo quiere una política de calidad compartida y medible en el repositorio, no solo opiniones en la revisión de código.
- Cuando los hallazgos van a revisarse: la herramienta señala, pero alguien decide qué se corrige.
- Cuando la integración continua puede ejecutar un SonarScanner en el host donde corre el análisis.

## Cuándo no

- Si solo se buscan reglas locales de estilo, un Linter como ESLint resuelve con menos infraestructura.
- Si nadie va a triar los hallazgos: un informe que nadie lee añade ruido al pipeline.
- Si no hay sitio para ejecutar el escáner ni una edición que encaje con las restricciones del proyecto.

## Quality gate

Un quality gate es el conjunto de condiciones que responde a si el proyecto está listo para publicarse. La documentación oficial indica que su resultado puede comunicarse a la integración continua y hacer fallar el pipeline cuando no se cumple. No es una regla de formato ni una lista de estilos: es una política de aprobación que configura el equipo.

## Matices

La documentación vigente llama *issues* a los hallazgos y describe más de una forma de clasificarlos. Conviene hablar de hallazgos y contrastar la terminología con la documentación de la edición que se usa, en lugar de copiar una lista fija de categorías de versiones anteriores.

## Ejemplo

```yaml
jobs:
  analisis:
    runs-on: ubuntu-latest
    steps:
      - run: npm ci
      - run: sonar-scanner
```

El escáner envía el resultado a SonarQube y el quality gate decide si el job termina en verde. El comando concreto y sus parámetros varían según el escáner y el sistema de CI; se toman de la documentación vigente.
