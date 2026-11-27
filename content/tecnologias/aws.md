---
titulo: "AWS"
resumen: "Plataforma de nube de Amazon que ofrece computación, almacenamiento y redes bajo demanda y pago por uso."
categoria: despliegue
tags: [backend, terminal]
alias: ["Amazon Web Services"]
relacionados: [despliegue, cloudflare, vercel, docker]
alternativas: []
web: "https://aws.amazon.com/"
fuentes:
  - "https://aws.amazon.com/what-is-aws/"
  - "https://docs.aws.amazon.com/cli/latest/reference/s3/ls.html"
autoenlace: true
---

## Qué es

AWS —Amazon Web Services— es una plataforma de computación en la nube que ofrece servicios bajo demanda: computación, almacenamiento, redes, bases de datos y herramientas de desarrollo. El hardware no se gestiona directamente: se solicitan servicios y se paga por el uso.

## Para qué sirve

Permite aprovisionar infraestructura sin comprar ni mantener servidores propios. EC2 ofrece máquinas virtuales y S3 almacena objetos; son dos ejemplos entre muchos servicios, no sinónimos de AWS.

## Cuándo usarla

Cuando el proyecto necesita infraestructura que crece y se paga por uso, o servicios gestionados concretos como almacenamiento de objetos.

## Cuándo no

Cuando basta con alojar archivos estáticos o con una función en el perímetro: plataformas como Cloudflare o Vercel resuelven ese caso con menos configuración. Los precios y cuotas concretos no se dan por verificados aquí: hay que consultarlos en la fuente oficial antes de decidir.

## Alternativas

Microsoft Azure y Google Cloud cubren la misma categoría de nube pública. La comparación depende de los servicios concretos que necesite el proyecto, no solo del nombre del proveedor.

## Ejemplo

La CLI de AWS permite listar buckets de S3:

```bash
aws s3 ls
aws s3 ls s3://amzn-s3-demo-bucket --recursive
```

El primer comando lista los buckets de la cuenta configurada; el segundo recorre los objetos de uno. No lista archivos locales.

## Nube, servicio y despliegue

AWS es la plataforma; S3 o EC2 son servicios dentro de ella. Un despliegue puede usar uno, varios o ninguno, y la imagen construida con Docker es el artefacto que se ejecuta, no el lugar donde se ejecuta. Confundir plataforma, servicio y artefacto lleva a buscar en la factura lo que debería buscarse en la configuración.
