---
titulo: "Localhost"
resumen: "Nombre de host que apunta a la propia máquina, normalmente a la dirección 127.0.0.1."
categoria: concepto
tags: ["nivel-0"]
alias: []
relacionados: [host, puerto, dns, servidor, entornos]
fuentes: []
autoenlace: true
---

## Definición

`localhost` es el nombre de host que designa la propia máquina. Se resuelve a la dirección de loopback `127.0.0.1` (o `::1` en IPv6), que el sistema operativo devuelve a sí mismo sin llegar a la red.

## Por qué importa

Permite levantar un servidor de desarrollo y abrirlo en el navegador sin exponerlo a internet ni depender de un dominio. `npm run dev` escucha en `localhost:3000` y el navegador conecta con el proceso que corre en el mismo ordenador. Es también la forma habitual de probar una API antes de desplegarla: cliente y servidor conviven en la misma máquina. Si el puerto está ocupado por otro proceso, el servidor no arranca y el navegador muestra conexión rechazada.

## Ejemplo

```bash
curl http://localhost:3000/api/entradas
```

## Se confunde con

Con un dominio público. `localhost` solo existe dentro de cada máquina: abrir `http://localhost:3000` en otro ordenador apunta a ese otro ordenador, no al tuyo. Para compartir el servidor hace falta la IP de la red local o una herramienta de túnel. Tampoco es `0.0.0.0`: esa dirección indica «escucha en todas las interfaces», no «conéctate a ti mismo».

## Puertos

El host dice **dónde** conectarse; el Puerto dice **a qué servicio**. En la misma máquina, `localhost:3000` y `localhost:4321` pueden atender aplicaciones distintas.
