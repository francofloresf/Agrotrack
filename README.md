# AgroTrack v2.0 - Servidor Express con MySQL

**Estudiante:** Franco Flores  
**Proyecto:** Portal web interno AgroTrack - Versión 2.0  
---

## Descripción

Esta versión 2.0 implementa una API REST para la gestión de contactos con persistencia en base de datos.

## Instalación y Configuración

### Pasos de instalación:

#### 1. Clonar el repositorio

git clone https://github.com/francofloresf/Agrotrack.git

#### 2. Instalar dependencias
npm install

#### 3. Configurar la base de datos

**Iniciar MySQL en XAMPP:**
- Abrir XAMPP Control Panel
- Iniciar Apache y MySQL
- Acceder a phpMyAdmin: http://localhost/phpmyadmin

**Ejecutar el script SQL:**
- Abrir el archivo `sql/schema.sql`
- Copiar y ejecutar el contenido en phpMyAdmin
- Esto creará la base de datos `agrotrack` y la tabla `contactos`

#### 4. Configurar variables de entorno

Editar el archivo `.env` con tus credenciales de MySQL:

PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=agrotrack
DB_PORT=3306


#### 5. Iniciar el servidor

**Modo producción:**
npm start

**Modo desarrollo (con nodemon):**

npm run dev

El servidor estará disponible en: **http://localhost:3000**

---

##  Endpoints de la API

###  Health Check

**GET /health**  
Verificar el estado del servidor

**Respuesta exitosa (200):**
```json
{
  "status": "ok",
  "message": "Servidor AgroTrack v2.0 funcionando correctamente",
  "timestamp": "2025-11-15T10:30:00.000Z",
  "uptime": 120.5,
  "version": "2.0.0"
}
```

---

### 📬 API de Contactos

#### **GET /api/contactos**
Obtener todos los contactos

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "cantidad": 3,
  "data": [
    {
      "id": 1,
      "nombre": "Juan Pérez",
      "email": "juan@example.com",
      "mensaje": "Consulta sobre productos agrícolas",
      "fecha": "2025-11-15T10:30:00.000Z"
    }
  ]
}
```

#### **GET /api/contactos/:id**
Obtener un contacto específico por ID

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "mensaje": "Consulta sobre productos agrícolas",
    "fecha": "2025-11-15T10:30:00.000Z"
  }
}
```

**Respuesta error (404):**
```json
{
  "success": false,
  "error": "Contacto no encontrado",
  "message": "No existe un contacto con ID 999"
}
```

#### **POST /api/contactos**
Crear un nuevo contacto

**Body (JSON):**
```json
{
  "nombre": "María García",
  "email": "maria@example.com",
  "mensaje": "Me interesa conocer más sobre sus productos orgánicos"
}
```

**Respuesta exitosa (201):**
```json
{
  "success": true,
  "message": "Contacto creado exitosamente",
  "data": {
    "id": 4,
    "nombre": "María García",
    "email": "maria@example.com",
    "mensaje": "Me interesa conocer más sobre sus productos orgánicos",
    "fecha": "2025-11-15T10:35:00.000Z"
  }
}
```

**Respuesta error validación (400):**
```json
{
  "success": false,
  "error": "Datos inválidos",
  "message": "Por favor, corrige los siguientes errores",
  "errores": [
    "El nombre es obligatorio",
    "El formato del email no es válido"
  ]
}
```

---

## Pruebas con Postman

Importar la colección `AgroTrack_Postman_Collection.json` en Postman para probar todos los endpoints.

Para estar versión 2.0 el archivo actulizado es `AgroTrack_v2_Postman_Collection.json`

### Pruebas incluidas:
- ✅ GET /health
- ✅ GET /api/contactos (listar todos)
- ✅ GET /api/contactos/:id (obtener uno)
- ✅ POST /api/contactos (crear válido)
- ✅ POST /api/contactos (validaciones de error)
- ✅ POST /api/contactos (email inválido)
- ✅ GET / (página principal)
