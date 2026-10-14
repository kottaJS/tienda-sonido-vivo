import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useInventory } from '../context/InventoryContext';
import { useAuth } from '../context/AuthContext';
import { formatPrecio, validarRut, validarEmail } from '../utils/formatters';

export default function CheckoutPage() {
  const { carrito, tipoEnvio, resumen, vaciarCarrito } = useCart();
  const { registrarPedido } = useInventory();
  const { usuario } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: usuario?.nombre ? usuario.nombre.split(' ')[0] : '',
    apellido: usuario?.nombre ? usuario.nombre.split(' ').slice(1).join(' ') : '',
    rut: usuario?.rut || '',
    email: usuario?.email || '',
    telefono: '+56 9 ',
    direccion: '',
    ciudad: usuario?.ciudad || 'Viña del Mar',
    comuna: 'Viña del Mar',
    metodoPago: 'Webpay / Débito',
    notas: '',
    simularRechazo: false
  });

  const [errores, setErrores] = useState({});

  if (carrito.length === 0) {
    return (
      <div className="container py-5 text-center">
        <div className="card p-5 border-0 shadow-sm mx-auto" style={{ maxWidth: '500px' }}>
          <h4>No hay productos en el carrito</h4>
          <p className="text-muted small">Agrega productos antes de realizar el checkout.</p>
          <Link to="/catalogo" className="btn btn-dark">
            Ir al Catálogo
          </Link>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
    if (errores[name]) {
      setErrores(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevosErrores = {};

    if (!formData.nombre.trim()) nuevosErrores.nombre = 'El nombre es obligatorio';
    if (!formData.apellido.trim()) nuevosErrores.apellido = 'El apellido es obligatorio';
    
    if (!formData.rut.trim()) {
      nuevosErrores.rut = 'El RUT es obligatorio';
    } else if (!validarRut(formData.rut)) {
      nuevosErrores.rut = 'El RUT ingresado no es válido (ej: 12.345.678-5)';
    }

    if (!formData.email.trim()) {
      nuevosErrores.email = 'El correo electrónico es obligatorio';
    } else if (!validarEmail(formData.email)) {
      nuevosErrores.email = 'Ingrese un correo electrónico válido';
    }

    if (!formData.telefono.trim() || formData.telefono.trim() === '+56 9') {
      nuevosErrores.telefono = 'El teléfono de contacto es obligatorio';
    }

    if (tipoEnvio === 'domicilio') {
      if (!formData.direccion.trim()) nuevosErrores.direccion = 'La dirección de despacho es obligatoria';
      if (!formData.ciudad.trim()) nuevosErrores.ciudad = 'La ciudad es obligatoria';
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (formData.simularRechazo) {
      navigate('/compra-fallida', { 
        state: { 
          motivo: 'Simulación académica: Tarjeta rechazada por el banco emisor (fondos insuficientes o código de seguridad erróneo).'
        } 
      });
      return;
    }

    const pedidoGenerado = registrarPedido(
      formData,
      carrito,
      tipoEnvio,
      formData.metodoPago,
      resumen.total
    );

    vaciarCarrito();

    navigate('/compra-exitosa', { state: { pedido: pedidoGenerado } });
  };

  return (
    <div className="container py-4">
      <div className="mb-4">
        <h1 className="fw-bold mb-1">Finalizar Compra</h1>
        <p className="text-muted small">Ingresa tus datos de facturación y entrega para formalizar tu pedido en Sonido Vivo.</p>
      </div>

      {Object.keys(errores).length > 0 && (
        <div className="alert alert-danger mb-4 shadow-sm" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          Por favor corrige los campos destacados antes de continuar con el pago.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="row g-4">
          <div className="col-12 col-lg-8">
            <div className="card border-0 shadow-sm p-4 mb-4">
              <h5 className="fw-bold mb-3 border-bottom pb-2">1. Datos del Cliente</h5>
              
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label className="form-label small fw-semibold">Nombre *</label>
                  <input
                    type="text"
                    className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Ej: Maximiliano"
                  />
                  {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label small fw-semibold">Apellido *</label>
                  <input
                    type="text"
                    className={`form-control ${errores.apellido ? 'is-invalid' : ''}`}
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    placeholder="Ej: Dinamarca"
                  />
                  {errores.apellido && <div className="invalid-feedback">{errores.apellido}</div>}
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label small fw-semibold">RUT Chileno *</label>
                  <input
                    type="text"
                    className={`form-control ${errores.rut ? 'is-invalid' : ''}`}
                    name="rut"
                    value={formData.rut}
                    onChange={handleChange}
                    placeholder="12.345.678-5"
                  />
                  {errores.rut && <div className="invalid-feedback">{errores.rut}</div>}
                  <div className="form-text small">Con puntos y guión.</div>
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label small fw-semibold">Teléfono de Contacto *</label>
                  <input
                    type="text"
                    className={`form-control ${errores.telefono ? 'is-invalid' : ''}`}
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="+56 9 1234 5678"
                  />
                  {errores.telefono && <div className="invalid-feedback">{errores.telefono}</div>}
                </div>

                <div className="col-12">
                  <label className="form-label small fw-semibold">Correo Electrónico (para comprobante y seguimiento) *</label>
                  <input
                    type="email"
                    className={`form-control ${errores.email ? 'is-invalid' : ''}`}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="correo@ejemplo.cl"
                  />
                  {errores.email && <div className="invalid-feedback">{errores.email}</div>}
                </div>
              </div>
            </div>

            <div className="card border-0 shadow-sm p-4 mb-4">
              <h5 className="fw-bold mb-3 border-bottom pb-2">
                2. Destino de Entrega ({tipoEnvio === 'domicilio' ? 'Despacho a Domicilio' : 'Retiro en Tienda'})
              </h5>

              {tipoEnvio === 'retiro' ? (
                <div className="alert alert-info mb-0">
                  <i className="bi bi-info-circle-fill me-2"></i>
                  <strong>Retiro gratuito en:</strong> Sonido Vivo Viña del Mar, Calle Valparaíso #580.
                  <div className="small mt-1 text-muted">
                    Horario de atención: Lunes a Sábado de 10:30 a 19:30 hrs. Presenta tu cédula o número de orden al retirar.
                  </div>
                </div>
              ) : (
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label small fw-semibold">Dirección de Despacho (Calle y Número) *</label>
                    <input
                      type="text"
                      className={`form-control ${errores.direccion ? 'is-invalid' : ''}`}
                      name="direccion"
                      value={formData.direccion}
                      onChange={handleChange}
                      placeholder="Ej: Av. Libertad 1245, Depto 302"
                    />
                    {errores.direccion && <div className="invalid-feedback">{errores.direccion}</div>}
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Ciudad / Región *</label>
                    <input
                      type="text"
                      className={`form-control ${errores.ciudad ? 'is-invalid' : ''}`}
                      name="ciudad"
                      value={formData.ciudad}
                      onChange={handleChange}
                      placeholder="Ej: Viña del Mar, Valparaíso, Quilpué, Santiago"
                    />
                    {errores.ciudad && <div className="invalid-feedback">{errores.ciudad}</div>}
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Comuna</label>
                    <input
                      type="text"
                      className="form-control"
                      name="comuna"
                      value={formData.comuna}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label small fw-semibold">Notas para la entrega (Opcional)</label>
                    <textarea
                      className="form-control"
                      rows="2"
                      name="notas"
                      value={formData.notas}
                      onChange={handleChange}
                      placeholder="Dejar en conserjería, timbre 2, etc."
                    ></textarea>
                  </div>
                </div>
              )}
            </div>

            <div className="card border-0 shadow-sm p-4 mb-4">
              <h5 className="fw-bold mb-3 border-bottom pb-2">3. Forma de Pago</h5>
              
              <div className="form-check p-3 border rounded mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="metodoPago"
                  id="pagoWebpay"
                  value="Webpay / Débito"
                  checked={formData.metodoPago === 'Webpay / Débito'}
                  onChange={handleChange}
                />
                <label className="form-check-label w-100" htmlFor="pagoWebpay">
                  <strong>Webpay Plus / Redcompra</strong>
                  <div className="small text-muted">Tarjetas de Débito, Crédito y Prepago nacionales.</div>
                </label>
              </div>

              <div className="form-check p-3 border rounded mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="metodoPago"
                  id="pagoTransferencia"
                  value="Transferencia Bancaria"
                  checked={formData.metodoPago === 'Transferencia Bancaria'}
                  onChange={handleChange}
                />
                <label className="form-check-label w-100" htmlFor="pagoTransferencia">
                  <strong>Transferencia Electrónica Directa</strong>
                  <div className="small text-muted">Banco Santander / BancoEstado. Notificación automática del comprobante.</div>
                </label>
              </div>

              <div className="form-check p-3 border rounded mb-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="metodoPago"
                  id="pagoPresencial"
                  value="Pago Presencial en Tienda"
                  checked={formData.metodoPago === 'Pago Presencial en Tienda'}
                  onChange={handleChange}
                />
                <label className="form-check-label w-100" htmlFor="pagoPresencial">
                  <strong>Pago en Tienda al Retirar</strong>
                  <div className="small text-muted">Efectivo, tarjeta o transferencia en el mesón de Viña del Mar.</div>
                </label>
              </div>

              <div className="p-3 bg-light rounded border border-warning">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="simularRechazo"
                    id="simularRechazoCheck"
                    checked={formData.simularRechazo}
                    onChange={handleChange}
                  />
                  <label className="form-check-label small" htmlFor="simularRechazoCheck">
                    <strong>Simular fallo de pago (Pauta Anexo 1 - Figura 8):</strong> Marcar esta casilla para probar el flujo de transacción rechazada por la pasarela de pagos.
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="card border-0 shadow-sm p-4 sticky-top bg-white" style={{ top: '80px' }}>
              <h5 className="fw-bold mb-3 border-bottom pb-2">Detalle del Pedido</h5>

              <ul className="list-group list-group-flush mb-3">
                {carrito.map(item => (
                  <li key={item.id} className="list-group-item px-0 py-2 d-flex justify-content-between align-items-center">
                    <div className="small pe-2">
                      <div className="fw-bold text-dark">{item.nombre}</div>
                      <div className="text-muted">x{item.cantidad} • {item.marca}</div>
                    </div>
                    <span className="small fw-bold text-nowrap">
                      {formatPrecio(item.precio * item.cantidad)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="border-top pt-2">
                <div className="d-flex justify-content-between mb-1 small">
                  <span className="text-muted">Subtotal:</span>
                  <span>{formatPrecio(resumen.subtotal)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2 small">
                  <span className="text-muted">Despacho ({tipoEnvio}):</span>
                  <span>{resumen.costoEnvio === 0 ? 'Gratis' : formatPrecio(resumen.costoEnvio)}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center border-top pt-3 mb-4">
                  <span className="fw-bold fs-5">Total a Pagar:</span>
                  <span className="fw-bold fs-4 text-danger">{formatPrecio(resumen.total)}</span>
                </div>
              </div>

              <button type="submit" className="btn btn-marca btn-lg w-100 fw-bold py-3 shadow-sm">
                <i className="bi bi-shield-lock-fill me-2"></i>
                Confirmar y Finalizar Pedido
              </button>

              <div className="small text-muted text-center mt-3">
                <i className="bi bi-shield-check text-success me-1"></i>
                Transacción protegida por Sonido Vivo Viña del Mar
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

// Validacion integral de formulario de despacho y RUT
