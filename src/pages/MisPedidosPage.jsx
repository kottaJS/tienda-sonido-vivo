import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useInventory } from '../context/InventoryContext';
import { formatPrecio } from '../utils/formatters';

export default function MisPedidosPage() {
  const { usuario } = useAuth();
  const { pedidos } = useInventory();

  const misPedidos = pedidos.filter(p => {
    if (!usuario) return true;
    const matchEmail = p.email?.toLowerCase() === usuario.email?.toLowerCase();
    const matchRut = p.rut?.replace(/[^0-9kK]/g, '') === usuario.rut?.replace(/[^0-9kK]/g, '');
    const matchNombre = p.cliente?.toLowerCase().includes(usuario.nombre?.toLowerCase());
    return matchEmail || matchRut || matchNombre;
  });

  const pedidosAMostrar = misPedidos.length > 0 ? misPedidos : pedidos.slice(0, 2);

  return (
    <div className="container py-4">
      <div className="mb-4">
        <h1 className="fw-bold mb-1">Mis Compras y Seguimiento</h1>
        <p className="text-muted small">
          Historial personal de pedidos para <strong>{usuario?.nombre || 'Cliente'}</strong> ({usuario?.email}).
        </p>
      </div>

      {pedidosAMostrar.length === 0 ? (
        <div className="card p-5 border-0 shadow-sm text-center mx-auto" style={{ maxWidth: '550px' }}>
          <i className="bi bi-bag-x text-muted display-3 mb-3"></i>
          <h4>No tienes compras registradas</h4>
          <p className="text-muted small mb-4">
            Aún no has generado pedidos con esta cuenta en Sonido Vivo.
          </p>
          <Link to="/catalogo" className="btn btn-marca">
            Explorar Catálogo
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          {pedidosAMostrar.map(pedido => (
            <div key={pedido.id} className="col-12">
              <div className="card border-0 shadow-sm overflow-hidden">
                <div className="card-header bg-light d-flex flex-wrap justify-content-between align-items-center py-3">
                  <div>
                    <span className="text-muted small">Orden: </span>
                    <strong className="text-danger fs-6">{pedido.id}</strong>
                    <span className="text-muted small ms-3">Fecha: </span>
                    <strong>{pedido.fecha}</strong>
                  </div>
                  <div className="mt-2 mt-sm-0">
                    <span className="me-2 small text-muted">Estado actual:</span>
                    <span className={`badge ${
                      pedido.estado === 'Entregado' ? 'bg-success' :
                      pedido.estado === 'Despachado' ? 'bg-primary' :
                      pedido.estado === 'Cancelado' ? 'bg-danger' : 'bg-warning text-dark'
                    }`}>
                      <i className="bi bi-clock-history me-1"></i>
                      {pedido.estado}
                    </span>
                  </div>
                </div>

                <div className="card-body p-4">
                  <div className="row g-3 mb-3">
                    <div className="col-12 col-md-6 small">
                      <div className="text-muted">Modalidad de entrega:</div>
                      <strong>{pedido.tipoEntrega === 'retiro' ? 'Retiro en Tienda Central Viña del Mar' : 'Despacho a Domicilio'}</strong>
                      <div className="text-secondary">{pedido.direccion}</div>
                    </div>
                    <div className="col-12 col-md-6 small">
                      <div className="text-muted">Forma de Pago:</div>
                      <strong>{pedido.metodoPago}</strong>
                      <div className="text-secondary">Contacto: {pedido.telefono}</div>
                    </div>
                  </div>

                  <div className="table-responsive">
                    <table className="table table-sm align-middle mb-0">
                      <thead className="table-light small">
                        <tr>
                          <th>Producto</th>
                          <th className="text-center">Cantidad</th>
                          <th className="text-end">Precio Unitario</th>
                          <th className="text-end">Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pedido.items?.map((item, idx) => (
                          <tr key={idx}>
                            <td>{item.nombre}</td>
                            <td className="text-center">{item.cantidad}</td>
                            <td className="text-end">{formatPrecio(item.precio)}</td>
                            <td className="text-end">{formatPrecio(item.precio * item.cantidad)}</td>
                          </tr>
                        ))}
                        <tr className="fw-bold">
                          <td colSpan="3" className="text-end pt-2">Total del Pedido:</td>
                          <td className="text-end text-danger pt-2 fs-6">{formatPrecio(pedido.total)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
