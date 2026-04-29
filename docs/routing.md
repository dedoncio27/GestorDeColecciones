# Estructura de Rutas y Navegación

La aplicación utiliza `react-router-dom` (v6) para gestionar la navegación entre las diferentes vistas sin recargar la página (SPA).

## 1. Configuración de Rutas

Las rutas principales se definen en el punto de entrada de la aplicación:

*   **`/` (Dashboard)**: La página principal donde se visualizan las colecciones existentes.
*   **`/create` (Añadir Colección)**: Vista para configurar un nuevo bloque de gestión.
*   **`/collection/:id/add` (Añadir Elemento)**: Página para añadir un nuevo item a una colección específica.
*   **`/collection/:id/item/:itemId` (Editar Elemento)**: Página para gestionar y editar los detalles de un item existente.
*   **`*` (Página 404)**: Cualquier ruta no definida redirige automáticamente al componente `NotFound`.

## 2. Navegación Dinámica

Se han implementado dos mecanismos de navegación:
*   **Navegación Declarativa**: Uso de botones que activan el hook `useNavigate`.
*   **Navegación de Estado**: Al seleccionar una colección en la Sidebar, la URL no cambia, pero el contenido del Dashboard se actualiza dinámicamente según el ID seleccionado.

## 3. Experiencia de Usuario

*   **Redirección**: Tras crear con éxito una colección, el usuario es redirigido automáticamente al Dashboard.
*   **Prevención**: El botón "X" en la página de creación permite cancelar la operación y volver atrás de forma segura.

---
*La navegación es fluida gracias al uso de animaciones de entrada en cada cambio de vista.*
