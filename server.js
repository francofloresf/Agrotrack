const http = require('http');
const fs = require('fs');
const url = require('url');

const PORT = 8888;

// Crear servidor
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const method = req.method;

    console.log(method + ' ' + pathname);

    // Rutas GET
    if (method === 'GET') {
        
        // Página principal
        if (pathname === '/') {
            fs.readFile('public/index.html', (err, data) => {
                if (err) {
                    enviar500(res);
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(data);
            });
        }
        
        // Archivos HTML
        else if (pathname === '/productos.html' || pathname === '/contacto.html' || pathname === '/login.html') {
            fs.readFile('public' + pathname, (err, data) => {
                if (err) {
                    enviar404(res);
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(data);
            });
        }
        
        // CSS
        else if (pathname === '/estilos.css') {
            fs.readFile('public/estilos.css', (err, data) => {
                if (err) {
                    enviar404(res);
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'text/css' });
                res.end(data);
            });
        }
        
        // Login (sin .html)
        else if (pathname === '/login') {
            fs.readFile('public/login.html', (err, data) => {
                if (err) {
                    enviar500(res);
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(data);
            });
        }
        
        // Contacto (sin .html)
        else if (pathname === '/contacto') {
            fs.readFile('public/contacto.html', (err, data) => {
                if (err) {
                    enviar500(res);
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(data);
            });
        }
        
        // Listar consultas
        else if (pathname === '/contacto/listar') {
            fs.readFile('data/consultas.txt', (err, data) => {
                let contenido = '';
                if (err) {
                    contenido = 'Aún no hay consultas.';
                } else {
                    contenido = data.toString();
                }
                
                const html = '<html><head><title>Consultas - AgroTrack</title><link rel="stylesheet" href="/estilos.css"></head><body><div class="container"><h1>Consultas Recibidas</h1><pre>' + contenido + '</pre><p><a href="/contacto">Volver a Contacto</a> | <a href="/">Inicio</a></p></div></body></html>';
                
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(html);
            });
        }
        
        // Error 404
        else {
            enviar404(res);
        }
    }
    
    // Rutas POST
    else if (method === 'POST') {
        
        // Login
        if (pathname === '/auth/recuperar') {
            let body = '';
            
            req.on('data', (chunk) => {
                body += chunk.toString();
            });
            
            req.on('end', () => {
                const params = new URLSearchParams(body);
                const usuario = params.get('usuario');
                const clave = params.get('clave');
                
                const html = '<html><head><title>Login - AgroTrack</title><link rel="stylesheet" href="/estilos.css"></head><body><div class="container"><h1>Datos del Login</h1><p><strong>Usuario:</strong> ' + usuario + '</p><p><strong>Clave:</strong> ' + clave + '</p><p><a href="/login">Volver</a> | <a href="/">Inicio</a></p></div></body></html>';
                
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(html);
            });
        }
        
        // Contacto
        else if (pathname === '/contacto/cargar') {
            let body = '';
            
            req.on('data', (chunk) => {
                body += chunk.toString();
            });
            
            req.on('end', () => {
                const params = new URLSearchParams(body);
                const nombre = params.get('nombre');
                const email = params.get('email');
                const mensaje = params.get('mensaje');
                
                // Crear fecha
                const fecha = new Date().toLocaleString('es-AR');
                
                // Crear texto para guardar
                const consulta = '\n-------------------------\nFecha: ' + fecha + '\nNombre: ' + nombre + '\nEmail: ' + email + '\nMensaje: ' + mensaje + '\n-------------------------\n';
                
                // Guardar en archivo
                fs.appendFile('data/consultas.txt', consulta, (err) => {
                    if (err) {
                        enviar500(res);
                        return;
                    }
                    
                    const html = '<html><head><title>Gracias - AgroTrack</title><link rel="stylesheet" href="/estilos.css"></head><body><div class="container"><h1>¡Gracias por tu consulta!</h1><p>Tu mensaje ha sido guardado correctamente.</p><p><a href="/contacto">Enviar otra consulta</a> | <a href="/contacto/listar">Ver consultas</a> | <a href="/">Inicio</a></p></div></body></html>';
                    
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                    res.end(html);
                });
            });
        }
        
        // Error 404 para otros POST
        else {
            enviar404(res);
        }
    }
    
    // Otros métodos
    else {
        enviar404(res);
    }
});

// Función para error 404
function enviar404(res) {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    const html = '<html><head><title>Error 404 - AgroTrack</title></head><body><h1>Error 404 - Página no encontrada</h1><p>La página que buscas no existe.</p><p><a href="/">Volver al inicio</a></p></body></html>';
    res.end(html);
}

// Función para error 500
function enviar500(res) {
    res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
    const html = '<html><head><title>Error 500 - AgroTrack</title></head><body><h1>Error interno del servidor</h1><p>Ocurrió un error en el servidor.</p><p><a href="/">Volver al inicio</a></p></body></html>';
    res.end(html);
}

// Iniciar servidor
server.listen(PORT, () => {
    console.log('Servidor AgroTrack ejecutándose en http://localhost:' + PORT);
});
