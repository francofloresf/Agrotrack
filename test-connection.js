// Probar conexión a la base de datos
require('dotenv').config();
const mysql = require('mysql2/promise');

async function testConnection() {
    
    
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            port: process.env.DB_PORT || 3306
        });
        
        console.log('conexión a mysql exitosa');
        
        const [databases] = await connection.query('SHOW DATABASES LIKE ?', [process.env.DB_NAME]);
        
        if (databases.length > 0) {
            
            // Conectar a la base de datos
            await connection.query(`USE ${process.env.DB_NAME}`);
            
            // Verificar si existe la tabla
            const [tables] = await connection.query('SHOW TABLES LIKE ?', ['contactos']);
            
            if (tables.length > 0) {
                console.log('Tabla "contactos" existe');
                
                // Contar registros
                const [rows] = await connection.query('SELECT COUNT(*) as total FROM contactos');
                console.log(`Total de contactos en BD: ${rows[0].total}`);
            } else {
                console.log('La tabla "contactos" NO existe');
            }
        } else {
            console.log(`La base de datos '${process.env.DB_NAME}' NO existe`);

        }
        
        await connection.end();
        
    } catch (error) {
        console.error('\n Error al conectar:', error.message);
        process.exit(1);
    }
}

testConnection();
