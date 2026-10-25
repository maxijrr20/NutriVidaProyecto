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

---

## Funcionalidades principales

### Sitio público

- Página de inicio.
- Catálogo de servicios nutricionales con buscador por texto y filtro por categoría.
- Visualización del detalle de cada servicio.
- Servicios organizados por categorías.
- Servicios destacados.
- Sección Nosotros.
- Blog con al menos dos publicaciones y vista de detalle.
- Información de contacto.
- Información del equipo de nutricionistas.

### Registro e inicio de sesión

- Registro de pacientes.
- Validación de RUT chileno.
- Validación de formato de correo electrónico.
- Validación de contraseña mínima.
- Detección de correos registrados previamente.
- Detección de RUT registrados previamente.
- Inicio de sesión para pacientes registrados.
- Inicio de sesión para administrador.
- Manejo de sesión mediante `localStorage`.
- Cierre de sesión.

### Gestión de citas

- Solicitud de una cita nutricional.
- Selección de servicio.
- Selección de nutricionista.
- Selección de fecha y horario.
- Validación de datos del paciente.
- Confirmación de solicitud.
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
- Usuarios: crear, listar, editar y eliminar (misma lista que usa el Registro y el Login).
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
    │   │   └── templates/
    │   ├── context/
    │   ├── data/
    │   ├── pages/
    │   ├── services/
    │   ├── utils/
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```

Esta estructura permite separar las responsabilidades del sistema y facilita la reutilización, mantenimiento y prueba de los componentes.

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
- LocalStorage
- Vitest
- Testing Library
- Jest DOM
- jsdom
- Git
- GitHub

---

## Persistencia de datos

En la etapa actual del proyecto, la aplicación funciona principalmente en el frontend.

La información dinámica se almacena utilizando `localStorage` del navegador.

Entre los datos almacenados se encuentran:

- Usuarios registrados.
- Sesión del usuario.
- Solicitudes de citas.
- Información modificada desde algunos módulos administrativos.

Esta implementación corresponde a la etapa actual del desarrollo y permite simular la persistencia de información sin utilizar todavía una base de datos externa.

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

### 4. Iniciar el servidor de desarrollo

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

## Credenciales de demostración

### Administrador

```text
Correo: admin@nutrivida.cl
Contraseña: admin123
```

Los pacientes deben crear previamente una cuenta desde la opción **Registro** y posteriormente utilizar el correo y contraseña ingresados para iniciar sesión.

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
7 archivos de prueba
13 pruebas unitarias
```

Las pruebas consideran distintas funcionalidades del sistema, incluyendo formularios, validaciones, servicios, categorías, solicitudes de citas y funcionalidades administrativas.

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

La aplicación se encuentra en una etapa funcional de desarrollo frontend.

Actualmente se encuentran operativos los principales flujos de navegación, registro, autenticación, catálogo, solicitudes de citas, gestión de citas y administración.


Abrir en el navegador la URL local indicada en la terminal (por defecto: http://localhost:5173).

## ENLACE GOOGLE DRIVE CON ERS

https://drive.google.com/drive/folders/1ncapMCk5xU48v4hHfm7bWwrtKheoQHpF?usp=drive_link










