# FORMOTEX - Sistema de Gestión de Inventario

Sistema backend para la gestión del inventario de equipos informáticos de la empresa FORMOTEX.

## Arquitectura del Sistema

El sistema FORMOTEX sigue una arquitectura basada en capas con patrones de diseño bien definidos para garantizar la escalabilidad, mantenibilidad y seguridad de la aplicación.

### Flujo de solicitudes HTTP

![Flujo de la Aplicación](./flujo-app.png)

### Patrones de diseño implementados

El sistema implementa varios patrones de diseño arquitectónicos:

- **Patrón MVC (Model-View-)**: Separación clara entre la lógica de negocio (Model), la presentación (View) y el manejo dControllere solicitudes (Controller).

- **Patrón Repository**: Abstracción del acceso a datos que permite desacoplar la lógica de negocio de la implementación específica de la base de datos.

- **Patrón Service Layer**: Centralización de la lógica de negocio en servicios separados de los controladores, promoviendo la reutilización y testabilidad.

- **Middlewares**: clase "validator" reutilizables para autenticación, autorización y validación de datos.

## Requisitos Previos

- Node.js (versión 18 o superior)
- npm o yarn
- Base de datos (MySQL, PostgreSQL o MongoDB)

## Instalación

1. Clonar el repositorio:

```bash
git clone <url-del-repositorio>
cd formotex-tlpiv-ts
```

2. Instalar dependencias:

```bash
npm install
```

3. Configurar variables de entorno:

```bash
# Crear archivo .env con las siguientes variables
DB_HOST=localhost
DB_PORT=5432
DB_NAME=formotex
DB_USER=postgres
DB_PASSWORD=tu_contraseña
JWT_SECRET=tu_secreto_jwt
JWT_EXPIRES_IN=Nh
PORT=3000
```

4. Ejecutar el proyecto:

```bash
npm run dev
```

## Endpoints Disponibles

### Rutas de Autenticación (`/api/auth`)

- **POST** `/api/auth/register` - Registro de nuevos usuarios
- **POST** `/api/auth/login` - Inicio de sesión
- **POST** `/api/auth/logout` - Cierre de sesión

### Rutas de Usuarios (`/api/users`) - Solo Administradores

- **GET** `/api/users/` - Listar todos los usuarios
- **GET** `/api/users/:id` - Obtener usuario por ID
- **POST** `/api/users/` - Crear nuevo usuario
- **PUT** `/api/users/:id` - Actualizar usuario existente
- **DELETE** `/api/users/:id` - Eliminar usuario

### Rutas de Equipos (`/api/equipment`) - Solo Administradores

- **GET** `/api/equipment/` - Listar todos los equipos
- **GET** `/api/equipment/:id` - Obtener equipo por ID
- **POST** `/api/equipment/` - Crear nuevo equipo
- **PUT** `/api/equipment/:id` - Actualizar equipo existente
- **DELETE** `/api/equipment/:id` - Eliminar equipo
- **POST** `/api/equipment/:id/assign` - Asignar equipo a usuario
- **POST** `/api/equipment/:id/unassign` - Desasignar equipo de usuario
- **POST** `/api/equipment/serial/search` - Buscar equipo por número de serie
- **GET** `/api/equipment/user/:userId` - Obtener equipos de un usuario
- **PUT** `/api/equipment/:id/status` - Actualizar estado de equipo

## Diseño de Relaciones entre Entidades

- **Usuario y Equipo**: Relación uno a muchos (1:N) donde un usuario puede tener múltiples equipos asignados
- **Soft Delete**: Implementado con timestamps paranoid para mantener integridad de datos históricos
- **Asignación de Equipos**: Sistema flexible que permite asignar y desasignar equipos dinámicamente

### Organización de Carpetas

```
src/
├── config/          # Configuración de base de datos
├── controllers/     # Lógica de manejo de requests/responses
├── helpers/         # Utilidades (bcrypt, JWT, errores)
├── interfaces/      # Definiciones de tipos TypeScript
├── main/           # Inicialización de la aplicación
├── middlewares/    # Autenticación y validaciones
├── models/         # Modelos de datos Sequelize
├── repositories/   # Acceso a datos (patrón Repository)
├── routes/         # Definición de rutas Express
└── services/       # Lógica de negocio
```

### Propiedades de las Entidades

#### Usuario (User)

- `id`: Identificador único
- `username`: Nombre de usuario
- `email`: Correo electrónico (único)
- `password`: Contraseña hasheada con bcrypt
- `role`: Rol del usuario ("admin" | "user")

#### Equipo (Equipment)

- `id`: Identificador único
- `name`: Nombre del equipo
- `type`: Tipo de equipo (laptop, monitor, printer, etc.)
- `serialNumber`: Número de serie (único)
- `location`: Ubicación física
- `status`: Estado ("active" | "inactive" | "maintenance")
- `purchaseDate`: Fecha de compra
- `userId`: ID del usuario asignado (nullable)

### Elección de Librerías y Patrones de Arquitectura

**Librerías Principales:**

- **Express**
- **Sequelize**
- **bcrypt**
- **jsonwebtoken**
- **express-validator**
- **TypeScript**

**Patrones de Arquitectura:**

- **MVC**: Separación clara entre Modelo, Vista y Controlador
- **Repository Pattern**: Abstracción del acceso a datos
- **Service Layer**: Lógica de negocio separada de los controladores
- **Middleware Pattern**: Para autenticación y validaciones reutilizables

### Sistema de Roles y Permisos

**Roles Definidos:**

- **admin**: Acceso completo a todos los endpoints CRUD y gestión de usuarios
- **user**: Acceso limitado a sus propios equipos asignados

**Control de Acceso:**

- Middleware de autenticación verifica tokens JWT válidos
- Middleware de autorización valida roles específicos por endpoint
- Validaciones de ownership para asegurar que los usuarios solo gestionen sus recursos

### Validaciones y Seguridad

**Validaciones de Datos:**

- Email con formato válido y único
- Contraseñas con longitud mínima
- Campos requeridos en todas las operaciones CRUD
- Enum values para roles y estados

**Medidas de Seguridad:**

- Hasheo de contraseñas con bcrypt (salt rounds: 10)
- Tokens JWT con expiración (1 hora)
- Validación de inputs contra inyección de datos
- No exposición de información sensible en respuestas de error

### Manejo de Errores

Sistema centralizado de errores mediante objeto `ERROR_MESSAGES` con:

- Mensajes consistentes en español
- Códigos HTTP apropiados para cada tipo de error
- Formato estándar de respuestas `{message, success, error?}`
- Diferenciación clara entre errores de validación, autorización y del sistema
