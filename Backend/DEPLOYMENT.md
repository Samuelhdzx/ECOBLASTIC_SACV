# 🚀 Guía de Despliegue en Render

## Backend (Node.js)

### Variables de Entorno Requeridas

En Render, configura las siguientes variables de entorno:

```
MONGO_URI=mongodb+srv://tu_usuario:tu_password@tu_cluster.mongodb.net/ecoblastic_db?retryWrites=true&w=majority
JWT_SECRET=tu_jwt_secret_super_seguro_aqui
PORT=3000
```

### Configuración en Render

1. **Build Command**: `npm install`
2. **Start Command**: `npm start`
3. **Environment**: Node.js
4. **Branch**: main

### Verificación

Una vez desplegado, puedes verificar que funciona visitando:
`https://tu-backend-url.onrender.com/`

Deberías ver:
```json
{
  "message": "ECOBLASTIC Backend API funcionando correctamente",
  "version": "1.0.0",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Frontend (Vite/React)

### Variables de Entorno

En el frontend, asegúrate de que la API esté configurada para usar la URL de producción:

```javascript
// En src/state/api.ts
const getBaseUrl = () => {
  if (import.meta.env.PROD) {
    return 'https://tu-backend-url.onrender.com';
  }
  return 'http://localhost:1337';
};
```

### Configuración en Render

1. **Build Command**: `npm run build`
2. **Publish Directory**: `dist`
3. **Environment**: Static Site
4. **Branch**: main

## URLs de Producción

- **Backend**: `https://ecoblastic-backend.onrender.com`
- **Frontend**: `https://ecoblastic-frontend.onrender.com`

## Solución de Problemas

### Error: "Missing script: start"

Si ves este error, asegúrate de que el `package.json` tenga:

```json
{
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  }
}
```

### Error de CORS

Si hay problemas de CORS, verifica que en `app.js` esté configurado:

```javascript
app.use(cors({
    origin: [
        'http://localhost:5173', 
        'http://localhost:1337',
        'https://ecoblastic-frontend.onrender.com',
        'https://ecoblastic-backend.onrender.com'
    ],
    credentials: true
}));
```

### Error de Conexión a MongoDB

Verifica que:
1. La URL de MongoDB sea correcta
2. El usuario tenga permisos de lectura/escritura
3. La IP esté en la whitelist de MongoDB Atlas 