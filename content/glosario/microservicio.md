---
titulo: "Microservicio"
resumen: "Servicio pequeño y autónomo que cubre una capacidad de negocio y se despliega por separado."
categoria: concepto
tags: ["backend"]
alias: []
relacionados: [monolito, microfrontend, api, ddd, despliegue]
fuentes: []
autoenlace: true
---

## Definición

Un microservicio es un servicio pequeño y autónomo que cubre una capacidad de negocio concreta —facturación, envíos—, con su propio despliegue y, a menudo, su propia base de datos. Se comunica con los demás por HTTP, mensajes o eventos.

## Por qué importa

Permite escalar y desplegar solo la parte que lo necesita: si facturación recibe más carga, se escala facturación, no todo el sistema. También reduce el radio de impacto de un cambio. A cambio aparece complejidad de red: una operación que antes era una llamada en memoria ahora puede fallar por timeout, y mantener datos coherentes entre servicios exige eventos o compensaciones.

## Ejemplo

Un servicio de pedidos publica `PedidoCreado` en una cola; facturación y envíos reaccionan cada uno por su lado sin llamarse entre sí.

## Se confunde con

Con un Monolito: allí todas las capacidades viven en una sola aplicación y comparten base de datos, así que desplegar cualquier cambio implica desplegar todo. Tampoco es «tener varias APIs»: la autonomía de despliegue y de datos es lo que distingue un microservicio de un módulo remoto. DDD suele ayudar a decidir dónde están los límites; sin ese análisis, se acaba con servicios pequeños pero acoplados. El Microfrontend aplica la misma idea en la interfaz.
