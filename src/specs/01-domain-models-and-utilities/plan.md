# Plan técnico: Modelos de dominio y utilidades

**Proyecto:** HealthCore Digital  
**Identificador:** `01-domain-models-and-utilities`  
**Base funcional:** `spec.md` (RF-01 a RF-07, RNF-01 a RNF-07 y CA-01 a CA-20)  
**Estado:** Alineado con la especificación aprobada; implementación en curso

## 1. Objetivo y límites

Implementar los modelos y utilidades definidos en `spec.md`, sin persistencia, APIs, interfaz, integraciones externas, cotizaciones reales ni reglas de cumplimiento. Las pruebas usarán exclusivamente datos sintéticos.

## 2. Arquitectura

Los documentos del hito y el código existente residen bajo `src/` en el árbol del repositorio. La implementación seguirá esa estructura física:

```text
src/
├── specs/
│   └── 01-domain-models-and-utilities/
│       ├── spec.md
│       ├── plan.md
│       └── tasks.md
├── types/
│   └── models.ts
└── utils/
    ├── collections.ts
    ├── search.ts
    ├── transformations.ts
    └── validations.ts
```

No existe configuración TypeScript ni runner de pruebas para esta aplicación. Se respetará esa condición y se usarán las herramientas disponibles, sin añadir dependencias de ejecución innecesarias.

## 3. Diseño por módulos

| Archivo                    | Responsabilidad                                                                                                     |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| `types/models.ts`          | Nueve interfaces, uniones de estados, `Country` (`US`/`GB`) y `Currency` (`USD`/`GBP`)                              | RF-01, RF-06, RF-07.1           |
| `utils/collections.ts`     | Filtrado, orden ascendente/descendente y agrupación genérica, sin mutar entradas                                    | RF-02, RF-06, RF-07.4           |
| `utils/search.ts`          | Búsqueda lineal y binaria con comparador coherente y resultado `undefined` si no hay coincidencia                   | RF-03, RF-06                    |
| `utils/transformations.ts` | Recuento, suma, promedio, mínimo, máximo, KPIs, actividad por clínica, agregación por moneda y conversión explícita | RF-04, RF-06, RF-07.2 a RF-07.5 |
| `utils/validations.ts`     | Validaciones estructurales y de negocio con errores que identifican campo y causa                                   | RF-05, RF-06, RF-07.1, RNF-07   |

## 4. Secuencia de implementación

1. Implementar los tipos compartidos y las nueve interfaces exactamente con los campos y opcionalidad del spec.
2. Implementar operaciones genéricas puras e inmutables de colección.
3. Implementar búsquedas, documentando la precondición de orden para búsqueda binaria.
4. Implementar agregaciones vacías según contrato, KPIs con sus denominadores, actividad segmentable y montos separados por moneda.
5. Implementar conversión hipotética solo con tipo de cambio explícito, finito y mayor que cero; monedas iguales devuelven el importe sin conversión.
6. Implementar validaciones de valores, formatos, estados, zona IANA y referencias disponibles.
7. Validar tipos, comportamiento normal y límites con datos sintéticos; registrar resultados reales.

## 5. Verificación

- Comprobar tipos en modo estricto con el compilador disponible; como no hay `tsconfig.json`, declarar explícitamente las opciones necesarias en el comando.
- Ejecutar comprobaciones de comportamiento con datos sintéticos para entradas válidas, inválidas, vacías, búsquedas fallidas, inmutabilidad, segmentación monetaria y conversión.
- No instalar dependencias ni crear infraestructura de pruebas sin necesidad; si las herramientas locales no permiten una verificación, registrar el bloqueo con precisión.
- Revisar que los 20 criterios de aceptación tengan evidencia y que el diff permanezca dentro de este hito y el Memory Bank solicitado.

## 6. Trazabilidad de aceptación

### Fase 2. Tareas

El checklist de `tasks.md` registra cada CA-01 a CA-20 y su módulo responsable. La finalización exige cubrir todos los criterios, además de verificar estrictamente tipos y casos límite.

Operaciones:

- `filter`
- `groupBy`
  El checklist de `tasks.md` registra cada CA-01 a CA-20 y su módulo responsable. La finalización exige cubrir todos los criterios, además de verificar estrictamente tipos y casos límite.
