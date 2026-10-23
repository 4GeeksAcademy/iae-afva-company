# Estado del proyecto

**Última actualización:** 2026-10-14

## Estado actual

El repositorio está en la fase de contexto y definición inicial de HealthCore Digital. Se dispone del briefing de empresa en `CONTEXT.md` y del resumen del proyecto en `memory-bank/projectbrief.md`.

La estructura actual corresponde a una plantilla: no hay aplicaciones ejecutables ni un runner de workspace configurado en la raíz. Existe el paquete `@repo/shared-types`, todavía sin scripts. No se ha seleccionado una iniciativa concreta entre las necesidades descritas por los departamentos.

## Completado

- Incorporado el contexto de HealthCore, sus departamentos, problemas y restricciones regulatorias.
- Creado el brief general de HealthCore Digital.
- Documentadas las convenciones técnicas conocidas y las decisiones que aún no están tomadas en `memory-bank/techContext.md`.

## Próximos pasos

1. Elegir y priorizar una iniciativa para el primer hito, con sus usuarios y problema principal.
2. Definir alcance, exclusiones, métricas de éxito y datos necesarios para esa iniciativa.
3. Revisar con Cumplimiento los requisitos de privacidad, acceso, auditoría y tratamiento de datos aplicables.
4. Elegir la arquitectura y el stack mínimos para el caso priorizado, registrando las decisiones antes de implementar.
5. Crear el primer entregable funcional y documentar cómo ejecutarlo y validarlo.

## Bloqueos y decisiones abiertas

- No hay iniciativa ni producto inicial seleccionado; por eso aún no se pueden fijar requisitos funcionales ni métricas objetivo.
- No están decididos la base de datos, el proveedor cloud, la autenticación, el frontend, el proveedor de IA ni el despliegue.
- No se ha iniciado la implementación de una aplicación; la recomendación de FastAPI del README sigue siendo una guía de la plantilla, no una decisión aprobada.

## Actualización de progreso

**Fecha:** 2026-10-14

**Resumen:** Añadida la skill `memory-bank-update` en `.agents/skills/` para registrar cambios reales del proyecto y decisiones confirmadas sin sobrescribir el historial.

**Próximos pasos:** Usar la skill al cerrar tareas que cambien de forma relevante el progreso o confirmen decisiones técnicas o arquitectónicas.

## Actualización de progreso

**Fecha:** 2026-10-23

**Resumen:** Creada la estructura inicial de la web pública en `uis/website/`: dos páginas HTML enlazadas, Tailwind por CDN, `validation.js` preparado y README con instrucciones de apertura. No se ha añadido CSS propio. El diseño, los campos y las reglas del formulario siguen pendientes; no hay envío ni almacenamiento de datos.

**Validación:** Comprobadas la sintaxis de JavaScript con `node --check` y la existencia de las referencias locales de ambas páginas. No se ha verificado la presentación en navegador ni la carga del CDN.

**Próximos pasos:** Definir el contenido de la landing y los campos de registro antes de desarrollar el diseño y las validaciones.

## Actualización de progreso

**Fecha:** 2026-10-23

**Resumen:** Añadidas a `uis/website/` las carpetas `assets/images`, `assets/icons`, `assets/fonts` y la estructura `specs/` para landing y formulario. Creados los seis archivos `spec.md`, `plan.md` y `tasks.md` vacíos solicitados; se conservaron los archivos y recursos existentes.

**Validación:** Confirmada la estructura con `find` y verificado que los seis archivos Markdown tienen 0 bytes.

## Actualización de progreso

**Fecha:** 2026-10-23

**Resumen:** Implementada en `uis/website/index.html` una landing informativa en español con navegación por secciones, contenido fiel al brief, enlace neutral al registro, footer sin contacto inventado y JSON-LD `Organization`. Se actualizó el checklist con los resultados comprobados y los pendientes.

**Validación:** HTML balanceado, un único `h1`, enlaces internos y locales válidos, JSON-LD parseable y petición HTTP 200 desde `npx http-server`. Las combinaciones de texto revisadas superan 4.5:1. No se verificó la presentación ni teclado en navegador porque no hay navegador/Playwright disponible.

**Próximos pasos:** Confirmar la finalidad del formulario y texto final del CTA, obtener datos públicos de contacto, completar pruebas visuales y de teclado y autorizar por separado la publicación pública temporal si se requiere.

## Actualización de progreso

**Fecha:** 2026-10-23

**Resumen:** Inspeccionados SPEC-002, PLAN-002 y la plantilla actual del formulario. No se encontró briefing con finalidad, campos, obligatoriedad ni restricciones; por tanto, la implementación del formulario queda bloqueada para evitar inventar datos personales o reglas.

**Próximos pasos:** Recibir el propósito y la lista aprobada de campos, tipos, obligatoriedad, restricciones, textos y requisitos de privacidad/consentimiento antes de implementar `application.html` y `validation.js`.

## Actualización de progreso

**Fecha:** 2026-10-23

**Resumen:** Implementado el formulario de demostración de HealthCore en `uis/website/application.html` con seis campos accesibles y diseño Tailwind responsive; `uis/website/validation.js` valida los campos, enfoca errores, simula el éxito local y limpia el estado al restablecer. No hay transmisión ni almacenamiento. La solicitud del usuario autorizó implementar la SPEC-002 actualizada; no existe `BRIEFING.md`.

**Validación:** comprobados estructura/labels/atributos, `node --check`, límites funcionales de los seis campos, corrección de errores, envío inválido y válido, reset e HTTP local de HTML/JS. No se realizó revisión visual, prueba real de teclado ni inspección de red en navegador por falta de navegador/Playwright.

**Próximos pasos:** completar revisión visual y de teclado, inspección de red y nuevo ciclo tras reset en navegador; documentar CA-013 antes de cerrar SPEC-002.
