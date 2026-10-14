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
