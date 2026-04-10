# Sistema de Autenticación - Arrienda Fácil Web

## 🎯 Descripción

Sistema de autenticación completo con login y registro para la aplicación Arrienda Fácil. Incluye:

- ✅ Página de Login con validación Zod
- ✅ Página de Registro con confirmación de contraseña
- ✅ Dashboard protegido para usuarios autenticados
- ✅ Store de estado global con Zustand
- ✅ Servicio API con Axios e interceptores
- ✅ Rutas protegidas con ProtectedRoute
- ✅ Persistencia de token en localStorage
- ✅ Desing responsive

## 📁 Estructura de Archivos

```
src/
├── components/
│   ├── LoginForm.tsx          # Formulario de login
│   ├── LoginForm.css          # Estilos del login
│   ├── RegisterForm.tsx       # Formulario de registro
│   ├── RegisterForm.css       # Estilos del registro
│   └── ProtectedRoute.tsx     # Componente para proteger rutas
├── pages/
│   ├── LoginPage.tsx          # Página de login
│   ├── RegisterPage.tsx       # Página de registro
│   ├── DashboardPage.tsx      # Panel de control
│   └── DashboardPage.css      # Estilos del dashboard
├── schemas/
│   └── authSchema.ts          # Validaciones con Zod
├── services/
│   └── authService.ts         # Servicio API con Axios
├── store/
│   └── authStore.ts           # Store de autenticación con Zustand
├── App.tsx                    # Componente principal con rutas
├── main.tsx                   # Entry point con BrowserRouter
└── index.css                  # Estilos globales
```

## 🔑 Rutas Disponibles

| Ruta | Componente | Protegida | Descripción |
|------|-----------|-----------|-------------|
| `/` | - | No | Redirige a `/dashboard` |
| `/login` | LoginPage | No | Página de inicio de sesión |
| `/register` | RegisterPage | No | Página de registro |
| `/dashboard` | DashboardPage | Sí | Panel de control principal |
| `/*` | - | - | Cualquier otra ruta redirige a `/dashboard` |

## 🔐 Flujo de Autenticación

### Login
1. Usuario ingresa email y contraseña
2. Se valida con esquema Zod
3. Se envía POST a `/api/auth/login`
4. Se recibe token y datos del usuario
5. Se guarda token en localStorage
6. Se actualiza estado de Zustand
7. Se redirige a `/dashboard`

### Registro
1. Usuario completa formulario (nombre, email, contraseña x2)
2. Se valida con esquema Zod
3. Se verifica que las contraseñas coincidan
4. Se envía POST a `/api/auth/register`
5. Se obtiene token autodirectamente
6. Se guarda token y usuario
7. Se redirige a `/dashboard`

### Logout
1. Usuario hace clic en "Cerrar sesión"
2. Se envía POST a `/api/auth/logout`
3. Se elimina token de localStorage
4. Se limpian datos del usuario
5. Se redirige a `/login`

## 🚀 Uso del Store de Autenticación

```typescript
import { useAuthStore } from './store/authStore'

// En tu componente:
const { 
  user, 
  token, 
  isLoading, 
  error, 
  isAuthenticated,
  login,
  register,
  logout,
  setUser,
  setToken,
  clearError,
  initializeAuth
} = useAuthStore()

// Hacer login
await login({ email: 'user@example.com', password: 'password123' })

// Hacer logout
await logout()

// Acceder al usuario actual
console.log(user?.name, user?.email)

// Limpiar errores
clearError()
```

## 🔗 Configuración API

Por defecto, la API se conecta a `http://localhost:8000/api`.

Para cambiar la URL, edita `.env.local`:

```
VITE_API_URL=http://tu-dominio.com/api
```

## 📦 Dependencias Usadas

- **react**: Framework principal
- **react-router-dom**: Manejo de rutas
- **zustand**: Estado global
- **react-hook-form**: Gestión de formularios
- **@hookform/resolvers**: Integración con Zod
- **zod**: Validación de esquemas
- **axios**: Cliente HTTP
- **lucide-react**: Iconos
- **typescript**: Type safety

## 🎨 Estilos

### Colores Principales
- **Gradiente primario**: `#667eea` → `#764ba2`
- **Fondo claro**: `#f9fafb`
- **Texto oscuro**: `#1f2937`
- **Error**: `#dc2626`

### Fuente
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
```

## 📱 Responsive Design

- Mobile: max-width 480px
- Tablet: max-width 768px
- Desktop: sin límite

Todos los componentes se adaptan automáticamente.

## ⚠️ Notas Importantes

1. **Token JWT**: Se almacena en `localStorage` sin encriptación. Para producción, considera usar cookies httpOnly.

2. **CORS**: Asegúrate de que tu API tenga CORS configurado correctamente para aceptar requests desde el frontend.

3. **Variables de entorno**: Copia `.env.example` a `.env.local` y configura la URL de la API.

4. **Interceptores**: Todos los requests incluyen automáticamente el token en el header `Authorization: Bearer <token>`.

5. **Error handling**: Los errores se muestran en el formulario y también se guardan en el store.

## 🧪 Prueba Local

1. Instala dependencias:
   ```bash
   npm install
   ```

2. Configura `.env.local` con la URL de tu API

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Abre en el navegador:
   ```
   http://localhost:5173
   ```

5. Prueba con:
   - Correo: `test@example.com`
   - Contraseña: `password123`

## 📝 Endpoints API Esperados

- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/register` - Registrarse
- `POST /api/auth/logout` - Cerrar sesión
- `GET /api/auth/me` - Obtener usuario actual
- `POST /api/auth/refresh` - Refrescar token

---

**Última actualización:** Abril 9, 2026
**Versión:** 1.0.0
