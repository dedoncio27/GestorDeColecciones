# Cliente de API y Contrato de Datos

Este documento describe cómo el frontend se comunica con el backend y cómo se aseguran los tipos de datos.

## 1. Cliente de API (`src/api/client.ts`)

Se ha implementado un cliente centralizado usando la librería **Axios**. El cliente es inteligente y cambia la URL base automáticamente según el entorno:
*   **Local**: `http://localhost:5000/api`
*   **Producción**: `/api` (Ruta relativa en Vercel)

### Métodos Principales:
*   **Colecciones**: `getAll()`, `create()`, `delete()`.
*   **Elementos**: `addItem(collectionId, itemData)`, `deleteItem(collectionId, itemId)`.
*   **Preferencias**: `getSettings()`, `saveSettings(settings)`.

## 2. Tipado con TypeScript (`src/types/index.ts`)

Para evitar errores en tiempo de desarrollo, se han definido interfaces que coinciden exactamente con el contrato de la API.

```typescript
export interface Collection {
    id: string;
    name: string;
    icon: string;
    count: number;
    description?: string;
    items?: Item[];
}

export interface Item {
    id: string;
    collectionId: string;
    name: string;
    description?: string;
    image?: string;
    tags?: string[];
}
```

## 3. Gestión de Estados de Red

En los componentes y el contexto se gestionan los tres estados críticos:
1.  **Carga (Loading)**: Se muestra un spinner o mensaje de "Cargando..." mientras la petición está en curso.
2.  **Éxito (Success)**: Los datos se sincronizan con el estado global de React.
3.  **Error**: Se capturan los errores (como el fallo de conexión a Redis) y se muestran mensajes descriptivos para facilitar el debugging.

---
*El uso de un cliente tipado asegura que la API sea la única fuente de verdad.*
