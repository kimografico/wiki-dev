---
titulo: "Add-on"
resumen: "Complemento que amplía una herramienta; en el ecosistema de Firefox, término general que incluye las extensiones y otros tipos de complementos."
categoria: concepto
tags: ["frontend", "terminal"]
alias: []
relacionados: [plugin, hook, dependencia]
fuentes:
  - "https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons"
  - "https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions"
  - "https://developer.mozilla.org/en-US/docs/Glossary/Plugin"
autoenlace: true
---

## Definición

Un add-on es un complemento que se instala para ampliar o modificar una aplicación. En el ecosistema de Firefox es el término general: MDN indica que hay varios tipos y que las extensiones son el más común, junto a otros como los diccionarios de usuario. MDN añade que las extensiones, o add-ons, modifican y mejoran el navegador.

## Por qué importa

Distinguir el paraguas del tipo concreto evita malentendidos al leer documentación de navegadores. El gestor de complementos separa categorías aunque el equipo hable de «add-on» en singular. Saber qué nivel se describe ayuda a decidir dónde se configura.

## Ejemplo

Un bloqueador de anuncios instalado desde el gestor de complementos de Firefox es un add-on y, en concreto, una extensión: actúa sobre las páginas sin cambiar el navegador. Un diccionario que añade corrección ortográfica también es un add-on, pero no modifica el contenido web.

## Se confunde con

- **Extensión**: en la documentación de Chrome ambos nombres se usan de forma equivalente; en Mozilla, extensión es el tipo más habitual dentro de add-on, no la categoría completa.
- **Plugin**: en MDN designa un componente del navegador para contenido que no soporta de forma nativa, como el antiguo Flash. En este glosario, Plugin tiene el sentido más general de pieza que se engancha a una herramienta. No es intercambiable con add-on en todos los contextos.
- **Dependencia**: se declara en el proyecto para que el código funcione; el add-on se elige en la herramienta. Un plugin puede ser ambas cosas.
