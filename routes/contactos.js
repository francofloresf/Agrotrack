// routes/contactos.js - API REST para gestión de contactos
const express = require('express');
const router = express.Router();
const db = require('../db');

/**
 * Validar formato de email
 * @param {string} email - Email a validar
 * @returns {boolean} - True si es válido
 */
const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

/**
 * Validar datos del contacto
 * @param {Object} data - Datos del contacto
 * @returns {Object} - { valido: boolean, errores: array }
 */
const validarContacto = (data) => {
    const errores = [];
    
    if (!data.nombre || data.nombre.trim() === '') {
        errores.push('El nombre es obligatorio');
    } else if (data.nombre.trim().length < 2) {
        errores.push('El nombre debe tener al menos 2 caracteres');
    } else if (data.nombre.length > 100) {
        errores.push('El nombre no puede exceder 100 caracteres');
    }
    
    if (!data.email || data.email.trim() === '') {
        errores.push('El email es obligatorio');
    } else if (!validarEmail(data.email)) {
        errores.push('El formato del email no es válido');
    } else if (data.email.length > 100) {
        errores.push('El email no puede exceder 100 caracteres');
    }
    
    if (!data.mensaje || data.mensaje.trim() === '') {
        errores.push('El mensaje es obligatorio');
    } else if (data.mensaje.trim().length < 10) {
        errores.push('El mensaje debe tener al menos 10 caracteres');
    } else if (data.mensaje.length > 5000) {
        errores.push('El mensaje no puede exceder 5000 caracteres');
    }
    
    return {
        valido: errores.length === 0,
        errores
    };
};

/**
 * GET /api/contactos
 * Obtener todos los contactos
 */
router.get('/', async (req, res, next) => {
    try {
        const [contactos] = await db.query(
            'SELECT id, nombre, email, mensaje, fecha FROM contactos ORDER BY fecha DESC'
        );
        
        res.json({
            success: true,
            cantidad: contactos.length,
            data: contactos
        });
    } catch (error) {
        console.error('Error al obtener contactos:', error);
        error.statusCode = 500;
        error.message = 'Error al obtener los contactos de la base de datos';
        next(error);
    }
});

/**
 * GET /api/contactos/:id
 * Obtener un contacto por ID
 */
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        
        // Validar que el ID sea un número
        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                error: 'ID inválido',
                message: 'El ID debe ser un número'
            });
        }
        
        const [contactos] = await db.query(
            'SELECT id, nombre, email, mensaje, fecha FROM contactos WHERE id = ?',
            [id]
        );
        
        if (contactos.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Contacto no encontrado',
                message: `No existe un contacto con ID ${id}`
            });
        }
        
        res.json({
            success: true,
            data: contactos[0]
        });
    } catch (error) {
        console.error('Error al obtener contacto:', error);
        error.statusCode = 500;
        error.message = 'Error al obtener el contacto de la base de datos';
        next(error);
    }
});

/**
 * POST /api/contactos
 * Crear un nuevo contacto
 */
router.post('/', async (req, res, next) => {
    try {
        const { nombre, email, mensaje } = req.body;
        
        // Validar los datos
        const validacion = validarContacto({ nombre, email, mensaje });
        
        if (!validacion.valido) {
            return res.status(400).json({
                success: false,
                error: 'Datos inválidos',
                message: 'Por favor, corrige los siguientes errores',
                errores: validacion.errores
            });
        }
        
        // Insertar en la base de datos
        const [resultado] = await db.query(
            'INSERT INTO contactos (nombre, email, mensaje) VALUES (?, ?, ?)',
            [nombre.trim(), email.trim(), mensaje.trim()]
        );
        
        // Obtener el contacto recién creado
        const [contactoNuevo] = await db.query(
            'SELECT id, nombre, email, mensaje, fecha FROM contactos WHERE id = ?',
            [resultado.insertId]
        );
        
        res.status(201).json({
            success: true,
            message: 'Contacto creado exitosamente',
            data: contactoNuevo[0]
        });
    } catch (error) {
        console.error('Error al crear contacto:', error);
        error.statusCode = 500;
        error.message = 'Error al guardar el contacto en la base de datos';
        next(error);
    }
});

module.exports = router;
