---
titulo: "Entrega continua"
resumen: "Práctica de mantener cada cambio validado en un estado listo para publicarse, con despliegue automatizado o fácilmente disparable."
categoria: concepto
tags: ["terminal"]
alias: []
relacionados: ["integracion-continua", "ci-cd", "despliegue", "github-actions"]
fuentes: []
autoenlace: true
---
## Definición

La entrega continua es la práctica de mantener cada cambio validado en un estado listo para publicarse. El paso final puede automatizarse o dispararse a mano; lo importante es que el artefacto sea siempre desplegable y que publicar no requiera una ceremonia larga de preparación.

## Por qué importa

Reduce el riesgo y el tamaño de cada publicación. Si se publica con frecuencia mediante el mismo proceso, un fallo se aísla en un cambio pequeño y es fácil de localizar; si se acumulan semanas de trabajo, el despliegue se vuelve un evento con muchas variables. La disciplina previa —tests y build en verde— es lo que hace fiable el botón de publicar.

## Ejemplo

Tras pasar los tests y generar el build, un flujo de GitHub Actions publica el sitio en GitHub Pages. Cada commit sigue el mismo camino: validar, construir, publicar. Si la validación falla, el cambio no llega al público y se corrige antes de continuar.

## Se confunde con

No es integración continua: la integración valida cada cambio y avisa de que se rompió algo; la entrega continua garantiza que, además, el resultado esté listo para la persona usuaria. Tampoco es despliegue continuo: allí cada cambio que pasa la validación se publica automáticamente; con entrega continua puedes decidir el momento. Publicar mucho no es entregar bien si no hay comprobación previa.
