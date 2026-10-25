// "Base de datos" simulada de usuarios (pacientes registrados y otros roles).
// Usa la MISMA clave que RegistroPage y LoginPage, así lo que hace el admin
// se refleja en el registro y en el inicio de sesión.
// Igual que serviciosService: funciones puras que devuelven una lista NUEVA.

export const CLAVE_USUARIOS = 'nutrivida_usuarios';

const normalizarEmail = (email = '') => String(email).trim().toLowerCase();

// READ
export const listarUsuarios = () => {
  try {
    const guardados = localStorage.getItem(CLAVE_USUARIOS);
    return guardados ? JSON.parse(guardados) : [];
  } catch {
    return [];
  }
};

export const guardarUsuarios = (lista) => {
  localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(lista));
};

export const existeEmail = (lista, email) =>
  lista.some((u) => normalizarEmail(u.email) === normalizarEmail(email));

// CREATE: no permite correos repetidos (lanza un error con mensaje claro)
export const crearUsuario = (lista, nuevo) => {
  if (existeEmail(lista, nuevo.email)) {
    throw new Error('Ya existe un usuario con ese correo.');
  }
  return [
    ...lista,
    { rol: 'PACIENTE', ...nuevo, email: normalizarEmail(nuevo.email) },
  ];
};

// UPDATE: el correo identifica al usuario
export const actualizarUsuario = (lista, email, datos) =>
  lista.map((u) =>
    normalizarEmail(u.email) === normalizarEmail(email) ? { ...u, ...datos } : u
  );

// DELETE
export const eliminarUsuario = (lista, email) =>
  lista.filter((u) => normalizarEmail(u.email) !== normalizarEmail(email));
