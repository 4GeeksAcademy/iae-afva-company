# TASKS-001 — HealthCore Landing Page

**Proyecto:** HealthCore Digital  
**Especificación:** `specs/01-landing-page/spec.md` (SPEC-001)  
**Plan:** `specs/01-landing-page/plan.md` (PLAN-001)  
**Ubicación prevista:** `uis/website/specs/01-landing-page/tasks.md`  
**Estado:** Pendiente de aprobación y ejecución  
**Fecha:** 2026-10-24

## Instrucciones de ejecución

- Ejecutar en orden, salvo dependencias resueltas y aprobadas de otra forma.
- Marcar `[x]` **solo después de verificar** el resultado; registrar bloqueos sin declarar la tarea completada.
- Cumplir `AGENTS.md`, `CONTEXT.md`, reglas, skills y README aplicables.
- Antes de modificar código, inspeccionar los archivos existentes y obtener la aprobación requerida.
- No crear archivos/directorios adicionales ni modificar configuraciones críticas sin autorización.
- No realizar commits sin aprobación explícita.

## Fase 0. Preparación y decisiones

### T-001 — Inspeccionar el estado del proyecto

- [x] Leer instrucciones del repositorio, contexto, memory bank, reglas y skills aplicables.
- [x] Revisar `uis/website/README.md`, `index.html`, `application.html`, `validation.js` y recursos existentes.
- [x] Comprobar cómo se carga Tailwind y si ya existen secciones o navegación.
- [x] Enumerar archivos a modificar y solicitar autorización antes de implementar.

**Evidencia:** `index.html` es una plantilla mínima en español y carga Tailwind por CDN; no tiene secciones ni navegación. `application.html` y `validation.js` también son plantillas mínimas. Se proponen cambios solo en `index.html` (y en `README.md` únicamente si fuera necesario documentar la ejecución). Se identificaron dos PNG con nombres de logo, pero no pudieron abrirse porque el entorno los marca como ignorados. Se solicitó autorización antes de implementar; la confirmación recibida autoriza cerrar T-001, no iniciar otras tareas.  
**Referencia:** PLAN-001 §2.

### T-002 — Resolver decisiones de contenido y recursos

- [x] Usar el nombre textual HealthCore; no se incorpora un logo sin aprobación.
- [x] Mantener el idioma español de la plantilla existente y definir etiquetas de navegación coherentes con las secciones.
- [ ] Confirmar finalidad de `application.html` y texto del CTA.
- [ ] Solicitar datos públicos de contacto reales para el footer.
- [x] No se identificaron recursos visuales aprobados y accesibles; no se incorporan imágenes ni datos de clínicas no confirmados.

**Evidencia:** el nombre y los servicios proceden del brief; el idioma `es` ya estaba en `index.html`, y `application.html` se titula «Registro». El CTA implementado es neutral («Ir al registro»), pero la finalidad del formulario no está definida. Los PNG disponibles están ignorados por el entorno y no se usaron. Faltan datos de contacto públicos confirmados.  
**Referencia:** RF-002, RF-005, RF-006; PLAN-001 §7.

## Fase 1. Estructura y contenido

### T-003 — Preparar estructura HTML5

- [x] Completar `index.html` con `<!DOCTYPE html>`, idioma adecuado, `head`, título, metadatos y `body`.
- [x] Organizar el documento con `header`, `main` y `footer`, sin duplicar regiones principales.
- [x] Comprobar jerarquía de encabezados y un `h1` principal.

**Verificación:** comprobación con `HTMLParser`: estructura balanceada y exactamente un `h1`.  
**Requisitos:** RF-001, RNF-005.

### T-004 — Implementar header y navegación

- [x] Mostrar el nombre HealthCore enlazado a `index.html`.
- [x] Añadir `nav` con enlaces a secciones existentes, usando IDs coherentes.
- [x] Garantizar navegación adaptable en móvil sin añadir dependencias.
- [ ] Comprobar funcionamiento de enlaces y navegación por teclado.

**Verificación:** los destinos internos y enlaces a páginas locales pasan comprobación estática y HTTP. No hay navegador instalado para verificar clics o teclado.  
**Requisitos:** RF-002, RF-006, RNF-006.

### T-005 — Implementar hero

- [x] Incluir un `h1` y una propuesta de valor fiel al Project Brief.
- [x] Explicar la actividad de HealthCore sin prometer funciones digitales no implementadas.
- [ ] Incorporar un enlace visible a `application.html`, con texto aprobado.

**Verificación:** contenido contrastado con el brief y enlace funcional; queda pendiente confirmar el propósito del formulario y el texto definitivo del CTA.  
**Requisitos:** RF-003, RF-006.

### T-006 — Crear dos secciones informativas

- [x] Añadir una sección de servicios: atención primaria, especialistas, enfermedades crónicas y prevención.
- [x] Añadir otra sección sobre ventajas: citas en el día, horarios ampliados y personal bilingüe **solo en mercados estadounidenses**.
- [x] Utilizar encabezados y elementos semánticos adecuados, con IDs compatibles con el menú.

**Verificación:** dos secciones diferenciadas, información exacta y enlaces internos correctos.  
**Requisitos:** RF-004, RNF-005.

### T-007 — Implementar footer

- [ ] Añadir un `footer` con información de contacto **pública y confirmada**.
- [x] No inventar teléfono, correo electrónico ni dirección.
- [x] Si faltan datos, registrar RF-005 como bloqueado hasta recibirlos.

**Verificación:** RF-005 permanece bloqueado; el brief no incluye datos públicos de contacto.  
**Requisito:** RF-005.

## Fase 2. Diseño responsive

### T-008 — Aplicar Tailwind y enfoque mobile-first

- [x] Reutilizar la configuración/CDN Tailwind ya existente.
- [x] Aplicar clases utilitarias para tipografía, espaciado, contenedores, colores y CTA.
- [x] Definir primero la disposición móvil y adaptar con breakpoints `md:` y `lg:` cuando corresponda.
- [ ] Comprobar a 375, 768 y 1440 px que no hay desbordamiento horizontal ni enlaces inaccesibles.

**Verificación:** las clases responsive están implementadas. No se pudo hacer inspección visual ni comprobar la carga de Tailwind en navegador porque el contenedor no dispone de navegador o Playwright.  
**Requisitos:** RNF-001, RNF-002, RNF-003.

## Fase 3. Accesibilidad y SEO

### T-009 — Verificar accesibilidad

- [x] Confirmar alternativas textuales: la landing no incluye imágenes al no haber recursos aprobados accesibles.
- [x] Revisar `header`, `nav`, `main`, `section`, `article` cuando proceda y `footer`.
- [x] Aplicar ARIA solo donde aporte información necesaria; no duplicar semántica nativa.
- [ ] Comprobar teclado y foco visible; el contraste de las combinaciones de texto revisadas supera 4.5:1.
- [x] No se implementó un menú móvil desplegable; la navegación permanece visible y adaptable.

**Verificación:** semántica revisada en el HTML y contraste calculado para las combinaciones principales. La comprobación de teclado/foco en navegador queda pendiente.  
**Requisitos:** RNF-004, RNF-005, RNF-006.

### T-010 — Añadir datos estructurados

- [x] Incluir JSON-LD `Organization` con nombre HealthCore y únicamente propiedades confirmadas.
- [x] No inventar sedes, direcciones, URL corporativa ni datos de contacto.
- [x] Validar sintaxis y contenido del JSON-LD.

**Verificación:** JSON-LD parseado correctamente; solo contiene `@context`, `@type` y nombre confirmados.  
**Requisito:** RNF-007.

## Fase 4. Ejecución y entrega

### T-011 — Ejecutar y comprobar localmente

- [x] Desde la raíz, probar `npx http-server ./uis/website -p 3000 -a 0.0.0.0`.
- [ ] Abrir la página en navegador y comprobar rutas, imágenes, enlaces y Tailwind.
- [x] Documentar resultados reales y cualquier limitación del entorno.

**Verificación:** el servidor devuelve HTTP 200 y sirve título, secciones y enlaces locales. La comprobación visual sigue pendiente por falta de navegador.  
**Requisito:** RNF-008.

### T-012 — Publicar temporalmente para auditoría

- [ ] Obtener aprobación explícita antes de hacer público el puerto.
- [ ] Comprobar que no se exponen secretos, datos clínicos ni información confidencial.
- [ ] Configurar el puerto 3000 de Codespaces como **Public**.
- [ ] Verificar desde una sesión externa que la URL pública funciona.
- [ ] Documentar la URL temporal y devolver el puerto a privado cuando termine la auditoría, si corresponde.

**Verificación:** acceso externo confirmado.  
**Requisito:** RNF-009.

**Bloqueo:** no se habilitó exposición pública; requiere autorización explícita y configuración de Codespaces.

### T-013 — Cerrar y documentar

- [ ] Revisar los 15 requisitos contra SPEC-001 y registrar resultados verificables.
- [x] Registrar bloqueos, decisiones aprobadas y comprobaciones fallidas o no ejecutadas.
- [x] Actualizar `memory-bank/progress.md`; no hay decisiones técnicas confirmadas que requieran actualizar `decisions.md` o `architecture.md`.
- [ ] Presentar archivos modificados y resumen de pruebas.
- [ ] Solicitar aprobación antes de realizar un commit.

**Verificación:** trazabilidad y evidencias de cierre.  
**Referencia:** PLAN-001 §8.

## Matriz de trazabilidad

| Requisito | Tarea(s)            |
| --------- | ------------------- |
| RF-001    | T-003               |
| RF-002    | T-002, T-004        |
| RF-003    | T-005               |
| RF-004    | T-006               |
| RF-005    | T-002, T-007        |
| RF-006    | T-002, T-004, T-005 |
| RNF-001   | T-008               |
| RNF-002   | T-008               |
| RNF-003   | T-008               |
| RNF-004   | T-009               |
| RNF-005   | T-003, T-006, T-009 |
| RNF-006   | T-004, T-009        |
| RNF-007   | T-010               |
| RNF-008   | T-011               |
| RNF-009   | T-012               |

**Cierre:** T-013 comprueba todos los requisitos. Ninguna tarea se considera terminada sin verificación; si faltan contactos reales o autorización para la URL pública, los requisitos correspondientes permanecen abiertos.
