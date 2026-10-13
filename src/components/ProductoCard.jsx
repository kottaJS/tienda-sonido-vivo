import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrecio } from '../utils/formatters';
import { obtenerImagenProducto } from '../utils/imagenes';

export default function ProductoCard({ producto, onAgregar }) {
  const agotado = producto.stock === 0;
  const stockCritico = producto.stock > 0 && producto.stock <= 3;
  const imagenUrl = obtenerImagenProducto(producto);

  return (
    <div className="card h-100 card-producto shadow-sm">
      <div className="position-relative overflow-hidden" style={{ height: '200px', backgroundColor: '#f8f9fa' }}>
        <img 
          src={imagenUrl} 
          alt={producto.nombre}
          className="w-100 h-100"
          style={{ objectFit: 'cover' }}
          loading="lazy"
        />
        <span className="position-absolute top-0 start-0 m-2 badge bg-dark opacity-90 small">
          {producto.categoria}
        </span>
      </div>

      <div className="card-body d-flex flex-column">
        <div className="text-secondary small fw-bold mb-1">
          {producto.marca} • {producto.modelo}
        </div>
        <h6 className="card-title fw-bold text-dark mb-2">
          {producto.nombre}
        </h6>
        <p className="card-text text-muted small flex-grow-1">
          {producto.descripcion}
        </p>

        <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
          <div>
            <div className="fs-5 fw-bold text-dark">
              {formatPrecio(producto.precio)}
            </div>
            <div>
              {agotado ? (
                <span className="badge bg-danger">Agotado</span>
              ) : stockCritico ? (
                <span className="badge bg-warning text-dark">Últimas {producto.stock} un.</span>
              ) : (
                <span className="badge bg-success">Stock: {producto.stock}</span>
              )}
            </div>
          </div>

          <div className="d-flex gap-2">
            <Link 
              to={`/producto/${producto.id}`} 
              className="btn btn-outline-secondary btn-sm"
              title="Ver detalle"
            >
              <i className="bi bi-eye"></i>
            </Link>
            <button
              type="button"
              className="btn btn-marca btn-sm px-3"
              disabled={agotado}
              onClick={() => onAgregar(producto)}
            >
              <i className="bi bi-cart-plus me-1"></i>
              Agregar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
