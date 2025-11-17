// app.js - Servidor principal Express para AgroTrack v2.0
const express = require('express');
const path = require('path');
require('dotenv').config();

// Importar middlewares
const logger = require('./middleware/logger');
const { notFound, errorHandler } = require('./middleware/errorHandler');

// Importar rutas
const contactosRoutes = require('./routes/contactos');

// Crear aplicación Express
const app = express();
const PORT = process.env.PORT || 3000;

// ===== MIDDLEWARES GLOBALES =====

// Middleware para parsear JSON
app.use(express.json());

// Middleware para parsear datos de formularios
app.use(express.urlencoded({ extended: true }));

// Middleware de logging
app.use(logger);

// Servir archivos estáticos desde la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

// ===== RUTAS =====

/**
 * GET /
 * Página principal
 */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

/**
 * GET /health
 * Endpoint de verificación del estado del servidor
 */
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Servidor AgroTrack v2.0 funcionando correctamente',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        version: '2.0.0'
    });
});

/**
 * API de contactos
 */
app.use('/api/contactos', contactosRoutes);

// ===== MANEJO DE ERRORES =====

// Middleware para rutas no encontradas (404)
app.use(notFound);

// Middleware centralizado de manejo de errores
app.use(errorHandler);

// ===== INICIAR SERVIDOR =====

app.listen(PORT, () => {
    console.log(`run:${PORT}`);
});

// Manejo de errores no capturados
process.on('uncaughtException', (error) => {
    console.error('Error no capturado:', error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Promesa rechazada no manejada:', reason);
    process.exit(1);
});

module.exports = app;
