import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { formatPrecio } from '../utils/formatters';

export default function CompraExitosaPage() {
  const location = useLocation();
  const pedido = location.state?.pedido;

  if (!pedido) {
    return <Navigate to="/catalogo" replace />;
  }

  return (
    <div className="container py-5">
      <div className="card border-0 shadow-sm mx-auto overflow-hidden" style={{ maxWidth: '750px' }}>
        <div className="bg-success text-white p-4 text-center">
          <i className="bi bi-check-circle-fill display-3 d-block mb-2"></i>
          <h2 className="fw-bold mb-1">¡Pedido Confirmado con Éxito!</h2>
          <p className="mb-0">Tu orden ha sido registrada en el sistema de Sonido Vivo.</p>
        </div>

        <div className="card-body p-4 p-md-5">
          <div className="bg-light p-3 rounded d-flex flex-wrap justify-content-between align-items-center mb-4 border">
            <div>
              <span className="text-muted small">Número de Orden / Seguimiento:</span>
              <div className="fs-4 fw-bold text-danger">{pedido.id}</div>
            </div>
            <div className="text-md-end mt-2 mt-md-0">
              <span className="text-muted small">Fecha de Emisión:</span>
              <div className="fw-semibold">{pedido.fecha}</div>
            </div>
          </div>

          <h5 className="fw-bold mb-3 border-bottom pb-2">Detalles del Comprador</h5>
          <div className="row g-2 mb-4 small">
            <div className="col-12 col-md-6">
              <strong>Cliente:</strong> {pedido.cliente}
            </div>
            <div className="col-12 col-md-6">
              <strong>RUT:</strong> {pedido.rut}
            </div>
            <div className="col-12 col-md-6">
              <strong>Email:</strong> {pedido.email}
            </div>
            <div className="col-12 col-md-6">
              <strong>Teléfono:</strong> {pedido.telefono}
            </div>
            <div className="col-12">
              <strong>Modalidad de Entrega:</strong>{' '}
              <span className="badge bg-dark ms-1">
                {pedido.tipoEntrega === 'retiro' ? 'Retiro en Tienda Central' : 'Despacho a Domicilio'}
              </span>
            </div>
            <div className="col-12">
              <strong>Lugar:</strong> {pedido.direccion}
            </div>
            <div className="col-12">
              <strong>Método de Pago:</strong> {pedido.metodoPago}
            </div>
          </div>

          <h5 className="fw-bold mb-3 border-bottom pb-2">Artículos del Pedido</h5>
          <div className="table-responsive mb-4">
            <table className="table table-sm align-middle">
              <thead>
                <tr className="table-light">
                  <th>Producto</th>
                  <th className="text-center">Cant.</th>
                  <th className="text-end">Precio</th>
                  <th className="text-end">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {pedido.items.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.nombre}</td>
                    <td className="text-center">{item.cantidad}</td>
                    <td className="text-end">{formatPrecio(item.precio)}</td>
                    <td className="text-end">{formatPrecio(item.precio * item.cantidad)}</td>
                  </tr>
                ))}
                <tr className="table-light fw-bold">
                  <td colSpan="3" className="text-end">Total Pagado:</td>
                  <td className="text-end text-danger fs-6">{formatPrecio(pedido.total)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="alert alert-secondary small mb-4">
            <div className="fw-bold mb-1"><i className="bi bi-info-circle me-1"></i> Próximos pasos:</div>
            {pedido.tipoEntrega === 'retiro' ? (
              <div>
                Tu pedido se encuentra <strong>En preparación</strong> en nuestra tienda de Viña del Mar (Calle Valparaíso #580). Puedes acudir a retirar con tu cédula de identidad y el número <strong>{pedido.id}</strong>.
              </div>
            ) : (
              <div>
                Tu pedido se encuentra <strong>En preparación</strong>. Cuando sea entregado a Starken o Chilexpress, recibirás tu orden de flete en <strong>{pedido.email}</strong> para seguir el envío en tiempo real.
              </div>
            )}
          </div>

          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link to="/catalogo" className="btn btn-marca px-4">
              <i className="bi bi-cart3 me-2"></i> Seguir Comprando
            </Link>
            <Link to="/mapa" className="btn btn-outline-dark px-4">
              <i className="bi bi-geo-alt me-2"></i> Ver Ubicación de Tienda
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
