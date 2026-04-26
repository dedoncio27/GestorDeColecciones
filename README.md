# 📦 Gestor de Colecciones Fullstack

¡Bienvenido al **Gestor de Colecciones**! Una aplicación web moderna y visualmente impactante diseñada para catalogar tus pasiones (libros, monedas, videojuegos, etc.) de forma intuitiva y profesional.

Este proyecto ha sido desarrollado siguiendo una arquitectura **Fullstack** moderna, integrando un frontend robusto en React con un backend eficiente en Node.js.

## 🚀 Enlaces del Proyecto

*   **Tablero de Gestión (Trello/Kanban)**: [ENLACE A TU TABLERO AQUÍ]
*   **Repositorio**: [https://github.com/dedoncio27/GestorDeColecciones](https://github.com/dedoncio27/GestorDeColecciones)

---

## 🛠️ Tecnologías Utilizadas

### Frontend
*   **React + Vite**: Motor de la aplicación.
*   **TypeScript**: Tipado estricto para un código seguro y sin errores.
*   **Tailwind CSS**: Estilizado premium (Glassmorphism, Electric Blue Theme).
*   **Lucide React**: Set de iconos modernos y consistentes.
*   **React Router**: Navegación fluida entre páginas (SPA).

### Backend
*   **Node.js + Express**: Servidor de la aplicación.
*   **Arquitectura por Capas**: Rutas, Controladores y Servicios.
*   **Persistencia**: Almacenamiento basado en archivos JSON (`server/data/collections.json`).

---

## 📁 Documentación del Proyecto

Toda la documentación detallada sobre el desarrollo, arquitectura y metodologías se encuentra en la carpeta `/docs`:

1.  [Metodologías Ágiles (Scrum/Kanban)](./docs/agile.md)
2.  [Definición de la Idea e Investigación](./docs/idea.md)
3.  [Diseño y Arquitectura del Sistema](./docs/design.md)
4.  [Guía de Componentes](./docs/components.md)
5.  [Hooks Personalizados](./docs/hooks.md)
6.  [Cliente de API y Tipos](./docs/api-client.md)
7.  [Navegación y Rutas](./docs/routing.md)
8.  [Plan de Pruebas y Diseño Responsive](./docs/testing.md)
9.  [Retrospectiva y Reflexión Final](./docs/retrospective.md)

---

## 🔧 Instalación y Ejecución

Para ejecutar este proyecto en tu máquina local, sigue estos pasos:

### 1. Clonar el repositorio
```bash
git clone https://github.com/dedoncio27/GestorDeColecciones.git
cd GestorDeColecciones
```

### 2. Configurar el Backend
```bash
# Entrar en la carpeta del servidor
cd server
# Instalar dependencias
npm install
# Iniciar el servidor (Puerto 5000 por defecto)
npm run dev
```

### 3. Configurar el Frontend
```bash
# Volver a la raíz y entrar en el frontend (si aplica) o directamente en la raíz
npm install
# Iniciar el cliente
npm run dev
```

---

## ✨ Funcionalidades Destacadas

*   **Premium UI**: Interfaz azul eléctrico con animaciones fluidas y diseño "Connected Topbar".
*   **Selector de Iconos Visual**: Elige el icono de tu colección a través de una galería interactiva.
*   **Gestión Dinámica**: Añade tipos personalizados ("Otro") que se adaptan al tamaño de tu pantalla.
*   **Persistencia Real**: Tus colecciones se guardan en el servidor y no se pierden al refrescar.

---
Desarrollado con ❤️ por **Adrian Redondo**.
