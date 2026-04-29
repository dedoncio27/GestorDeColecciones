# Documentación de Custom Hooks

En este proyecto se han desarrollado hooks personalizados para encapsular la lógica de negocio y reutilizarla en diferentes partes de la aplicación.

## 1. useForm (`src/hooks/useForm.ts`)

Este hook centraliza la gestión de formularios controlados.

*   **Funcionalidad**:
    *   Maneja el estado de los campos de forma genérica.
    *   Gestiona el evento `onSubmit` evitando el comportamiento por defecto del navegador.
    *   Proporciona un estado de `loading` para deshabilitar botones durante peticiones asíncronas.
*   **Uso principal**: Se utiliza en la página de `CreateCollection` para gestionar el nombre, descripción, categoría e icono de la nueva colección.

## 2. useCollections (`src/context/CollectionsContext.tsx`)

Aunque técnicamente es parte del contexto, actúa como un hook de acceso al estado global.

*   **Funcionalidad**:
    *   Permite acceder a la lista completa de `collections`.
    *   Proporciona funciones para añadir (`addCollection`) y eliminar (`removeCollection`).
    *   Sincroniza automáticamente el estado con el backend tras cada operación.

## 3. Hooks Estándar utilizados

*   **useState**: Para estados visuales (expansión de la sidebar, mostrar el picker de iconos).
*   **useEffect**: Para cargar las colecciones del servidor al iniciar la aplicación y sincronizar configuraciones.
*   **useMemo**: Utilizado en el `Dashboard` y `App.tsx` para filtrar las colecciones en tiempo real según la búsqueda del usuario. Esto optimiza el rendimiento al evitar cálculos innecesarios en cada renderizado.
*   **useCallback**: Se utiliza para memorizar las funciones de envío de formularios en el custom hook `useForm`, asegurando que la referencia de la función sea estable y no provoque re-renders de los componentes hijos (como los Inputs personalizados).
*   **useNavigate**: De `react-router-dom` para gestionar la navegación programática entre páginas.

---
*La creación de custom hooks y el uso de hooks de optimización permiten mantener una aplicación eficiente y limpia.*
