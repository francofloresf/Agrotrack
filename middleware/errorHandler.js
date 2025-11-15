// middleware/errorHandler.js - Middleware centralizado para manejo de errores

/**
 * Middleware para manejar errores 404 - Ruta no encontrada
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const notFound = (req, res) => {
    res.status(404).json({
        error: 'Ruta no encontrada',
        message: `La ruta ${req.method} ${req.url} no existe`,
        status: 404
    });
};

/**
 * Middleware centralizado para manejo de errores
 * @param {Error} err - Error object
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 */
const errorHandler = (err, req, res, next) => {
    console.error('❌ Error capturado:', err);
    
    // Si ya se envió la respuesta, delegamos al manejador por defecto
    if (res.headersSent) {
        return next(err);
    }
    
    // Determinar el código de estado
    const statusCode = err.statusCode || err.status || 500;
    
    // Preparar mensaje de error
    const errorResponse = {
        error: err.name || 'Error del servidor',
        message: err.message || 'Ha ocurrido un error interno',
        status: statusCode
    };
    
    // En desarrollo, incluir el stack trace
    if (process.env.NODE_ENV === 'development') {
        errorResponse.stack = err.stack;
    }
    
    res.status(statusCode).json(errorResponse);
};

module.exports = {
    notFound,
    errorHandler
};
