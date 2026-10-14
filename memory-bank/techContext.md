# Contexto técnico: HealthCore Digital

## Estado del repositorio

Este repositorio parte de una plantilla de monorepo para proyectos transversales de Ingeniería de IA. La estructura separa interfaces (`uis/`), servicios (`services/`), datos (`data/`), agentes (`agents/`), workflows (`workflows/`), paquetes reutilizables (`packages/`) e infraestructura (`infra/`).

La plantilla no incluye aplicaciones ejecutables ni un runner de workspace configurado en la raíz. El paquete `packages/shared/` contiene metadata para `@repo/shared-types` (versión `0.0.1`, privado), pero no define scripts.

## Guías arquitectónicas existentes

- El README recomienda una API centralizada con FastAPI y aconseja evitar microservicios al inicio. Es una recomendación de la plantilla, no una decisión de implementación confirmada para HealthCore.
- Cada servicio debe vivir en su propia subcarpeta y documentar su objetivo, tecnología y forma de ejecución.
- Las interfaces de usuario se organizan bajo `uis/`: `uis/website/` es el sitio web público y `uis/backoffice/` reúne la aplicación interna de administración y operaciones. Las distintas capacidades de back-office deben integrarse en ese proyecto, no crearse como aplicaciones paralelas en la raíz.
- Las APIs y los workers backend pertenecen a `services/`, con una subcarpeta por servicio concreto. No se deben inventar carpetas paralelas de aplicaciones, como `website/`, `backoffice/` o `apps/`, en la raíz del monorepo.
- El flujo de datos previsto por la plantilla es `data/raw/` → `data/pipelines/` → `data/process/`; los resultados pueden alimentar servicios, interfaces o agentes. `data/eval/` se reserva para evaluar calidad.
- Los tipos compartidos pueden vivir en `packages/shared/` cuando sean consumidos por más de una aplicación.
- Los agentes, las capacidades reutilizables y las integraciones MCP se organizan en `agents/`, `skills/` y `mcps/`, respectivamente.

## Restricciones del dominio

- HealthCore opera en Estados Unidos y el Reino Unido. Toda solución que gestione información sanitaria debe evaluarse frente a HIPAA y UK GDPR, según la jurisdicción y el flujo de datos.
- Los dos mercados usan sistemas EHR distintos que actualmente no se comunican. La integración con sistemas heredados y la calidad de los datos son restricciones relevantes.
- No se deben incorporar datos reales de pacientes a datasets, logs, prompts o entornos de desarrollo sin controles y autorización adecuados.
- Las decisiones sobre residencia de datos, retención, control de acceso, auditoría, cifrado y transferencia internacional requieren revisión de Cumplimiento y Gobierno del Dato; este documento no las da por resueltas.

## Decisiones pendientes

El briefing describe varias oportunidades, pero todavía no selecciona una iniciativa concreta. Antes de fijar una arquitectura de producto hay que definir el caso de uso y sus usuarios. Tampoco constan decisiones confirmadas sobre base de datos, proveedor cloud, autenticación, frontend, proveedor de modelos, mensajería, despliegue o estrategia de observabilidad.

Hasta que se tomen esas decisiones, se debe tratar FastAPI como recomendación de la plantilla y no asumir una plataforma, proveedor o arquitectura de producción.
