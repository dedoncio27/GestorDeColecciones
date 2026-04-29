# Guía de Despliegue

La aplicación ha sido desplegada utilizando servicios modernos de cloud para garantizar alta disponibilidad y persistencia.

## 1. Frontend y Backend (Vercel)
Se ha utilizado **Vercel** para el despliegue de todo el repositorio.
*   **Frontend**: React (Vite) se compila y se sirve como una SPA.
*   **Backend**: Las funciones situadas en la carpeta `/api` se despliegan automáticamente como **Vercel Serverless Functions**.

### Configuración de Vercel:
1.  Conectar el repositorio de GitHub a Vercel.
2.  Configurar el "Build Command": `npm run build`.
3.  Configurar el "Output Directory": `dist`.

## 2. Base de Datos (Upstash Redis)
Para la persistencia de datos en producción, se utiliza **Upstash Redis**.
*   **Servicio**: Serverless Redis.
*   **Conexión**: Se utiliza el cliente `@upstash/redis` para realizar peticiones HTTP/REST desde las funciones serverless de Vercel.

## 3. Variables de Entorno
Para que el despliegue funcione, es necesario configurar las siguientes variables en el panel de Vercel (Settings -> Environment Variables):
*   `KV_REST_API_URL`: URL del endpoint REST de Upstash.
*   `KV_REST_API_TOKEN`: Token de autenticación de Upstash.

## 4. Proceso de Despliegue (CI/CD)
Cada vez que se hace un `git push` a la rama `master`, Vercel detecta los cambios y realiza un nuevo despliegue automáticamente, asegurando que la versión online siempre esté actualizada.

---
*URL del proyecto: [gestor-colecciones.vercel.app](https://gestor-colecciones.vercel.app)*
