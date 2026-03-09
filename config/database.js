// ============================================
// config/database.js - Conexión a MySQL
// Sistemas Web Studio
// ============================================

const mysql = require('mysql2');
require('dotenv').config();

// Crear pool de conexiones para mejor rendimiento
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'portafolio_web',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4'
});

// Promisificar el pool para usar async/await
const promisePool = pool.promise();

// Verificar conexión al iniciar
pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('❌ Conexión a la base de datos perdida.');
    } else if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('❌ Demasiadas conexiones a la base de datos.');
    } else if (err.code === 'ECONNREFUSED') {
      console.error('❌ Conexión a la base de datos rechazada.');
    } else {
      console.error('❌ Error de conexión:', err.message);
    }
    return;
  }
  if (connection) {
    connection.release();
    console.log('✅ Conexión a MySQL establecida correctamente.');
  }
});

module.exports = promisePool;
