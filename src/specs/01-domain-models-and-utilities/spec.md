# Especificación funcional: Modelos de dominio y utilidades

**Proyecto:** HealthCore Digital  
**Hito:** 3 — Automatización de tareas con TypeScript  
**Identificador:** `01-domain-models-and-utilities`  
**Estado:** Especificación funcional definida

---

## 1. Objetivo

Desarrollar una biblioteca de modelos de dominio y funciones reutilizables en TypeScript para representar, procesar y validar información operativa de HealthCore Digital.

La solución permitirá estructurar datos, manipular colecciones, realizar búsquedas, calcular indicadores de negocio y aplicar validaciones.

## 2. Contexto empresarial

HealthCore gestiona 12 clínicas distribuidas entre Estados Unidos y Reino Unido, con aproximadamente 200 empleados.

Los principales problemas identificados son:

- Sistemas clínicos no integrados.
- Tasa de citas no atendidas del 22%.
- Tasa de rechazo de reclamaciones del 14% en Estados Unidos.
- Ausencia de indicadores operativos consolidados.
- Seguimiento manual de la formación del personal.
- Necesidad de mejorar la trazabilidad de accesos a información sanitaria.
- Diferencias entre los sistemas de facturación y los marcos regulatorios de ambos países.

La biblioteca proporcionará una base técnica para futuros desarrollos, sin implementar sistemas operativos completos.

## 3. Alcance funcional

### RF-01. Modelos de dominio

Definir nueve interfaces TypeScript en `src/types/models.ts`.

Todos los modelos tendrán un identificador propio `id: string`. Las relaciones entre entidades se representarán mediante identificadores como `clinicId`, `patientId` o `employeeId`.

Los siguientes contratos son decisiones de diseño del proyecto, no esquemas técnicos definidos literalmente en `CONTEXT.md`, que es la referencia empresarial del repositorio.

#### RF-01.1. Tipos compartidos

| Tipo                | Valores permitidos                                       |
| ------------------- | -------------------------------------------------------- |
| `Country`           | `"US"`, `"GB"`                                           |
| `Currency`          | `"USD"`, `"GBP"`                                         |
| `AppointmentStatus` | `"scheduled"`, `"completed"`, `"cancelled"`, `"no_show"` |
| `ClaimStatus`       | `"pending"`, `"approved"`, `"rejected"`, `"paid"`        |
| `InvoiceStatus`     | `"pending"`, `"paid"`, `"overdue"`, `"cancelled"`        |
| `EmploymentStatus`  | `"active"`, `"on_leave"`, `"inactive"`                   |
| `TrainingStatus`    | `"pending"`, `"completed"`, `"expired"`                  |
| `AccessAction`      | `"read"`, `"create"`, `"update"`, `"delete"`             |

Los campos opcionales se identificarán mediante `?`.

#### RF-01.2. Clinic

| Campo      | Tipo      | Obligatorio |
| ---------- | --------- | ----------- |
| `id`       | `string`  | Sí          |
| `name`     | `string`  | Sí          |
| `country`  | `Country` | Sí          |
| `city`     | `string`  | Sí          |
| `zipCode`  | `string`  | Sí          |
| `address`  | `string`  | Sí          |
| `timeZone` | `string`  | Sí          |
| `active`   | `boolean` | Sí          |

`zipCode` será de tipo `string` para preservar ceros iniciales y admitir códigos postales alfanuméricos del Reino Unido.

`timeZone` utilizará identificadores IANA, como `Europe/London` o `America/New_York`.

#### RF-01.3. Patient

| Campo         | Tipo     | Obligatorio |
| ------------- | -------- | ----------- |
| `id`          | `string` | Sí          |
| `firstName`   | `string` | Sí          |
| `lastName`    | `string` | Sí          |
| `dateOfBirth` | `string` | Sí          |
| `email`       | `string` | Sí          |
| `phone`       | `string` | Sí          |
| `clinicId`    | `string` | Sí          |

#### RF-01.4. Appointment

| Campo             | Tipo                | Obligatorio |
| ----------------- | ------------------- | ----------- |
| `id`              | `string`            | Sí          |
| `patientId`       | `string`            | Sí          |
| `clinicId`        | `string`            | Sí          |
| `employeeId`      | `string`            | Sí          |
| `appointmentDate` | `string`            | Sí          |
| `appointmentTime` | `string`            | Sí          |
| `status`          | `AppointmentStatus` | Sí          |
| `reason`          | `string`            | Sí          |

La fecha y hora de la cita se interpretarán en la zona horaria de la clínica asociada.

#### RF-01.5. ClinicalRecord

| Campo           | Tipo     | Obligatorio |
| --------------- | -------- | ----------- |
| `id`            | `string` | Sí          |
| `patientId`     | `string` | Sí          |
| `clinicId`      | `string` | Sí          |
| `employeeId`    | `string` | Sí          |
| `appointmentId` | `string` | No          |
| `createdAt`     | `string` | Sí          |
| `diagnosis`     | `string` | Sí          |
| `treatment`     | `string` | Sí          |
| `notes`         | `string` | No          |

#### RF-01.6. InsuranceClaim

| Campo             | Tipo          | Obligatorio |
| ----------------- | ------------- | ----------- |
| `id`              | `string`      | Sí          |
| `patientId`       | `string`      | Sí          |
| `appointmentId`   | `string`      | Sí          |
| `clinicId`        | `string`      | Sí          |
| `insurer`         | `string`      | Sí          |
| `amount`          | `number`      | Sí          |
| `currency`        | `Currency`    | Sí          |
| `status`          | `ClaimStatus` | Sí          |
| `submittedAt`     | `string`      | Sí          |
| `rejectionReason` | `string`      | No          |

#### RF-01.7. Invoice

| Campo           | Tipo            | Obligatorio |
| --------------- | --------------- | ----------- |
| `id`            | `string`        | Sí          |
| `patientId`     | `string`        | Sí          |
| `clinicId`      | `string`        | Sí          |
| `appointmentId` | `string`        | Sí          |
| `amount`        | `number`        | Sí          |
| `currency`      | `Currency`      | Sí          |
| `issuedAt`      | `string`        | Sí          |
| `dueDate`       | `string`        | Sí          |
| `status`        | `InvoiceStatus` | Sí          |
| `paidAt`        | `string`        | No          |

#### RF-01.8. Employee

| Campo        | Tipo               | Obligatorio |
| ------------ | ------------------ | ----------- |
| `id`         | `string`           | Sí          |
| `firstName`  | `string`           | Sí          |
| `lastName`   | `string`           | Sí          |
| `email`      | `string`           | Sí          |
| `clinicId`   | `string`           | Sí          |
| `department` | `string`           | Sí          |
| `role`       | `string`           | Sí          |
| `hireDate`   | `string`           | Sí          |
| `status`     | `EmploymentStatus` | Sí          |

#### RF-01.9. TrainingRecord

| Campo           | Tipo             | Obligatorio |
| --------------- | ---------------- | ----------- |
| `id`            | `string`         | Sí          |
| `employeeId`    | `string`         | Sí          |
| `courseName`    | `string`         | Sí          |
| `trainingHours` | `number`         | Sí          |
| `completedAt`   | `string`         | No          |
| `expiresAt`     | `string`         | No          |
| `status`        | `TrainingStatus` | Sí          |

#### RF-01.10. DataAccessLog

| Campo          | Tipo           | Obligatorio |
| -------------- | -------------- | ----------- |
| `id`           | `string`       | Sí          |
| `employeeId`   | `string`       | Sí          |
| `patientId`    | `string`       | No          |
| `action`       | `AccessAction` | Sí          |
| `resourceType` | `string`       | Sí          |
| `resourceId`   | `string`       | Sí          |
| `timestamp`    | `string`       | Sí          |
| `authorized`   | `boolean`      | Sí          |

### RF-02. Operaciones con colecciones

Implementar funciones genéricas que permitan:

- Filtrar registros mediante predicados.
- Ordenar colecciones de forma ascendente.
- Ordenar colecciones de forma descendente.
- Agrupar registros por una propiedad o criterio.

Las funciones deberán utilizar tipos genéricos, aceptar colecciones vacías y no modificar los arrays originales.

### RF-03. Algoritmos de búsqueda

Implementar:

- Búsqueda lineal sobre colecciones sin ordenar.
- Búsqueda binaria sobre colecciones previamente ordenadas.

Ambos algoritmos deberán gestionar elementos existentes, inexistentes y colecciones vacías.

La búsqueda binaria deberá utilizar un comparador coherente con el orden de la colección.

Cuando no se encuentre un elemento, las funciones devolverán `undefined`.

### RF-04. Transformaciones, agregaciones e indicadores

#### RF-04.1. Operaciones genéricas

Implementar:

- Recuento.
- Suma.
- Promedio.
- Mínimo.
- Máximo.

Comportamiento para colecciones vacías:

| Operación | Resultado |
| --------- | --------- |
| Recuento  | `0`       |
| Suma      | `0`       |
| Promedio  | `null`    |
| Mínimo    | `null`    |
| Máximo    | `null`    |

#### RF-04.2. Tasa de no-shows

Calcular:

**No-show rate (%) = No-shows / (Completed + No-shows) × 100**

Estados elegibles:

- `completed`
- `no_show`

Quedan excluidas las citas `scheduled` y `cancelled`.

Si no existen citas elegibles, devolver `null`.

#### RF-04.3. Tasa de rechazo de reclamaciones

Calcular:

**Rejection rate (%) = Rejected / (Approved + Rejected + Paid) × 100**

Estados elegibles:

- `approved`
- `rejected`
- `paid`

Quedan excluidas las reclamaciones `pending`.

Este indicador representa la proporción de reclamaciones actualmente rechazadas entre las resueltas. No representa necesariamente la tasa histórica de rechazo en primera presentación.

Si no existen reclamaciones elegibles, devolver `null`.

#### RF-04.4. Actividad por clínica

Calcular el número de citas por `clinicId`, con posibilidad de agrupar por país y estado.

El recuento general incluirá todas las citas recibidas. Los filtros por estado podrán aplicarse para obtener indicadores más específicos.

### RF-05. Validaciones

Implementar validaciones estructurales y de negocio.

#### RF-05.1. Reglas generales

- Los identificadores obligatorios no podrán estar vacíos.
- Los textos obligatorios no podrán contener únicamente espacios.
- Las fechas deberán existir y respetar el formato establecido.
- Los importes y horas de formación deberán ser números finitos y no negativos.
- Los estados deberán pertenecer a los valores permitidos.
- Las referencias a otras entidades deberán comprobarse cuando se disponga de las colecciones relacionadas.
- Los errores deberán identificar el campo y la causa.

#### RF-05.2. Reglas específicas

| Entidad          | Validaciones                                                                 |
| ---------------- | ---------------------------------------------------------------------------- |
| `Clinic`         | País permitido, ciudad y código postal obligatorios, zona horaria válida     |
| `Patient`        | Fecha de nacimiento válida y no futura, formato básico de correo electrónico |
| `Appointment`    | Fecha y hora válidas, estado permitido, referencias coherentes               |
| `ClinicalRecord` | Referencias obligatorias y fecha de creación válida                          |
| `InsuranceClaim` | Importe no negativo, moneda válida, estado permitido                         |
| `Invoice`        | Importe no negativo, vencimiento no anterior a emisión                       |
| `Employee`       | Fecha de contratación válida, estado permitido                               |
| `TrainingRecord` | Horas no negativas, fechas coherentes, estado permitido                      |
| `DataAccessLog`  | Acción permitida, identificadores obligatorios, timestamp válido             |

La comprobación de referencias entre entidades será una validación de consistencia de datos, no un mecanismo de autorización.

### RF-06. Seguridad de tipos y funciones puras

- Utilizar TypeScript con tipado estricto.
- Evitar `any`.
- Utilizar tipos genéricos cuando aporten reutilización.
- Priorizar funciones puras y deterministas.
- Evitar efectos secundarios.
- No modificar los datos originales.
- Separar las operaciones genéricas de las reglas específicas de HealthCore.

### RF-07. Países, monedas y conversión monetaria

#### RF-07.1. Países y monedas

Utilizar:

- Países: `US`, `GB`.
- Monedas: `USD`, `GBP`.

El país y la moneda serán atributos independientes.

Cada clínica tendrá un país asociado. Cada operación económica registrará su moneda.

#### RF-07.2. Agregaciones monetarias

Las sumas económicas deberán mantenerse separadas por moneda.

No se permitirá sumar directamente importes expresados en distintas monedas.

#### RF-07.3. Conversión hipotética

Implementar una función de conversión monetaria que reciba explícitamente:

- Importe.
- Moneda de origen.
- Moneda de destino.
- Tipo de cambio.

El tipo de cambio será proporcionado como parámetro y representará la cantidad de moneda de destino equivalente a una unidad de moneda de origen.

Para pruebas se podrá utilizar un tipo de cambio ficticio, por ejemplo:

**1 GBP = 1,25 USD**

Este valor será exclusivamente ilustrativo y no deberá utilizarse como cotización real.

La función deberá rechazar tipos de cambio ausentes, no finitos o menores o iguales a cero. Si las monedas coinciden, devolverá el importe original sin conversión.

#### RF-07.4. Segmentación

Permitir agrupaciones e indicadores por:

- País.
- Clínica.
- Moneda, cuando corresponda.

#### RF-07.5. Modalidades de facturación

El modelo podrá ampliarse posteriormente para diferenciar seguros comerciales, Medicare, Medicaid, pagos privados y contratos NHS.

La implementación de modalidades y procesos de facturación específicos por país queda fuera del alcance de este hito.

#### RF-07.6. Jurisdicciones

No inferir automáticamente el régimen regulatorio aplicable únicamente a partir de la moneda.

La implementación de reglas específicas de cumplimiento HIPAA y UK GDPR queda fuera del alcance.

## 4. Reglas de fechas y zonas horarias

Se utilizarán los siguientes formatos:

| Dato          | Formato      | Ejemplo                |
| ------------- | ------------ | ---------------------- |
| Fecha         | `YYYY-MM-DD` | `2026-11-15`           |
| Hora local    | `HH:mm`      | `09:30`                |
| Timestamp UTC | ISO 8601     | `2026-11-15T14:30:00Z` |
| Zona horaria  | IANA         | `Europe/London`        |

Las citas utilizarán fecha y hora local asociadas a la zona horaria de la clínica.

Los eventos de auditoría y otros registros que representen un instante exacto utilizarán timestamps UTC.

Los campos de fecha de calendario no se convertirán automáticamente entre zonas horarias.

## 5. Requisitos no funcionales

**RNF-01. Modularidad:** cada archivo tendrá una responsabilidad definida.

**RNF-02. Reutilización:** las utilidades genéricas podrán aplicarse a diferentes entidades.

**RNF-03. Mantenibilidad:** nombres descriptivos, estructura clara y complejidad limitada.

**RNF-04. Verificabilidad:** las funciones podrán probarse de manera independiente.

**RNF-05. Privacidad:** las pruebas utilizarán exclusivamente datos sintéticos.

**RNF-06. Compatibilidad:** se respetará la configuración existente del repositorio.

**RNF-07. Documentación del código:**

- Utilizar comentarios breves para explicar decisiones o lógica no evidente.
- Documentar mediante TSDoc/JSDoc las funciones cuyo contrato requiera aclaraciones.
- Describir parámetros, retornos y precondiciones relevantes.
- Evitar comentarios redundantes.
- Priorizar nombres descriptivos.

## 6. Exclusiones

Quedan fuera del alcance:

- Bases de datos y persistencia.
- APIs y servicios backend.
- Interfaces gráficas.
- Integraciones con sistemas EHR.
- Autenticación y autorización.
- Implementación completa de HIPAA o UK GDPR.
- Modelos predictivos.
- Tipos de cambio reales o servicios externos de cotización.
- Procesos de facturación específicos por país.
- Tratamiento de datos reales de pacientes.

## 7. Criterios de aceptación

| ID    | Criterio                                                                               |
| ----- | -------------------------------------------------------------------------------------- |
| CA-01 | Las nueve interfaces están definidas y tipadas correctamente                           |
| CA-02 | Las funciones de filtrado devuelven los registros esperados                            |
| CA-03 | Las ordenaciones ascendente y descendente son correctas                                |
| CA-04 | La agrupación produce grupos coherentes                                                |
| CA-05 | La búsqueda lineal funciona correctamente                                              |
| CA-06 | La búsqueda binaria funciona con entradas ordenadas                                    |
| CA-07 | Las agregaciones producen resultados correctos                                         |
| CA-08 | Los indicadores utilizan las fórmulas y denominadores definidos                        |
| CA-09 | Las validaciones identifican registros inválidos y sus errores                         |
| CA-10 | Las utilidades no modifican los datos originales                                       |
| CA-11 | La comprobación de tipos finaliza sin errores                                          |
| CA-12 | Las pruebas cubren casos normales y casos límite                                       |
| CA-13 | Los modelos utilizan tipos definidos para países y monedas                             |
| CA-14 | Las agregaciones económicas mantienen separadas las monedas                            |
| CA-15 | Las operaciones monetarias incompatibles se rechazan si no existe conversión explícita |
| CA-16 | Los indicadores permiten segmentación por país y clínica cuando corresponda            |
| CA-17 | El código cumple las convenciones de documentación definidas                           |
| CA-18 | La conversión monetaria utiliza un tipo de cambio explícito y valida sus parámetros    |
| CA-19 | `Clinic` incluye país, ciudad, código postal y zona horaria                            |
| CA-20 | Las fechas, horas locales y timestamps respetan sus formatos definidos                 |

## 8. Trazabilidad y control de cambios

- Los requisitos funcionales se identificarán mediante códigos `RF`.
- Los requisitos no funcionales se identificarán mediante códigos `RNF`.
- Los criterios de aceptación se identificarán mediante códigos `CA`.
- Las tareas de implementación deberán referenciar los requisitos correspondientes.
- Las decisiones arquitectónicas relevantes se registrarán en el Memory Bank siguiendo las reglas del repositorio.
- Los cambios significativos de alcance deberán revisarse antes de implementarse.

**Estado del documento:** Contratos funcionales definidos para iniciar la planificación técnica.
