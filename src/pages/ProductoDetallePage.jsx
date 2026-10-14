import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useInventory } from '../context/InventoryContext';
import { useCart } from '../context/CartContext';
import { formatPrecio } from '../utils/formatters';
import { obtenerImagenProducto } from '../utils/imagenes';

export default function ProductoDetallePage() {
  const { id } = useParams();
  const { productos } = useInventory();
  const { agregarAlCarrito } = useCart();

  const [cantidad, setCantidad] = useState(1);
  const [mensajeExito, setMensajeExito] = useState(false);

  const producto = productos.find(p => p.id === id);

  if (!producto) {
    return (
      <div className="container py-5 text-center">
        <div className="card p-5 border-0 shadow-sm mx-auto" style={{ maxWidth: '500px' }}>
          <i className="bi bi-exclamation-triangle text-warning fs-1 mb-3"></i>
          <h4>Producto no encontrado</h4>
          <p className="text-muted small">El código {id} no corresponde a ningún producto del catálogo.</p>
          <Link to="/catalogo" className="btn btn-dark mt-2">
            Volver al Catálogo
          </Link>
        </div>
      </div>
    );
  }

  const agotado = producto.stock === 0;
  const imagenUrl = obtenerImagenProducto(producto);

  const handleAgregar = () => {
    agregarAlCarrito(producto, cantidad);
    setMensajeExito(true);
    setTimeout(() => {
      setMensajeExito(false);
    }, 3000);
  };

  return (
    <div className="container py-4">
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb small">
          <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
          <li className="breadcrumb-item"><Link to="/catalogo">Catálogo</Link></li>
          <li className="breadcrumb-item text-muted">{producto.categoria}</li>
          <li className="breadcrumb-item active" aria-current="page">{producto.nombre}</li>
        </ol>
      </nav>

      <div className="card border-0 shadow-sm overflow-hidden">
        <div className="row g-0">
          <div className="col-12 col-md-5 bg-dark position-relative" style={{ minHeight: '350px' }}>
            <img 
              src={imagenUrl} 
              alt={producto.nombre} 
              className="w-100 h-100" 
              style={{ objectFit: 'cover' }}
            />
            <span className="position-absolute top-0 start-0 m-3 badge bg-dark opacity-90 fs-6">
              {producto.categoria}
            </span>
          </div>

          <div className="col-12 col-md-7">
            <div className="card-body p-4 p-lg-5">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-danger fw-bold text-uppercase small">{producto.marca}</span>
                <span className="badge bg-secondary">Código: {producto.id}</span>
              </div>

              <h2 className="fw-bold text-dark mb-2">{producto.nombre}</h2>
              <div className="text-muted mb-3">Modelo oficial: <strong>{producto.modelo}</strong></div>

              <div className="display-6 fw-bold text-dark mb-3">
                {formatPrecio(producto.precio)}
                <span className="text-muted fs-6 fw-normal ms-2">IVA Incluido</span>
              </div>

              <p className="lead text-secondary fs-6 mb-4">
                {producto.descripcion}
              </p>

              <div className="mb-4">
                <div className="mb-2">
                  <strong>Disponibilidad en Viña del Mar:</strong>
                </div>
                {agotado ? (
                  <span className="badge bg-danger p-2 fs-6">
                    <i className="bi bi-x-circle me-1"></i> Agotado en bodega y tienda
                  </span>
                ) : (
                  <span className="badge bg-success p-2 fs-6">
                    <i className="bi bi-check-circle me-1"></i> {producto.stock} unidades disponibles para entrega inmediata
                  </span>
                )}
              </div>

              {!agotado && (
                <div className="row g-3 align-items-center mb-4">
                  <div className="col-auto">
                    <label className="fw-semibold small">Cantidad:</label>
                  </div>
                  <div className="col-auto">
                    <div className="input-group" style={{ width: '130px' }}>
                      <button 
                        className="btn btn-outline-secondary" 
                        type="button"
                        onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                        disabled={cantidad <= 1}
                      >
                        -
                      </button>
                      <input 
                        type="number" 
                        className="form-control text-center" 
                        value={cantidad}
                        readOnly
                      />
                      <button 
                        className="btn btn-outline-secondary" 
                        type="button"
                        onClick={() => setCantidad(Math.min(producto.stock, cantidad + 1))}
                        disabled={cantidad >= producto.stock}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="col-12 col-sm-auto">
                    <button 
                      className="btn btn-marca px-4" 
                      onClick={handleAgregar}
                    >
                      <i className="bi bi-cart-plus me-2"></i>
                      Añadir al Carrito
                    </button>
                  </div>
                </div>
              )}

              {mensajeExito && (
                <div className="alert alert-success d-flex align-items-center gap-2 py-2 mb-3">
                  <i className="bi bi-check-circle-fill"></i>
                  <div>¡Producto agregado exitosamente al carrito!</div>
                  <Link to="/carrito" className="ms-auto btn btn-sm btn-outline-success">
                    Ver Carrito
                  </Link>
                </div>
              )}

              <div className="border-top pt-3 mt-4 small text-muted">
                <div className="row g-2">
                  <div className="col-6">
                    <i className="bi bi-shield-check text-success me-1"></i> Garantía oficial de 6 meses
                  </div>
                  <div className="col-6">
                    <i className="bi bi-truck text-primary me-1"></i> Envíos a todo Chile vía Starken
                  </div>
                  <div className="col-6">
                    <i className="bi bi-shop text-danger me-1"></i> Retiro gratuito en Viña del Mar
                  </div>
                  <div className="col-6">
                    <i className="bi bi-wrench-adjustable text-warning me-1"></i> Calibración inicial disponible
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
