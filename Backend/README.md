---

# 🧾 **Sistema de Inventario — FORMOTEX**

## 🧩 Descripción General

Este proyecto es un **gestor de inventario** desarrollado para la empresa **FORMOTEX**, dedicada al **mantenimiento y distribución de equipos informáticos** para diversas organizaciones.

La aplicación permite administrar equipos, controlar usuarios con distintos roles (administradores y empleados), y gestionar el flujo de mantenimiento y asignación de dispositivos.
Cuenta con autenticación JWT, validación de datos con Zod y conexión a MongoDB mediante Mongoose.

---

## ⚙️ **Tecnologías Utilizadas**

| Tipo             | Paquete                | Descripción                                               |
| ---------------- | ---------------------- | --------------------------------------------------------- |
| 🔧 Framework     | **express**            | Servidor HTTP principal                                   |
| 🔐 Seguridad     | **bcrypt / bcrypt-ts** | Hashing seguro de contraseñas                             |
| 🔐 Autenticación | **jsonwebtoken**       | Generación y verificación de tokens JWT                   |
| 🧠 Validación    | **zod**                | Validación y tipado de datos                              |
| 🗄️ Base de datos | **mongoose**           | ODM para MongoDB                                          |
| 🧩 Configuración | **dotenv / ts-dotenv** | Manejo de variables de entorno                            |
| 🌐 CORS          | **cors**               | Habilita peticiones entre dominios                        |
| 🪵 Logs          | **morgan**             | Middleware para registrar peticiones HTTP                 |
| 🔁 Desarrollo    | **ts-node / nodemon**  | Compilación y ejecución en caliente durante el desarrollo |

---

## 🚀 **Instalación y Configuración**

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/jaquelineatienza/Formotec-ts
cd Formotec-ts
```

### 2️⃣ Instalar dependencias

```bash
npm install
```

### 3️⃣ Iniciar el servidor

```bash
npm run dev
```

### 4️⃣ Crear el archivo `.env`

Ejemplo de configuración:

```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/formotec_db
JWT_SECRET=tu_secreto_seguro
SESSION_SECRET=clave_sesion_segura
```

---

## ⚙️ **Endpoints — Equipos**

### 📋 `GET /api/equipos/allEquipos`

**Descripción:** Devuelve la lista completa de equipos registrados.
🔒 **Requiere autenticación JWT.**

**Respuestas posibles:**

- ✅ **200 OK** → Lista de equipos devuelta correctamente.
- ❌ **401 Unauthorized** → Token no proporcionado o inválido.
- ❌ **500 Internal Server Error** → Error al consultar equipos.

---

### 🔍 `GET /api/equipos/equipos/:id`

**Descripción:** Obtiene la información detallada de un equipo por su ID.
🔒 **Requiere autenticación JWT.**

**Respuestas posibles:**

- ✅ **200 OK** → Equipo encontrado y devuelto.
- ❌ **404 Not Found** → No se encontró el equipo.
- ❌ **401 Unauthorized** → Token inválido.

---

### 🛠️ `PUT /api/equipos/update/:id`

**Descripción:** Actualiza los datos de un equipo existente.
🔒 **Requiere autenticación JWT.**

**Respuestas posibles:**

- ✅ **200 OK** → Equipo actualizado correctamente.
- ❌ **404 Not Found** → No se encontró el equipo.
- ❌ **400 Bad Request** → Datos enviados inválidos.

---

## 🧑‍💼 **Creación de Administradores**

### 🔒 Restricciones

Solo los usuarios con **rol `admin`** pueden registrar o promover a otros usuarios como administradores.
Cualquier intento de crear un nuevo administrador desde una cuenta sin privilegios será rechazado con un error **403 (Forbidden)**.

---

### 🪄 Proceso de Creación de un Nuevo Administrador

1. Un **administrador existente** genera un **token temporal** mediante un endpoint seguro.
2. El sistema crea un código único usando `crypto.randomBytes()`:
3. El token se envía por **correo electrónico** al usuario invitado.
4. El token **expira automáticamente en 30 minutos**.
5. El usuario puede completar su registro como `admin` utilizando dicho token.

---

### 📧 Ejemplo de correo de verificación

```yaml
Asunto: Código de verificación para crear cuenta de administrador

Hola [Nombre del usuario],
Tu token de validación para crear una cuenta de administrador es:

🔐 ABCdE#1

Este código expirará en 30 minutos.
Si no solicitaste este acceso, ignora este mensaje.
```

---

## 📦 **Endpoints Relacionados**

### 🔑 `POST /api/auth/create-admin`

**Descripción:** Permite a un administrador generar un token y enviarlo al correo del nuevo usuario administrador.
🔒 **Solo accesible por `admin`.**

**Body (JSON):**

```json
{
  "email": "nuevoadmin@example.com"
}
```

**Respuestas:**

- ✅ **200 OK** → Token enviado correctamente al correo.
- ❌ **403 Forbidden** → Usuario sin permisos de administrador.
- ❌ **400 Bad Request** → Correo inválido o no encontrado.

---

### 🧾 `POST /api/auth/register-admin`

**Descripción:** Permite registrar una cuenta de administrador usando el token recibido por correo.

**Body (JSON):**

```json
{
  "email": "nuevoadmin@example.com",
  "token": "ABCdE#1",
  "name": "Nuevo Administrador",
  "password": "MiContraseñaSegura"
}
```

**Respuestas:**

- ✅ **201 Created** → Nuevo administrador creado exitosamente.
- ❌ **400 Bad Request** → Token inválido o expirado.
- ❌ **401 Unauthorized** → Token de verificación incorrecto.
- ❌ **409 Conflict** → El usuario ya existe.

---

## 🧾 **Códigos de Estado Comunes**

| Código | Descripción                   |
| ------ | ----------------------------- |
| 200    | Operación exitosa             |
| 201    | Recurso creado correctamente  |
| 400    | Datos inválidos o incompletos |
| 401    | No autenticado                |
| 403    | Acceso denegado               |
| 404    | Recurso no encontrado         |
| 500    | Error interno del servidor    |

---

## 🧰 **Scripts de npm**

| Comando         | Descripción                            |
| --------------- | -------------------------------------- |
| `npm run dev`   | Ejecuta el servidor en modo desarrollo |
| `npm run build` | Compila el código TypeScript           |
| `npm start`     | Ejecuta el servidor en modo producción |

---

## 🧑‍🔧 **Autor**

📍 **Proyecto desarrollado por:**
**Jaqueline Atienza** — Desarrolladora Full Stack
💼 Empresa: **FORMOTEX**
📧 Contacto: [correo@example.com](mailto:correo@example.com)
