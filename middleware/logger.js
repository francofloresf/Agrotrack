// middleware/logger.js - Middleware para registrar peticiones HTTP

/**
 * Middleware que registra información de cada petición HTTP
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 */
const logger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;
    const ip = req.ip || req.connection.remoteAddress;
    
    // Registrar la petición
    console.log(`[${timestamp}] ${method} ${url} - IP: ${ip}`);
    
    // Capturar el código de estado cuando se envíe la respuesta
    const originalSend = res.send;
    res.send = function(data) {
        console.log(`[${timestamp}] ${method} ${url} - Status: ${res.statusCode}`);
        originalSend.call(this, data);
    };
    
    next();
};

module.exports = logger;
