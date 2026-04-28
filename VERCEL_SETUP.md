# ✅ Cambios realizados para despliegue en Vercel

## 📁 Archivos creados

1. **`vercel.json`** - Configuración de Vercel
   - Define comandos de construcción e instalación
   - Configura reescrituras de rutas
   - Establece variables de entorno

2. **`api/index.ts`** - Punto de entrada para funciones serverless
   - Exporta app Express como función serverless de Vercel
   - Manejador de todas las rutas `/api/*`

3. **`.env.example`** - Variables de entorno de ejemplo
   - Documenta `VITE_API_URL`

4. **`VERCEL_DEPLOY.md`** - Guía completa de despliegue
   - Instrucciones paso a paso
   - Nota sobre persistencia de datos

## 📝 Archivos modificados

1. **`package.json`**
   - ✅ Añadida dependencia: `@vercel/node`
   - ✅ Actualizado script `build` para compilar tanto frontend como backend

2. **`vite.config.ts`**
   - ✅ Configuración lista para Vercel (sin cambios necesarios)

## 🎯 Cómo desplegar

### 1. Verificar que todo funciona localmente
```bash
npm run dev
# Debería funcionar en http://localhost:5173 con API en localhost:5000
```

### 2. Preparar el repositorio Git
```bash
git add .
git commit -m "Preparar despliegue en Vercel"
git push
```

### 3. Desplegar en Vercel
Opción A (Recomendado - Automático):
- Sube el código a GitHub
- Ve a [vercel.com](https://vercel.com)
- Conecta tu repositorio
- Vercel detectará automáticamente los cambios

Opción B (Manual con Vercel CLI):
```bash
npm i -g vercel
vercel
```

---

## 🔍 Estructura final en Vercel

```
tu-dominio.vercel.app/          ← Frontend (React)
tu-dominio.vercel.app/api/*     ← Backend (Express serverless)
```

---

## ⚠️ IMPORTANTE: Base de datos

**Los datos JSON locales NO persisten en Vercel**

El archivo `server/src/data/collections.json` se reinicia en cada despliegue.

Para producción, necesitas:
1. MongoDB Atlas (gratuito)
2. Supabase PostgreSQL (gratuito)
3. Firebase Firestore (gratuito)

Consulta `VERCEL_DEPLOY.md` para más detalles.

---

## 🚀 Próximos cambios recomendados

Para que el proyecto sea completo en producción:

1. **Cambiar de JSON a base de datos**
   - Instalar controlador de BD (mongoose, pg, etc.)
   - Reemplazar `collectionService.ts`

2. **Añadir variables de entorno**
   - DATABASE_URL en Vercel settings

3. **Mejorar manejo de errores**
   - Validación de datos
   - Manejo de excepciones

---

¿Necesitas ayuda con alguno de estos pasos?
