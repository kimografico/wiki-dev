---
titulo: "XSS"
resumen: "Inyección de JavaScript en una página visitada por otros usuarios; se evita escapando datos y limitando HTML dinámico."
categoria: concepto
tags: ["seguridad"]
alias: ["Cross-Site Scripting"]
relacionados: [vulnerabilidad, cwe, dompurify, ciberseguridad]
fuentes: ["https://owasp.org/www-community/attacks/xss/"]
autoenlace: true
---
## Definición

Cross-Site Scripting (XSS) es una **Vulnerabilidad** que introduce JavaScript en una página que ejecutan otros usuarios. El navegador no distingue ese script del escrito por el desarrollador: ambos corren con los permisos de la víctima. La clasificación con **CWE** agrupa esta familia de debilidades.

## Por qué importa

Convierte datos en código. Si un comentario se inserta sin escapar en el **DOM**, quien lo escribió puede leer cookies o **localStorage**, llamar a una **API** con el token de la víctima o alterar la interfaz para engañarla. El impacto depende del contexto: en el panel de administración puede cambiar datos reales. Regla: tratar toda entrada como texto salvo en puntos diseñados para HTML.

## Ejemplo

```js
// Inseguro: el navegador interpreta la etiqueta.
contenedor.innerHTML = comentario;
// Seguro: el texto se muestra, no se ejecuta.
contenedor.textContent = comentario;
```

Cuando hace falta HTML enriquecido, se sanea con una librería específica antes de insertarlo.

## Se confunde con

Con CSRF y con la inyección SQL. En CSRF no se ejecuta código del atacante: se fuerza una acción con la sesión ya autenticada de la víctima. En la inyección SQL el destino es la base de datos, no el navegador. Tampoco es lo mismo escapar que sanear: escapar convierte caracteres en texto; sanear recorta el HTML a un conjunto seguro. Un **Linter** avisa de patrones conocidos, pero no sustituye la revisión del punto exacto de inserción.
