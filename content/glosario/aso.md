---
fecha: 2026-11-26
titulo: ASO
resumen: "ASO (Architecture Service Oriented): estándar de desarrollo backend que expone y orquesta servicios REST para canales digitales."
categoria: concepto
tags: [backend, bbva]
alias: [Architecture Service Oriented, Arquitectura Orientada a Servicios]
relacionados: [apx, api, microservicio]
fuentes: [https://docs.oasis-open.org/soa-rm/v1.0/soa-rm.html]
autoenlace: true
---

## Definición

ASO (Architecture Service Oriented, «arquitectura orientada a servicios») es un estándar de desarrollo backend descrito como muy extendido en entornos bancarios y corporativos. El término público y estandarizado para esa idea es SOA (Service-Oriented Architecture), que OASIS define como un paradigma para organizar capacidades distribuidas. Su responsabilidad es hablar hacia fuera: publicar APIs REST/JSON para las apps y la web, acordar el contrato del servicio con quien lo consume y orquestar las llamadas necesarias para responder.

En la arquitectura descrita para BBVA, ASO se sitúa por encima de APX. La petición del canal entra por esa capa y se delega en APX cuando hace falta ejecutar lógica transaccional contra los sistemas internos.

## Por qué importa

Permite que frontend y backend acuerden un contrato estable sin que el canal conozca los sistemas internos. En el entorno descrito se desarrolla en Java con Spring Boot y se apoya en especificaciones de API como OpenAPI, con arquetipos estrictos para código, pruebas unitarias y despliegue continuo.

También es el punto de colaboración entre los equipos de producto y frontend, que definen el contrato, y los equipos de core o arquitectura, que conectan los datos.

## Ejemplo

Una pantalla consulta el saldo de una cuenta mediante `GET /cuentas/{id}/saldo`. Esta capa publica ese contrato, comprueba la petición y compone la respuesta a partir de las operaciones que delega en APX; la pantalla recibe JSON y no sabe qué sistema interno ha respondido.

## Se confunde con

- **SOA (Service-Oriented Architecture)**: es el nombre estandarizado y público de la arquitectura orientada a servicios. ASO es la denominación interna descrita aquí.
- **APX**: es la capa situada justo debajo, dedicada a transacciones, reglas de negocio y acceso a sistemas internos. ASO expone servicios; APX los ejecuta.
- **Microservicio**: es una forma de organizar un servicio como proceso independiente. ASO describe la función de una capa, no obliga a un estilo de despliegue concreto.

## Fuente interna

> Esta entrada describe un sistema interno de BBVA documentado con fuente privada. No se aplica la exigencia de contraste con fuentes públicas: la denominación ASO, su expansión y los detalles del entorno de desarrollo proceden de la descripción interna facilitada por el autor. La fuente pública citada documenta SOA, el término estandarizado, no la sigla interna.
