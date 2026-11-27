---
titulo: "IPA"
resumen: "Paquete de instalación de una aplicación de iOS: ejecutable compilado, recursos y metadatos de firma, listo para distribuirse."
categoria: despliegue
tags: ["frontend"]
alias: []
relacionados: [ios, xcode, build, despliegue]
fuentes: []
autoenlace: true
---
## Definición

Un IPA (iOS App Store Package) contiene una aplicación de iOS lista para instalarse: ejecutable compilado, recursos y metadatos de firma. Es el producto de archivar y firmar un proyecto con Xcode, no el código fuente. Se distribuye a TestFlight, a la App Store o a dispositivos concretos según firma y perfil. El mismo código fuente puede generar paquetes distintos según la configuración de compilación.

## Por qué importa

Es el artefacto que se prueba y se publica: saber qué contiene evita buscar en el sitio equivocado un fallo de compilación. Caso concreto: integración continua genera el IPA, QA instala ese archivo y publicación sube el mismo sin reconstruirlo. Así lo verificado y lo entregado coinciden. Si no se instala, la causa suele estar en la firma o el perfil.

## Ejemplo

```bash
unzip -l App.ipa | head
# Payload/... contiene el ejecutable y los recursos
```

El archivo se puede inspeccionar porque es un contenedor; lo que hay dentro está compilado y no se edita como texto.

## Se confunde con

Con APK: es el paquete equivalente en Android, no en iOS. Con el proyecto de Xcode: el proyecto es fuente y configuración; el IPA es el resultado de compilarlo y firmarlo. Con el certificado o el perfil de aprovisionamiento: sirven para firmar y autorizar la instalación, pero no son la aplicación.
