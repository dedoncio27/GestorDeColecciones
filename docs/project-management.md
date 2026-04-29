# Gestión del Proyecto

## Organización del Trabajo

Para este proyecto, estamos utilizando una metodología ágil basada en un tablero Kanban.

### Estructura de Carpetas
- **src/components/**: Componentes visuales reutilizables.
- **src/pages/**: Vistas principales de la aplicación.
- **src/hooks/**: Custom hooks para lógica compartida.
- **src/types/**: Definiciones de interfaces y tipos TypeScript.
- **src/utils/**: Funciones de utilidad y helpers.
- **src/context/**: Gestión del estado global mediante React Context.
- **src/api/**: Capa de red y cliente de API.

### Infraestructura y Despliegue
- **Frontend & Functions**: Desplegado en **Vercel** para integración continua.
- **Base de Datos**: Gestión de persistencia mediante **Upstash Redis (KV)** para garantizar que los datos no se pierdan entre sesiones de servidor serverless.

## Seguimiento de Tareas (Kanban)
Se ha utilizado un tablero de Trello para organizar el desarrollo en las siguientes fases:
1.  **Backlog**: Ideas y funcionalidades futuras.
2.  **Todo**: Tareas planificadas para el sprint actual.
3.  **In Progress**: Funcionalidades en desarrollo activo.
4.  **Review**: Tareas terminadas pendientes de testeo manual en Vercel.
5.  **Done**: Funcionalidades completamente operativas y desplegadas.

*El enlace al tablero se encuentra disponible en el README.md principal del repositorio.*
