import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrecio } from '../utils/formatters';

export default function CarritoPage() {
  const { 
    carrito, 
    tipoEnvio, 
    setTipoEnvio, 
    actualizarCantidad, 
    quitarDelCarrito, 
    vaciarCarrito, 
    resumen 
  } = useCart();

  const navigate = useNavigate();

  if (carrito.length === 0) {
    return (
      <div className="container py-5 text-center">
        <div className="card p-5 border-0 shadow-sm mx-auto" style={{ maxWidth: '550px' }}>
          <i className="bi bi-cart-x text-muted display-1 mb-3"></i>
          <h3 className="fw-bold">Tu carrito de compras está vacío</h3>
          <p className="text-muted small mb-4">
            Aún no has agregado instrumentos ni accesorios a tu pedido. Revisa nuestro catálogo con stock actualizado en Viña del Mar.
          </p>
          <Link to="/catalogo" className="btn btn-marca btn-lg">
            <i className="bi bi-arrow-left me-2"></i>
            Explorar Catálogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h1 className="fw-bold mb-1">Carrito de Compras</h1>
          <p className="text-muted small mb-0">Revisa tus productos seleccionados antes de pasar al pago.</p>
        </div>
        <button 
          className="btn btn-outline-danger btn-sm"
          onClick={vaciarCarrito}
        >
          <i className="bi bi-trash me-1"></i> Vaciar Carrito
        </button>
      </div>

      <div className="row g-4">
        <div className="col-12 col-lg-8">
          <div className="card border-0 shadow-sm p-3 mb-4">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light small">
                  <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th style={{ width: '130px' }}>Cantidad</th>
                    <th className="text-end">Subtotal</th>
                    <th style={{ width: '50px' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {carrito.map(item => (
                    <tr key={item.id}>
                      <td>
                        <div className="fw-bold text-dark">{item.nombre}</div>
                        <div className="small text-muted">{item.marca} • {item.modelo}</div>
                        <div className="small text-secondary">Código: {item.id}</div>
                      </td>
                      <td className="text-nowrap">{formatPrecio(item.precio)}</td>
                      <td>
                        <div className="input-group input-group-sm">
                          <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                          >
                            -
                          </button>
                          <input
                            type="text"
                            className="form-control text-center px-1"
                            value={item.cantidad}
                            readOnly
                          />
                          <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                            disabled={item.cantidad >= item.stock}
                          >
                            +
                          </button>
                        </div>
                        {item.cantidad >= item.stock && (
                          <div className="text-danger small" style={{ fontSize: '0.7rem' }}>
                            Stock máx.
                          </div>
                        )}
                      </td>
                      <td className="text-end fw-bold text-nowrap">
                        {formatPrecio(item.precio * item.cantidad)}
                      </td>
                      <td className="text-end">
                        <button
                          className="btn btn-link text-danger p-0"
                          title="Eliminar producto"
                          onClick={() => quitarDelCarrito(item.id)}
                        >
                          <i className="bi bi-trash fs-5"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card border-0 shadow-sm p-4 mb-4">
            <h5 className="fw-bold mb-3">Método de Entrega</h5>
            <div className="form-check p-3 border rounded mb-2 bg-light">
              <input
                className="form-check-input"
                type="radio"
                name="tipoEnvio"
                id="envioRetiro"
                value="retiro"
                checked={tipoEnvio === 'retiro'}
                onChange={() => setTipoEnvio('retiro')}
              />
              <label className="form-check-label w-100" htmlFor="envioRetiro">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>Retiro en Tienda Física (Viña del Mar)</strong>
                    <div className="small text-muted">Calle Valparaíso #580. Disponible de inmediato sin costo adicional.</div>
                  </div>
                  <span className="badge bg-success">Gratis ($0)</span>
                </div>
              </label>
            </div>

            <div className="form-check p-3 border rounded bg-light">
              <input
                className="form-check-input"
                type="radio"
                name="tipoEnvio"
                id="envioDomicilio"
                value="domicilio"
                checked={tipoEnvio === 'domicilio'}
                onChange={() => setTipoEnvio('domicilio')}
              />
              <label className="form-check-label w-100" htmlFor="envioDomicilio">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>Despacho a Domicilio (Todo Chile)</strong>
                    <div className="small text-muted">Envío protegido vía Starken o Chilexpress con número de seguimiento.</div>
                  </div>
                  <span className="badge bg-primary">$4.990</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-4">
          <div className="card border-0 shadow-sm p-4 bg-white sticky-top" style={{ top: '80px' }}>
            <h5 className="fw-bold mb-3 border-bottom pb-2">Resumen de la Orden</h5>

            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Artículos ({resumen.totalArticulos}):</span>
              <span>{formatPrecio(resumen.subtotal)}</span>
            </div>

            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Despacho:</span>
              <span>{resumen.costoEnvio === 0 ? 'Gratis' : formatPrecio(resumen.costoEnvio)}</span>
            </div>

            <div className="border-top pt-3 mt-2 d-flex justify-content-between align-items-center mb-4">
              <span className="fs-5 fw-bold">Total a Pagar:</span>
              <span className="fs-4 fw-bold text-danger">{formatPrecio(resumen.total)}</span>
            </div>

            <button
              className="btn btn-marca btn-lg w-100 mb-2 fw-bold"
              onClick={() => navigate('/checkout')}
            >
              Proceder al Pago <i className="bi bi-arrow-right ms-2"></i>
            </button>

            <Link to="/catalogo" className="btn btn-outline-secondary w-100 btn-sm">
              Seguir Comprando
            </Link>

            <div className="mt-4 pt-3 border-top small text-muted text-center">
              <i className="bi bi-lock-fill text-success me-1"></i>
              Pago seguro y comprobante de venta formal
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Gestion de cantidades, calculo de envio y totales del carrito
