// test-connection.js - Probar conexión a la base de datos
require('dotenv').config();
const mysql = require('mysql2/promise');

async function testConnection() {
    console.log('🔍 Probando conexión a MySQL...\n');
    
    try {
        // Intentar conectar
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            port: process.env.DB_PORT || 3306
        });
        
        console.log('✅ Conexión a MySQL exitosa!');
        
        // Verificar si existe la base de datos
        const [databases] = await connection.query('SHOW DATABASES LIKE ?', [process.env.DB_NAME]);
        
        if (databases.length > 0) {
            console.log(`✅ Base de datos '${process.env.DB_NAME}' existe`);
            
            // Conectar a la base de datos
            await connection.query(`USE ${process.env.DB_NAME}`);
            
            // Verificar si existe la tabla
            const [tables] = await connection.query('SHOW TABLES LIKE ?', ['contactos']);
            
            if (tables.length > 0) {
                console.log('✅ Tabla "contactos" existe');
                
                // Contar registros
                const [rows] = await connection.query('SELECT COUNT(*) as total FROM contactos');
                console.log(`📊 Total de contactos en BD: ${rows[0].total}`);
                
                console.log('\n🎉 Todo está configurado correctamente!');
                console.log('✨ Puedes iniciar el servidor con: npm start');
            } else {
                console.log('❌ La tabla "contactos" NO existe');
                console.log('📝 Ejecuta el script: sql/schema.sql');
            }
        } else {
            console.log(`❌ La base de datos '${process.env.DB_NAME}' NO existe`);
            console.log('📝 Ejecuta el script: sql/schema.sql');
        }
        
        await connection.end();
        
    } catch (error) {
        console.error('\n❌ Error al conectar:', error.message);
        console.log('\n🔧 Verificar:');
        console.log('   1. MySQL está ejecutándose (XAMPP)');
        console.log('   2. Las credenciales en .env son correctas');
        console.log('   3. El puerto MySQL es el correcto (3306)');
        process.exit(1);
    }
}

testConnection();
