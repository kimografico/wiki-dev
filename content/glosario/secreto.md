---
titulo: "Secreto"
resumen: "Dato sensible —token, contraseña o clave— que debe mantenerse fuera del código y del historial de Git."
categoria: concepto
tags: ["seguridad"]
alias: []
relacionados: [token, pat, autenticacion, entornos]
fuentes: []
autoenlace: true
---

## Definición

Un secreto es un dato sensible que da acceso a un sistema: token, contraseña, clave API o credencial. Su valor no debe escribirse en el código ni en un archivo versionado, porque cualquier persona con acceso al repositorio podría leerlo. Un dato puede parecer inofensivo y aun así ser secreto si permite actuar en nombre de alguien.

## Por qué importa

Un secreto filtrado en un commit sigue existiendo en el historial aunque se borre después; hay que rotarlo, no solo quitarlo del archivo. Por eso se guarda en un gestor externo —GitHub Secrets, un gestor de contraseñas o un archivo temporal fuera del repo— y se inyecta como variable de entorno durante la ejecución. Tampoco debe imprimirse en logs ni viajar en una URL, donde queda registrado.

## Ejemplo

```bash
# En el workflow, la variable se inyecta desde GitHub Secrets
curl -H "Authorization: Bearer $MI_TOKEN" https://api.example.com
```

## Se confunde con

Con configuración pública: la URL del sitio o el puerto pueden estar en el repo; un token no. Tampoco con cualquier token: un PAT con permisos amplios merece más protección que un identificador no sensible. La clasificación depende de qué permite hacer quien lo obtiene.
