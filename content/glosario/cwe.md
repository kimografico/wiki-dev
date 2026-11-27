---
titulo: "CWE"
resumen: "Common Weakness Enumeration: catálogo de tipos de debilidades de seguridad identificado como CWE-XXX."
categoria: concepto
tags: ["seguridad"]
alias: ["Common Weakness Enumeration"]
relacionados: [vulnerabilidad, ciberseguridad, auditoria, xss]
fuentes: ["https://cwe.mitre.org/"]
autoenlace: true
---

## Definición

CWE (Common Weakness Enumeration) es un catálogo de clases de debilidades del software. Cada entrada tiene un identificador numérico y describe un patrón de error, no un incidente concreto: CWE-89 agrupa las inyecciones SQL y CWE-120 los desbordamientos de búfer. La lista es pública y la mantiene la comunidad alrededor de MITRE.

## Por qué importa

Permite hablar el mismo idioma en un informe de seguridad. En lugar de «hay un problema con las consultas», el equipo escribe CWE-89 y todos saben qué familia de fallo se revisa, qué pruebas lo detectan y qué patrón de corrección conviene aplicar. También sirve para agrupar hallazgos de herramientas distintas que usan nombres diferentes para la misma debilidad.

## Ejemplo

```text
Hallazgo: concatenar entradas del usuario en una consulta SQL → CWE-89
Hallazgo: copiar sin comprobar el tamaño del destino → CWE-120
```

El identificador viaja en el informe y queda asociado a la línea de código afectada.

## Se confunde con

Con CVE. Un CVE identifica una vulnerabilidad ya observada en un producto concreto; un CWE describe el tipo de debilidad, aunque todavía no haya ocurrido ningún caso. Tampoco es una puntuación de gravedad: para eso existen otras escalas.
