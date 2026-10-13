---
titulo: Integración continua
resumen: Práctica de ejecutar automáticamente comprobaciones y build ante cada cambio, para detectar problemas antes de publicar.
categoria: concepto
tags: [terminal]
alias: [CI]
relacionados: [github-pages, husky, vitest]
terminoEn: Continuous integration
---

## Definición

La integración continua (CI) es ejecutar de forma automática un conjunto de comprobaciones —tipos, lint, formato, tests, build— cada vez que se sube un cambio. Si algo falla, se sabe antes de fusionar o publicar.

## Por qué importa

Es una red de seguridad barata: nadie recuerda ejecutar todo a mano en cada cambio. Con CI, el propio repositorio avisa si un cambio rompe el build o incumple las reglas.

## Ejemplo

```yaml
# .github/workflows/ci.yml (resumen)
- run: npm ci
- run: npm run check
- run: npm run build
```

## Se confunde con

Con los *hooks* de git. Los hooks se ejecutan en tu máquina (por ejemplo, antes de hacer push); la CI se ejecuta en el servidor, con el código ya subido, y no se puede saltar.
