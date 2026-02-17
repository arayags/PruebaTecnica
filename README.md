# Sistema de Inventarios

---

## Descripción

Sistema web de inventario desarrollado con Angular y .NET 8, que permite administrar productos, categorías y usuarios con autenticación basada en JSON Web Token (JWT).

El sistema incluye:

- Gestión completa de productos (CRUD)
- Gestión de categorías (CRUD)
- Gestión de usuarios (CRUD)
- Control de roles (Admin / Empleado)
- Autenticación segura con JWT
- Validaciones tanto en frontend como backend
- Arquitectura organizada por capas

---

## Tecnologías Utilizadas

### Frontend
- Angular (Standalone Components)
- TypeScript
- Reactive Forms
- RxJS (BehaviorSubject para estado reactivo)
- HttpInterceptor para JWT

### Backend
- .NET 8
- ASP.NET Core Web API
- ADO.NET
- SQL Server
- Stored Procedures
- JWT Authentication

### Base de Datos
- SQL Server
- Procedimientos almacenados para:
  - Productos
  - Categorías
  - Usuarios

---

## Arquitectura del Proyecto

### Backend

API_Prueba
- Controllers
- Repository
- Models
- Autenticación JWT
- Configuración CORS
- Procedimientos almacenados

### Frontend

ProyectoPrueba
- Components
- Services
- Models
- Interceptors
- Notificaciones personalizadas

---

## Funcionalidades

### Autenticación
- Login con generación de token JWT
- Protección de endpoints con [Authorize]
- Interceptor que agrega automáticamente el token a las peticiones

### Productos
- Crear producto
- Editar producto
- Eliminar producto
- Validación de stock
- Selección dinámica de categoría
- Selección dinámica de responsable (usuarios registrados)

### Categorías
- Crear categoría
- Uso dinámico en el select de productos

### Usuarios
- Crear usuario
- Editar usuario
- Eliminar usuario
- Validación de rol (solo 1 = Admin, 2 = Empleado)
- Validación de contraseña y confirmación

---

## Seguridad

- JWT configurado con:
  - Issuer
  - Audience
  - Key secreta
  - Validación de expiración
- CORS configurado para Angular (localhost:4200)
- Protección de endpoints críticos

---

## Cómo Ejecutar el Proyecto

### 1. Backend

Ir a la carpeta API:

cd API_Prueba  
dotnet run  

La API corre en:  
https://localhost:7145  

---

### 2. Frontend

Ir a la carpeta Angular:

cd ProyectoPrueba  
npm install  
ng serve  

La aplicación corre en:  
http://localhost:4200  

---

## Base de Datos

1. Crear base de datos en SQL Server  
2. Ejecutar los procedimientos almacenados:
   - SP_Productos_CRUD
   - SP_Categorias_CRUD
   - SP_Usuarios_CRUD
3. Configurar cadena de conexión en:

appsettings.json  

---

## Roles del Sistema

Rol 1: Administrador  
Rol 2: Empleado  

---

## Autor

Gabriel Sánchez
