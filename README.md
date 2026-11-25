# NutriVida

## Nombre del equipo

**Grupo N°3**

## Integrantes

- Maximiliano Andrés Valenzuela Barrera - max.valenzuelab@duocuc.cl
- Genesis Cerda - gene.cerda@duocuc.cl
- Yoximar Ruiz - yox.ruiz@duocuc.cl

---

## Caso

**Clínica Nutricional NutriVida**

## Descripción del proyecto

NutriVida es una aplicación web desarrollada para una clínica nutricional fundada en 2016 en Temuco.

El proyecto busca modernizar procesos que anteriormente se realizaban de forma manual, facilitando la consulta de servicios nutricionales, el registro de pacientes, el inicio de sesión, la gestión de citas y la administración de información desde una aplicación web construida con React.

Actualmente, la aplicación permite a los visitantes conocer los servicios de la clínica, revisar categorías y profesionales, acceder a contenido informativo y registrarse como pacientes.

Los pacientes registrados pueden iniciar sesión, solicitar citas, consultar sus solicitudes, cancelar o reprogramar una atención.

El sistema también cuenta con acceso diferenciado para administradores, quienes disponen de un panel protegido para gestionar información de la aplicación.

Todos los datos (usuarios, catálogo y solicitudes de cita) se guardan en **PostgreSQL** a través de la API REST del backend.

- **Repositorio Backend:** [NutriVida Backend Service](https://github.com/maxijrr20/nutrivida-backend)
- **Swagger del backend (EC2):** http://34.224.151.181:8080/swagger-ui.html

---

## Funcionalidades principales

### Sitio público

- Página de inicio.
- Menú de navegación responsive (Bootstrap Navbar): en móvil y tableta se colapsa en un botón.
- Catálogo de servicios nutricionales con buscador por texto y filtro por categoría.
- Visualización del detalle de cada servicio.
- Servicios organizados por categorías.
- Servicios destacados.
- Sección Nosotros.
- Blog con al menos dos publicaciones y vista de detalle.
- Información de contacto.
- Información del equipo de nutricionistas.
- Página 404 para direcciones que no existen.

### Registro e inicio de sesión

- Registro de pacientes.
- Validación de RUT chileno.
- Validación de formato de correo electrónico.
- Validación de contraseña mínima.
- Detección de correos y RUT registrados previamente (el backend responde 409).
- Inicio de sesión para pacientes registrados.
- Inicio de sesión para administrador.
- Inicio de sesión contra el backend con token **JWT** (60 minutos). La sesión se guarda en `localStorage` y se mantiene al recargar la página.
- Rutas protegidas por sesión y rol (`RutaPrivada`): sin sesión se pide iniciarla; con un rol sin permiso se muestra la página 403.
- Cierre de sesión.

### Gestión de citas

- Solicitud de una cita nutricional.
- Selección de servicio.
- Selección de nutricionista.
- Selección de fecha y horario.
- Validación de datos del paciente.
- Confirmación de solicitud.
- Pantalla de resultado **exitoso** (número de solicitud, resumen y valor) o **con error** (aviso claro y botón "Volver a intentarlo").
- Control de disponibilidad: no se puede agendar con un nutricionista en una fecha y hora que ya tiene otra cita activa (las citas canceladas o rechazadas liberan el horario).
- Consulta de solicitudes realizadas por el paciente.
- Reprogramación de citas.
- Cancelación de citas.
- Filtrado de solicitudes según el usuario autenticado.

### Administración

- Panel de administración (acceso protegido solo para rol ADMIN, enlace "Panel Admin" en el menú).
- Dashboard con resumen de solicitudes, catálogo y usuarios, con accesos a cada módulo.
- Solicitudes: listado filtrable por estado, ficha/comprobante de cada solicitud, confirmar o rechazar.
- Catálogo: CRUD completo (crear, ver, editar todos los campos y eliminar con confirmación).
- Ítems críticos: nutricionistas con disponibilidad acotada y sus citas activas.
- Categorías: crear y renombrar (el cambio se aplica a todos sus servicios).
- Usuarios: crear con un rol, listar, editar, cambiar el rol y desactivar (contra la base de datos).
- Historial de solicitudes de un usuario.
- Reportes (totales por estado, ingresos confirmados, servicio más solicitado) y perfil del administrador.

---

## Estructura del proyecto

El proyecto utiliza una organización basada en componentes reutilizables y principios de **Atomic Design**.

```text
NutriVidaProyecto/
└── nutrivida/
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   │   ├── atoms/
    │   │   ├── molecules/
    │   │   ├── organisms/
    │   │   │   └── admin/      # una sección del panel por componente
    │   │   └── templates/
    │   ├── context/        # ServiciosContext y CitasContext (estado compartido)
    │   ├── data/           # datos de respaldo del catálogo si el backend no responde
    │   ├── pages/          # una página por ruta
    │   ├── services/       # llamadas a la API: api.js, authService, usuariosService, catalogoService, citasService
    │   ├── utils/          # validaciones, sesión, filtros y disponibilidad (funciones puras)
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```

Esta estructura permite separar las responsabilidades del sistema y facilita la reutilización, mantenimiento y prueba de los componentes.

### Niveles de Atomic Design

| Nivel | Ejemplos |
|---|---|
| Átomos | `Button`, `Input`, `Price`, `EstadoBadge` |
| Moléculas | `ServiceCard`, `FormField`, `NutritionistRow`, `StatCard` |
| Organismos | `NavbarNutriVida`, `AppointmentFormSection`, `ServicesCatalogSection`, `admin/AdminServicios`, `admin/AdminSolicitudes` |
| Templates | `MainLayout` |
| Páginas | `HomePage`, `ServiciosPage`, `ContactoPage`, `AdminDashboardPage`, `ResultadoPage` |

El estado compartido (catálogo y solicitudes de cita) vive en `ServiciosContext` y `CitasContext`. Las páginas lo leen con `useServicios()` y `useCitas()` y lo reparten a los componentes por **props**.

---

## Tecnologías utilizadas

- React
- Vite
- JavaScript
- React Router DOM
- React Bootstrap
- Bootstrap
- Context API
- Hooks de React
- Axios (cliente HTTP hacia la API REST del backend, con interceptores para el JWT y los errores)
- Vitest
- Testing Library
- Jest DOM
- jsdom
- Git
- GitHub

---

## Conexión con el backend y persistencia

El frontend no guarda datos propios: todo pasa por la API REST del backend (`/api/v1`) y queda en PostgreSQL.

| Datos | Rutas de la API | Dónde se usan |
|---|---|---|
| Registro, login y sesión | `/auth/register`, `/auth/login`, `/auth/me` | Registro, Login, Navbar |
| Usuarios y roles | `/usuarios`, `/usuarios/{id}/rol` | Panel › CRUD de Usuarios |
| Catálogo y categorías | `/servicios`, `/categorias` | Inicio, Servicios, Categorías, Detalle, Panel › Catálogo y Categorías |
| Nutricionistas | `/nutricionistas` | Servicios y Equipo, Agendar Cita |
| Solicitudes de cita | `/citas`, `/citas/{id}/cancelar`, `/reprogramar`, `/estado` | Agendar Cita, Mis Solicitudes, Panel › Solicitudes |

- Todas las llamadas pasan por `src/services/api.js`, una instancia de **Axios** (`http`) con la dirección del backend:
    - un **interceptor de solicitud** agrega `Authorization: Bearer <token>` cuando hay sesión;
    - un **interceptor de respuesta** convierte los errores del backend (400, 401, 403, 409, 5xx o sin conexión) en mensajes para mostrar en pantalla y cierra la sesión ante un 401.
- En el navegador solo se guarda la sesión (`nutrivida_session`: datos públicos del usuario y el JWT).
- Si el backend no responde, el catálogo público se muestra con los datos de respaldo de `src/data` y el panel avisa que los cambios no se guardarán.

---

## Cómo ejecutar el proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/maxijrr20/NutriVidaProyecto.git
```

### 2. Entrar a la carpeta de la aplicación

```bash
cd NutriVidaProyecto/nutrivida
```

### 3. Instalar las dependencias

```bash
npm install
```

### 4. Configurar la dirección del backend

Copiar `.env.example` como `.env`. Con el backend corriendo en el mismo computador basta con:

```text
VITE_API_URL=/api/v1
```

En `npm run dev`, Vite reenvía `/api` a `http://localhost:8080` (ver `vite.config.js`). El backend se levanta como indica su [README](https://github.com/maxijrr20/nutrivida-backend).

### 5. Iniciar el servidor de desarrollo

```bash
npm run dev
```

En Windows, si PowerShell bloquea el comando `npm`, también se puede utilizar:

```powershell
npm.cmd run dev
```

Vite mostrará en la terminal la dirección local de la aplicación, normalmente:

```text
http://localhost:5173/
```

---

## Cuentas para probar

- **Administrador:** se crea al iniciar el backend con las variables `ADMIN_EMAIL` y `ADMIN_PASSWORD` (su valor no se publica en el repositorio).
- **Pacientes:** se crean desde **Acceso › Crear una cuenta**.
- **Nutricionistas:** los crea el administrador en **Panel › CRUD de Usuarios**.

---

## Pruebas

El proyecto utiliza **Vitest** y **Testing Library** para realizar pruebas automatizadas.

Para ejecutar todas las pruebas:

```bash
npm run test:run
```

En Windows:

```powershell
npm.cmd run test:run
```

Actualmente, la suite cuenta con:

```text
10 archivos de prueba
25 pruebas
```

| Archivo | Pruebas | Qué verifica |
|---|---|---|
| `utils/validaciones.test.js` | 2 | RUT (módulo 11) y correo |
| `services/authService.test.js` | 6 | Login, error 401, correo repetido 409, token enviado por el interceptor, servidor sin respuesta, sesión vencida |
| `services/citasService.test.js` | 4 | Cuerpo de la solicitud de cita, error 409, token en `/citas`, catálogo público sin token |
| `services/serviciosService.test.js` | 3 | Funciones del catálogo de respaldo |
| `components/organisms/AppointmentFormSection.test.jsx` | 2 | Errores con formulario vacío; datos válidos |
| `pages/AdminDashboardPage.test.jsx` | 2 | Menú del panel; confirmar una cita con `PATCH /citas/{id}/estado` |
| `pages/SolicitudEnCursoPage.test.jsx` | 3 | Sin solicitudes; lista desde `GET /citas`; cancelar |
| `pages/CategoriasPage.test.jsx` | 1 | Servicios por categoría |
| `pages/DetalleServicioPage.test.jsx` | 1 | Datos de un servicio |
| `pages/ContactoPage.test.jsx` | 1 | Renderiza el formulario de agendamiento |

Las pruebas no necesitan el backend encendido: `src/mockApi.js` reemplaza el *adapter* de Axios por respuestas simuladas.
Se usan mocks (`vi.fn`, `vi.mock`, `vi.spyOn`) para simular la navegación (`useNavigate`) y `Date.now`.
La configuración del entorno está en `vite.config.js` (bloque `test`) y en `src/setupTests.js` (jest-dom + limpieza con `afterEach`).

---

## Cobertura de pruebas

Para generar el reporte de cobertura:

```bash
npm run test:cov
```

En Windows:

```powershell
npm.cmd run test:cov
```

El reporte se muestra en la terminal y en formato HTML en `nutrivida/coverage/index.html` (esta carpeta no se sube al repositorio).

---

## Build de producción

Para comprobar que el proyecto puede compilarse correctamente para producción:

```bash
npm run build
```

En Windows:

```powershell
npm.cmd run build
```

El proceso genera la carpeta `dist` con los archivos optimizados de la aplicación.

---

## Control de versiones

El proyecto utiliza **Git y GitHub** para el trabajo colaborativo.

El equipo trabaja mediante ramas independientes para desarrollar nuevas funcionalidades, realizar correcciones y posteriormente integrarlas a la rama principal mediante Pull Requests.

Entre las ramas utilizadas se encuentran ramas de:

- funcionalidades;
- pruebas;
- integración;
- correcciones;
- administración;
- registro y autenticación.

La rama principal del proyecto es:

```text
main
```

---

## Documentación

El proyecto cuenta con una **Especificación de Requisitos de Software (ERS)** elaborada siguiendo la estructura del estándar IEEE 830.

También se dispone de documentación relacionada con:

- requisitos funcionales;
- requisitos no funcionales;
- arquitectura;
- casos de uso del sistema;
- pruebas;
- cobertura;
- funcionamiento de la aplicación.


## Estado actual

El frontend está integrado con el backend: registro, inicio de sesión, usuarios, catálogo, solicitudes de cita y panel de administración leen y escriben en PostgreSQL. El detalle de las pruebas de integración está en el README del backend y en el documento de integración.

## ENLACE GOOGLE DRIVE CON ERS

https://drive.google.com/drive/folders/1ncapMCk5xU48v4hHfm7bWwrtKheoQHpF?usp=drive_link
