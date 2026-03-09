// ============================================
// routes/apiRoutes.js - API REST JSON
// Sistemas Web Studio
// ============================================

const express    = require('express');
const router     = express.Router();
const Proyecto   = require('../models/Proyecto');
const Servicio   = require('../models/Servicio');
const Habilidad  = require('../models/Habilidad');

// GET /api/proyectos - Todos los proyectos activos
router.get('/proyectos', async (req, res) => {
  try {
    const proyectos = await Proyecto.obtenerActivos();
    res.json({ ok: true, data: proyectos });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// GET /api/servicios - Todos los servicios activos
router.get('/servicios', async (req, res) => {
  try {
    const servicios = await Servicio.obtenerActivos();
    res.json({ ok: true, data: servicios });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// GET /api/habilidades - Todas las habilidades activas
router.get('/habilidades', async (req, res) => {
  try {
    const habilidades = await Habilidad.obtenerActivas();
    res.json({ ok: true, data: habilidades });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

module.exports = router;
