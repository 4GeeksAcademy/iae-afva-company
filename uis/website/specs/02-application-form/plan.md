# PLAN-002 — HealthCore Application Form

**Proyecto:** HealthCore Digital  
**Especificación:** `specs/02-application-form/spec.md` (SPEC-002)  
**Ubicación:** `uis/website/specs/02-application-form/plan.md`  
**Estado:** Propuesto, pendiente de aprobación  
**Fecha:** 2026-10-24

## 1. Objetivo y estrategia

Implementar el formulario de registro **de demostración** definido en SPEC-002, con seis campos, validación accesible en cliente y envío simulado. La solución utiliza `application.html` para estructura y estilos Tailwind, y `validation.js` para las validaciones y los estados interactivos. No requiere backend, almacenamiento, servicios externos ni nuevas dependencias.

El formulario **no** crea cuentas, gestiona citas ni recoge datos clínicos. El texto de éxito debe dejar claro que no se ha enviado ni guardado información.

## 2. Preparación y alcance

Antes de modificar código:

1. Leer `AGENTS.md`, `CONTEXT.md`, reglas y skills aplicables, `memory-bank/`, `uis/website/README.md` y SPEC-002.
2. Inspeccionar `application.html`, `validation.js` e `index.html` para reutilizar convenciones, Tailwind y navegación.
3. Contrastar el alcance con `BRIEFING.md` **si está disponible**. Si exige campos o tratamientos distintos, informar y solicitar revisión de SPEC-002; no inventar requisitos.
4. Confirmar autorización de implementación conforme a las reglas del repositorio.

### Archivos previstos

| Archivo | Modificación prevista |
|---|---|
| `uis/website/application.html` | HTML semántico, seis campos, etiquetas, agrupaciones, estilos, botones y regiones de mensajes. |
| `uis/website/validation.js` | Reglas de validación, feedback, bloqueo de envío, confirmación simulada y reset. |
| `uis/website/index.html` | Solo si es necesario y autorizado para ajustar el enlace o texto del CTA. |
| `uis/website/specs/02-application-form/tasks.md` | Evidencias y estado de ejecución. |
| `memory-bank/progress.md` | Avances verificados según las reglas aplicables. |
| `uis/website/README.md` | Solo si se necesita documentar ejecución o pruebas. |

No crear otros archivos ni modificar configuraciones sin autorización.

## 3. Diseño de `application.html`

### 3.1 Estructura y accesibilidad

- Documento HTML5 con `lang="es"`, `head` completo, un `main`, título `h1` y navegación de regreso a `index.html`.
- Formulario con `id` estable y `novalidate` **siempre que** JavaScript implemente y anuncie todos los errores requeridos; así se evitan mensajes nativos inconsistentes con los personalizados.
- Etiquetas `label[for]` asociadas a cada control mediante `id`; cada control con `name`.
- Agrupar datos personales con `fieldset` y `legend` cuando mejore la semántica. No agrupar artificialmente un único control.
- Indicaciones claras de campos obligatorios. No utilizar únicamente color para señalar errores.
- Reservar una zona de error por control con `id` propio, vinculada mediante `aria-describedby`; actualizar `aria-invalid` al validar.
- Reservar una región de estado para confirmación (`role="status"` o `aria-live="polite"`).
- Botones `type="submit"` y `type="reset"`.

### 3.2 Controles y atributos

| Campo | HTML | Obligatorio | Atributos y comportamiento |
|---|---|---|---|
| Nombre | `input type="text"` | Sí | `required`, `maxlength="100"`; validar longitud 2–100 tras `trim()`; `minlength` puede complementar, pero no sustituye la validación del valor recortado. |
| Correo electrónico | `input type="email"` | Sí | `required`, validación de formato mediante semántica HTML y JS. |
| Teléfono | `input type="tel"` | Sí | `required`, `autocomplete="tel"`; permitir `+` inicial y espacios, guiones o paréntesis; contar 9–15 dígitos reales. |
| Fecha de nacimiento | `input type="date"` | Sí | `required`; establecer `max` con la fecha local actual y comprobar fecha válida/no futura en JS. |
| Edad | `input type="number"` | Sí | `required`, `min="0"`, `max="120"`, `step="1"`; comprobar entero. |
| Comentarios | `textarea` | No | `maxlength="500"`; aceptar vacío, rechazar más de 500 caracteres en validación. |

**Nota de alcance:** edad y fecha de nacimiento se validan individualmente; SPEC-002 no exige comprobar que coincidan entre sí. Los límites de atributos HTML no sustituyen la verificación en JavaScript y las pruebas de aceptación.

### 3.3 Diseño Tailwind

- Reutilizar la carga de Tailwind y las convenciones de la landing.
- Diseño mobile-first: una columna en móvil y distribución `md:`/`lg:` solo donde mejore legibilidad.
- Estados `focus-visible` perceptibles, tamaños de control cómodos, textos de ayuda y errores claramente visibles.
- Evitar desbordamientos a 375, 768 y 1440 px (o dimensiones equivalentes).

## 4. Diseño de `validation.js`

### 4.1 Organización

- Inicializar la lógica cuando el DOM esté disponible; localizar el formulario y controles por `id`/`name`, sin depender de clases Tailwind.
- Centralizar reglas en funciones pequeñas por tipo de campo o en un mapa de validadores.
- Separar **validar valor**, **mostrar/limpiar error** y **gestionar eventos** para evitar duplicación.
- No imprimir valores personales en consola, `localStorage`, cookies ni servicios externos.

### 4.2 Reglas y mensajes

| Campo | Casos inválidos | Ejemplo de mensaje en español |
|---|---|---|
| Nombre | Vacío; menos de 2 o más de 100 caracteres sin espacios exteriores | «Introduce tu nombre» / «El nombre debe tener entre 2 y 100 caracteres». |
| Correo electrónico | Vacío; formato inválido | «Introduce tu correo electrónico» / «Introduce un correo electrónico válido». |
| Teléfono | Vacío; caracteres no permitidos; menos de 9 o más de 15 dígitos | «Introduce tu teléfono» / «Introduce entre 9 y 15 dígitos; puedes usar prefijo internacional». |
| Fecha de nacimiento | Vacía; fecha inválida; fecha futura | «Selecciona tu fecha de nacimiento» / «La fecha no puede ser futura». |
| Edad | Vacía; no entera; fuera de 0–120 | «Introduce tu edad» / «La edad debe ser un número entero entre 0 y 120». |
| Comentarios | Más de 500 caracteres | «Los comentarios no pueden superar 500 caracteres». |

El teléfono acepta exclusivamente dígitos, un `+` opcional al principio y separadores habituales (espacios, guiones y paréntesis); la validación debe rechazar letras y símbolos distintos. Una fecha inexistente no debe tratarse como válida.

### 4.3 Interacción y envío

1. Validar un campo al perder el foco (`blur`) y actualizar errores ya mostrados mientras se corrige (`input` o `change`).
2. Enviar (`submit`): ejecutar `preventDefault()`, validar **todos** los campos y mostrar errores específicos. Si hay alguno, enfocar el primer control inválido y no mostrar éxito.
3. Si todo es válido, mostrar exactamente o con significado equivalente: «Formulario validado correctamente. Envío simulado: no se han enviado ni guardado datos».
4. Reiniciar (`reset`): permitir restablecer los valores y limpiar errores, `aria-invalid` y mensaje de éxito tras el reset nativo.
5. La simulación nunca ejecutará un envío HTTP ni guardará datos.

## 5. Pruebas y aceptación

| Prueba | Evidencia requerida | SPEC-002 |
|---|---|---|
| Presencia de seis controles, tipos, labels y agrupaciones | Inspección del DOM | CA-001 |
| Obligatorios vacíos | Error específico por cada uno | CA-002 |
| Nombre 1, 2, 100 y 101 caracteres, con espacios exteriores | Límites aplicados tras `trim()` | CA-003 |
| Correo válido e inválido | Formato comprobado | CA-004 |
| Teléfono 8, 9, 15, 16 dígitos; prefijo y separadores; letras | Reglas comprobadas | CA-005 |
| Fecha vacía, inexistente, actual y futura | No se acepta fecha inválida/futura | CA-006 |
| Edad -1, 0, 120, 121 y decimal | Solo enteros 0–120 | CA-007 |
| Comentarios vacíos, 500 y 501 caracteres | Límite comprobado | CA-008 |
| Corregir errores y recorrer con teclado | Mensajes y foco accesibles | CA-009, CA-013 |
| Envío inválido y válido | Sin éxito en inválido; confirmación simulada en válido; sin envío de red | CA-010, CA-011 |
| Reset tras errores y éxito | Estado inicial restaurado | CA-012 |
| CTA landing y enlace de retorno | Navegación funcional | CA-014 |
| Responsive | Inspección en móvil, tablet y escritorio | CA-013 |

Ejecutar desde la raíz del repositorio:

```bash
npx http-server ./uis/website -p 3000 -a 0.0.0.0
```

Registrar separadamente comprobaciones estáticas, pruebas funcionales y validación visual. Un HTTP 200 **no** demuestra que el formulario funcione.

## 6. Riesgos y decisiones

- **Briefing:** si `BRIEFING.md` contiene requisitos incompatibles con SPEC-002, detener la parte afectada y solicitar decisión; no añadir campos silenciosamente.
- **Privacidad:** nombre, correo, teléfono y fecha de nacimiento son datos personales; no persistir, transmitir ni registrar valores.
- **Falsa confirmación:** nunca presentar el éxito como un registro real.
- **Limitaciones de HTML:** restricciones como `maxlength` pueden impedir introducir un valor superior al límite; complementar con pruebas de validadores para comprobar el rechazo de entradas fuera de rango.
- **Validación dinámica:** evitar errores agresivos antes de la primera interacción; garantizar verificación completa al enviar.
- **Permisos:** implementar solo tareas autorizadas, no publicar puertos ni hacer commits sin aprobación.

## 7. Secuencia de implementación

1. Revisar repositorio, SPEC-002 y posibles conflictos con briefing.
2. Confirmar alcance de los seis campos y autorización.
3. Construir HTML semántico y controles.
4. Incorporar botones, regiones de error y confirmación.
5. Aplicar Tailwind responsive.
6. Implementar validación por campo y mensajes accesibles.
7. Gestionar envío simulado y reset.
8. Ejecutar pruebas funcionales, visuales y de accesibilidad.
9. Documentar evidencias, actualizar tareas y memory bank; solicitar aprobación antes de commit.

## 8. Entregables

`application.html`, `validation.js`, evidencias de aceptación de CA-001 a CA-014, `tasks.md` actualizado y registro de progreso. No se añaden archivos ni servicios fuera del alcance sin autorización.
