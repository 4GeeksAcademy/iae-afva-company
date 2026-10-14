---
name: memory-bank-update
description: Actualiza el banco de memoria al terminar una tarea que cambie de forma relevante el progreso del proyecto o confirme una decisión técnica o arquitectónica.
---

# Actualización del banco de memoria

## Objetivo

Registrar con precisión los cambios durables del proyecto en `memory-bank/progress.md` y las decisiones técnicas o arquitectónicas confirmadas en `memory-bank/decisions.md`, conservando el historial y sin convertir planes o suposiciones en hechos.

## Cuándo usarla

Úsala al finalizar una tarea que haya cambiado el estado del proyecto, entregado una capacidad relevante o confirmado una decisión técnica o arquitectónica. No la ejecutes para cambios triviales sin impacto duradero ni añadas una entrada si no hay nada nuevo que registrar.

## Inputs

- Resumen de la tarea y cambios efectivamente completados.
- Archivos, componentes o áreas afectadas.
- Validaciones ejecutadas y sus resultados.
- Decisiones técnicas o arquitectónicas confirmadas, con su contexto y motivos.
- Bloqueos y próximos pasos conocidos, si los hay.
- Fecha de la actualización.

Si falta evidencia, consulta los cambios y archivos pertinentes. No infieras que una propuesta fue aprobada ni que una validación pasó si no consta su resultado.

## Procedimiento

1. Lee `AGENTS.md`, `.agents/rules/memory-management.md` y los documentos de memoria pertinentes antes de actualizarlos.
2. Compara el estado previo con el trabajo realmente completado. Separa hechos, propuestas, decisiones y tareas pendientes.
3. Si cambió de forma relevante el estado del proyecto, añade una entrada fechada a `memory-bank/progress.md` con un resumen breve de lo completado y próximos pasos solo cuando sean útiles. El progreso debe explicar qué cambió; no lo reduzcas a una lista de tareas futuras.
4. Si se confirmó una decisión técnica o arquitectónica, añade una entrada a `memory-bank/decisions.md` con un ID único, fecha, contexto o problema, decisión adoptada y justificación y trade-offs relevantes.
5. Si no hubo una decisión confirmada, no añadas una entrada de decisión. Si una propuesta sigue abierta, regístrala como pendiente en el progreso solo si afecta el estado o los próximos pasos del proyecto.
6. Si cambió la arquitectura del sistema, actualiza también `memory-bank/architecture.md` conforme a `AGENTS.md`; documenta solo la arquitectura confirmada.
7. Conserva las entradas anteriores: añade nuevas entradas en lugar de reemplazar el historial. Mantén los registros concisos y factuales.
8. Informa qué archivos de memoria se actualizaron, qué se registró y qué quedó sin verificar.

## Criterios de aceptación

- Cada actualización de progreso tiene fecha y describe cambios realmente completados; incluye próximos pasos solo cuando aplican.
- Solo se registran en `decisions.md` decisiones confirmadas, con todos los campos requeridos por `.agents/rules/memory-management.md` y un ID no duplicado.
- Las propuestas, suposiciones y validaciones no ejecutadas no se presentan como hechos.
- El historial existente se conserva y no se modifican archivos ajenos al banco de memoria.
- Si no hubo un cambio durable ni una decisión confirmada, no se modifica ningún archivo de memoria y se informa por qué.
- Si hubo un cambio arquitectónico, `architecture.md` refleja únicamente la arquitectura confirmada.
