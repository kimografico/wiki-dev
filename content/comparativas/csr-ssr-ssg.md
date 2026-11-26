---
titulo: "CSR frente a SSR y SSG"
resumen: "Tres estrategias para decidir dónde y cuándo se genera el HTML de una página."
categoria: concepto
tags: ["frontend","rendimiento"]
alias: []
relacionados: ["csr","ssr","static-site-generation"]
fuentes: []
autoenlace: true
entidades: ["csr","ssr","static-site-generation"]
contexto: "Tres estrategias para decidir dónde y cuándo se genera el HTML de una página."
---
## Contexto

Tres estrategias para decidir dónde y cuándo se genera el HTML de una página.

## Criterios

Momento de renderizado, HTML inicial, necesidad de servidor y coste por visita.

## Cuándo elegir cada una

SSG para contenido que no cambia por usuario; SSR cuando cada petición necesita datos frescos; CSR para aplicaciones muy interactivas tras la carga.

## Ejemplos

Esta wiki usa SSG; un panel con datos por usuario usa SSR; un editor en navegador usa CSR.
