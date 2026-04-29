# Documentación de Componentes

Este documento describe los componentes principales y reutilizables desarrollados para el Gestor de Colecciones.

## 1. Componentes de UI (Reutilizables)

### Button (`src/components/Button.tsx`)
Un componente de botón altamente personalizable que soporta diferentes variantes visuales.
*   **Props**:
    *   `children`: Contenido del botón.
    *   `variant`: `primary`, `secondary` o `danger`.
    *   `className`: Clases adicionales de Tailwind.
    *   `loading`: Estado de carga que deshabilita el botón.

### Input (`src/components/Input.tsx`)
Maneja tanto entradas de texto simples como áreas de texto (`textarea`), manteniendo un estilo consistente.
*   **Props**:
    *   `label`: Texto de la etiqueta superior.
    *   `type`: `text`, `textarea`, etc.
    *   `value` y `onChange`: Para el control del estado.
    *   `required`: Validación básica HTML5.

## 2. Componentes de Estructura (Layout)

### Sidebar (`App.tsx`)
Barra lateral dinámica que se expande al pasar el ratón (`onMouseEnter`). Contiene la navegación principal y el botón de creación.
*   **Estado**: Controlado por `isSidebarExpanded`.
*   **Interacción**: Permite seleccionar colecciones y eliminarlas.

### Topbar (`App.tsx`)
Área superior que muestra el nombre de la colección activa, el perfil del usuario y el buscador.
*   **Estética**: Usa azul eléctrico, desenfoques (`backdrop-blur`) y blanco puro para máxima legibilidad.

## 3. Componentes de Página

### Dashboard (`App.tsx`)
La vista principal que renderiza el contenido de la colección seleccionada o el estado vacío si no hay colecciones.

### CreateCollection (`src/pages/CreateCollection.tsx`)
Formulario complejo para dar de alta nuevas colecciones. Incluye el selector visual de iconos y el campo dinámico para categorías personalizadas.

---
*Todos los componentes están tipados con TypeScript para asegurar la integridad de los datos.*
