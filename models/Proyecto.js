// ============================================
// models/Proyecto.js - Modelo de Proyectos
// Sistemas Web Studio
// ============================================

const db = require('../config/database');

class Proyecto {
  // Obtener todos los proyectos activos ordenados
  static async obtenerActivos() {
    const [rows] = await db.query(
      'SELECT * FROM proyectos WHERE activo = 1 ORDER BY orden ASC, creado_en DESC'
    );
    return rows;
  }

  // Obtener todos (incluye inactivos, para admin)
  static async obtenerTodos() {
    const [rows] = await db.query(
      'SELECT * FROM proyectos ORDER BY orden ASC, creado_en DESC'
    );
    return rows;
  }

  // Obtener proyectos destacados
  static async obtenerDestacados(limite = 3) {
    const [rows] = await db.query(
      'SELECT * FROM proyectos WHERE activo = 1 AND destacado = 1 ORDER BY orden ASC LIMIT ?',
      [limite]
    );
    return rows;
  }

  // Obtener uno por ID
  static async obtenerPorId(id) {
    const [rows] = await db.query(
      'SELECT * FROM proyectos WHERE id = ?', [id]
    );
    return rows[0] || null;
  }

  // Crear proyecto
  static async crear(datos) {
    const { titulo, descripcion, tecnologias, imagen, url_demo, url_repo, categoria, destacado, orden } = datos;
    const [result] = await db.query(
      `INSERT INTO proyectos (titulo, descripcion, tecnologias, imagen, url_demo, url_repo, categoria, destacado, orden)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [titulo, descripcion, tecnologias, imagen || null, url_demo || null, url_repo || null,
       categoria || 'Web', destacado ? 1 : 0, orden || 0]
    );
    return result.insertId;
  }

  // Actualizar proyecto
  static async actualizar(id, datos) {
    const { titulo, descripcion, tecnologias, imagen, url_demo, url_repo, categoria, destacado, orden, activo } = datos;
    const [result] = await db.query(
      `UPDATE proyectos SET titulo=?, descripcion=?, tecnologias=?, imagen=COALESCE(?, imagen),
       url_demo=?, url_repo=?, categoria=?, destacado=?, orden=?, activo=?
       WHERE id=?`,
      [titulo, descripcion, tecnologias, imagen || null, url_demo || null, url_repo || null,
       categoria || 'Web', destacado ? 1 : 0, orden || 0, activo !== undefined ? activo : 1, id]
    );
    return result.affectedRows;
  }

  // Eliminar (borrado físico)
  static async eliminar(id) {
    const [result] = await db.query('DELETE FROM proyectos WHERE id = ?', [id]);
    return result.affectedRows;
  }
}

module.exports = Proyecto;
