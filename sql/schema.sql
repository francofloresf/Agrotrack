-- Script de creación de base de datos y tabla para AgroTrack v2.0
-- Ejecutar en MySQL (XAMPP o similar)

-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS agrotrack;

-- Seleccionar la base de datos
USE agrotrack;

-- Eliminar la tabla si existe (para desarrollo)
DROP TABLE IF EXISTS contactos;

-- Crear la tabla contactos
CREATE TABLE contactos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    mensaje TEXT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_fecha (fecha)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertar algunos datos de prueba (opcional)
INSERT INTO contactos (nombre, email, mensaje) VALUES
('Juan Pérez', 'juan@example.com', 'Consulta sobre productos agrícolas'),
('María García', 'maria@example.com', '¿Tienen fertilizantes orgánicos disponibles?'),
('Carlos López', 'carlos@example.com', 'Necesito información sobre sistemas de riego');

-- Verificar que la tabla se creó correctamente
SELECT * FROM contactos;
