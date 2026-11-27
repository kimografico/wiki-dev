---
titulo: "Vulnerabilidad"
resumen: "Debilidad explotable en código, configuración o dependencia; se distingue del fallo funcional por el abuso que abre."
categoria: concepto
tags: ["seguridad"]
alias: []
relacionados: [cwe, xss, ciberseguridad, dependencia, secreto]
fuentes: []
autoenlace: true
---
## Definición

Una vulnerabilidad es una debilidad en el código, la configuración o una dependencia que permite a un atacante hacer algo que el sistema no debiera: leer datos ajenos, escalar permisos o ejecutar código. Se describe con **CWE** según el tipo de debilidad y, si recibe identificación pública, con CVE. Que exista no significa que ya se esté explotando: describe una puerta abierta, no a un intruso dentro.

## Por qué importa

Permite priorizar con criterio. Con cien avisos no se arregla todo el mismo día: saber si es inyección o cabecera mal configurada cambia el orden. Una consulta SQL concatenada deja alterar la consulta; una **Dependencia** desactualizada hereda el problema sin que tu código lo escribiera.

## Ejemplo

```js
// Vulnerable: el parámetro se concatena en la consulta.
const sql = `SELECT * FROM users WHERE id = ${req.query.id}`;
```

La versión segura pasa el valor como parámetro enlazado, no como texto de la consulta.

## Se confunde con

Con un bug y con **XSS**. Un bug rompe el funcionamiento esperado; una vulnerabilidad abre un abuso y a veces no rompe nada: la aplicación sigue funcionando mientras se filtran datos. XSS es una familia concreta de vulnerabilidad, no su sinónimo. Tampoco equivale a riesgo: el riesgo depende de si el componente afectado está expuesto en producción y de qué permisos tiene. Un **Secreto** filtrado es una debilidad distinta de un error de sintaxis.
