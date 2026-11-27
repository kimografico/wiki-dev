---
titulo: "Lockfile"
resumen: "Archivo generado por el gestor de paquetes que fija las versiones exactas de todo el árbol de dependencias para repetir la misma instalación."
categoria: concepto
tags: ["terminal"]
alias: ["archivo de bloqueo"]
relacionados: [paquete, dependencia, npm, pnpm, yarn, npm-pnpm-yarn, integracion-continua, dependabot]
fuentes:
  - "https://docs.npmjs.com/cli/v11/configuring-npm/package-lock-json"
  - "https://docs.npmjs.com/cli/v11/commands/npm-ci"
  - "https://docs.npmjs.com/about-semantic-versioning"
  - "https://pnpm.io/cli/install"
  - "https://pnpm.io/cli/import"
  - "https://classic.yarnpkg.com/en/docs/yarn-lock"
  - "https://doc.rust-lang.org/cargo/guide/cargo-toml-vs-cargo-lock.html"
autoenlace: true
---
## Definición

Un lockfile, o archivo de bloqueo, es el archivo que escribe el gestor de dependencias con la resolución exacta de cada paquete: versión, procedencia y firma de integridad. Se versiona para que otra persona, un despliegue y la integración continua instalen lo mismo. Se genera automáticamente; editarlo a mano rompe su finalidad.

## Por qué importa

`package.json` declara rangos como `^1.0.0`; el lockfile decide qué versión se usó. Sin él, dos instalaciones del mismo manifiesto pueden resolver árboles distintos. Fijar la resolución hace repetible la instalación y muestra en el diff qué dependencia cambió.

## Ejemplo

```bash
npm ci        # instala desde package-lock.json; no lo reescribe
npm install   # puede resolver y actualizar el lockfile
```

`npm ci` exige que el lockfile coincida con `package.json`; si no, falla en lugar de reescribirlo. Por eso es la orden habitual en integración continua.

## Un lockfile por gestor

npm escribe `package-lock.json`, pnpm `pnpm-lock.yaml`, Yarn `yarn.lock` y Cargo `Cargo.lock`. `pnpm import` puede crear uno a partir de otro, pero la documentación advierte que no es una conversión uno a uno.

## Se confunde con

- **Manifiesto**: declara rangos; el lockfile fija la resolución exacta.
- **`node_modules`**: contiene el código instalado y es desechable; el lockfile permite reconstruirlo.
- **`npm ci` frente a `npm install`**: el primero no modifica manifiesto ni lockfiles; el segundo sí puede actualizarlos.

Matiz: `npm-shrinkwrap.json` sí puede publicarse y prevalece sobre `package-lock.json`, que se ignora fuera de la raíz.
