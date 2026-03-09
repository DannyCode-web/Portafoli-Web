// ============================================
// routes/adminRoutes.js - Rutas del panel admin
// Sistemas Web Studio
// ============================================

const express    = require('express');
const router     = express.Router();
const controller = require('../controllers/adminController');
const auth       = require('../controllers/authController');
const upload     = require('../config/multer');

// Middleware de autenticación: protege todas las rutas admin
const requireAuth = (req, res, next) => {
  if (req.session && req.session.adminUser) {
    return next();
  }
  res.redirect('/admin/login');
};

// ---- Autenticación ----
router.get('/login',  auth.loginForm);
router.post('/login', auth.login);
router.get('/logout', auth.logout);

// ---- Dashboard ----
router.get('/', requireAuth, controller.dashboard);

// ---- Proyectos ----
router.get('/proyectos',                requireAuth, controller.listarProyectos);
router.get('/proyectos/nuevo',          requireAuth, controller.nuevoProyectoForm);
router.post('/proyectos/nuevo',         requireAuth, upload.single('imagen'), controller.crearProyecto);
router.get('/proyectos/editar/:id',     requireAuth, controller.editarProyectoForm);
router.post('/proyectos/editar/:id',    requireAuth, upload.single('imagen'), controller.actualizarProyecto);
router.post('/proyectos/eliminar/:id',  requireAuth, controller.eliminarProyecto);

// ---- Servicios ----
router.get('/servicios',               requireAuth, controller.listarServicios);
router.get('/servicios/nuevo',         requireAuth, controller.nuevoServicioForm);
router.post('/servicios/nuevo',        requireAuth, controller.crearServicio);
router.get('/servicios/editar/:id',    requireAuth, controller.editarServicioForm);
router.post('/servicios/editar/:id',   requireAuth, controller.actualizarServicio);
router.post('/servicios/eliminar/:id', requireAuth, controller.eliminarServicio);

// ---- Habilidades ----
router.get('/habilidades',               requireAuth, controller.listarHabilidades);
router.post('/habilidades/nuevo',        requireAuth, controller.crearHabilidad);
router.post('/habilidades/editar/:id',   requireAuth, controller.actualizarHabilidad);
router.post('/habilidades/eliminar/:id', requireAuth, controller.eliminarHabilidad);

// ---- Mensajes de contacto ----
router.get('/mensajes',         requireAuth, controller.listarMensajes);
router.get('/mensajes/:id',     requireAuth, controller.verMensaje);
router.post('/mensajes/eliminar/:id', requireAuth, controller.eliminarMensaje);

// ---- Subir imágenes (endpoint general) ----
router.post('/subir-imagen', requireAuth, upload.single('archivo'), controller.subirImagen);

module.exports = router;
