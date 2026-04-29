# Estado Global con Context API

Este documento explica cómo se gestiona el estado global de la aplicación para que todos los componentes tengan acceso a los datos de las colecciones.

## 1. ¿Por qué Context API?
Se ha elegido **Context API** en lugar de Redux o Zustand por su simplicidad y porque la aplicación tiene un flujo de datos que no requiere una complejidad excesiva. Permite evitar el *prop-drilling* (pasar props por muchos niveles).

## 2. Implementación (`src/context/CollectionsContext.tsx`)
El contexto centraliza:
*   La lista de colecciones (`collections`).
*   Las preferencias de tema (`themeColor`, `collectionBgColor`).
*   Las funciones de mutación (`addCollection`, `addItem`, `deleteCollection`, etc.).

### Ejemplo de uso del Provider:
```tsx
export const CollectionsProvider = ({ children }) => {
  const [collections, setCollections] = useState<Collection[]>([]);
  // ... lógica de fetch inicial ...

  return (
    <CollectionsContext.Provider value={{ collections, addCollection, ... }}>
      {children}
    </CollectionsContext.Provider>
  );
};
```

## 3. Consumo del Estado
Cualquier componente dentro de la aplicación puede acceder al estado global usando el hook personalizado `useCollections()`:

```tsx
const { collections, loading } = useCollections();
```

## 4. Sincronización con la API
Cada vez que se realiza una acción (como borrar una colección), el contexto:
1.  Llama al cliente de API para realizar el cambio en el servidor.
2.  Tras el éxito, vuelve a realizar un `fetchCollections()` para asegurar que la UI sea fiel a la base de datos (Fuente Única de Verdad).

---
*El uso de Context API garantiza una gestión de estado limpia y reactiva.*
