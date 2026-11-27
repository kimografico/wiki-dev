---
titulo: "Puerto"
resumen: "Número lógico que identifica un servicio dentro de una máquina para que las conexiones lleguen al proceso correcto."
categoria: concepto
tags: ["nivel-0"]
alias: []
relacionados: [host, servidor, localhost, url, dns]
fuentes: []
autoenlace: true
---

## Definición

Un puerto es un número lógico, entre 0 y 65535, que distingue servicios dentro de la misma máquina. Una conexión TCP o UDP se identifica por dirección y puerto; el proceso que escucha en ese puerto es el que recibe los datos.

## Por qué importa

Dos procesos no pueden escuchar a la vez en la misma combinación de host y puerto con el mismo protocolo. Por eso arrancar dos servidores de desarrollo en el puerto 3000 produce un error de «puerto ocupado». Elegir el puerto también forma parte del despliegue: un firewall o un contenedor debe exponer el puerto correcto para que la petición llegue al proceso. El remoto y el local pueden usar puertos distintos sin que cambie la aplicación.

## Ejemplo

```bash
npm run dev # abre http://localhost:3000/
```

Si otro proceso ya usa el 3000, hay que liberarlo o arrancar el servidor en otro puerto.

## Se confunde con

Con el host: `localhost` nombra la máquina; `:3000` señala una entrada concreta dentro de esa máquina. Tampoco es el protocolo: HTTP y HTTPS definen cómo se habla, no dónde se escucha. La ruta `/docs` tampoco es un puerto: llega después de que la conexión ya se ha establecido.
