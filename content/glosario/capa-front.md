---
titulo: "Capa front"
resumen: "Equipo interno de BBVA responsable de la capa de presentación del canal y de su integración con los servicios backend."
categoria: concepto
tags: ["frontend", "bbva"]
alias: ["equipo de frontend"]
relacionados: [frontend, aso, apx, angular]
fuentes: []
autoenlace: true
---

## Definición

En la terminología interna de BBVA, la capa front es el equipo responsable de la capa de presentación del canal: la interfaz que ve la persona usuaria y su integración con los servicios backend. Es una unidad organizativa, no una tecnología. Junto a capa ASO, capa APX y capa host, nombra al equipo dueño de esa parte del sistema.

## Por qué importa

Permite situar quién decide sobre la interfaz y quién responde cuando el fallo está en un contrato entre el canal y los servicios. La capa front acuerda el consumo de lo que publica la capa ASO —por ejemplo, con Angular— y decide cuándo hace falta una integración propia, como un dominio servido mediante Azure Front Door.

## Ejemplo

Una pantalla consulta un servicio de la capa ASO. La capa front acuerda el contrato, implementa la vista y decide cómo mostrar un error; si el dato no llega, se investiga primero la capa que publica el servicio.

## Se confunde con

- **Frontend**: capa técnica del navegador. La capa front es el equipo que trabaja en ella; una es código y otra organización.
- **Capa ASO y capa APX**: denominaciones internas de los servicios hacia canales y de la lógica transaccional. La capa front consume las primeras, no ejecuta la segunda.
- **Perfil fullstack**: describe a una persona que trabaja en varias capas, no al equipo dueño de la presentación.

## Fuente interna

> Denominación de equipos de BBVA documentada con fuente privada. El alcance y su relación con ASO y APX proceden de notas internas; la analogía con la capa de presentación es solo un contraste público.
