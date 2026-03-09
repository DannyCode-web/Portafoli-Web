# 🌐 Sistemas Web Studio — Portafolio Web Profesional

> Desarrollador de Sistemas y Páginas Web | Soluciones digitales para empresas

---

## 📁 Estructura del Proyecto

```
sistemas-web-studio/
├── server.js                 ← Servidor principal (Express)
├── package.json              ← Dependencias del proyecto
├── .env                      ← Variables de entorno (¡editar!)
│
├── config/
│   ├── database.js           ← Conexión a MySQL (pool)
│   ├── database.sql          ← Script SQL (ejecutar en MySQL Workbench)
│   └── multer.js             ← Config. de subida de archivos
│
├── routes/
│   ├── publicRoutes.js       ← Rutas del sitio público
│   ├── adminRoutes.js        ← Rutas del panel admin
│   └── apiRoutes.js          ← API REST JSON
│
├── controllers/
│   ├── publicController.js   ← Lógica de páginas públicas
│   ├── adminController.js    ← Lógica del panel admin
│   └── authController.js     ← Autenticación (login/logout)
│
├── models/
│   ├── Proyecto.js           ← Modelo de proyectos
│   ├── Servicio.js           ← Modelo de servicios
│   ├── Habilidad.js          ← Modelo de habilidades
│   └── Contacto.js           ← Modelo de mensajes
│
├── views/                    ← Vistas EJS del sitio público
│   ├── partials/
│   │   ├── header.ejs
│   │   └── footer.ejs
│   ├── inicio.ejs
│   ├── sobre-mi.ejs
│   ├── habilidades.ejs
│   ├── proyectos.ejs
│   ├── servicios.ejs
│   ├── contacto.ejs
│   └── 404.ejs
│
├── public/                   ← Archivos estáticos
│   ├── css/style.css         ← Estilos principales
│   ├── js/script.js          ← JavaScript del frontend
│   └── img/                  ← Imágenes del sitio
│
├── admin/                    ← Panel administrativo
│   ├── views/
│   │   ├── login.ejs
│   │   ├── dashboard.ejs
│   │   ├── habilidades.ejs
│   │   ├── proyectos/ (lista.ejs, form.ejs)
│   │   ├── servicios/ (lista.ejs, form.ejs)
│   │   └── mensajes/ (lista.ejs, detalle.ejs)
│   └── public/
│       ├── css/admin.css
│       └── js/admin.js
│
└── uploads/                  ← Imágenes subidas por el admin
```

---

## 🚀 Guía de Instalación y Ejecución

### 1. Requisitos previos

| Herramienta | Versión mínima | Descarga |
|-------------|---------------|---------|
| Node.js     | 18.x o superior | https://nodejs.org |
| MySQL       | 8.0 o superior  | https://dev.mysql.com/downloads/ |
| MySQL Workbench | 8.0+       | https://dev.mysql.com/downloads/workbench/ |

### 2. Clonar / descargar el proyecto

```bash
# Descargar y acceder a la carpeta
cd sistemas-web-studio
```

### 3. Instalar dependencias de Node.js

```bash
npm install
```

Esto instalará automáticamente: Express, MySQL2, EJS, bcryptjs, multer, express-session, dotenv, cors, body-parser.

### 4. Configurar la base de datos en MySQL Workbench

**Paso a paso:**

1. Abre **MySQL Workbench**
2. Conéctate a tu servidor local (root o el usuario que uses)
3. En el menú superior: `File > Open SQL Script`
4. Abre el archivo: `config/database.sql`
5. Ejecuta todo el script con el botón ⚡ (Execute All)
6. Verifica que se creó la base de datos `portafolio_web` con 5 tablas

### 5. Configurar el archivo `.env`

Abre el archivo `.env` y edita tus credenciales de MySQL:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=TU_PASSWORD_AQUI   ← ¡Cambiar esto!
DB_NAME=portafolio_web
SESSION_SECRET=sistemas_web_studio_secret_2024
```

### 6. Iniciar el servidor

```bash
# Modo producción
node server.js

# Modo desarrollo (reinicia automáticamente al guardar)
npx nodemon server.js
```

### 7. Abrir en el navegador

| URL | Descripción |
|-----|-------------|
| http://localhost:3000 | Sitio web público |
| http://localhost:3000/admin | Panel administrativo |

---

## 🔐 Credenciales del Panel Admin

```
Email:    admin@sistemasweb.com
Password: Admin123*
```

> ⚠️ **Cambia la contraseña** después del primer ingreso.

Para cambiar la contraseña, ejecuta en MySQL Workbench:
```sql
USE portafolio_web;
-- Genera un nuevo hash en: https://bcrypt-generator.com
UPDATE usuario SET password = 'NUEVO_HASH_AQUI' WHERE email = 'admin@sistemasweb.com';
```

---

## 🎨 Páginas del Portafolio

| Ruta | Página |
|------|--------|
| `/` | Inicio con hero, proyectos destacados y servicios |
| `/sobre-mi` | Información del desarrollador |
| `/habilidades` | Barras de progreso por tecnología |
| `/proyectos` | Galería con filtro por categoría |
| `/servicios` | Lista de servicios ofrecidos |
| `/contacto` | Formulario de contacto |

---

## ⚙️ Panel Administrativo (`/admin`)

| Sección | Funcionalidad |
|---------|--------------|
| Dashboard | Resumen general del sistema |
| Proyectos | Agregar, editar, eliminar, subir imagen |
| Servicios | Gestión completa de servicios |
| Habilidades | Agregar/eliminar con porcentaje y categoría |
| Mensajes | Ver mensajes de contacto, marcar como leído |

---

## 🛠️ Tecnologías Utilizadas

- **Backend:** Node.js + Express.js (MVC)
- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Motor de vistas:** EJS
- **Base de datos:** MySQL 8 con mysql2
- **Estilos:** CSS personalizado, responsive
- **Fuentes:** Outfit + Space Grotesk (Google Fonts)
- **Íconos:** Font Awesome 6
- **Uploads:** Multer (imágenes hasta 5MB)
- **Auth:** express-session + bcryptjs

---

## 📋 Solución de problemas

**"Error de conexión a MySQL"**
→ Verifica que MySQL esté corriendo y que las credenciales en `.env` sean correctas.

**"Cannot find module"**
→ Ejecuta `npm install` nuevamente.

**Puerto 3000 ocupado**
→ Cambia el valor de `PORT` en `.env` (ej. `PORT=4000`).

**Imágenes no se muestran**
→ Verifica que la carpeta `/uploads` tenga permisos de escritura.

---

## 📝 Personalización

1. **Colores:** Edita las variables CSS en `/public/css/style.css` (sección `:root`)
2. **Información personal:** Actualiza los textos en las vistas `.ejs`
3. **Datos iniciales:** Modifica el SQL en `config/database.sql` antes de importar
4. **Redes sociales:** Busca los `href="#"` en `footer.ejs` y reemplaza con tus URLs

---

*Sistemas Web Studio — Portafolio v1.0.0*
