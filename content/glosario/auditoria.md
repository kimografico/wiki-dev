---
titulo: "Auditoría"
resumen: "Revisión sistemática que convierte sospechas en hallazgos con severidad y una acción correctora."
categoria: concepto
tags: ["seguridad","terminal"]
alias: []
relacionados: [vulnerabilidad, code-review, dependencia, ci-cd]
fuentes: []
autoenlace: true
---
## Definición

Una auditoría es una revisión sistemática de código, dependencias, permisos o procesos para comprobar si cumplen una norma y qué riesgos presentan. No es una inspección casual: define alcance, criterios y una lista de hallazgos con severidad y acción correctora. El resultado es evidencia, no una opinión.

## Por qué importa

Convierte una sospecha en algo gestionable. Un escáner de dependencias puede avisar de una librería con una vulnerabilidad conocida; la auditoría decide si esa librería se usa en una ruta expuesta, si hay una versión corregida y quién debe aplicar el cambio. Sin ese paso, el equipo acaba priorizando avisos por ruido en lugar de por riesgo real. Dejar constancia del alcance evita repetir la revisión a ciegas.

## Ejemplo

```bash
npm audit --omit=dev
```

El comando revisa dependencias de producción y muestra avisos. La revisión continúa leyendo cada uno: puede haber una mitigación temporal, una actualización segura o un falso positivo según el contexto del proyecto.

## Se confunde con

Con un test o con Code review. Un test comprueba que una función devuelve lo esperado; Code review examina un cambio concreto; la auditoría mira el conjunto frente a una política. Tampoco garantiza ausencia de problemas: certifica lo que se revisó en un momento dado, no lo que aparecerá mañana.
