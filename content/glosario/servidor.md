---
titulo: "Servidor"
resumen: "Proceso o equipo que escucha peticiones y devuelve respuestas, ya sea en local o en un entorno remoto."
categoria: concepto
tags: ["backend","nivel-0"]
alias: []
relacionados: [host, puerto, localhost, dns, despliegue]
fuentes: []
autoenlace: true
---

## Definición

Un servidor es un proceso que escucha peticiones en una dirección y un puerto, las interpreta y devuelve una respuesta. Puede ser un servicio local en la máquina de desarrollo o un equipo remoto que atiende a usuarios: «servidor» describe el papel, no exige una máquina física dedicada. En un sitio estático, ese proceso puede limitarse a entregar archivos ya generados.

## Por qué importa

Separa el entorno de desarrollo del de producción: `localhost:3000` sirve para probar cambios, mientras que GitHub Pages publica los archivos generados para cualquiera. Entender quién escucha evita confusiones típicas: una variable configurada solo en local no existe en producción, y un puerto abierto en casa no será alcanzable desde fuera sin exponerlo. Que la web funcione en la máquina propia no implica que esté publicada: el proceso escucha en otro entorno.

## Ejemplo

```bash
# Servidor de desarrollo en local
npm run dev
```

## Se confunde con

Con host: el host es la máquina o dirección; el servidor es el proceso que corre en ella. Tampoco es el frontend: el frontend se ejecuta en el navegador de la persona que visita la página, aunque el servidor sea quien le entrega los archivos.
