
## Nombre del equipo
Grupo N°3

## Integrantes
* Maximiliano Andrés Valenzuela Barrera - max.valenzuelab@duocuc.cl
* Genesis Cerda - [correo institucional]
* Yoximar Ruiz - [correo institucional]

## Caso
Clínica Nutricional NutriVida.

## Descripción del caso
NutriVida es una clínica nutricional fundada en 2016 en Temuco, orientada a la atención personalizada y control de planes alimenticios en áreas como pérdida de peso, patologías metabólicas y nutrición deportiva. La aplicación resuelve la modernización de sus procesos manuales de agendamiento y fichas en papel, iniciando con este módulo de autenticación (Login) para el acceso y diferenciado de pacientes, nutricionistas y administradores.

## Estructura del proyecto (Atomic Design)
Organizamos los componentes del login siguiendo la metodología Atomic Design para mantener modularidad y reutilización:

```text
nutrivida/src/
├── assets/                  # Recursos estáticos (logos e imágenes)
├── components/
│   ├── atoms/               # Elementos base
│   │   ├── Button.jsx       # Botón reutilizable
│   │   └── Input.jsx        # Campo de formulario estilizado
│   ├── molecules/           # Combinación de átomos
│   │   └── FormField.jsx    # Agrupación de label e input
│   └── organisms/           # Estructuras funcionales completas
│       └── LoginForm.jsx    # Formulario completo con sus campos y botón
├── pages/
│   └── LoginPage.jsx        # Vista principal contenedora del login
├── App.css                  # Estilos del layout principal
├── App.jsx                  # Componente raíz que renderiza la vista de inicio
├── index.css                # Estilos globales y reseteo CSS
└── main.jsx                 # Punto de entrada de la aplicación en React
```
## Tecnologías Utilizadas

React, Vite, React Bootstrap, manejo de estados mediante hook useState.

## Como ejecutar el proyecto

Para clonar y levantar el proyecto de forma local:

git clone https://github.com/maxijrr20/ActividadFullStack.git

Entrar a la carpeta de la aplicación:

cd ActividadFullStack/nutrivida

Instalar dependencias:

npm install

Levantar el servidor de desarrollo:

npm run dev

Abrir en el navegador la URL local indicada en la terminal (por defecto: http://localhost:5173).

## ENLACE GOOGLE DRIVE CON ERS

https://drive.google.com/drive/folders/1ncapMCk5xU48v4hHfm7bWwrtKheoQHpF?usp=drive_link










