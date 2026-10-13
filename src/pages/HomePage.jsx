import React from 'react';
import { Link } from 'react-router-dom';
import { useInventory } from '../context/InventoryContext';
import { useCart } from '../context/CartContext';
import ProductoCard from '../components/ProductoCard';
import MapaTienda from '../components/MapaTienda';

export default function HomePage() {
  const { productos } = useInventory();
  const { agregarAlCarrito } = useCart();

  const destacados = productos.slice(0, 6);

  return (
    <div>
      <section className="banner-hero text-center d-flex align-items-center justify-content-center">
        <div className="container py-4">
          <span className="badge bg-danger px-3 py-2 text-uppercase mb-3">11 Años en Viña del Mar</span>
          <h1 className="display-4 fw-bold mb-3">SONIDO VIVO</h1>
          <p className="lead mb-4 mx-auto" style={{ maxWidth: '720px' }}>
            Instrumentos musicales, amplificación, micrófonos y accesorios para músicos.
            Consulta stock en tiempo real y pide con despacho a todo Chile o retiro directo en nuestra tienda.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link to="/catalogo" className="btn btn-marca btn-lg px-4">
              <i className="bi bi-grid me-2"></i>
              Ver Catálogo Completo
            </Link>
            <Link to="/mapa" className="btn btn-outline-light btn-lg px-4">
              <i className="bi bi-geo-alt me-2"></i>
              Visítanos en Viña
            </Link>
          </div>
        </div>
      </section>

      <section className="py-5 bg-white border-bottom">
        <div className="container">
          <div className="row g-4 text-center">
            <div className="col-12 col-md-3">
              <div className="p-3">
                <i className="bi bi-clock-history text-danger fs-1 mb-2 d-block"></i>
                <h6 className="fw-bold">Stock en Tiempo Real</h6>
                <p className="text-muted small mb-0">Disponibilidad actualizada al instante sin esperar respuesta por WhatsApp.</p>
              </div>
            </div>
            <div className="col-12 col-md-3">
              <div className="p-3">
                <i className="bi bi-truck text-danger fs-1 mb-2 d-block"></i>
                <h6 className="fw-bold">Envíos a Todo Chile</h6>
                <p className="text-muted small mb-0">Despacho seguro por Starken y Chilexpress con número de seguimiento formal.</p>
              </div>
            </div>
            <div className="col-12 col-md-3">
              <div className="p-3">
                <i className="bi bi-shop text-danger fs-1 mb-2 d-block"></i>
                <h6 className="fw-bold">Retiro en Viña del Mar</h6>
                <p className="text-muted small mb-0">Retira gratis en Calle Valparaíso #580 o en nuestros puntos asociados.</p>
              </div>
            </div>
            <div className="col-12 col-md-3">
              <div className="p-3">
                <i className="bi bi-tools text-danger fs-1 mb-2 d-block"></i>
                <h6 className="fw-bold">Taller de Calibración</h6>
                <p className="text-muted small mb-0">Servicio técnico y calibración de guitarras y bajos por profesionales.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
            <div>
              <h2 className="fw-bold mb-1">Productos Destacados</h2>
              <p className="text-muted small mb-0">Selección de instrumentos y equipos más consultados esta semana</p>
            </div>
            <Link to="/catalogo" className="btn btn-outline-dark btn-sm">
              Ver todos los productos ({productos.length}) <i className="bi bi-arrow-right ms-1"></i>
            </Link>
          </div>

          <div className="row g-4">
            {destacados.map(producto => (
              <div key={producto.id} className="col-12 col-sm-6 col-lg-4">
                <ProductoCard 
                  producto={producto} 
                  onAgregar={agregarAlCarrito} 
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5 bg-light border-top">
        <div className="container">
          <div className="row align-items-center mb-4">
            <div className="col-12 col-md-8">
              <h3 className="fw-bold mb-1">Encuéntranos en Viña del Mar</h3>
              <p className="text-muted small mb-0">Visita nuestra sala de ventas o retira tu compra online en nuestro local central.</p>
            </div>
            <div className="col-12 col-md-4 text-md-end mt-2 mt-md-0">
              <Link to="/mapa" className="btn btn-outline-danger">
                Ver todos los puntos de retiro <i className="bi bi-geo-alt ms-1"></i>
              </Link>
            </div>
          </div>
          <MapaTienda />
        </div>
      </section>
    </div>
  );
}
