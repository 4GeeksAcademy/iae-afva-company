# PLAN-001 — HealthCore Landing Page

**Proyecto:** HealthCore Digital  
**Especificación de referencia:** `uis/website/specs/01-landing-page/spec.md` (SPEC-001)  
**Ubicación prevista:** `uis/website/specs/01-landing-page/plan.md`  
**Estado:** Propuesto, pendiente de revisión y aprobación  
**Fecha:** 2026-10-24

## 1. Objetivo del plan

Definir cómo implementar y verificar los 15 requisitos de SPEC-001 en la web pública existente, sin introducir una arquitectura o dependencias innecesarias. Este plan no autoriza la implementación ni presupone que el contenido de los archivos actuales haya sido inspeccionado.

## 2. Inspección previa obligatoria

Antes de modificar código, el agente debe:

1. Leer `AGENTS.md`, `CONTEXT.md`, el contexto pertinente de `memory-bank/`, las reglas y skills aplicables.
2. Leer `uis/website/README.md` y revisar `index.html`, `application.html`, `validation.js` y los recursos disponibles.
3. Comprobar la versión y forma de carga de Tailwind, las rutas relativas y si existen ya elementos de cabecera, hero, secciones o pie.
4. Identificar cambios necesarios y presentar un diff o relación de archivos antes de implementarlos.
5. Solicitar autorización para cualquier archivo/directorio nuevo y para cualquier cambio de configuración.

**Estado conocido según `memory-bank/progress.md` (2026-10-23):** existen dos páginas HTML enlazadas, Tailwind mediante CDN, `validation.js` preparado y README; no consta validación visual en navegador. Esta información debe contrastarse con el repositorio real.

## 3. Diseño técnico propuesto

### 3.1 Estructura HTML y contenido (RF-001 a RF-006)

- **Documento:** mantener `index.html` como punto de entrada, con `doctype`, idioma correcto, metadatos básicos y estructura `header` → `main` → `footer`.
- **Cabecera:** mostrar la marca HealthCore mediante texto o logo aprobado; enlazarla a `index.html`. Incluir un `<nav>` con enlaces a secciones que realmente existan. La navegación móvil debe seguir siendo usable, sin introducir librerías adicionales.
- **Hero:** incluir un único `h1`, propuesta de valor basada en el brief y acceso visible al formulario. Evitar prometer reserva efectiva de citas.
- **Contenido:** incluir al menos dos secciones, por ejemplo «Servicios» (atención primaria, especialistas, enfermedades crónicas y prevención) y «Por qué HealthCore» (citas en el día, horarios ampliados y personal bilingüe en mercados estadounidenses). Las afirmaciones deben conservar sus matices geográficos.
- **Footer:** mostrar únicamente datos de contacto públicos confirmados. Si no están disponibles, dejar el requisito pendiente y solicitar datos; no inventar información.
- **CTA:** usar enlace HTML a `application.html`. La etiqueta final debe esperar la confirmación de la finalidad del formulario.

### 3.2 Estilos y responsive (RNF-001 a RNF-003)

- Reutilizar Tailwind CSS ya presente en el proyecto y sus clases utilitarias.
- Comenzar por una disposición móvil de una columna; ampliar mediante breakpoints `md:` y `lg:` cuando aporte valor.
- Usar contenedores con anchura máxima, espaciado consistente y elementos que no desborden.
- No añadir framework CSS, CSS propio o JavaScript nuevo salvo necesidad justificada y aprobación.

### 3.3 Accesibilidad (RNF-004 a RNF-006)

- Añadir `alt` descriptivo a imágenes informativas y `alt=""` a imágenes decorativas.
- Mantener jerarquía de títulos coherente y regiones semánticas claras.
- Etiquetar la navegación cuando sea necesario; evitar ARIA redundante.
- Garantizar enlaces utilizables por teclado, foco visible y contraste suficiente.
- Si se decide incorporar un menú móvil desplegable, documentar el comportamiento y comprobar su accesibilidad antes de implementarlo.

### 3.4 SEO y Schema.org (RNF-007)

- Incluir metadatos básicos relevantes para la landing page.
- Incorporar JSON-LD `Organization` con nombre y otras propiedades solo si están confirmadas; usar `LocalBusiness` únicamente si se dispone de información válida sobre la entidad/localización correspondiente.
- Validar la sintaxis y el contenido del JSON-LD con una herramienta apropiada.

### 3.5 Ejecución y publicación (RNF-008 a RNF-009)

- Verificar ejecución desde la raíz del repositorio mediante `npx http-server ./uis/website -p 3000 -a 0.0.0.0`, sujeto a disponibilidad de `npx` y a las políticas del entorno.
- Comprobar rutas de imágenes, enlaces y carga de Tailwind en navegador.
- Para auditoría externa, solicitar autorización antes de cambiar la visibilidad del puerto 3000 a **Public** en Codespaces. Comprobar que no hay secretos ni información clínica expuesta. La URL pública es temporal.

## 4. Archivos previstos

| Archivo | Acción propuesta | Condición |
|---|---|---|
| `uis/website/index.html` | Modificar estructura, contenido, estilos y datos estructurados | Tras inspección y aprobación |
| `uis/website/README.md` | Actualizar instrucciones de ejecución y verificación si son insuficientes | Solo si es necesario y autorizado |
| `uis/website/assets/...` | Referenciar logo e imágenes aprobadas | Crear/copiar archivos únicamente con autorización explícita |
| `uis/website/application.html` | Sin cambios | Solo comprobar que el enlace funciona |
| `uis/website/validation.js` | Sin cambios | Fuera de alcance |
| `memory-bank/progress.md` | Registrar avance real y validaciones | Según reglas del repositorio |
| `memory-bank/decisions.md` | Registrar decisiones técnicas significativas confirmadas | Solo si se toman |

## 5. Secuencia de implementación

1. **Preparación:** inspeccionar repositorio, confirmar dependencias y resolver decisiones bloqueantes.
2. **Estructura y contenido:** implementar HTML semántico, header, hero, dos secciones, footer y CTA.
3. **Presentación:** aplicar clases Tailwind con enfoque mobile-first y breakpoints.
4. **Accesibilidad:** revisar semántica, alternativas textuales, teclado, foco y contraste.
5. **SEO:** incorporar y validar Schema.org con datos confirmados.
6. **Verificación local:** servir el sitio con `npx`, comprobar enlaces, recursos y presentación.
7. **Auditoría externa:** habilitar URL pública de Codespaces solo tras autorización y comprobaciones de seguridad.
8. **Cierre:** registrar evidencias, incidencias, decisiones confirmadas y progreso. Solicitar aprobación antes de cualquier commit.

## 6. Matriz de verificación

| Requisitos | Comprobación |
|---|---|
| RF-001, RNF-005 | Inspección de HTML5, estructura semántica y jerarquía de encabezados |
| RF-002 | Marca visible y enlaces del header funcionales |
| RF-003, RF-004 | Hero con `h1` y al menos dos secciones con contenido fiel al brief |
| RF-005 | Footer con datos de contacto públicos verificados |
| RF-006 | CTA abre `application.html` |
| RNF-001 | Tailwind carga y sus clases se aplican |
| RNF-002, RNF-003 | Revisión visual a 375, 768 y 1440 px, sin overflow |
| RNF-004 | Auditoría manual de `alt` |
| RNF-006 | Prueba de teclado, foco, contraste y atributos ARIA pertinentes |
| RNF-007 | Validación de JSON-LD y ausencia de datos inventados |
| RNF-008 | Arranque con `npx` y comprobación de rutas locales |
| RNF-009 | Apertura de URL pública desde sesión externa tras autorización |

## 7. Riesgos, dependencias y decisiones pendientes

- **Logo:** confirmar si el diseño generado recientemente es el recurso aprobado y en qué formato/ruta se almacenará.
- **Contacto:** faltan datos públicos confirmados para completar RF-005.
- **Formulario:** falta definir su finalidad para cerrar el texto del CTA.
- **Idioma y navegación:** confirmar idioma y nombres/IDs definitivos de secciones.
- **Publicación:** obtener aprobación expresa para exposición pública temporal en Codespaces.
- **Verificación:** no atribuir resultados de pruebas hasta ejecutarlas realmente.

## 8. Criterios de cierre

El plan se considera ejecutado solo cuando los 15 requisitos de SPEC-001 estén comprobados, las dependencias críticas resueltas, los resultados de validación documentados y cualquier incumplimiento identificado. Si faltan datos de contacto o autorización de publicación, esos requisitos permanecerán abiertos; no se declarará completada la landing page.

**Siguiente artefacto SDD:** `tasks.md`, que desglosará este plan en tareas pequeñas, ordenadas y trazables a RF/RNF.
