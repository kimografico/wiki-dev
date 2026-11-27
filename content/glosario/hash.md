---
titulo: "Hash"
resumen: "Función criptográfica que transforma datos de cualquier tamaño en una huella de longitud fija; permite comprobar integridad sin revelar el original."
categoria: concepto
tags: ["backend","seguridad"]
alias: []
relacionados: [base64, jwt, token, ciberseguridad]
fuentes: []
autoenlace: true
---
## Definición

Una función hash transforma datos de cualquier tamaño en una cadena fija llamada huella. Es determinista: la misma entrada da siempre la misma salida. La versión criptográfica añade que con la huella no se reconstruye el original y que encontrar otra entrada con la misma huella es inviable. Un cambio mínimo altera todo el resultado. No es cifrado: no hay clave para invertirlo.

## Por qué importa

Sirve para comprobar integridad y para verificar contraseñas sin guardarlas en claro. Si un artefacto se descarga con su huella publicada, basta con recalcularla para detectar una copia alterada. Para contraseñas se usa una variante lenta con sal única por usuario, no una huella rápida: así dos personas con la misma contraseña no comparten resumen y probar millones de candidatos resulta caro.

## Ejemplo

```bash
echo -n hello | sha256sum
# 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824
```

Cambiar `hello` por `hola` produce otra cadena sin relación aparente; esa sensibilidad hace útil la comparación.

## Se confunde con

Con una tabla hash: estructura que traduce claves a posiciones, no función criptográfica. Con Base64: codificar es reversible y no detecta manipulación. Con un checksum: detecta cambios accidentales, pero no resiste a quien recalcula el valor. La huella protege integridad; la confidencialidad requiere cifrado.
