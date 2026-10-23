# HealthCore Website

Estructura inicial de la web publica de HealthCore.

## Archivos

- `index.html`: base de la landing page.
- `application.html`: base del formulario de registro, todavia sin campos.
- `validation.js`: archivo preparado para implementar las validaciones.

## Tecnologia y ejecucion

HTML y JavaScript, con Tailwind CSS por CDN para desarrollo. Abre `index.html`
en un navegador; no requiere instalacion ni servidor. La carga de Tailwind
requiere conexion a Internet. Se incorporara `styles.css` solo si hace falta.

Para servir el sitio localmente desde la raiz del repositorio (por ejemplo, en
Codespaces), ejecuta:

```bash
npx http-server ./uis/website -p 3000 -a 0.0.0.0
```

Abre `http://localhost:3000`. En la primera ejecucion, `npx` puede solicitar
permiso para descargar `http-server` si no esta disponible.

## Pendiente

Definir el contenido, el diseno, los campos y sus reglas de validacion.
Esta estructura no envia ni almacena datos y no implementa registros reales.
