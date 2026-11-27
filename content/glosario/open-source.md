---
titulo: "Open source"
resumen: "Software cuyo código fuente se distribuye bajo una licencia aprobada que permite usarlo, estudiarlo, modificarlo y compartirlo."
categoria: concepto
tags: []
alias: ["opensource", "código abierto"]
relacionados: [rxjs]
fuentes:
  - "https://opensource.org/osd"
  - "https://opensource.org/faq/"
  - "https://www.gnu.org/philosophy/free-sw.en.html"
  - "https://registry.npmjs.org/rxjs/latest"
autoenlace: true
terminoEn: "Open source"
---

## Definición

Open source describe software cuyo código fuente se distribuye con una licencia que cumple la definición de la Open Source Initiative (OSI): se puede usar para cualquier fin, estudiar, modificar y redistribuir, tanto el código original como las versiones modificadas. La definición subraya que no basta con hacer visible el código: la licencia debe garantizar esos derechos.

La OSI recomienda reservar la etiqueta para software bajo una licencia aprobada. Un repositorio público sin licencia no otorga esos permisos por el hecho de estar publicado.

## Por qué importa

Poder leer y cambiar el código permite entender el comportamiento real de una dependencia, corregirla y compartir la corrección. El uso comercial está permitido y el software puede venderse: «abierto» no significa «gratuito».

RxJS es un ejemplo verificable: declara la licencia Apache-2.0 en los metadatos de su paquete. Esa declaración es la que convierte al proyecto en open source, no el hecho de que su código esté en un repositorio público.

## Ejemplo

```json
{
  "license": "Apache-2.0"
}
```

En un `package.json`, ese campo declara la licencia bajo la que se distribuye el código. Sin una licencia explícita, terceros no pueden saber qué pueden hacer con él.

## Se confunde con

| Término | Criterio que lo separa |
|---|---|
| Software gratuito | El precio no define la licencia: el software open source puede venderse y el gratuito puede tener restricciones. «Libre» alude a libertades, no a coste. |
| Código publicado | Ver el código no concede permiso para usarlo, modificarlo ni redistribuirlo; hace falta una licencia aprobada. |
| Software libre | La OSI los trata como dos términos para la misma categoría de software; la Free Software Foundation lo formula como cuatro libertades y insiste en que «libre» no es «gratis». |
| Licencia permisiva | No es sinónimo de open source: las licencias copyleft también lo son, y la OSI desaconseja usar «permisiva» como antónimo de copyleft. |
