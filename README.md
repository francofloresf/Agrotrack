# AgroTrack - Servidor Node.js

**Estudiante:** Franco Flores - 
**Proyecto:** Portal web interno AgroTrack

# Descripción
Este es un servidor web básico hecho con Node.js puro (sin Express) para la empresa AgroTrack. Permite consultar páginas estáticas, hacer login de prueba y enviar formularios de contacto.

# Cómo ejecutar
1. Abrir terminal en la carpeta del proyecto
2. Ejecutar: `node server.js`
3. Abrir navegador en: http://localhost:8888

# Rutas disponibles

# Páginas estáticas:
- `GET /` - Página principal
- `GET /productos.html` - Página de productos
- `GET /contacto.html` - Página de contacto
- `GET /login.html` - Página de login
- `GET /estilos.css` - Archivo CSS

# Sistema de login:
- `GET /login` - Muestra formulario de login
- `POST /auth/recuperar` - Procesa datos del login y los muestra

# Sistema de contacto:
- `GET /contacto` - Muestra formulario de contacto
- `POST /contacto/cargar` - Guarda consulta en archivo
- `GET /contacto/listar` - Muestra todas las consultas guardadas

# Manejo de errores:
- Error 404 para rutas que no existen
- Error 500 para errores del servidor

# Archivos importantes
- `server.js` - Servidor principal
- `public/` - Archivos HTML y CSS
- `data/consultas.txt` - Archivo donde se guardan las consultas (se crea automáticamente)

# Explicación técnica

# Partes asíncronas:
- `fs.readFile()` para leer archivos HTML/CSS
- `fs.appendFile()` para guardar consultas
- `req.on('data')` y `req.on('end')` para recibir datos POST

# Manejo de MIME:
- HTML: `text/html; charset=utf-8`
- CSS: `text/css`

# Manejo de errores:
- Función `enviar404()` para páginas no encontradas
- Función `enviar500()` para errores internos

# Ejemplo de uso
1. Ir a http://localhost:8888
2. Navegar por las páginas
3. Probar el login con cualquier usuario/clave
4. Enviar un mensaje de contacto
5. Ver los mensajes en /contacto/listar
