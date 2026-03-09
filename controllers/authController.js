// ============================================
// controllers/authController.js - Autenticación
// Sistemas Web Studio
// ============================================

const db      = require('../config/database');
const bcrypt  = require('bcryptjs');

// GET /admin/login
exports.loginForm = (req, res) => {
  if (req.session && req.session.adminUser) {
    return res.redirect('/admin');
  }
  res.render('../admin/views/login', {
    title: 'Acceso Admin | Sistemas Web Studio',
    error: null
  });
};

// POST /admin/login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.render('../admin/views/login', {
      title: 'Acceso Admin',
      error: 'Ingresa tu correo y contraseña.'
    });
  }

  try {
    const [rows] = await db.query(
      'SELECT * FROM usuario WHERE email = ? AND activo = 1 LIMIT 1',
      [email.trim().toLowerCase()]
    );

    if (rows.length === 0) {
      return res.render('../admin/views/login', {
        title: 'Acceso Admin',
        error: 'Credenciales incorrectas.'
      });
    }

    const usuario = rows[0];
    const passwordValida = await bcrypt.compare(password, usuario.password);

    if (!passwordValida) {
      return res.render('../admin/views/login', {
        title: 'Acceso Admin',
        error: 'Credenciales incorrectas.'
      });
    }

    // Crear sesión
    req.session.adminUser = {
      id:     usuario.id,
      nombre: usuario.nombre,
      email:  usuario.email,
      rol:    usuario.rol
    };

    res.redirect('/admin');
  } catch (err) {
    console.error('Error en login:', err);
    res.render('../admin/views/login', {
      title: 'Acceso Admin',
      error: 'Error del servidor. Intenta de nuevo.'
    });
  }
};

// GET /admin/logout
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/admin/login');
  });
};
