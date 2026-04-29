# Diseño y Arquitectura del Sistema

Este documento detalla las decisiones técnicas y de arquitectura tomadas para el desarrollo del Gestor de Colecciones.

## 1. Estructura de Componentes
La aplicación sigue un enfoque de **componentes atómicos** y **páginas**:

*   **UI Components**: Componentes pequeños y reutilizables (`Button`, `Input`, `IconPicker`).
*   **Layout Components**: Estructuras globales (`Sidebar`, `Topbar`).
*   **Pages**: Vistas principales que orquestan el contenido (`Dashboard`, `CreateCollection`, `AddItem`, `NotFound`).

## 2. Gestión del Estado
Se ha decidido usar una combinación de:
*   **Estado Local (`useState`)**: Para UI inmediata (si la sidebar está expandida, valores de formularios).
*   **Context API (`CollectionsContext`)**: Para el estado global de la aplicación. Esto permite que cualquier componente acceda a la lista de colecciones y configuraciones de tema de forma centralizada.

## 3. Diseño del Backend / API
El sistema utiliza una arquitectura híbrida:
*   **Entorno Local**: Servidor Express que persiste datos en `collections.json`.
*   **Producción (Vercel)**: Serverless Functions (Node.js) que se comunican con una base de datos **Redis (Upstash)** a través de `@upstash/redis`.

La lógica de negocio está separada en:
*   **Rutas (`api/`)**: Endpoints serverless.
*   **Controladores/Servicios (`api/utils/`)**: Lógica de persistencia y comunicación con la DB.

## 4. Flujo de Datos
El flujo de datos es bidireccional, asíncrono y tipado:
1.  **Frontend**: El componente lanza una acción (ej. `addItem`).
2.  **API Client**: Se realiza una petición HTTP (Axios) a la ruta correspondiente en `/api`.
3.  **Backend**: La función serverless procesa la petición y actualiza la base de datos **KV (Redis)**.
4.  **Respuesta**: El servidor devuelve el objeto actualizado. El frontend actualiza su estado global, provocando la actualización visual.

## 5. Persistencia
*   **Servidor (KV Redis)**: Los datos de las colecciones, items y configuraciones de tema se guardan en la nube para persistir entre sesiones y despliegues.
*   **Cliente**: Se utiliza `localStorage` únicamente para la carga inicial rápida de preferencias de tema antes de sincronizar con el servidor.

---
*Documento de arquitectura actualizado para la infraestructura de Vercel.*
