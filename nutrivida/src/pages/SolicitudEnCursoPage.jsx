import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useCitas } from '../context/CitasContext';
import { obtenerSesion } from '../utils/sesion';

export default function SolicitudEnCursoPage() {
  // Las solicitudes vienen del CitasContext
  const { citas: solicitudes, actualizarCita } = useCitas();

  // Usuario que inició sesión
  const sesion = obtenerSesion();

  const [mensaje, setMensaje] = useState('');
  const [solicitudACancelar, setSolicitudACancelar] = useState(null);
  const [solicitudAReprogramar, setSolicitudAReprogramar] = useState(null);
  const [nuevaFecha, setNuevaFecha] = useState('');

  // Si no hay sesión iniciada, no se permite ver las solicitudes
  if (!sesion) {
    return <Navigate to="/login" replace />;
  }

  // El administrador puede ver todas las citas.
  // Un paciente solamente puede ver las citas asociadas a su correo.
  const esAdmin =
    String(sesion.rol || '').toLowerCase() === 'admin';

  const solicitudesUsuario = esAdmin
    ? solicitudes
    : solicitudes.filter(
        (solicitud) =>
          String(solicitud.email || '')
            .toLowerCase()
            .trim() ===
          String(sesion.email || '')
            .toLowerCase()
            .trim()
      );

  // Confirmar cancelación
  const confirmarCancelar = () => {
    if (!solicitudACancelar) return;

    actualizarCita(solicitudACancelar.id, {
      estado: 'Cancelada',
    });

    setMensaje(
      `La cita #${solicitudACancelar.id} ha sido cancelada.`
    );

    setSolicitudACancelar(null);
  };

  // Confirmar reprogramación
  const confirmarReprogramar = (e) => {
    e.preventDefault();

    if (!solicitudAReprogramar || !nuevaFecha) return;

    const [fecha, hora = ''] = nuevaFecha.split('T');

    actualizarCita(solicitudAReprogramar.id, {
      fecha,
      hora,
      estado: 'Reprogramada',
    });

    setMensaje(
      `La cita #${solicitudAReprogramar.id} se reprogramó para el ${nuevaFecha}.`
    );

    setSolicitudAReprogramar(null);
    setNuevaFecha('');
  };

  return (
    <main
      className="container my-5"
      style={{ maxWidth: '800px' }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Mis Solicitudes de Cita</h2>

        <Link
          to="/contacto"
          className="btn btn-primary"
        >
          + Nueva Solicitud
        </Link>
      </div>

      {mensaje && (
        <div
          className="alert alert-info alert-dismissible fade show"
          role="alert"
        >
          {mensaje}
        </div>
      )}

      {solicitudesUsuario.length === 0 ? (
        <div className="alert alert-warning text-center p-4">
          <p className="mb-2">
            No tienes solicitudes de cita registradas actualmente.
          </p>

          <Link
            to="/contacto"
            className="btn btn-primary mt-2"
          >
            Agendar una Cita
          </Link>
        </div>
      ) : (
        <div className="row g-3">
          {solicitudesUsuario.map((sol) => (
            <div
              key={sol.id}
              className="col-12"
            >
              <div className="card shadow-sm border-0 bg-light">
                <div className="card-body d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">

                  <div>
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <h5 className="card-title mb-0">
                        Solicitud #{sol.id}
                      </h5>

                      <span
                        className={`badge ${
                          sol.estado === 'Cancelada'
                            ? 'bg-danger'
                            : sol.estado === 'Reprogramada'
                              ? 'bg-info text-dark'
                              : sol.estado === 'Confirmada'
                                ? 'bg-success'
                                : 'bg-warning text-dark'
                        }`}
                      >
                        {sol.estado || 'Pendiente'}
                      </span>
                    </div>

                    <p className="card-text mb-1">
                      <strong>Paciente:</strong>{' '}
                      {sol.nombre} ({sol.rut})
                    </p>

                    <p className="card-text mb-1">
                      <strong>Nutricionista:</strong>{' '}
                      {sol.nutricionista || 'Por asignar'}
                    </p>

                    <p className="card-text mb-1">
                      <strong>Servicio:</strong>{' '}
                      {sol.servicio || 'Consulta nutricional'}
                    </p>

                    <p className="card-text mb-1">
                      <strong>Fecha:</strong>{' '}
                      {sol.fecha}
                      {sol.hora ? ` ${sol.hora} hrs` : ''}
                      {' | '}
                      <strong>Motivo:</strong>{' '}
                      {sol.motivo || 'Consulta general'}
                    </p>
                  </div>

                  <div className="d-flex flex-column gap-2 min-width-200">
                    <Link
                      to="/resultado"
                      state={{
                        solicitud: sol,
                        exito: true,
                      }}
                      className="btn btn-outline-primary btn-sm w-100"
                    >
                      Ver Detalle
                    </Link>

                    {sol.estado !== 'Cancelada' && (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            setSolicitudAReprogramar(sol)
                          }
                          className="btn btn-outline-warning text-dark btn-sm w-100"
                        >
                          Reprogramar Cita
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setSolicitudACancelar(sol)
                          }
                          className="btn btn-outline-danger btn-sm w-100"
                        >
                          Cancelar Cita
                        </button>
                      </>
                    )}
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal cancelar */}
      {solicitudACancelar && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">

              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">
                  Confirmar Cancelación
                </h5>

                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() =>
                    setSolicitudACancelar(null)
                  }
                />
              </div>

              <div className="modal-body text-center p-4">
                <p className="fs-5 mb-1">
                  ¿Estás seguro de cancelar la cita{' '}
                  <strong>
                    #{solicitudACancelar.id}
                  </strong>
                  ?
                </p>
              </div>

              <div className="modal-footer justify-content-center">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() =>
                    setSolicitudACancelar(null)
                  }
                >
                  No, Volver
                </button>

                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={confirmarCancelar}
                >
                  Sí, Cancelar
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Modal reprogramar */}
      {solicitudAReprogramar && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">

              <form onSubmit={confirmarReprogramar}>
                <div className="modal-header bg-warning">
                  <h5 className="modal-title text-dark">
                    Reprogramar Cita #
                    {solicitudAReprogramar.id}
                  </h5>

                  <button
                    type="button"
                    className="btn-close"
                    onClick={() =>
                      setSolicitudAReprogramar(null)
                    }
                  />
                </div>

                <div className="modal-body p-4">
                  <label className="form-label fw-bold">
                    Selecciona nueva fecha y hora:
                  </label>

                  <input
                    type="datetime-local"
                    className="form-control"
                    required
                    value={nuevaFecha}
                    onChange={(e) =>
                      setNuevaFecha(e.target.value)
                    }
                  />
                </div>

                <div className="modal-footer justify-content-center">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() =>
                      setSolicitudAReprogramar(null)
                    }
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    className="btn btn-warning"
                  >
                    Guardar Nueva Fecha
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      )}
    </main>
  );
}