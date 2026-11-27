---
titulo: "DNS"
resumen: "Domain Name System: servicio que traduce nombres de dominio en direcciones IP y guarda otros registros de dominio."
categoria: concepto
tags: ["backend","nivel-0"]
alias: ["Domain Name System"]
relacionados: ["url", "host", "servidor", "cabeceras-http"]
fuentes: []
autoenlace: true
---
## Definición

DNS (Domain Name System) es el directorio distribuido que convierte un nombre legible, como `ejemplo.com`, en la dirección IP donde está el servidor, y que también almacena otros registros del dominio. Resolver es consultar ese directorio: el navegador pregunta, una cadena de servidores responde y se guarda una copia temporal en la caché para no repetir la consulta.

## Por qué importa

Permite compartir `kimografico.github.io` en lugar de una IP que puede cambiar. Si el registro apunta mal, la web no carga aunque el servidor funcione: el error está «antes» de la petición HTTP. Entender el DNS evita buscar el fallo en el código cuando el problema es una configuración de dominio.

## Ejemplo

- `A` → nombre a IPv4; `AAAA` → nombre a IPv6.
- `CNAME` → un alias a otro nombre (`www` → dominio raíz).
- `TXT` → texto para verificar la propiedad del dominio.

```bash
nslookup ejemplo.com
```

La salida muestra la IP resuelta y el servidor que respondió.

## Se confunde con

No es Negocio: aquí «dominio» es un nombre en el DNS; en Negocio es un área de responsabilidad. Tampoco es el hosting: el DNS dice dónde ir, el servidor es quien responde. Cambiar un registro no mueve los archivos, y un cambio reciente puede tardar en propagarse por la caché: esperar no siempre significa que la configuración sea correcta.
