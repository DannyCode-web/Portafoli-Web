// ============================================
// controllers/publicController.js
// Sistemas Web Studio
// ============================================

const Proyecto  = require('../models/Proyecto');
const Servicio  = require('../models/Servicio');
const Habilidad = require('../models/Habilidad');
const Contacto  = require('../models/Contacto');

// GET / - Página de inicio
exports.inicio = async (req, res) => {
  try {
    const proyectosDestacados = await Proyecto.obtenerDestacados(3);
    const servicios           = await Servicio.obtenerActivos();
    const habilidades         = await Habilidad.obtenerActivas();

    res.render('inicio', {
      title: 'Inicio | Sistemas Web Studio',
      proyectos: proyectosDestacados,
      servicios,
      habilidades,
      mensaje: req.query.mensaje || null
    });
  } catch (err) {
    console.error('Error en inicio:', err);
    res.render('inicio', { title: 'Inicio', proyectos: [], servicios: [], habilidades: [], mensaje: null });
  }
};

// GET /sobre-mi
exports.sobreMi = (req, res) => {
  res.render('sobre-mi', { title: 'Sobre Mí | Sistemas Web Studio' });
};

// GET /habilidades
exports.habilidades = async (req, res) => {
  try {
    const habilidades = await Habilidad.obtenerActivas();
    // Agrupar por categoría
    const grupos = habilidades.reduce((acc, h) => {
      if (!acc[h.categoria]) acc[h.categoria] = [];
      acc[h.categoria].push(h);
      return acc;
    }, {});
    res.render('habilidades', { title: 'Habilidades | Sistemas Web Studio', habilidades, grupos });
  } catch (err) {
    res.render('habilidades', { title: 'Habilidades', habilidades: [], grupos: {} });
  }
};

// GET /proyectos
exports.proyectos = async (req, res) => {
  try {
    const proyectos = await Proyecto.obtenerActivos();
    const categorias = [...new Set(proyectos.map(p => p.categoria))];
    res.render('proyectos', { title: 'Proyectos | Sistemas Web Studio', proyectos, categorias });
  } catch (err) {
    res.render('proyectos', { title: 'Proyectos', proyectos: [], categorias: [] });
  }
};

// GET /proyectos/:id
exports.proyectoDetalle = async (req, res) => {
  try {
    const proyecto = await Proyecto.obtenerPorId(req.params.id);
    if (!proyecto) return res.redirect('/proyectos');
    res.render('proyecto-detalle', { title: `${proyecto.titulo} | Sistemas Web Studio`, proyecto });
  } catch (err) {
    res.redirect('/proyectos');
  }
};

// GET /servicios
exports.servicios = async (req, res) => {
  try {
    const servicios = await Servicio.obtenerActivos();
    res.render('servicios', { title: 'Servicios | Sistemas Web Studio', servicios });
  } catch (err) {
    res.render('servicios', { title: 'Servicios', servicios: [] });
  }
};

// GET /contacto
exports.contacto = (req, res) => {
  res.render('contacto', {
    title: 'Contacto | Sistemas Web Studio',
    success: req.query.ok === '1',
    error: req.query.error || null
  });
};

// POST /contacto
exports.enviarContacto = async (req, res) => {
  try {
    const { nombre, email, asunto, mensaje, telefono } = req.body;

    // Validación básica
    if (!nombre || !email || !mensaje) {
      return res.redirect('/contacto?error=Completa los campos obligatorios');
    }

    await Contacto.guardar({
      nombre: nombre.trim(),
      email: email.trim().toLowerCase(),
      asunto: asunto ? asunto.trim() : 'Sin asunto',
      mensaje: mensaje.trim(),
      telefono: telefono ? telefono.trim() : null,
      ip: req.ip
    });

    res.redirect('/contacto?ok=1');
  } catch (err) {
    console.error('Error al guardar contacto:', err);
    res.redirect('/contacto?error=Error al enviar el mensaje. Intenta de nuevo.');
  }
};
