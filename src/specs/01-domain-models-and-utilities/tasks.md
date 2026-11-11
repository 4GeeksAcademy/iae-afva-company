# Tareas: Modelos de dominio y utilidades

**Proyecto:** HealthCore Digital  
**Identificador:** `01-domain-models-and-utilities`  
**Referencia de negocio:** `CONTEXT.md`  
**Base:** `spec.md` (RF-01 a RF-07, RNF-01 a RNF-07 y CA-01 a CA-20)  
**Estado:** En curso

## T01. Preparación y alineación

- [x] Revisar `AGENTS.md`, `CONTEXT.md`, las reglas aplicables y el Memory Bank.
- [x] Revisar `spec.md`, `plan.md` y el checklist anterior.
- [x] Verificar la estructura física del hito, la configuración TypeScript y las herramientas de pruebas.
- [x] Alinear el plan y este checklist con RF-07 y CA-01 a CA-20.
- [x] Confirmar las herramientas locales de compilación y ejecución disponibles.

## T02. Tipos y modelos de dominio

- [x] Definir `Country` como `US | GB` y `Currency` como `USD | GBP`.
- [x] Implementar las nueve interfaces con los campos y opcionalidad exactos del spec.
- [x] Mantener fecha, hora y timestamp en los formatos documentados.
- [x] Verificar referencias mediante IDs y tipado estricto, sin `any`.

## T03. Colecciones y búsqueda

- [x] Implementar filtrado, orden ascendente/descendente y agrupación genéricos.
- [x] Garantizar que las operaciones no muten los arrays originales.
- [x] Implementar búsqueda lineal y binaria; documentar comparador y precondición de orden.
- [x] Verificar arrays vacíos y objetivos ausentes.

## T04. Agregaciones, KPIs y moneda

- [x] Implementar recuento, suma, promedio, mínimo y máximo, incluidos resultados vacíos.
- [x] Implementar la tasa de no-shows y la tasa de rechazo con denominadores del spec.
- [x] Implementar actividad por clínica con segmentación aplicable por país y estado.
- [x] Mantener agregaciones monetarias separadas por moneda.
- [x] Implementar conversión hipotética con tasa explícita y validar tasa no finita, ausente o no positiva.
- [x] No inferir jurisdicción ni añadir modalidades de facturación fuera de alcance.

## T05. Validaciones

- [x] Validar campos obligatorios, identificadores y textos.
- [x] Validar fechas, horas, timestamps y zonas horarias IANA.
- [x] Validar importes y horas finitos/no negativos y vencimiento de facturas.
- [x] Validar uniones de estado y coherencia de fechas.
- [x] Validar referencias cuando se proporcionen las colecciones relacionadas.
- [x] Devolver errores con campo y causa; no tratar consistencia como autorización.

## T06. Pruebas y verificación

- [x] Usar únicamente datos sintéticos.
- [x] Verificar casos normales, vacíos, inválidos, límites e inmutabilidad.
- [x] Verificar segmentación monetaria y conversiones con tipo de cambio ficticio explícito.
- [x] Ejecutar comprobación de tipos estricta con las herramientas disponibles.
- [x] Ejecutar comprobaciones sintéticas de comportamiento; no existe runner de pruebas para el hito.
- [x] Registrar comandos, resultados y limitaciones.

## T07. Memory Bank y cierre

- [x] Añadir a `memory-bank/progress.md` el trabajo completado y resultados reales.
- [x] No registrar decisiones nuevas: no se confirmó ninguna decisión arquitectónica fuera de la especificación.
- [x] Revisar el alcance de archivos y asegurar que no se alteraron otros hitos.
- [x] Presentar resumen, archivos implementados, validaciones y asuntos pendientes.
- [x] No crear commits ni hacer push sin autorización.

## Trazabilidad de criterios de aceptación

| Criterio | Cobertura prevista                                         | Estado     |
| -------- | ---------------------------------------------------------- | ---------- |
| CA-01    | Nueve interfaces correctamente tipadas                     | Completado |
| CA-02    | Filtrado correcto                                          | Completado |
| CA-03    | Orden ascendente y descendente correcto                    | Completado |
| CA-04    | Agrupaciones coherentes                                    | Completado |
| CA-05    | Búsqueda lineal correcta                                   | Completado |
| CA-06    | Búsqueda binaria sobre entrada ordenada                    | Completado |
| CA-07    | Agregaciones correctas y vacíos según contrato             | Completado |
| CA-08    | Fórmulas y denominadores correctos para KPIs               | Completado |
| CA-09    | Validaciones identifican registros y errores               | Completado |
| CA-10    | Operaciones inmutables                                     | Completado |
| CA-11    | Comprobación estricta de tipos sin errores                 | Completado |
| CA-12    | Casos normales y límite cubiertos con datos sintéticos     | Completado |
| CA-13    | Países y monedas usan tipos definidos                      | Completado |
| CA-14    | Agregaciones económicas separadas por moneda               | Completado |
| CA-15    | No sumar monedas distintas sin conversión explícita        | Completado |
| CA-16    | Segmentación por país y clínica cuando corresponda         | Completado |
| CA-17    | Convenciones de documentación del spec                     | Completado |
| CA-18    | Conversión explícita y validación de parámetros            | Completado |
| CA-19    | Clínica incluye país, ciudad, código postal y zona horaria | Completado |
| CA-20    | Fechas, horas locales y timestamps respetan sus formatos   | Completado |

## Resultado de validación

- TypeScript estricto: `npm exec --yes --package typescript -- tsc --noEmit --strict --target ES2022 --moduleResolution bundler --module ESNext --pretty false src/types/models.ts src/utils/collections.ts src/utils/search.ts src/utils/transformations.ts src/utils/validations.ts packages/shared/types/index.ts`; pasó para los seis archivos TypeScript del repositorio.
- Diagnósticos del editor: sin errores en los seis archivos TypeScript.
- Comprobaciones sintéticas ad hoc con `tsx`: pasaron filtrado, ordenamiento, agrupación, búsquedas lineal/binaria, agregaciones, los dos HealthCore KPIs, inmutabilidad, validación de las nueve entidades, fechas/zona horaria/referencias, segmentación monetaria, rechazo de sumas mixtas y conversión explícita.
- No se encontraron archivos de pruebas automatizadas para el hito ni configuración/runner de pruebas. Las comprobaciones anteriores fueron scripts de aserciones ejecutados ad hoc; no forman una suite persistente de regresión.
- No existe `tsconfig.json` en el repositorio; el comando declara sus opciones de forma explícita.

## Estado de ejecución

Implementación, CA-01 a CA-20 y actualización del Memory Bank completados.
