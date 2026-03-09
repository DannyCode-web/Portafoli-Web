// ============================================
// server.js - Servidor principal
// Sistemas Web Studio
// ============================================

require('dotenv').config();

const express      = require('express');
const path         = require('path');
const session      = require('express-session');
const bodyParser   = require('body-parser');
const cors         = require('cors');

// Importar rutas
const publicRoutes = require('./routes/publicRoutes');
const adminRoutes  = require('./routes/adminRoutes');
const apiRoutes    = require('./routes/apiRoutes');

const app  = express();
const PORT = process.env.PORT || 3000;

// ============================================
// CONFIGURACIÓN DEL MOTOR DE VISTAS (EJS)
// ============================================
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ============================================
// MIDDLEWARES GLOBALES
// ============================================
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Archivos estáticos públicos
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Archivos estáticos del admin
app.use('/admin/assets', express.static(path.join(__dirname, 'admin', 'public')));

// Sesiones
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret_key_default',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,        // Cambiar a true con HTTPS en producción
    maxAge: 1000 * 60 * 60 * 8  // 8 horas
  }
}));

// Middleware: variables globales para todas las vistas
app.use((req, res, next) => {
  res.locals.siteName    = 'Sistemas Web Studio';
  res.locals.currentYear = new Date().getFullYear();
  res.locals.adminUser   = req.session.adminUser || null;
  next();
});

// ============================================
// RUTAS
// ============================================
app.use('/', publicRoutes);
app.use('/admin', adminRoutes);
app.use('/api', apiRoutes);

// ============================================
// MANEJO DE ERRORES
// ============================================
// 404 - Página no encontrada
app.use((req, res) => {
  res.status(404).render('404', { title: 'Página no encontrada' });
});

// 500 - Error del servidor
app.use((err, req, res, next) => {
  console.error('Error del servidor:', err.stack);
  res.status(500).render('500', { title: 'Error del servidor', error: err.message });
});

// ============================================
// INICIAR SERVIDOR
// ============================================
app.listen(PORT, () => {
  console.log('');
  console.log('╔═══════════════════════════════════════════╗');
  console.log('║       SISTEMAS WEB STUDIO - v1.0.0        ║');
  console.log('╠═══════════════════════════════════════════╣');
  console.log(`║  Servidor corriendo en:                   ║`);
  console.log(`║  http://localhost:${PORT}                    ║`);
  console.log(`║  Panel Admin: http://localhost:${PORT}/admin  ║`);
  console.log('╚═══════════════════════════════════════════╝');
  console.log('');
});

module.exports = app;
