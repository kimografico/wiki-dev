---
titulo: "Host"
resumen: "Equipo, proceso o servicio que aloja y sirve una aplicación o un dominio; no es el nombre del dominio."
categoria: concepto
tags: ["nivel-0","frontend"]
alias: []
relacionados: [localhost, servidor, dns, puerto]
fuentes: []
autoenlace: true
---
## Definición

Un host es la máquina, proceso o servicio que aloja y atiende una aplicación o un dominio. En redes, host es cualquier dispositivo con IP; en desarrollo web, el proceso que escucha en un puerto y responde HTTP. El dominio es el nombre que escribe la persona: el DNS lo resuelve a una dirección para llegar al host. Un equipo puede ser host de varios dominios.

## Por qué importa

Saber qué host responde permite situar un fallo. Esta wiki la sirve el host de GitHub Pages, pero con `npm run dev` responde la máquina local en `localhost:3000`. Si el navegador muestra una versión antigua, conviene preguntar a qué host se conecta y desde qué directorio sirve. Un cambio local no se ve en producción porque son hosts distintos.

## Ejemplo

```bash
npm run dev              # host local
# http://localhost:3000 → ese proceso

# https://... → host de GitHub Pages
```

El puerto completa la dirección: el host dice dónde y el puerto qué proceso.

## Se confunde con

Con el dominio: es la etiqueta legible; el host es el sistema que la atiende. Con Servidor: nombra el programa o el rol, mientras que host nombra también la máquina. Con la cabecera HTTP `Host`: indica qué dominio pide el cliente, no la identidad de quien responde.
