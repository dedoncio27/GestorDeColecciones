# Pruebas y Diseño Responsive

Este documento resume el proceso de verificación y calidad llevado a cabo durante el desarrollo del proyecto.

## 1. Pruebas Manuales Funcionales

Se han realizado ciclos de pruebas manuales para asegurar que:
*   **CRUD**: Las colecciones se crean, se visualizan y se borran correctamente en tiempo real.
*   **Persistencia**: Se ha verificado que los datos se mantienen íntegros en la nube (Vercel KV / Upstash Redis) incluso tras redespliegues o cierres de sesión.
*   **Entorno Serverless**: Se ha testado el comportamiento de las funciones de la API en producción, corrigiendo problemas de conectividad con la base de datos.
*   **Validación**: Los formularios no permiten enviar datos vacíos en campos obligatorios.
*   **Flujo**: La navegación entre el Dashboard y la página de creación es suave y lógica.

## 2. Diseño Responsive

La aplicación ha sido diseñada con un enfoque **Mobile-First** y adaptativo usando Tailwind CSS:

*   **Sidebar**: En pantallas grandes se expande lateralmente; en móviles se adapta para no obstruir el contenido.
*   **Formularios**: El ancho del bloque de creación pasa de un 60% en escritorio a ocupar casi todo el ancho en dispositivos móviles.
*   **Topbar**: El diseño de la cabecera se reajusta para que el buscador y el perfil sean accesibles en pantallas pequeñas.

## 3. Depuración (Debugging)

*   Se ha verificado la consola del navegador para asegurar que no existan errores de `keys` de React ni advertencias de tipos de TypeScript.
*   Se han corregido errores de red (CORS) y de importación de módulos ESM durante la fase de integración frontend-backend.

---
*El proyecto ha sido testado en los navegadores Chrome, Edge y Firefox.*
