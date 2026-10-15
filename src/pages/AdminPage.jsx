import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useInventory } from '../context/InventoryContext';
import { formatPrecio } from '../utils/formatters';

const CATEGORIAS_VALIDAS = [
  'Guitarras Acústicas',
  'Guitarras Eléctricas',
  'Bajos Eléctricos',
  'Baterías',
  'Teclados y Pianos',
  'Amplificadores',
  'Micrófonos',
  'Pedales de Efectos',
  'Accesorios',
  'Estudio y Grabación'
];

export default function AdminPage() {
  const { usuario, usuariosSistema, cambiarRolActual, agregarUsuario, eliminarUsuario } = useAuth();
  const { 
    productos, 
    pedidos, 
    actualizarEstadoPedido, 
    actualizarStockProducto, 
    agregarProducto,
    eliminarProducto,
    resetearCatalogo 
  } = useInventory();

  const [tabActiva, setTabActiva] = useState('pedidos');
  const [filtroStock, setFiltroStock] = useState('');
  const [stockEdits, setStockEdits] = useState({});

  const [mostrarFormNuevoProducto, setMostrarFormNuevoProducto] = useState(false);
  const [nuevoProd, setNuevoProd] = useState({
    id: '',
    categoria: 'Guitarras Acústicas',
    nombre: '',
    marca: '',
    modelo: '',
    precio: '',
    stock: '',
    descripcion: ''
  });

  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: '',
    email: '',
    rut: '',
    rol: 'Cliente',
    ciudad: 'Viña del Mar'
  });

  const esAdmin = usuario?.rol === 'Administrador';
  const esVendedor = usuario?.rol === 'Vendedor';

  if (!esAdmin && !esVendedor) {
    return (
      <div className="container py-5 text-center">
        <div className="card p-5 border shadow-sm mx-auto" style={{ maxWidth: '600px' }}>
          <i className="bi bi-shield-lock text-muted display-4 mb-3"></i>
          <h3 className="fw-bold">Acceso Restringido</h3>
          <p className="text-muted small mb-4">
            El usuario actual (<strong>{usuario?.nombre}</strong>) cuenta con rol de <strong>{usuario?.rol}</strong> y no tiene permisos asignados para el panel interno.
          </p>
          <div className="bg-light p-3 rounded mb-4 text-start small border">
            <span className="fw-semibold">Cambiar rol para pruebas de evaluación:</span>
            <div className="mt-2 d-flex gap-2 flex-wrap">
              <button 
                className="btn btn-outline-dark btn-sm"
                onClick={() => cambiarRolActual('Vendedor')}
              >
                Simular Vendedor
              </button>
              <button 
                className="btn btn-outline-dark btn-sm"
                onClick={() => cambiarRolActual('Administrador')}
              >
                Simular Administrador
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const totalVentas = pedidos.reduce((acc, p) => p.estado !== 'Cancelado' ? acc + p.total : acc, 0);
  const pedidosPendientes = pedidos.filter(p => p.estado === 'En preparación').length;
  const stockCriticoCount = productos.filter(p => p.stock <= 3).length;

  const handleStockInputChange = (id, valor) => {
    setStockEdits(prev => ({ ...prev, [id]: valor }));
  };

  const handleGuardarStock = (id) => {
    const valor = stockEdits[id];
    if (valor !== undefined && valor !== '') {
      actualizarStockProducto(id, parseInt(valor, 10));
      alert('Stock actualizado correctamente');
    }
  };

  const handleCrearProducto = (e) => {
    e.preventDefault();
    if (!nuevoProd.nombre || !nuevoProd.marca || !nuevoProd.precio || !nuevoProd.stock) {
      alert('Completa los campos obligatorios del producto');
      return;
    }

    const codigoGenerado = nuevoProd.id.trim() || 'PROD-' + Date.now().toString().slice(-4);
    
    agregarProducto({
      ...nuevoProd,
      id: codigoGenerado.toUpperCase(),
      precio: parseInt(nuevoProd.precio, 10) || 0,
      stock: parseInt(nuevoProd.stock, 10) || 0
    });

    setNuevoProd({
      id: '',
      categoria: 'Guitarras Acústicas',
      nombre: '',
      marca: '',
      modelo: '',
      precio: '',
      stock: '',
      descripcion: ''
    });

    setMostrarFormNuevoProducto(false);
    alert('Producto agregado al catálogo de Sonido Vivo.');
  };

  const handleCrearUsuario = (e) => {
    e.preventDefault();
    if (!nuevoUsuario.nombre || !nuevoUsuario.email || !nuevoUsuario.rut) {
      alert('Completa los campos obligatorios del nuevo usuario');
      return;
    }
    agregarUsuario(nuevoUsuario);
    setNuevoUsuario({
      nombre: '',
      email: '',
      rut: '',
      rol: 'Cliente',
      ciudad: 'Viña del Mar'
    });
    alert('Usuario creado exitosamente');
  };

  const productosFiltrados = productos.filter(p => 
    p.nombre.toLowerCase().includes(filtroStock.toLowerCase()) ||
    p.marca.toLowerCase().includes(filtroStock.toLowerCase()) ||
    p.id.toLowerCase().includes(filtroStock.toLowerCase()) ||
    p.categoria.toLowerCase().includes(filtroStock.toLowerCase())
  );

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h2 className="fw-bold mb-1">Panel de Administración y Bodega</h2>
          <div className="text-secondary small">
            Usuario activo: <strong>{usuario?.nombre}</strong> — Rol del sistema: <strong>{usuario?.rol}</strong>
          </div>
        </div>
        <div>
          {esAdmin && (
            <button className="btn btn-outline-secondary btn-sm" onClick={resetearCatalogo}>
              <i className="bi bi-arrow-clockwise me-1"></i> Restablecer Catálogo Original
            </button>
          )}
        </div>
      </div>

      <div className="card mb-4 border shadow-sm bg-white">
        <div className="card-body p-3">
          <div className="row text-center g-3">
            <div className="col-6 col-md-3 border-end">
              <div className="text-muted small fw-semibold text-uppercase" style={{ fontSize: '0.75rem' }}>Total Facturado</div>
              <div className="fs-4 fw-bold text-dark mt-1">{formatPrecio(totalVentas)}</div>
              <div className="text-secondary small" style={{ fontSize: '0.78rem' }}>{pedidos.length} pedidos en sistema</div>
            </div>
            <div className="col-6 col-md-3 border-end">
              <div className="text-muted small fw-semibold text-uppercase" style={{ fontSize: '0.75rem' }}>En Preparación</div>
              <div className="fs-4 fw-bold text-dark mt-1">{pedidosPendientes}</div>
              <div className="text-secondary small" style={{ fontSize: '0.78rem' }}>Pendientes de entrega</div>
            </div>
            <div className="col-6 col-md-3 border-end">
              <div className="text-muted small fw-semibold text-uppercase" style={{ fontSize: '0.75rem' }}>Stock Bajo o Crítico</div>
              <div className="fs-4 fw-bold text-dark mt-1">{stockCriticoCount}</div>
              <div className="text-secondary small" style={{ fontSize: '0.78rem' }}>≤ 3 unidades en bodega</div>
            </div>
            <div className="col-6 col-md-3">
              <div className="text-muted small fw-semibold text-uppercase" style={{ fontSize: '0.75rem' }}>Catálogo Activo</div>
              <div className="fs-4 fw-bold text-dark mt-1">{productos.length}</div>
              <div className="text-secondary small" style={{ fontSize: '0.78rem' }}>Instrumentos registrados</div>
            </div>
          </div>
        </div>
      </div>

      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button 
            className={`nav-link ${tabActiva === 'pedidos' ? 'active fw-bold' : ''}`}
            onClick={() => setTabActiva('pedidos')}
          >
            <i className="bi bi-box-seam me-1"></i> Pedidos ({pedidos.length})
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${tabActiva === 'inventario' ? 'active fw-bold' : ''}`}
            onClick={() => setTabActiva('inventario')}
          >
            <i className="bi bi-card-checklist me-1"></i> Control de Stock ({productos.length})
          </button>
        </li>
        {esAdmin && (
          <li className="nav-item">
            <button 
              className={`nav-link ${tabActiva === 'usuarios' ? 'active fw-bold' : ''}`}
              onClick={() => setTabActiva('usuarios')}
            >
              <i className="bi bi-people me-1"></i> Usuarios ({usuariosSistema.length})
            </button>
          </li>
        )}
      </ul>

      {tabActiva === 'pedidos' && (
        <div className="card border shadow-sm p-4">
          <h5 className="fw-bold mb-3">Registro Central de Pedidos</h5>
          <div className="table-responsive">
            <table className="table table-hover align-middle small mb-0">
              <thead className="table-light">
                <tr>
                  <th>N° Orden</th>
                  <th>Fecha</th>
                  <th>Cliente</th>
                  <th>Contacto</th>
                  <th>Modalidad</th>
                  <th>Total</th>
                  <th>Estado del Pedido</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map(p => (
                  <tr key={p.id}>
                    <td className="fw-bold">{p.id}</td>
                    <td>{p.fecha}</td>
                    <td>
                      <div className="fw-semibold">{p.cliente}</div>
                      <div className="text-muted" style={{ fontSize: '0.75rem' }}>RUT: {p.rut}</div>
                    </td>
                    <td>
                      <div>{p.telefono}</div>
                      <div className="text-muted" style={{ fontSize: '0.75rem' }}>{p.email}</div>
                    </td>
                    <td>
                      <span className="badge bg-light text-dark border">
                        {p.tipoEntrega === 'retiro' ? 'Retiro en Tienda' : 'Despacho'}
                      </span>
                    </td>
                    <td className="fw-bold">{formatPrecio(p.total)}</td>
                    <td>
                      <select 
                        className="form-select form-select-sm"
                        value={p.estado}
                        onChange={e => actualizarEstadoPedido(p.id, e.target.value)}
                        style={{ maxWidth: '160px' }}
                      >
                        <option value="En preparación">En preparación</option>
                        <option value="Despachado">Despachado</option>
                        <option value="Entregado">Entregado</option>
                        <option value="Cancelado">Cancelado</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tabActiva === 'inventario' && (
        <div className="card border shadow-sm p-4">
          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
            <div>
              <h5 className="fw-bold mb-0">Inventario y Stock</h5>
              <div className="small text-muted">Ajusta existencias o registra nuevas referencias al catálogo.</div>
            </div>
            <div>
              <button 
                className="btn btn-dark btn-sm"
                onClick={() => setMostrarFormNuevoProducto(!mostrarFormNuevoProducto)}
              >
                <i className="bi bi-plus-lg me-1"></i>
                {mostrarFormNuevoProducto ? 'Cerrar Formulario' : 'Agregar Producto'}
              </button>
            </div>
          </div>

          {mostrarFormNuevoProducto && (
            <div className="card bg-light border p-4 mb-4">
              <h6 className="fw-bold text-dark mb-3">Nuevo Producto para la Tienda</h6>
              <form onSubmit={handleCrearProducto}>
                <div className="row g-3">
                  <div className="col-12 col-md-3">
                    <label className="form-label small fw-semibold">Código Producto</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="Ej: GA010 (Opcional)"
                      value={nuevoProd.id}
                      onChange={e => setNuevoProd({ ...nuevoProd, id: e.target.value })}
                    />
                  </div>

                  <div className="col-12 col-md-4">
                    <label className="form-label small fw-semibold">Categoría *</label>
                    <select
                      className="form-select form-select-sm"
                      value={nuevoProd.categoria}
                      onChange={e => setNuevoProd({ ...nuevoProd, categoria: e.target.value })}
                    >
                      {CATEGORIAS_VALIDAS.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12 col-md-5">
                    <label className="form-label small fw-semibold">Nombre del Producto *</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="Ej: Guitarra Electroacústica Cutaway"
                      value={nuevoProd.nombre}
                      onChange={e => setNuevoProd({ ...nuevoProd, nombre: e.target.value })}
                      required
                    />
                  </div>

                  <div className="col-12 col-md-3">
                    <label className="form-label small fw-semibold">Marca *</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="Ej: Fender, Ibanez, Yamaha"
                      value={nuevoProd.marca}
                      onChange={e => setNuevoProd({ ...nuevoProd, marca: e.target.value })}
                      required
                    />
                  </div>

                  <div className="col-12 col-md-3">
                    <label className="form-label small fw-semibold">Modelo</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="Ej: CD-140SCE"
                      value={nuevoProd.modelo}
                      onChange={e => setNuevoProd({ ...nuevoProd, modelo: e.target.value })}
                    />
                  </div>

                  <div className="col-12 col-md-3">
                    <label className="form-label small fw-semibold">Precio (CLP) *</label>
                    <input
                      type="number"
                      min="1000"
                      className="form-control form-control-sm"
                      placeholder="Ej: 249990"
                      value={nuevoProd.precio}
                      onChange={e => setNuevoProd({ ...nuevoProd, precio: e.target.value })}
                      required
                    />
                  </div>

                  <div className="col-12 col-md-3">
                    <label className="form-label small fw-semibold">Stock Inicial *</label>
                    <input
                      type="number"
                      min="0"
                      className="form-control form-control-sm"
                      placeholder="Ej: 5"
                      value={nuevoProd.stock}
                      onChange={e => setNuevoProd({ ...nuevoProd, stock: e.target.value })}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label small fw-semibold">Descripción Breve</label>
                    <textarea
                      className="form-control form-control-sm"
                      rows="2"
                      placeholder="Detalles técnicos, maderas, cápsulas, etc."
                      value={nuevoProd.descripcion}
                      onChange={e => setNuevoProd({ ...nuevoProd, descripcion: e.target.value })}
                    ></textarea>
                  </div>

                  <div className="col-12 d-flex justify-content-end gap-2">
                    <button 
                      type="button" 
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => setMostrarFormNuevoProducto(false)}
                    >
                      Cancelar
                    </button>
                    <button type="submit" className="btn btn-dark btn-sm px-4">
                      Guardar Producto
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          <div className="mb-3" style={{ maxWidth: '350px' }}>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Buscar por código, marca o nombre..."
              value={filtroStock}
              onChange={e => setFiltroStock(e.target.value)}
            />
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle small mb-0">
              <thead className="table-light">
                <tr>
                  <th>Código</th>
                  <th>Categoría</th>
                  <th>Producto</th>
                  <th>Marca / Modelo</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th style={{ width: '180px' }}>Ajustar Stock</th>
                  {esAdmin && <th style={{ width: '50px' }}></th>}
                </tr>
              </thead>
              <tbody>
                {productosFiltrados.slice(0, 30).map(prod => {
                  const editVal = stockEdits[prod.id] !== undefined ? stockEdits[prod.id] : prod.stock;
                  return (
                    <tr key={prod.id}>
                      <td className="fw-bold">{prod.id}</td>
                      <td><span className="badge bg-light text-secondary border">{prod.categoria}</span></td>
                      <td className="fw-semibold">{prod.nombre}</td>
                      <td>{prod.marca} {prod.modelo}</td>
                      <td>{formatPrecio(prod.precio)}</td>
                      <td>
                        {prod.stock === 0 ? (
                          <span className="text-danger fw-bold">Agotado (0)</span>
                        ) : prod.stock <= 3 ? (
                          <span className="text-warning fw-bold">Bajo ({prod.stock})</span>
                        ) : (
                          <span>{prod.stock} un.</span>
                        )}
                      </td>
                      <td>
                        <div className="input-group input-group-sm">
                          <input
                            type="number"
                            min="0"
                            className="form-control"
                            value={editVal}
                            onChange={e => handleStockInputChange(prod.id, e.target.value)}
                          />
                          <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() => handleGuardarStock(prod.id)}
                          >
                            Guardar
                          </button>
                        </div>
                      </td>
                      {esAdmin && (
                        <td className="text-end">
                          <button
                            className="btn btn-link text-muted p-0"
                            title="Eliminar producto"
                            onClick={() => {
                              if (confirm(`¿Eliminar producto ${prod.nombre}?`)) {
                                eliminarProducto(prod.id);
                              }
                            }}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {productosFiltrados.length > 30 && (
            <div className="text-muted small text-center mt-3">
              Mostrando primeros 30 productos de {productosFiltrados.length}. Usa el buscador para filtrar.
            </div>
          )}
        </div>
      )}

      {tabActiva === 'usuarios' && esAdmin && (
        <div className="row g-4">
          <div className="col-12 col-lg-8">
            <div className="card border shadow-sm p-4">
              <h5 className="fw-bold mb-3">Usuarios Registrados</h5>
              <div className="table-responsive">
                <table className="table table-hover align-middle small mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Nombre</th>
                      <th>Email</th>
                      <th>RUT</th>
                      <th>Ciudad</th>
                      <th>Rol</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuariosSistema.map(u => (
                      <tr key={u.id}>
                        <td className="fw-semibold">{u.nombre}</td>
                        <td>{u.email}</td>
                        <td>{u.rut}</td>
                        <td>{u.ciudad}</td>
                        <td>
                          <span className="badge bg-light text-dark border">
                            {u.rol}
                          </span>
                        </td>
                        <td>
                          {u.id !== usuario?.id && (
                            <button
                              className="btn btn-link text-muted p-0"
                              onClick={() => eliminarUsuario(u.id)}
                              title="Eliminar usuario"
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="card border shadow-sm p-4 bg-light">
              <h6 className="fw-bold mb-3">Registrar Usuario</h6>
              <form onSubmit={handleCrearUsuario}>
                <div className="mb-2">
                  <label className="form-label small fw-semibold">Nombre Completo *</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={nuevoUsuario.nombre}
                    onChange={e => setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label small fw-semibold">Correo Electrónico *</label>
                  <input
                    type="email"
                    className="form-control form-control-sm"
                    value={nuevoUsuario.email}
                    onChange={e => setNuevoUsuario({ ...nuevoUsuario, email: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label small fw-semibold">RUT *</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={nuevoUsuario.rut}
                    onChange={e => setNuevoUsuario({ ...nuevoUsuario, rut: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Rol *</label>
                  <select
                    className="form-select form-select-sm"
                    value={nuevoUsuario.rol}
                    onChange={e => setNuevoUsuario({ ...nuevoUsuario, rol: e.target.value })}
                  >
                    <option value="Cliente">Cliente</option>
                    <option value="Vendedor">Vendedor</option>
                    <option value="Administrador">Administrador</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-dark btn-sm w-100">
                  Registrar
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
