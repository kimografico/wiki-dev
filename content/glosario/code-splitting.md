---
titulo: "Code splitting"
resumen: "Técnica de dividir el código en fragmentos que se cargan solo cuando se necesitan."
categoria: rendimiento-ux
tags: ["frontend","rendimiento"]
alias: []
relacionados: [lazy-load, tree-shaking, bundler, core-web-vitals]
fuentes: []
autoenlace: true
---
## Definición

El code splitting es la técnica de dividir el código en fragmentos que se cargan solo cuando se necesitan. En lugar de entregar un único archivo con toda la aplicación, el empaquetador genera varios y el navegador pide el correspondiente al entrar en una ruta o al abrir un componente pesado.

## Por qué importa

Reduce el JavaScript inicial y mejora las métricas de carga, sobre todo en rutas que muchos usuarios nunca visitan. Un panel de administración con gráficos no tiene por qué descargarse en la página de inicio. El coste es la complejidad: hay que elegir el punto de corte y prever un estado de carga mientras llega el fragmento, para que la interfaz no parezca rota.

## Ejemplo

```js
const Panel = () => import('./Panel.js');
// El navegador descarga Panel.js solo al llamar a Panel()
```

Con `import()` dinámico el empaquetador reconoce el límite y crea un fragmento separado.

## Se confunde con

Con tree shaking: dividir cambia cuándo se descarga; eliminar código muerto cambia cuánto se descarga. Tampoco es carga diferida en sentido amplio: cargar una imagen bajo demanda también difiere trabajo, pero no implica separar el paquete de JavaScript.
