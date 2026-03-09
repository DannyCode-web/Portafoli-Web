// ============================================
// controllers/adminController.js
// Sistemas Web Studio
// ============================================

const Proyecto  = require('../models/Proyecto');
const Servicio  = require('../models/Servicio');
const Habilidad = require('../models/Habilidad');
const Contacto  = require('../models/Contacto');
const path      = require('path');

// ---- DASHBOARD ----
exports.dashboard = async (req, res) => {
  try {
    const proyectos  = await Proyecto.obtenerTodos();
    const servicios  = await Servicio.obtenerTodos();
    const mensajes   = await Contacto.contarNoLeidos();
    res.render('../admin/views/dashboard', {
      title: 'Dashboard | Admin',
      totalProyectos: proyectos.length,
      totalServicios: servicios.length,
      mensajesNuevos: mensajes
    });
  } catch (err) {
    res.render('../admin/views/dashboard', {
      title: 'Dashboard', totalProyectos: 0, totalServicios: 0, mensajesNuevos: 0
    });
  }
};

// ---- PROYECTOS ----
exports.listarProyectos = async (req, res) => {
  const proyectos = await Proyecto.obtenerTodos();
  res.render('../admin/views/proyectos/lista', {
    title: 'Proyectos | Admin', proyectos,
    success: req.query.ok || null, error: req.query.error || null
  });
};

exports.nuevoProyectoForm = (req, res) => {
  res.render('../admin/views/proyectos/form', {
    title: 'Nuevo Proyecto | Admin', proyecto: null, accion: '/admin/proyectos/nuevo'
  });
};

exports.crearProyecto = async (req, res) => {
  try {
    const imagen = req.file ? `/uploads/${req.file.filename}` : null;
    await Proyecto.crear({ ...req.body, imagen });
    res.redirect('/admin/proyectos?ok=Proyecto creado correctamente');
  } catch (err) {
    res.redirect('/admin/proyectos?error=Error al crear proyecto');
  }
};

exports.editarProyectoForm = async (req, res) => {
  const proyecto = await Proyecto.obtenerPorId(req.params.id);
  if (!proyecto) return res.redirect('/admin/proyectos');
  res.render('../admin/views/proyectos/form', {
    title: 'Editar Proyecto | Admin',
    proyecto, accion: `/admin/proyectos/editar/${proyecto.id}`
  });
};

exports.actualizarProyecto = async (req, res) => {
  try {
    const imagen = req.file ? `/uploads/${req.file.filename}` : null;
    await Proyecto.actualizar(req.params.id, { ...req.body, imagen });
    res.redirect('/admin/proyectos?ok=Proyecto actualizado');
  } catch (err) {
    res.redirect('/admin/proyectos?error=Error al actualizar');
  }
};

exports.eliminarProyecto = async (req, res) => {
  await Proyecto.eliminar(req.params.id);
  res.redirect('/admin/proyectos?ok=Proyecto eliminado');
};

// ---- SERVICIOS ----
exports.listarServicios = async (req, res) => {
  const servicios = await Servicio.obtenerTodos();
  res.render('../admin/views/servicios/lista', {
    title: 'Servicios | Admin', servicios,
    success: req.query.ok || null, error: req.query.error || null
  });
};

exports.nuevoServicioForm = (req, res) => {
  res.render('../admin/views/servicios/form', {
    title: 'Nuevo Servicio | Admin', servicio: null, accion: '/admin/servicios/nuevo'
  });
};

exports.crearServicio = async (req, res) => {
  try {
    await Servicio.crear(req.body);
    res.redirect('/admin/servicios?ok=Servicio creado');
  } catch (err) {
    res.redirect('/admin/servicios?error=Error al crear servicio');
  }
};

exports.editarServicioForm = async (req, res) => {
  const servicio = await Servicio.obtenerPorId(req.params.id);
  if (!servicio) return res.redirect('/admin/servicios');
  res.render('../admin/views/servicios/form', {
    title: 'Editar Servicio | Admin',
    servicio, accion: `/admin/servicios/editar/${servicio.id}`
  });
};

exports.actualizarServicio = async (req, res) => {
  try {
    await Servicio.actualizar(req.params.id, req.body);
    res.redirect('/admin/servicios?ok=Servicio actualizado');
  } catch (err) {
    res.redirect('/admin/servicios?error=Error al actualizar');
  }
};

exports.eliminarServicio = async (req, res) => {
  await Servicio.eliminar(req.params.id);
  res.redirect('/admin/servicios?ok=Servicio eliminado');
};

// ---- HABILIDADES ----
exports.listarHabilidades = async (req, res) => {
  const habilidades = await Habilidad.obtenerTodas();
  res.render('../admin/views/habilidades', {
    title: 'Habilidades | Admin', habilidades,
    success: req.query.ok || null, error: req.query.error || null
  });
};

exports.crearHabilidad = async (req, res) => {
  try {
    await Habilidad.crear(req.body);
    res.redirect('/admin/habilidades?ok=Habilidad creada');
  } catch (err) {
    res.redirect('/admin/habilidades?error=Error al crear');
  }
};

exports.actualizarHabilidad = async (req, res) => {
  try {
    await Habilidad.actualizar(req.params.id, req.body);
    res.redirect('/admin/habilidades?ok=Habilidad actualizada');
  } catch (err) {
    res.redirect('/admin/habilidades?error=Error al actualizar');
  }
};

exports.eliminarHabilidad = async (req, res) => {
  await Habilidad.eliminar(req.params.id);
  res.redirect('/admin/habilidades?ok=Habilidad eliminada');
};

// ---- MENSAJES ----
exports.listarMensajes = async (req, res) => {
  const mensajes = await Contacto.obtenerTodos();
  res.render('../admin/views/mensajes/lista', {
    title: 'Mensajes | Admin', mensajes
  });
};

exports.verMensaje = async (req, res) => {
  const mensaje = await Contacto.obtenerPorId(req.params.id);
  if (!mensaje) return res.redirect('/admin/mensajes');
  await Contacto.marcarLeido(req.params.id);
  res.render('../admin/views/mensajes/detalle', {
    title: 'Mensaje | Admin', mensaje
  });
};

exports.eliminarMensaje = async (req, res) => {
  await Contacto.eliminar(req.params.id);
  res.redirect('/admin/mensajes?ok=Mensaje eliminado');
};

// ---- SUBIR IMAGEN ----
exports.subirImagen = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ ok: false, error: 'No se recibió ningún archivo' });
  }
  res.json({ ok: true, url: `/uploads/${req.file.filename}` });
};
