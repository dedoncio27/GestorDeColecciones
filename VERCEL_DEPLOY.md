# 📦 Guía de Despliegue en Vercel

## 🚀 Pasos para desplegar

### 1. Preparar el repositorio
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <tu-repo-url>
git push -u origin main
```

### 2. Conectar con Vercel
- Ve a [vercel.com](https://vercel.com)
- Haz clic en "New Project"
- Importa tu repositorio de GitHub
- Vercel debería detectar automáticamente que es un proyecto Vite

### 3. Configurar variables de entorno (opcional)
En las settings del proyecto en Vercel:
- No necesitas variables de entorno especiales si usas las rutas por defecto
- `VITE_API_URL` se establece automáticamente como `/api/collections`

### 4. Desplegar
Vercel desplegará automáticamente cuando hagas push a tu rama principal.

---

## ⚠️ Importante: Persistencia de datos

El archivo `server/src/data/collections.json` **NO persiste** en Vercel porque:
- Las funciones serverless en Vercel son stateless
- Los archivos se crean en una sistema de archivos temporal
- Los datos se pierden entre despliegues

### Soluciones:
1. **Base de datos en la nube (Recomendado)**
   - MongoDB Atlas (gratuito)
   - PostgreSQL en Supabase (gratuito)
   - Firebase Firestore

2. **Almacenamiento externo**
   - AWS S3
   - Cloudinary

3. **Mantener como está (para desarrollo local)**
   - Los datos se reinician con cada despliegue
   - Ideal para prototipos

---

## 🔧 Configuración actual

- **Frontend**: React + Vite (se compila a `/dist`)
- **Backend**: Express serverless en `/api`
- **Base de datos**: JSON local (cambiar para producción)

---

## 📝 Estructura del despliegue

```
Tu proyecto en Vercel
├── Frontend (React)      ← Se sirve desde `/`
└── Backend (Express)     ← Se sirve desde `/api/*`
```

---

## 🎯 Próximos pasos (Opcional)

Para mejorar la aplicación:
1. Integrar una base de datos real
2. Añadir autenticación con NextAuth o Auth0
3. Implementar caché
4. Optimizar imágenes
