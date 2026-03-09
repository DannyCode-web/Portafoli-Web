-- ============================================
-- BASE DE DATOS: portafolio_web
-- Sistemas Web Studio
-- Compatible con MySQL Workbench
-- ============================================

-- Crear y seleccionar la base de datos
-- CREATE DATABASE IF NOT EXISTS portafolio_web_phrasebare

USE portafolio_web_phrasebare;

-- ============================================
-- TABLA: usuario (administrador del sistema)
-- ============================================
CREATE TABLE IF NOT EXISTS usuario (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  nombre     VARCHAR(100)  NOT NULL,
  email      VARCHAR(150)  NOT NULL UNIQUE,
  password   VARCHAR(255)  NOT NULL,
  rol        ENUM('admin', 'editor') DEFAULT 'admin',
  avatar     VARCHAR(255)  DEFAULT NULL,
  activo     TINYINT(1)    DEFAULT 1,
  creado_en  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- TABLA: habilidades
-- ============================================
CREATE TABLE IF NOT EXISTS habilidades (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  nombre      VARCHAR(100)  NOT NULL,
  categoria   VARCHAR(100)  DEFAULT 'General',
  porcentaje  INT           NOT NULL DEFAULT 80 CHECK (porcentaje BETWEEN 0 AND 100),
  icono       VARCHAR(100)  DEFAULT 'fas fa-code',
  orden       INT           DEFAULT 0,
  activo      TINYINT(1)    DEFAULT 1,
  creado_en   TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- TABLA: proyectos
-- ============================================
CREATE TABLE IF NOT EXISTS proyectos (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  titulo        VARCHAR(200)  NOT NULL,
  descripcion   TEXT          NOT NULL,
  tecnologias   VARCHAR(500)  DEFAULT NULL,
  imagen        VARCHAR(255)  DEFAULT NULL,
  url_demo      VARCHAR(500)  DEFAULT NULL,
  url_repo      VARCHAR(500)  DEFAULT NULL,
  categoria     VARCHAR(100)  DEFAULT 'Web',
  destacado     TINYINT(1)    DEFAULT 0,
  orden         INT           DEFAULT 0,
  activo        TINYINT(1)    DEFAULT 1,
  creado_en     TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  actualizado_en TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- TABLA: servicios
-- ============================================
CREATE TABLE IF NOT EXISTS servicios (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  titulo      VARCHAR(200)  NOT NULL,
  descripcion TEXT          NOT NULL,
  icono       VARCHAR(100)  DEFAULT 'fas fa-laptop-code',
  precio      DECIMAL(10,2) DEFAULT NULL,
  destacado   TINYINT(1)    DEFAULT 0,
  orden       INT           DEFAULT 0,
  activo      TINYINT(1)    DEFAULT 1,
  creado_en   TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- TABLA: contacto (mensajes recibidos)
-- ============================================
CREATE TABLE IF NOT EXISTS contacto (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  nombre      VARCHAR(150)  NOT NULL,
  email       VARCHAR(150)  NOT NULL,
  asunto      VARCHAR(250)  DEFAULT 'Sin asunto',
  mensaje     TEXT          NOT NULL,
  telefono    VARCHAR(20)   DEFAULT NULL,
  leido       TINYINT(1)    DEFAULT 0,
  respondido  TINYINT(1)    DEFAULT 0,
  ip_origen   VARCHAR(45)   DEFAULT NULL,
  creado_en   TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_leido (leido),
  INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================
-- DATOS INICIALES DE EJEMPLO
-- ============================================

-- Usuario administrador (password: Admin123*)
INSERT INTO usuario (nombre, email, password, rol) VALUES
('Administrador', 'admin@sistemasweb.com',
 '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

-- Habilidades iniciales
INSERT INTO habilidades (nombre, categoria, porcentaje, icono, orden) VALUES
('Node.js',         'Backend',    90, 'fab fa-node-js',    1),
('JavaScript',      'Frontend',   92, 'fab fa-js-square',  2),
('HTML5 / CSS3',    'Frontend',   95, 'fab fa-html5',      3),
('MySQL',           'Base Datos', 85, 'fas fa-database',   4),
('Express.js',      'Backend',    88, 'fas fa-server',     5),
('PHP',             'Backend',    80, 'fab fa-php',        6),
('React.js',        'Frontend',   75, 'fab fa-react',      7),
('Git / GitHub',    'DevOps',     87, 'fab fa-github',     8),
('Bootstrap',       'Frontend',   90, 'fab fa-bootstrap',  9),
('Responsive Design','Frontend',  93, 'fas fa-mobile-alt', 10);

-- Proyectos de ejemplo
INSERT INTO proyectos (titulo, descripcion, tecnologias, categoria, destacado, orden) VALUES
('Sistema de Inventario',
 'Aplicación web para gestión de inventario con reportes en tiempo real, control de stock y alertas automáticas.',
 'Node.js, Express, MySQL, Bootstrap',
 'Sistemas', 1, 1),
('E-commerce Corporativo',
 'Tienda en línea completa con carrito de compras, pasarela de pagos y panel de administración.',
 'Node.js, MySQL, JavaScript, CSS3',
 'Web', 1, 2),
('Portal Empresarial',
 'Sitio web corporativo con sistema de noticias, galería multimedia y formulario de contacto.',
 'HTML5, CSS3, JavaScript, PHP',
 'Web', 0, 3);

-- Servicios de ejemplo
INSERT INTO servicios (titulo, descripcion, icono, destacado, orden) VALUES
('Desarrollo Web a Medida',
 'Creamos sitios web profesionales y aplicaciones web personalizadas según las necesidades de tu negocio.',
 'fas fa-laptop-code', 1, 1),
('Sistemas de Gestión',
 'Desarrollo de sistemas administrativos, inventarios, facturación y control empresarial.',
 'fas fa-cogs', 1, 2),
('E-commerce',
 'Tiendas en línea completas con gestión de productos, pedidos y pagos integrados.',
 'fas fa-shopping-cart', 1, 3),
('Mantenimiento Web',
 'Actualizaciones, corrección de errores, optimización y soporte técnico continuo.',
 'fas fa-tools', 0, 4),
('Consultoría Digital',
 'Asesoramiento tecnológico para transformar y digitalizar procesos de tu empresa.',
 'fas fa-chart-line', 0, 5);

-- ============================================
-- FIN DEL SCRIPT
-- ============================================
