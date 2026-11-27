---
titulo: "Xcode"
resumen: "Entorno de desarrollo oficial de Apple para crear apps de iOS, iPadOS y macOS."
categoria: herramienta
tags: ["frontend"]
alias: []
relacionados: [ios, ipa, emulador, git]
fuentes: [https://developer.apple.com/documentation/xcode/building-your-app/]
autoenlace: true
alternativas: []
---
## Qué es

Xcode es el entorno de desarrollo oficial de Apple: reúne editor, compilador, simulador, depurador y las herramientas de firma y envío a App Store. Trabaja con proyectos nativos y con sus propios formatos de proyecto, además de gestionar las credenciales necesarias para instalar una app en un dispositivo. No es un editor web ni una herramienta de diseño: produce aplicaciones que se ejecutan en iOS, iPadOS o macOS.

## Para qué sirve

Centraliza el ciclo completo de una app de Apple. Permite escribir Swift o SwiftUI, lanzar la app en un simulador, inspeccionar fallos con el depurador, elegir el dispositivo de destino y crear el archivo que se envía a la tienda. Sin él no se puede firmar ni publicar una app para iOS de la forma habitual.

## Cuándo usarla

Conviene cuando hay que compilar, depurar o publicar una app de iOS. También cuando una página web se empaqueta dentro de una app nativa: el proyecto que envuelve esa web se abre y se firma aquí. Es el entorno natural del equipo móvil, igual que la terminal y el editor son el entorno del equipo web.

## Cuándo no

No hace falta para mantener un sitio web ni para diseñar pantallas: Figma cubre la parte visual y el navegador cubre la implementación web. No es tampoco un sistema operativo: iOS es la plataforma de destino y Xcode es la herramienta que compila para esa plataforma. Por último, no es multiplataforma: para Android se necesita otro entorno.

## Matices

| Pieza | Papel |
|-------|-------|
| iOS | Sistema operativo de destino |
| Xcode | Entorno que compila y firma |
| IPA | Artefacto que se instala o se envía |
| Simulador | Entorno de prueba en el ordenador |

Confundir estas piezas lleva a errores de vocabulario: «subir a Xcode» no es publicar. Lo que se envía es el archivo resultante y Xcode es la herramienta que lo genera.

## Ejemplo

```bash
xcodebuild list
xcodebuild -scheme MiApp -destination 'platform=iOS Simulator' test
```

El primer comando lista esquemas y destinos; el segundo ejecuta las pruebas en el simulador, la misma operación que el botón de ejecutar realiza desde la interfaz. Tener el comando a mano ayuda a integrar esas pruebas en integración continua.
