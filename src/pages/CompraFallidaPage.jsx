import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function CompraFallidaPage() {
  const location = useLocation();
  const motivo = location.state?.motivo || 'Transacción rechazada por la entidad bancaria o fondos insuficientes.';
  const codigoIntento = location.state?.codigoIntento || 'ERR-' + Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="container py-5">
      <div className="card border-0 shadow-sm mx-auto overflow-hidden" style={{ maxWidth: '650px' }}>
        <div className="bg-danger text-white p-4 text-center">
          <i className="bi bi-x-circle-fill display-3 d-block mb-2"></i>
          <h2 className="fw-bold mb-1">No se pudo realizar el pago</h2>
          <p className="mb-0">Tu orden no ha sido procesada y no se ha realizado ningún cobro a tu cuenta.</p>
        </div>

        <div className="card-body p-4 p-md-5">
          <div className="alert alert-light border border-danger-subtle p-3 rounded mb-4">
            <div className="small text-muted mb-1">Código de referencia del intento:</div>
            <div className="fw-bold text-dark fs-5">{codigoIntento}</div>
            <div className="small text-danger mt-2">
              <i className="bi bi-exclamation-triangle-fill me-1"></i>
              <strong>Detalle técnico:</strong> {motivo}
            </div>
          </div>

          <h6 className="fw-bold mb-2">¿Qué puedes hacer ahora?</h6>
          <ul className="text-secondary small mb-4 ps-3">
            <li className="mb-1">Verifica que tu tarjeta cuente con saldo o cupo disponible para compras por internet.</li>
            <li className="mb-1">Intenta seleccionando otro método de pago (Transferencia Electrónica o Pago en Tienda).</li>
            <li className="mb-1">Comunícate con tu banco si el problema persiste o escríbenos a nuestro mesón en Viña del Mar.</li>
          </ul>

          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link to="/checkout" className="btn btn-danger px-4">
              <i className="bi bi-arrow-repeat me-2"></i> Reintentar Pago
            </Link>
            <Link to="/carrito" className="btn btn-outline-secondary px-4">
              <i className="bi bi-cart3 me-2"></i> Volver al Carrito
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
