// ============================================
// config/multer.js - Configuración de subida de archivos
// Sistemas Web Studio
// ============================================

const multer = require('multer');
const path   = require('path');
const fs     = require('fs');

// Directorio de subidas
const uploadDir = path.join(__dirname, '..', 'uploads');

// Crear directorio si no existe
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuración del almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Nombre único: timestamp + nombre original limpio
    const timestamp  = Date.now();
    const ext        = path.extname(file.originalname).toLowerCase();
    const baseName   = path.basename(file.originalname, ext)
      .replace(/[^a-z0-9]/gi, '-').toLowerCase();
    cb(null, `${timestamp}-${baseName}${ext}`);
  }
});

// Filtro: solo imágenes
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp|svg/;
  const extname      = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype     = allowedTypes.test(file.mimetype);
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten imágenes (jpg, png, gif, webp, svg)'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Máximo 5 MB
});

module.exports = upload;
