---
titulo: "Dry run"
resumen: "Ejecución de prueba que simula una acción sin aplicar sus efectos reales."
categoria: herramienta
tags: ["terminal"]
alias: []
relacionados: []
fuentes: []
autoenlace: true
---
## Definición

Ejecución de prueba que simula una acción sin aplicar sus efectos reales.

## Por qué importa

Permite comprobar qué se haría antes de borrar, publicar o modificar algo irreversible.

## Ejemplo

```bash
npm run deploy -- --dry-run
```

## Se confunde con

No es un entorno de pruebas: el dry run no despliega; un entorno de pruebas sí aplica cambios en un sitio aislado.
