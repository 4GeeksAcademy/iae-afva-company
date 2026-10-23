# SPEC-001 — HealthCore Landing Page

**Proyecto:** HealthCore Digital  
**Componente:** Web pública — landing page  
**Ubicación prevista:** `uis/website/specs/01-landing-page/spec.md`  
**Estado:** Borrador pendiente de aprobación  
**Fecha:** 2026-10-24

## 1. Objetivo

Definir una página pública de presentación de HealthCore que explique su actividad sanitaria y propuesta de valor, permita consultar información general y ofrezca acceso a `application.html`. El alcance de la página es informativo; no incluye reserva efectiva de citas, autenticación ni tratamiento de datos de pacientes.

## 2. Contexto confirmado

Según el *Project Brief* facilitado, HealthCore es una red de 12 clínicas ambulatorias en Estados Unidos y Reino Unido. Ofrece atención primaria, consultas especializadas, gestión de enfermedades crónicas y programas preventivos. Entre sus elementos diferenciadores figuran las citas en el mismo día, horarios ampliados y personal bilingüe en los mercados estadounidenses.

**Pendiente de confirmar:** identidad gráfica definitiva, datos de contacto públicos, audiencia y finalidad exacta del formulario `application.html`, así como las secciones de navegación definitivas. No deben inventarse direcciones, teléfonos, servicios por clínica ni promesas asistenciales adicionales.

## 3. Alcance

Incluye `index.html`, su estructura semántica, contenido introductorio, cabecera, navegación, sección principal, al menos dos secciones adicionales, pie de página, enlace al formulario, diseño con Tailwind CSS, adaptación responsive, accesibilidad básica, datos estructurados y procedimiento de publicación temporal para auditoría.

Quedan fuera del alcance la implementación de `application.html`, la lógica de `validation.js`, la integración con backend, la gestión de citas reales, autenticación, historiales clínicos y almacenamiento de datos personales.

## 4. Requisitos funcionales (RF)

### 4.1 Estructura y contenido

| ID | Requisito | Criterio de aceptación |
|---|---|---|
| RF-001 | Crear o completar `index.html` con estructura HTML5 semántica. | El archivo contiene `<!DOCTYPE html>`, `<html lang="en">` (si el contenido aprobado está en inglés), `<head>`, `<title>`, `<body>` y un `<main>` principal. |
| RF-002 | Implementar una cabecera con identidad de HealthCore y navegación. | Existe un `<header>` con nombre o logo accesible y un `<nav>` cuyos enlaces funcionan. El nombre/logo enlaza a la página principal. |
| RF-003 | Crear una sección hero que presente la empresa y su propuesta de valor. | El hero contiene un `h1`, texto introductorio fiel al brief y un mensaje principal visible. |
| RF-004 | Añadir al menos dos secciones informativas adicionales. | Existen dos o más secciones diferenciadas con contenido real y encabezados claros; por ejemplo, servicios y ventajas para pacientes. |
| RF-005 | Implementar un pie de página con información de contacto. | Existe un `<footer>` con información pública de contacto confirmada; si falta, se solicita antes de publicar, sin inventarla. |
| RF-006 | Incluir un enlace o botón hacia el formulario. | Hay un enlace visible con `href="application.html"`; su texto definitivo se valida según la finalidad real del formulario. |

## 5. Requisitos no funcionales (RNF)

### 5.1 Estilo y diseño responsive

| ID | Requisito | Criterio de aceptación |
|---|---|---|
| RNF-001 | Utilizar Tailwind CSS mediante clases utilitarias. | La presentación utiliza el Tailwind existente, sin incorporar otro framework CSS. |
| RNF-002 | Adaptar el diseño a móvil, tableta y escritorio. | Se comprueba visualmente en anchuras representativas de 375 px, 768 px y 1440 px, sin desbordamiento horizontal ni controles inaccesibles. |
| RNF-003 | Aplicar diseño mobile-first. | Los estilos base son adecuados para móvil y las variantes responsive amplían la disposición para pantallas mayores. |

### 5.2 Accesibilidad y semántica

| ID | Requisito | Criterio de aceptación |
|---|---|---|
| RNF-004 | Incorporar textos alternativos descriptivos en imágenes informativas. | Todas las imágenes informativas tienen `alt` útil; las puramente decorativas utilizan `alt=""`. |
| RNF-005 | Utilizar elementos HTML semánticos adecuados. | Se emplean `<header>`, `<nav>`, `<main>`, `<section>`, `<article>` cuando proceda y `<footer>` de forma coherente. |
| RNF-006 | Añadir ARIA cuando resulte apropiado. | Las regiones y controles tienen nombres accesibles cuando es necesario; no se duplican roles nativos innecesariamente. Los enlaces son operables con teclado y muestran foco visible. |

### 5.3 SEO y datos estructurados

| ID | Requisito | Criterio de aceptación |
|---|---|---|
| RNF-007 | Incluir marcado Schema.org para la empresa. | `index.html` contiene datos estructurados válidos de tipo `Organization` o `LocalBusiness` (preferentemente JSON-LD), con propiedades respaldadas por datos confirmados y sin inventar ubicaciones. |

### 5.4 Ejecución y entrega

| ID | Requisito | Criterio de aceptación |
|---|---|---|
| RNF-008 | Poder ejecutar la web localmente con un comando `npx` compatible con Codespaces. | Desde la raíz del repositorio se puede servir `uis/website/` y abrir `index.html` sin errores de rutas locales. Comando candidato: `npx http-server ./uis/website -p 3000 -a 0.0.0.0`. |
| RNF-009 | Exponer temporalmente la web mediante una URL pública de Codespaces para auditoría externa. | El puerto 3000 se reenvía y se establece como público únicamente tras autorización; un auditor externo puede abrir la URL y comprobar la página. La URL no se considera permanente. |

## 6. Criterios generales de aceptación

- [ ] Los 15 requisitos RF-001 a RF-006 y RNF-001 a RNF-009 están implementados y verificados.
- [ ] Los enlaces internos conducen a secciones existentes y el enlace al formulario abre `application.html`.
- [ ] El contenido y los recursos visuales corresponden a HealthCore y no contienen afirmaciones no verificadas.
- [ ] La página se revisa en navegador en móvil, tableta y escritorio.
- [ ] Se verifica la navegación con teclado, el texto alternativo y la estructura semántica.
- [ ] Los datos estructurados se validan y la página puede abrirse mediante la URL pública autorizada.
- [ ] Se documentan los resultados de las comprobaciones y los problemas pendientes.

## 7. Dependencias y decisiones abiertas

1. **Branding:** confirmar el logo final y su ubicación dentro de `uis/website/assets/`.
2. **Formulario:** confirmar qué solicitud o registro representa `application.html` antes de cerrar el texto del CTA.
3. **Contacto:** obtener los datos públicos reales que deben aparecer en el footer.
4. **Navegación:** confirmar las secciones definitivas de la landing page y sus identificadores.
5. **Idioma:** confirmar el idioma o idiomas públicos de la página; `lang` debe coincidir con el contenido.
6. **Publicación:** autorizar expresamente el acceso público temporal desde Codespaces y verificar que no se exponen datos sensibles.

## 8. Restricciones del desarrollo

- Cumplir `AGENTS.md`, las reglas relevantes de `.agents/rules/` y las skills aplicables.
- Revisar el estado actual de `uis/website/` y su `README.md` antes de planificar cambios.
- No crear otros archivos o directorios, instalar dependencias ni modificar configuraciones críticas sin autorización.
- No tratar la publicación en Codespaces como autorización para exponer información clínica o confidencial.
- No comenzar la implementación hasta aprobar esta especificación y elaborar el plan correspondiente.