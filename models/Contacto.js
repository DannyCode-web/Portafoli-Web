// ============================================
// models/Contacto.js - Modelo de Mensajes
// Sistemas Web Studio
// ============================================

const db = require('../config/database');

class Contacto {
  static async guardar(datos) {
    const { nombre, email, asunto, mensaje, telefono, ip } = datos;
    const [result] = await db.query(
      `INSERT INTO contacto (nombre, email, asunto, mensaje, telefono, ip_origen)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [nombre, email, asunto || 'Sin asunto', mensaje, telefono || null, ip || null]
    );
    return result.insertId;
  }

  static async obtenerTodos() {
    const [rows] = await db.query(
      'SELECT * FROM contacto ORDER BY creado_en DESC'
    );
    return rows;
  }

  static async obtenerPorId(id) {
    const [rows] = await db.query('SELECT * FROM contacto WHERE id = ?', [id]);
    return rows[0] || null;
  }

  static async marcarLeido(id) {
    await db.query('UPDATE contacto SET leido = 1 WHERE id = ?', [id]);
  }

  static async contarNoLeidos() {
    const [rows] = await db.query(
      'SELECT COUNT(*) AS total FROM contacto WHERE leido = 0'
    );
    return rows[0].total;
  }

  static async eliminar(id) {
    const [result] = await db.query('DELETE FROM contacto WHERE id = ?', [id]);
    return result.affectedRows;
  }
}

module.exports = Contacto;
