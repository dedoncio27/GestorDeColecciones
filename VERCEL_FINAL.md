# ✅ Despliegue en Vercel - Solución Final

## 🎯 Estrategia de Despliegue

Tu app tiene dos partes:
- **Frontend**: React + Vite → Se despliega en **Vercel**
- **Backend**: Express + Node → Se despliega en **un servidor externo**

### Por qué esta estrategia:
- Vercel es excelente para frontends estáticos
- Express + JSON local no es ideal para serverless
- Separar frontend y backend es una buena práctica

---

## 🚀 PASOS PARA DESPLEGAR

### 1️⃣ Frontend en Vercel (React + Vite)

```bash
# Push a GitHub
git add .
git commit -m "Ready for Vercel"
git push origin main

# En vercel.com:
# 1. New Project
# 2. Selecciona tu repo
# 3. ¡Listo! Vercel lo despliega automáticamente
```

**Tu URL será**: `https://tu-proyecto.vercel.app`

---

### 2️⃣ Backend en servidor externo (gratuito)

Elige una de estas opciones:

#### Opción A: Railway (Recomendado - más fácil)
```bash
npm install -g railway

# En la carpeta /server:
cd server
railway link
railway up
```

#### Opción B: Render.com
- Ve a render.com
- New Web Service
- Conecta tu repositorio
- Build Command: `cd server && npm install && npm run build`
- Start Command: `npm start`

#### Opción C: Heroku (antes era gratuito, ahora tiene pago mínimo)

---

### 3️⃣ Conectar Frontend con Backend

Una vez que tu backend esté desplegado, obtendrás una URL como:
```
https://tu-backend-api.railway.app
```

Configura esta URL en Vercel:
1. En vercel.com → Tu proyecto → Settings → Environment Variables
2. Añade: `VITE_API_URL=https://tu-backend-api.railway.app/api/collections`
3. Redeploy

---

## 📋 Checklist Final

- ✅ Frontend compilado y subido a GitHub
- ✅ Conectado con Vercel (auto-deploy habilitado)
- ✅ Backend desplegado en servicio externo
- ✅ Variable de entorno `VITE_API_URL` configurada
- ✅ Frontend accesible en `https://tu-proyecto.vercel.app`
- ✅ Backend accesible en `https://tu-backend-api.xxx`

---

## 🔍 Comprobar que funciona

En tu navegador:
```
https://tu-proyecto.vercel.app
```

Debería:
1. Cargar la interfaz
2. Mostrar "Cargando..." mientras obtiene datos del backend
3. Mostrar tus colecciones cuando el backend responda

Si no funciona, abre la consola (F12) y busca errores de CORS o conexión.

---

## 🐛 Troubleshooting

### "API not responding"
- Verifica que el backend esté en línea
- Comprueba la URL de `VITE_API_URL` en Vercel
- Revisa que el CORS está permitido en el servidor

### "BUILD FAILED"
- Ejecuta `npm run build` localmente para ver el error
- Asegúrate de que `npm install` funciona
- Revisa los logs en Vercel

### Los datos desaparecen después de redeploy
- Esto es normal con JSON local
- Necesitas migrar a una BD real (MongoDB, PostgreSQL, etc.)

---

## 🎓 Próximos pasos

Para una app más robusta:

1. **Base de datos real**
   - MongoDB Atlas (gratuito): https://www.mongodb.com/cloud/atlas
   - Supabase PostgreSQL (gratuito): https://supabase.com

2. **Autenticación**
   - Auth0 (gratuito): https://auth0.com
   - NextAuth.js

3. **Monitoreo**
   - Sentry (errores)
   - LogRocket (sesiones)

---

¿Necesitas ayuda configurando el backend en Railway o Render?
