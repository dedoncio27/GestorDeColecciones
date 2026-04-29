# Formularios e Interacción

El Gestor de Colecciones utiliza formularios controlados para garantizar que los datos introducidos sean válidos y coherentes.

## 1. Gestión de Formularios (`useForm`)
Para no repetir lógica de manejo de inputs, se utiliza un custom hook llamado `useForm`. Este hook gestiona el estado de los campos y el envío.

### Ejemplo de uso en `CreateCollection.tsx`:
```tsx
const { values, handleChange, reset } = useForm({
  name: '',
  description: '',
  icon: 'Package'
});
```

## 2. Formularios Controlados
Cada input está vinculado al estado de React (`value`) y reacciona al evento `onChange`. Esto permite una validación en tiempo real y un control total sobre lo que el usuario escribe.

## 3. Validación y Errores
Se implementan validaciones básicas antes de enviar los datos a la API:
*   **Campos Requeridos**: El nombre de la colección o del item no puede estar vacío.
*   **Feedback Visual**: Se utilizan estados de carga (`loading`) en los botones para evitar envíos duplicados.
*   **Manejo de Errores**: Si la API devuelve un error (ej. base de datos desconectada), se muestra un mensaje en la consola o en la UI para informar al usuario.

## 4. Selección de Iconos
Para mejorar la experiencia de usuario, el formulario de creación incluye un `IconPicker`. Este componente permite elegir visualmente un icono de una lista predefinida de **Lucide React**, mejorando la categorización de las colecciones.

---
*La interacción fluida en los formularios es clave para una buena experiencia de usuario.*
