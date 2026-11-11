# Arquitectura confirmada

## Hito 3: modelos de dominio y utilidades

El código del hito está en `src/`, junto con sus documentos de especificación. `types/models.ts` define las nueve entidades y los tipos compartidos de país, moneda y estados.

Las utilidades están separadas por responsabilidad: `utils/collections.ts` agrupa operaciones genéricas e inmutables; `utils/search.ts` contiene búsquedas lineal y binaria; `utils/transformations.ts` contiene agregaciones, indicadores segmentados y operaciones monetarias; `utils/validations.ts` valida entidades y referencias cuando se proporcionan colecciones relacionadas.

La conversión monetaria requiere un tipo de cambio explícito y no consulta cotizaciones. Los totales permanecen separados por moneda y las sumas monetarias mixtas se rechazan. Las validaciones de consistencia no realizan autorización.

No se añadió una plataforma de ejecución: el repositorio no tiene `tsconfig.json` ni runner de pruebas para esta aplicación. La comprobación estricta y las pruebas sintéticas se ejecutaron con herramientas temporales.
