// Sesión del usuario en el navegador.
// Se guarda en localStorage para que sobreviva a una recarga de la página (IE3.3.2).
// Contenido: los datos públicos del usuario (nombre, rut, email, rol...) + el JWT y su vencimiento.
// Riesgo conocido: un script malicioso (XSS) podría leer localStorage. Por eso el token dura
// solo 60 minutos y nunca se guarda la contraseña.
export const CLAVE_SESION = 'nutrivida_session';

// Recibe la respuesta del login: { accessToken, tokenType, expiresIn, usuario }
export const guardarSesion = ({ accessToken, expiresIn, usuario }) => {
  const sesion = {
    ...usuario,
    token: accessToken,
    expiraEn: Date.now() + expiresIn * 1000,
  };
  localStorage.setItem(CLAVE_SESION, JSON.stringify(sesion));
  return sesion;
};

export const cerrarSesion = () => {
  localStorage.removeItem(CLAVE_SESION);
};

// Devuelve el usuario que inició sesión (o null si no hay sesión o el token ya venció)
export const obtenerSesion = () => {
  try {
    const guardada = localStorage.getItem(CLAVE_SESION);
    if (!guardada) return null;

    const sesion = JSON.parse(guardada);
    if (sesion.expiraEn && Date.now() >= sesion.expiraEn) {
      cerrarSesion();
      return null;
    }
    return sesion;
  } catch {
    return null;
  }
};

export const obtenerToken = () => obtenerSesion()?.token ?? null;

// Reemplaza los datos del usuario guardados (por ejemplo, si el ADMIN le cambió el rol)
// manteniendo el mismo token y su vencimiento.
export const actualizarUsuarioSesion = (usuario) => {
  const sesion = obtenerSesion();
  if (!sesion) return null;
  const actualizada = { ...sesion, ...usuario, token: sesion.token, expiraEn: sesion.expiraEn };
  localStorage.setItem(CLAVE_SESION, JSON.stringify(actualizada));
  return actualizada;
};
