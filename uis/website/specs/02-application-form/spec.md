# SPEC-002 — HealthCore Application Form

**Proyecto:** HealthCore Digital  
**Ubicación:** `uis/website/specs/02-application-form/spec.md`  
**Estado:** Propuesta de especificación para aprobación  
**Fecha:** 2026-10-24

## 1. Objetivo

Construir un formulario de registro de demostración para HealthCore Digital en `uis/website/application.html`, accesible, responsive y validado mediante `uis/website/validation.js`. El formulario recogerá seis campos definidos en esta especificación y simulará el envío sin transmitir ni almacenar los datos.

La finalidad de «registro» es la denominación funcional adoptada para el ejercicio; no supone la creación real de una cuenta, una cita médica ni una solicitud clínica.

## 2. Alcance

**Incluye:** estructura HTML5 semántica; seis campos; etiquetas y agrupaciones accesibles; tipos y restricciones HTML adecuados; diseño Tailwind mobile-first; validación en tiempo real y al enviar; mensajes específicos por error; estados visuales y accesibles; prevención de envío inválido; confirmación local de éxito; botones de envío y restablecimiento; navegación hacia la landing.

**Excluye:** backend, bases de datos, persistencia, transmisión real, autenticación, citas médicas, integración EHR/CRM y recopilación de información clínica.

## 3. Definición de campos

| Campo | Elemento HTML | Obligatorio | Restricciones |
|---|---|---|---|
| Nombre | `<input type="text">` | Sí | De 2 a 100 caracteres, contando el valor sin espacios iniciales y finales. |
| Correo electrónico | `<input type="email">` | Sí | Formato de correo electrónico válido. |
| Teléfono | `<input type="tel">` | Sí | Entre 9 y 15 dígitos, admitiendo un `+` inicial opcional y separadores habituales como espacios, guiones y paréntesis. Los separadores no cuentan como dígitos. |
| Fecha de nacimiento | `<input type="date">` | Sí | Fecha válida, no posterior al día actual. |
| Edad | `<input type="number">` | Sí | Número entero entre 0 y 120, ambos inclusive. |
| Comentarios | `<textarea>` | No | Máximo 500 caracteres. |

**Decisión de diseño:** se mantienen tanto fecha de nacimiento como edad para practicar controles HTML diferentes, aunque representan información redundante. No se exige verificar su coherencia mutua en esta versión.

Los campos deben presentar etiquetas en español. El texto de ayuda y los mensajes de error también estarán en español.

## 4. Requisitos funcionales

| ID | Requisito | Criterio de aceptación |
|---|---|---|
| RF-001 | Página del formulario | `application.html` contiene `<!DOCTYPE html>`, `lang="es"`, título descriptivo y regiones semánticas. |
| RF-002 | Campos del formulario | Aparecen exactamente los seis campos de la sección 3, con sus tipos, nombres visibles y obligatoriedad. |
| RF-003 | Etiquetado y agrupación | Cada campo tiene un `<label>` asociado mediante `for` e `id`; se utilizan `<fieldset>` y `<legend>` para grupos relacionados cuando corresponda. |
| RF-004 | Restricciones HTML | Se emplean `required`, `minlength`, `maxlength`, `min`, `max` y otros atributos cuando sean aplicables, complementados con JavaScript para las reglas que HTML no cubra por sí solo. |
| RF-005 | Envío y reinicio | Existen botones claramente identificados para enviar y restablecer el formulario. |
| RF-006 | Validación dinámica | `validation.js` valida cada campo al perder el foco o durante la edición, y siempre antes del envío. |
| RF-007 | Errores específicos | Se muestran mensajes distintos para campos vacíos, formato inválido, longitudes fuera de rango, fechas futuras y números fuera de rango, según corresponda. |
| RF-008 | Estado visual y accesible | Los campos inválidos muestran estilos de error, `aria-invalid` y asociación con mensajes mediante `aria-describedby` cuando proceda. |
| RF-009 | Bloqueo de envío inválido | El formulario no muestra confirmación de éxito mientras exista algún error; el usuario recibe indicaciones para corregirlo. |
| RF-010 | Confirmación de éxito | Cuando todos los campos son válidos, aparece un mensaje de éxito que indique claramente que es una simulación local, sin envío ni almacenamiento real. |
| RF-011 | Reinicio consistente | El botón de restablecimiento limpia valores, errores, estilos de error y mensajes de estado. |
| RF-012 | Navegación | Existe un enlace de regreso a `index.html`; la landing mantiene un enlace funcional a `application.html`. |

## 5. Requisitos no funcionales

| ID | Requisito | Criterio de aceptación |
|---|---|---|
| RNF-001 | Tailwind | Se utilizan clases Tailwind, reutilizando la carga ya existente en el proyecto. |
| RNF-002 | Mobile-first | El formulario es usable en móvil, tablet y escritorio, sin desbordamiento horizontal no deseado. |
| RNF-003 | Accesibilidad | Funciona con teclado, presenta foco visible, mensajes de error asociados y contraste suficiente. |
| RNF-004 | Mantenibilidad | La lógica de validación está centralizada en `validation.js`, sin dependencias adicionales innecesarias. |
| RNF-005 | Privacidad | Los datos introducidos no se envían, almacenan ni registran en consola. No se solicitan datos clínicos. |
| RNF-006 | Compatibilidad | Funciona en navegadores modernos servido como sitio estático en Codespaces. |
| RNF-007 | Coherencia visual | El idioma, la navegación y el diseño son coherentes con la landing page. |

## 6. Comportamiento y validación

1. Al cargar la página, el formulario muestra los seis campos y las indicaciones de obligatoriedad.
2. Durante la interacción, se valida cada campo al perder el foco o mientras se escribe. Los errores se actualizan al corregir el valor.
3. Un campo obligatorio vacío genera un mensaje que identifica el campo.
4. El nombre se valida después de eliminar espacios al inicio y al final para comprobar su longitud.
5. El teléfono se valida contando solo los dígitos, permitiendo los separadores descritos en la sección 3 y rechazando otros caracteres.
6. La fecha de nacimiento no puede estar en el futuro; la edad debe ser entera y estar en el intervalo indicado.
7. Los comentarios pueden quedar vacíos, pero no superar 500 caracteres.
8. Al intentar enviar, se validan todos los campos. Si hay errores, se impide la confirmación y se muestran las correcciones necesarias.
9. Si todos los datos son válidos, se impide el envío HTTP real y se muestra: «Formulario validado correctamente. Envío simulado: no se han enviado ni guardado datos».
10. Al restablecer, desaparecen los valores, errores y mensajes de éxito anteriores.

## 7. Criterios de aceptación y pruebas

- **CA-001:** se visualizan los seis campos definidos, con etiquetas correctamente asociadas.
- **CA-002:** los cinco campos obligatorios rechazan valores vacíos.
- **CA-003:** el nombre rechaza menos de 2 o más de 100 caracteres después de quitar espacios exteriores.
- **CA-004:** el correo rechaza formatos inválidos.
- **CA-005:** el teléfono acepta de 9 a 15 dígitos con separadores permitidos y rechaza longitudes o caracteres inválidos.
- **CA-006:** la fecha rechaza valores inexistentes o futuros.
- **CA-007:** la edad rechaza decimales, valores negativos y valores mayores de 120.
- **CA-008:** comentarios admite vacío o hasta 500 caracteres, pero no más.
- **CA-009:** los errores son específicos, visibles y accesibles, y desaparecen cuando el dato se corrige.
- **CA-010:** no se confirma un formulario inválido.
- **CA-011:** un formulario válido muestra confirmación local, sin petición de red de envío ni almacenamiento.
- **CA-012:** el botón de restablecimiento devuelve el formulario al estado inicial.
- **CA-013:** el formulario es navegable por teclado y usable en móvil, tablet y escritorio.
- **CA-014:** los enlaces de ida y vuelta entre landing y formulario funcionan.

## 8. Decisiones y dependencias

**Definidas para esta versión:** seis campos de la sección 3; idioma español; validación con JavaScript; simulación local sin backend ni almacenamiento; coherencia visual con la landing.

**Pendiente de confirmación solo si el briefing exige algo adicional:** comprobar si `BRIEFING.md` contiene una finalidad específica, otros campos o textos de privacidad obligatorios. En caso de conflicto, revisar esta especificación antes de implementar. No añadir casillas de consentimiento ni afirmaciones legales sin requisitos confirmados.

## 9. Criterio de cierre

SPEC-002 se considerará satisfecha cuando los requisitos RF-001 a RF-012 y RNF-001 a RNF-007 estén implementados, los criterios CA-001 a CA-014 se hayan verificado y los resultados se registren en `tasks.md`. Cualquier excepción o limitación deberá quedar documentada antes del cierre.
