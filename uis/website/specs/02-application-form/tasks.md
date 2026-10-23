# TASKS-002 — HealthCore Application Form

**Proyecto:** HealthCore Digital  
**Especificación:** `specs/02-application-form/spec.md` (SPEC-002)  
**Plan:** `specs/02-application-form/plan.md` (PLAN-002)  
**Ubicación prevista:** `uis/website/specs/02-application-form/tasks.md`  
**Estado:** Implementado; validación visual/manual pendiente
**Fecha:** 2026-10-24

## Instrucciones de ejecución

- Ejecutar en orden y solo dentro del alcance autorizado.
- Marcar `[x]` únicamente después de verificar el resultado; mantener pendientes los pasos sin evidencia.
- Seguir `AGENTS.md`, `CONTEXT.md`, memory bank, reglas, skills y README aplicables.
- Utilizar los seis campos y las reglas de SPEC-002; no inventar otros campos ni funciones de backend.
- Si `BRIEFING.md` está disponible y contradice SPEC-002, informar antes de implementar los puntos afectados.
- No crear archivos adicionales, publicar servicios ni realizar commits sin autorización.
- Las casillas de inspección previamente completadas se conservan; las nuevas verificaciones quedan pendientes.

## Fase 0. Preparación y decisiones

### T-001 — Inspeccionar el estado del formulario

- [x] Leer instrucciones del repositorio y SPEC-002 / PLAN-002 en la inspección inicial.
- [x] Revisar `application.html`, `validation.js`, `index.html` y estilos actuales.
- [x] Documentar que la versión inicial de la especificación no definía los campos.
- [x] Enumerar archivos a modificar y solicitar autorización antes de implementar.
- [x] Revisar la nueva SPEC-002 y PLAN-002 y detectar posibles conflictos con el briefing si está disponible.

**Evidencia:** no existe `BRIEFING.md`; la especificación actualizada define los seis campos. No se encontraron discrepancias adicionales en los documentos revisados. La solicitud explícita de implementación autoriza el alcance actual de SPEC-002.  
**Referencia:** PLAN-002 §2.

### T-002 — Confirmar requisitos de contenido

- [x] Definir la finalidad como formulario de registro **de demostración**, sin crear cuentas ni citas reales.
- [x] Definir seis campos: nombre, correo, teléfono, fecha de nacimiento, edad y comentarios.
- [x] Definir tipos, obligatoriedad y restricciones según SPEC-002 §3.
- [x] Definir idioma español y envío simulado sin almacenamiento ni transmisión.
- [x] Contrastar con `BRIEFING.md` si existe; registrar cualquier discrepancia.
- [x] Obtener aprobación de SPEC-002 y PLAN-002 antes de implementar.

**Evidencia:** no se encontró `BRIEFING.md`; el usuario autorizó explícitamente implementar los campos y el comportamiento definidos en SPEC-002. No se añadieron campos, consentimiento ni tratamiento de datos ajenos a esa especificación.  
**Requisitos:** RF-002, RF-004, RF-010, RNF-005.

## Fase 1. Estructura y diseño

### T-003 — Preparar estructura HTML5

- [x] Completar `application.html` con HTML5, `lang="es"`, metadatos y regiones semánticas.
- [x] Incluir título y explicación de que se trata de un formulario de demostración.
- [x] Añadir `form` con identificador estable.
- [x] Verificar jerarquía de encabezados y estructura válida.

**Verificación:** HTMLParser comprobó estructura balanceada, un formulario y controles requeridos.  
**Requisitos:** RF-001, RNF-007. **Aceptación:** CA-001.

### T-004 — Incorporar los seis campos

- [x] Nombre: `text`, obligatorio, 2–100 caracteres tras `trim()`.
- [x] Correo: `email`, obligatorio, formato válido.
- [x] Teléfono: `tel`, obligatorio, 9–15 dígitos, prefijo `+` opcional y separadores permitidos.
- [x] Fecha de nacimiento: `date`, obligatoria, válida y no futura.
- [x] Edad: `number`, obligatoria, entero de 0 a 120.
- [x] Comentarios: `textarea`, opcional, máximo 500 caracteres.
- [x] Añadir `id`, `name` y `label for` a cada campo; `required`, `min`, `max`, `step` y límites cuando corresponda.
- [x] Agrupar campos relacionados con `fieldset`/`legend` cuando aporte semántica; no se necesitó agrupar controles independientes.

**Verificación:** los seis tipos, obligatoriedad, límites HTML, labels y referencias accesibles coinciden con SPEC-002.  
**Requisitos:** RF-002, RF-003, RF-004. **Aceptación:** CA-001 a CA-008.

### T-005 — Añadir acciones y regiones de mensajes

- [x] Incluir botones `type="submit"` y `type="reset"`.
- [x] Reservar mensaje de error identificable para cada campo.
- [x] Asociar errores mediante `aria-describedby` y preparar `aria-invalid`.
- [x] Crear región accesible para confirmación local, inicialmente vacía.
- [x] Añadir enlace de regreso a `index.html`.

**Verificación:** inspección estática confirma botones, región `role="status"`, referencias de error y enlaces de retorno.  
**Requisitos:** RF-005, RF-008, RF-010, RF-012. **Aceptación:** CA-001, CA-009, CA-014.

### T-006 — Aplicar Tailwind responsive

- [x] Reutilizar Tailwind y convenciones visuales de la landing.
- [x] Aplicar diseño mobile-first y breakpoints cuando proceda.
- [x] Diseñar estados de foco, error y ayuda distinguibles, no solo por color.
- [ ] Verificar en móvil, tablet y escritorio, sin desbordamientos.

**Verificación:** estilos responsive, foco y error presentes en el código. La revisión visual a 375, 768 y 1440 px sigue pendiente porque el contenedor no dispone de navegador/Playwright.  
**Requisitos:** RNF-001, RNF-002, RNF-003, RNF-007. **Aceptación:** CA-013.

## Fase 2. Validación y comportamiento

### T-007 — Implementar validadores en `validation.js`

- [x] Vincular el script e inicializarlo sin errores de sintaxis.
- [x] Validar nombre recortado: 2–100 caracteres.
- [x] Validar correo electrónico obligatorio y con formato válido.
- [x] Validar teléfono: caracteres permitidos y 9–15 dígitos.
- [x] Validar fecha real y no futura; actualizar el límite según fecha actual.
- [x] Validar edad como entero de 0 a 120.
- [x] Validar comentarios opcionales con máximo 500 caracteres.
- [x] Centralizar la lógica para evitar duplicación y no registrar datos personales.

**Verificación:** `node --check` y pruebas aisladas para límites e inválidos: nombre 1/2/100/101; teléfono 8/9/15/16 y caracteres permitidos; edad -1/0/120/121/decimal; comentarios 0/500/501; correo inválido/válido; fecha inexistente, actual, válida y futura.  
**Requisitos:** RF-004, RF-006, RF-007, RNF-004. **Aceptación:** CA-002 a CA-008.

### T-008 — Validación en tiempo real y errores accesibles

- [x] Validar al perder el foco y actualizar al corregir el dato.
- [x] Mostrar mensajes específicos para obligatoriedad, formato y límites.
- [x] Aplicar estados visuales y `aria-invalid` coherentes.
- [x] Asociar cada error al control con `aria-describedby`.
- [x] Eliminar errores cuando el campo vuelve a ser válido.
- [ ] Comprobar navegación por teclado y foco visible.

**Verificación:** pruebas de eventos `focusout`/`input` y atributos accesibles en arnés aislado; revisión real de teclado en navegador pendiente.  
**Requisitos:** RF-006, RF-007, RF-008, RNF-003. **Aceptación:** CA-009, CA-013.

### T-009 — Bloquear envío inválido y simular éxito

- [x] Interceptar `submit` y ejecutar `preventDefault()`.
- [x] Validar todos los campos, aunque no se hayan tocado.
- [x] Mostrar errores y enfocar el primer control inválido cuando corresponda.
- [x] No mostrar éxito si hay errores.
- [x] Mostrar confirmación explícita de simulación si todos los valores son válidos.
- [x] Comprobar que no hay transmisión, persistencia ni logs de datos personales.

**Verificación:** arnés funcional confirma bloqueo/foco y éxito local. Revisión del código confirma que no usa red, almacenamiento ni consola; no se hizo inspección de red en navegador.  
**Requisitos:** RF-009, RF-010, RNF-005. **Aceptación:** CA-010, CA-011.

### T-010 — Implementar restablecimiento

- [x] Restablecer los seis controles con `type="reset"`.
- [x] Limpiar errores, `aria-invalid` y estados visuales.
- [x] Ocultar o vaciar la confirmación anterior.
- [ ] Comprobar nuevo ciclo de cumplimentación y envío.

**Verificación:** limpieza de estados tras error y éxito en arnés aislado; falta repetir el ciclo completo en navegador.  
**Requisito:** RF-011. **Aceptación:** CA-012.

## Fase 3. Integración y cierre

### T-011 — Verificar navegación, accesibilidad y responsive

- [x] Confirmar enlace desde `index.html` a `application.html`.
- [x] Confirmar enlace de regreso a la landing.
- [x] Revisar labels, agrupaciones y atributos accesibles.
- [x] Verificar en código y arnés los errores y la confirmación accesibles.
- [ ] Revisar diseño a 375, 768 y 1440 px o equivalentes.

**Verificación:** enlaces y atributos comprobados estáticamente; revisión visual y de teclado en navegador pendiente.  
**Requisitos:** RF-003, RF-008, RF-012, RNF-002, RNF-003. **Aceptación:** CA-009, CA-013, CA-014.

### T-012 — Ejecutar pruebas de aceptación

- [x] Iniciar `npx http-server ./uis/website -p 3000 -a 0.0.0.0` desde la raíz.
- [ ] Verificar CA-001 a CA-014 y registrar resultado de cada criterio.
- [x] Probar casos límite: nombre 1/2/100/101; teléfono 8/9/15/16; edad -1/0/120/121 y decimales; comentarios 0/500/501.
- [x] Probar fecha inválida/futura, correo inválido, envío bloqueado, éxito simulado y reset.
- [x] Distinguir pruebas automáticas, manuales y no ejecutadas; no equiparar HTTP 200 a validación funcional.

**Verificación:** HTTP local entrega `application.html` y `validation.js`; pruebas funcionales aisladas cubren límites y flujos. CA-013 visual/teclado permanece pendiente.  
**Requisitos:** RF-001 a RF-012, RNF-001 a RNF-007. **Aceptación:** CA-001 a CA-014.

### T-013 — Documentar y cerrar

- [ ] Revisar matriz de trazabilidad y requisitos de SPEC-002.
- [x] Actualizar casillas y evidencias sin declarar pruebas no realizadas.
- [x] Actualizar `memory-bank/progress.md` conforme a las reglas.
- [ ] Resumir archivos modificados, pruebas y limitaciones.
- [ ] Solicitar aprobación antes de cualquier commit.

**Verificación:** trazabilidad y revisión final.  
**Referencia:** PLAN-002 §8.

## Matriz de trazabilidad

| Requisito | Tarea(s)            |
| --------- | ------------------- |
| RF-001    | T-003, T-012        |
| RF-002    | T-002, T-004, T-012 |
| RF-003    | T-004, T-011        |
| RF-004    | T-004, T-007        |
| RF-005    | T-005               |
| RF-006    | T-007, T-008        |
| RF-007    | T-007, T-008        |
| RF-008    | T-005, T-008, T-011 |
| RF-009    | T-009, T-012        |
| RF-010    | T-005, T-009        |
| RF-011    | T-010, T-012        |
| RF-012    | T-005, T-011        |
| RNF-001   | T-006               |
| RNF-002   | T-006, T-011        |
| RNF-003   | T-006, T-008, T-011 |
| RNF-004   | T-007               |
| RNF-005   | T-009               |
| RNF-006   | T-012               |
| RNF-007   | T-003, T-006        |

**Cierre:** la definición de los seis campos ya está resuelta en SPEC-002. La implementación sigue sujeta a la aprobación de los documentos y a la revisión de cualquier conflicto con `BRIEFING.md` si se facilita. Ninguna tarea se declara completada sin verificación.
