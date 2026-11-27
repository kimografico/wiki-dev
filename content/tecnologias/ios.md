---
titulo: "iOS"
resumen: "Sistema operativo de Apple para iPhone y iPad, con su propio ciclo de compilación y distribución."
categoria: framework
tags: ["frontend"]
alias: []
relacionados: [xcode, ipa, emulador, figma]
fuentes: []
autoenlace: true
alternativas: []
---
## Qué es

iOS es el sistema operativo de Apple para iPhone y iPad. Para el desarrollo define un conjunto de APIs, un ciclo de compilación y un proceso de distribución propios: las apps se compilan con herramientas de Apple, se firman con un certificado y se envían a App Store o se instalan como IPA. No es macOS: comparten ecosistema y lenguaje, pero son plataformas con destinos y permisos distintos.

## Para qué sirve

Conocer iOS sirve para entender las restricciones que aparecen cuando una funcionalidad incluye app móvil: permisos de cámara o notificaciones, ciclo de vida en segundo plano, tamaños de pantalla y normas de la tienda. Un equipo web que publica en App Store necesita saber qué parte de la experiencia será nativa y cuál podrá resolverse con una página web.

## Cuándo usarla

Conviene conocerlo cuando una feature incluye una app que se publicará en App Store, cuando se integra un navegador dentro de la app o cuando se decide si una pantalla se hace en código nativo o en la web. También importa al probar: una página que funciona en el navegador de escritorio puede comportarse distinto en el navegador de iOS.

## Cuándo no

No es el objetivo de una web responsive: si solo quieres que la página se vea bien en móvil, basta con diseñar para viewport pequeño y probar en el navegador móvil. Tampoco es macOS, aunque muchas herramientas se compartan. Y no es una plataforma que se pueda sustituir libremente: si el proyecto exige estar en iPhone, la vía habitual pasa por compilar para iOS y cumplir las normas de la tienda.

## Matices

| Plataforma | Destino | Artefacto habitual |
|------------|---------|--------------------|
| iOS | iPhone y iPad | IPA |
| macOS | Ordenadores de Apple | Aplicación de escritorio |
| Web | Cualquier navegador | Sitio publicado |

El criterio práctico es sencillo: si la persona instala algo desde App Store, se habla de iOS; si abre una URL, se habla de web. Xcode es la herramienta que compila para la primera, no la plataforma en sí.

## Ejemplo

```bash
# Salida típica de una compilación de archivo para iOS.
xcodebuild -scheme MiApp -configuration Release \
  -destination 'generic/platform=iOS' archive
```

El comando produce un archivo que después se firma y se distribuye. En el día a día esa secuencia la hace el entorno de desarrollo, pero conviene saber qué ocurre detrás del botón de publicación.
