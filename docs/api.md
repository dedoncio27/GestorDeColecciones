# Documentación de la API (Endpoints)

La aplicación utiliza una API RESTful para la gestión de datos. Los endpoints están disponibles bajo el prefijo `/api`.

## 1. Colecciones (`/api/collections`)

### GET `/api/collections`
Obtiene la lista completa de colecciones.
*   **Response (200)**: `Array<Collection>`

### POST `/api/collections`
Crea una nueva colección.
*   **Body**: `{ name: string, icon: string, description?: string }`
*   **Response (201)**: `Collection` (incluye ID generado y array de items vacío).

### DELETE `/api/collections/:id`
Elimina una colección y todos sus elementos.
*   **Response (200)**: `{ message: "Collection deleted" }`

## 2. Elementos (`/api/collections/:id/items`)

### POST `/api/collections/:id/items`
Añade un nuevo elemento a una colección específica.
*   **Body**: `{ name: string, description?: string, image?: string, tags?: string[] }`
*   **Response (201)**: El objeto del item creado con su ID único.

### DELETE `/api/collections/:id/items/:itemId`
Elimina un elemento de una colección.
*   **Response (200)**: Mensaje de éxito.

## 3. Configuración (`/api/settings`)

### GET `/api/settings`
Obtiene las preferencias de tema guardadas en el servidor.
*   **Response (200)**: `{ themeColor: string, collectionBgColor: string }`

### PUT `/api/settings`
Actualiza las preferencias de tema.
*   **Body**: `{ themeColor?: string, collectionBgColor?: string }`
*   **Response (200)**: Las configuraciones actualizadas.

---
*Todos los endpoints devuelven errores 500 en caso de fallo de conexión con la base de datos Redis.*
