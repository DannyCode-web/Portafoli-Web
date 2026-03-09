// ============================================
// models/Servicio.js - Modelo de Servicios
// Sistemas Web Studio
// ============================================

const db = require('../config/database');

class Servicio {
  static async obtenerActivos() {
    const [rows] = await db.query(
      'SELECT * FROM servicios WHERE activo = 1 ORDER BY orden ASC'
    );
    return rows;
  }

  static async obtenerTodos() {
    const [rows] = await db.query('SELECT * FROM servicios ORDER BY orden ASC');
    return rows;
  }

  static async obtenerPorId(id) {
    const [rows] = await db.query('SELECT * FROM servicios WHERE id = ?', [id]);
    return rows[0] || null;
  }

  static async crear(datos) {
    const { titulo, descripcion, icono, precio, destacado, orden } = datos;
    const [result] = await db.query(
      `INSERT INTO servicios (titulo, descripcion, icono, precio, destacado, orden)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [titulo, descripcion, icono || 'fas fa-laptop-code',
       precio || null, destacado ? 1 : 0, orden || 0]
    );
    return result.insertId;
  }

  static async actualizar(id, datos) {
    const { titulo, descripcion, icono, precio, destacado, orden, activo } = datos;
    const [result] = await db.query(
      `UPDATE servicios SET titulo=?, descripcion=?, icono=?, precio=?,
       destacado=?, orden=?, activo=? WHERE id=?`,
      [titulo, descripcion, icono || 'fas fa-laptop-code',
       precio || null, destacado ? 1 : 0, orden || 0,
       activo !== undefined ? activo : 1, id]
    );
    return result.affectedRows;
  }

  static async eliminar(id) {
    const [result] = await db.query('DELETE FROM servicios WHERE id = ?', [id]);
    return result.affectedRows;
  }
}

module.exports = Servicio;
