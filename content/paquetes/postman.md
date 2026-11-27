---
titulo: "Postman"
resumen: "Cliente de API con interfaz gráfica, entornos y colecciones compartidas para explorar y probar endpoints."
categoria: herramienta
tags: ["backend","terminal"]
alias: []
relacionados: ["bruno", "bruno-frente-a-postman", "api"]
fuentes: []
autoenlace: true
alternativas: ["bruno"]
web: "https://www.postman.com/"
---

## Qué es

Postman es un cliente de API con interfaz gráfica. Permite construir peticiones HTTP, guardarlas en colecciones y ejecutarlas contra distintos entornos: el mismo «listado de pedidos» apunta a una URL local durante el desarrollo y a otra al preparar una demostración. No es un servidor ni una herramienta de generación de API: es el sitio donde se prueban peticiones y se conservan ejemplos de respuesta.

## Para qué sirve

Sirve para explorar un endpoint antes de escribir código de cliente. Se prueba un token, se cambia un parámetro, se observa el cuerpo devuelto y se guarda el caso útil para el resto del equipo. También permite encadenar peticiones en una colección: primero autenticar, después usar el token obtenido en las siguientes llamadas. Esa colección actúa como documentación viva mientras se negocia una API.

## Cuándo usarlo

Encaja durante el descubrimiento de una API ajena, en sesiones de depuración con la persona que la implementa y cuando se quiere compartir un conjunto de peticiones con personas que no trabajan en la terminal. Conviene guardar los secretos en variables de entorno y no pegarlos en el cuerpo de la petición.

## Cuándo no

No es la mejor opción si el equipo quiere revisar las peticiones en un pull request como texto plano: parte de la información vive en el espacio de trabajo de la herramienta. Tampoco sustituye a las pruebas automáticas: una colección ejecutada a mano no detecta una regresión en la integración continua. Para eso hacen falta pruebas con aserciones.

## Alternativas

Bruno es la alternativa directa y guarda sus colecciones como archivos de texto en el repositorio, lo que facilita versionarlas y revisarlas. Postman resulta cómodo cuando se valora la interfaz, la colaboración en el equipo y ejemplos compartidos sin montar un flujo de archivos. Bruno encaja mejor cuando la prioridad es que cada cambio en una petición pase por Git. La comparativa Bruno frente a Postman recoge los criterios de decisión.

## Ejemplo

Una colección con dos peticiones: `POST /login`, que guarda el token devuelto en una variable del entorno, y `GET /pedidos`, que usa esa variable en la cabecera `Authorization`. Al cambiar el entorno de local a preproducción, las dos peticiones apuntan a otra URL base sin editar ninguna.

## Matices

La distinción útil es entre explorar y verificar. Explorar en Postman es rápido y visual; verificar de forma repetible exige exportar esas peticiones a una prueba o a un script que pueda ejecutar la integración continua.
