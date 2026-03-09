// ============================================
// models/Habilidad.js - Modelo de Habilidades
// Sistemas Web Studio
// ============================================

const db = require('../config/database');

class Habilidad {
  static async obtenerActivas() {
    const [rows] = await db.query(
      'SELECT * FROM habilidades WHERE activo = 1 ORDER BY orden ASC'
    );
    return rows;
  }

  static async obtenerTodas() {
    const [rows] = await db.query('SELECT * FROM habilidades ORDER BY orden ASC');
    return rows;
  }

  static async crear(datos) {
    const { nombre, categoria, porcentaje, icono, orden } = datos;
    const [result] = await db.query(
      'INSERT INTO habilidades (nombre, categoria, porcentaje, icono, orden) VALUES (?, ?, ?, ?, ?)',
      [nombre, categoria || 'General', porcentaje || 80, icono || 'fas fa-code', orden || 0]
    );
    return result.insertId;
  }

  static async actualizar(id, datos) {
    const { nombre, categoria, porcentaje, icono, orden, activo } = datos;
    const [result] = await db.query(
      'UPDATE habilidades SET nombre=?, categoria=?, porcentaje=?, icono=?, orden=?, activo=? WHERE id=?',
      [nombre, categoria, porcentaje, icono, orden || 0, activo !== undefined ? activo : 1, id]
    );
    return result.affectedRows;
  }

  static async eliminar(id) {
    const [result] = await db.query('DELETE FROM habilidades WHERE id = ?', [id]);
    return result.affectedRows;
  }
}

module.exports = Habilidad;
