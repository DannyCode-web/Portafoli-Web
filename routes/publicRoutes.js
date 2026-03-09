// ============================================
// routes/publicRoutes.js - Rutas públicas
// Sistemas Web Studio
// ============================================

const express    = require('express');
const router     = express.Router();
const controller = require('../controllers/publicController');

// Inicio
router.get('/', controller.inicio);

// Sobre mí
router.get('/sobre-mi', controller.sobreMi);

// Habilidades
router.get('/habilidades', controller.habilidades);

// Proyectos
router.get('/proyectos', controller.proyectos);
router.get('/proyectos/:id', controller.proyectoDetalle);

// Servicios
router.get('/servicios', controller.servicios);

// Contacto (GET muestra formulario, POST procesa envío)
router.get('/contacto', controller.contacto);
router.post('/contacto', controller.enviarContacto);

module.exports = router;
