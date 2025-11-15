# AgroTrack v2.0 - Servidor Express con MySQL

**Estudiante:** Franco Flores  
**Proyecto:** Portal web interno AgroTrack - Versión 2.0  
**Tecnologías:** Node.js, Express, MySQL, dotenv

---

## 📋 Descripción

Portal web interno para la empresa AgroTrack desarrollado con Express.js y base de datos MySQL. Esta versión 2.0 implementa una API REST para la gestión de contactos con persistencia en base de datos.

### ✨ Características principales:
- ✅ Servidor Express con middleware personalizado
- ✅ API REST para gestión de contactos
- ✅ Base de datos MySQL con operaciones asíncronas
- ✅ Validaciones de datos y formato de email
- ✅ Manejo centralizado de errores
- ✅ Logger de peticiones HTTP
- ✅ Variables de entorno con dotenv
- ✅ Archivos estáticos (HTML, CSS)

---

## 🚀 Instalación y Configuración

### Requisitos previos:
- Node.js v14 o superior
- MySQL (XAMPP, WAMP o instalación local)
- Git

### Pasos de instalación:

#### 1. Clonar el repositorio
```bash
git clone https://github.com/francofloresf/Agrotrack.git
cd Agrotrack
```

#### 2. Instalar dependencias
```bash
npm install
```

#### 3. Configurar la base de datos

**Iniciar MySQL en XAMPP:**
- Abrir XAMPP Control Panel
- Iniciar Apache y MySQL
- Acceder a phpMyAdmin: http://localhost/phpmyadmin

**Ejecutar el script SQL:**
- Abrir el archivo `sql/schema.sql`
- Copiar y ejecutar el contenido en phpMyAdmin
- Esto creará la base de datos `agrotrack` y la tabla `contactos`

O desde terminal MySQL:
```bash
mysql -u root -p < sql/schema.sql
```

#### 4. Configurar variables de entorno

Editar el archivo `.env` con tus credenciales de MySQL:
```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=agrotrack
DB_PORT=3306
```

#### 5. Iniciar el servidor

**Modo producción:**
```bash
npm start
```

**Modo desarrollo (con nodemon):**
```bash
npm run dev
```

El servidor estará disponible en: **http://localhost:3000**

---

## 📡 Endpoints de la API

### 🏥 Health Check

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

## 🗂️ Estructura del Proyecto

```
agrotrack/
├── app.js                          # Servidor Express principal
├── db.js                           # Configuración de conexión MySQL
├── package.json                    # Dependencias y scripts
├── .env                            # Variables de entorno (no versionado)
├── .env.example                    # Ejemplo de variables de entorno
├── .gitignore                      # Archivos ignorados por Git
├── README.md                       # Documentación del proyecto
├── server.js                       # Servidor v1.0 (Node.js puro)
├── routes/
│   └── contactos.js                # Rutas de la API de contactos
├── middleware/
│   ├── logger.js                   # Middleware de logging
│   └── errorHandler.js             # Manejo centralizado de errores
├── sql/
│   └── schema.sql                  # Script de creación de BD
├── public/                         # Archivos estáticos
│   ├── index.html                  # Página principal
│   ├── productos.html              # Página de productos
│   ├── contacto.html               # Formulario de contacto
│   ├── login.html                  # Página de login
│   └── estilos.css                 # Estilos CSS
└── AgroTrack_Postman_Collection.json # Colección de Postman
```

---

## 🧪 Pruebas con Postman

Importar la colección `AgroTrack_Postman_Collection.json` en Postman para probar todos los endpoints.

### Pruebas incluidas:
- ✅ GET /health
- ✅ GET /api/contactos (listar todos)
- ✅ GET /api/contactos/:id (obtener uno)
- ✅ POST /api/contactos (crear válido)
- ✅ POST /api/contactos (validaciones de error)
- ✅ POST /api/contactos (email inválido)
- ✅ GET / (página principal)

---

## 🛡️ Validaciones Implementadas

### Campos del contacto:
- **nombre**: Obligatorio, mínimo 2 caracteres, máximo 100
- **email**: Obligatorio, formato válido, máximo 100
- **mensaje**: Obligatorio, mínimo 10 caracteres, máximo 5000

### Formato de email válido:
- Expresión regular: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`

---

## ⚠️ Manejo de Errores

### Códigos de estado HTTP:
- **200** - Solicitud exitosa
- **201** - Recurso creado exitosamente
- **400** - Datos inválidos o validación fallida
- **404** - Recurso no encontrado
- **500** - Error interno del servidor

### Middleware de errores:
- Logger registra todas las peticiones
- errorHandler maneja errores de forma centralizada
- Respuestas JSON consistentes

---

## 🔧 Tecnologías Utilizadas

- **Node.js** - Entorno de ejecución JavaScript
- **Express** v4.18 - Framework web
- **MySQL2** v3.6 - Cliente MySQL con soporte promesas
- **dotenv** v16.3 - Gestión de variables de entorno
- **nodemon** v3.0 - Reinicio automático en desarrollo

---

## 📝 Notas Importantes

1. **Seguridad**: El archivo `.env` NO debe versionarse en Git
2. **Base de datos**: Asegúrate de que MySQL esté ejecutándose antes de iniciar el servidor
3. **Puerto**: Por defecto usa el puerto 3000, configurable en `.env`
4. **Logs**: Todas las peticiones se registran en la consola

---

## 🐛 Solución de Problemas

### Error: "Cannot connect to database"
- Verificar que MySQL esté ejecutándose en XAMPP
- Revisar las credenciales en el archivo `.env`
- Confirmar que la base de datos `agrotrack` exista

### Error: "Port already in use"
- Cambiar el puerto en `.env`
- O detener el proceso que está usando el puerto 3000

### Error: "Table 'contactos' doesn't exist"
- Ejecutar el script `sql/schema.sql` en MySQL

---

## 👨‍💻 Autor

**Franco Flores**  
Proyecto AgroTrack v2.0 - Actividad Obligatoria 2  
Desarrollo de Aplicaciones con Node.js

---

## 📄 Licencia

ISC
