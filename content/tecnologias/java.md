---
titulo: "Java"
resumen: "Lenguaje y plataforma que compila a bytecode y ejecuta en JVM; habitual en servicios de servidor."
categoria: lenguaje
tags: ["backend"]
alias: []
relacionados: [cobol, typescript, poo, tipos]
alternativas: []
web: "https://www.java.com/"
fuentes:
  - "https://docs.oracle.com/javase/tutorial/getStarted/intro/definition.html"
  - "https://docs.oracle.com/javase/specs/jvms/se21/html/jvms-1.html"
  - "https://www.java.com/en/about/"
  - "https://www.java.com/en/download/faq/java_javascript.xml"
  - "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Introduction"
  - "https://jakarta.ee/about/"
autoenlace: true
---

## Qué es

Java es un lenguaje y una plataforma a la vez. El código fuente se escribe en archivos `.java`, se compila con `javac` a archivos `.class` y esos archivos contienen bytecode: instrucciones de la Java Virtual Machine, no código nativo del procesador. La JVM conoce el formato de esos archivos, no el lenguaje Java. Java no es JavaScript: Oracle lo dice explícitamente y MDN recuerda que JavaScript no tiene el tipado estático de Java.

## Para qué sirve

Oracle lo describe como una opción para desarrollar aplicaciones de servidor —foros, tiendas, formularios HTML— y java.com resume la idea de escribir en una plataforma y ejecutar en otra. Jakarta EE agrupa especificaciones para aplicaciones empresariales. En la práctica, el fuente se convierte en bytecode y la JVM lo ejecuta; por eso el mismo programa corre en sistemas distintos sin recompilar para cada procesador.

## Cuándo usarla

Cuando el proyecto va a largo plazo, necesita tipos estáticos y se despliega en servidores o entornos empresariales. También encaja cuando interesa separar el bytecode de la máquina concreta y mantener una base de código compartida entre sistemas operativos.

## Cuándo no

Como criterio práctico, no es la herramienta para scripts pequeños: compilar y arrancar una JVM añade pasos frente a un script interpretado. Tampoco es la opción para código que debe ejecutarse directamente en el navegador: Java y JavaScript son tecnologías distintas, y el lenguaje del navegador es JavaScript.

## Ejemplo

```java
public class Saludo {
  public static void main(String[] args) {
    System.out.println("Hola");
  }
}
```

`javac Saludo.java` produce `Saludo.class`; `java Saludo` ejecuta ese bytecode en la JVM. El resultado no es un ejecutable nativo.
