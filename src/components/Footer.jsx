import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-5 border-top border-secondary">
      <div className="container">
        <div className="row g-4 mb-4">
          <div className="col-12 col-md-4">
            <h5 className="text-white fw-bold d-flex align-items-center gap-2">
              <i className="bi bi-music-note-beamed text-danger"></i>
              SONIDO VIVO
            </h5>
            <p className="text-secondary small">
              Tienda especializada en instrumentos musicales, audio profesional y accesorios en la Región de Valparaíso. Más de 11 años equipando a los músicos de Chile.
            </p>
            <div className="text-secondary small">
              <p className="mb-1"><i className="bi bi-geo-alt me-2 text-danger"></i>Calle Valparaíso #580, Viña del Mar</p>
              <p className="mb-1"><i className="bi bi-clock me-2 text-danger"></i>Lunes a Sábado: 10:30 a 19:30 hrs</p>
              <p className="mb-1"><i className="bi bi-telephone me-2 text-danger"></i>+56 32 234 5678</p>
              <p className="mb-0"><i className="bi bi-envelope me-2 text-danger"></i>contacto@sonidovivo.cl</p>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <h6 className="text-white fw-bold mb-3">Navegación Rápida</h6>
            <ul className="list-unstyled small">
              <li className="mb-2"><Link to="/" className="text-decoration-none text-secondary">Inicio</Link></li>
              <li className="mb-2"><Link to="/catalogo" className="text-decoration-none text-secondary">Catálogo Completo</Link></li>
              <li className="mb-2"><Link to="/ofertas" className="text-decoration-none text-secondary">Ofertas Especiales</Link></li>
              <li className="mb-2"><Link to="/mapa" className="text-decoration-none text-secondary">Puntos de Retiro y Tienda Física</Link></li>
              <li className="mb-2"><Link to="/carrito" className="text-decoration-none text-secondary">Carrito de Compras</Link></li>
            </ul>
          </div>

          <div className="col-12 col-md-4">
            <h6 className="text-white fw-bold mb-3">Compras y Despacho</h6>
            <ul className="list-unstyled small text-secondary">
              <li className="mb-2"><i className="bi bi-truck me-2 text-danger"></i>Envíos a todo Chile por Starken y Blue Express</li>
              <li className="mb-2"><i className="bi bi-shop me-2 text-danger"></i>Retiro gratuito en tienda (Calle Valparaíso #580)</li>
              <li className="mb-2"><i className="bi bi-shield-check me-2 text-danger"></i>Garantía oficial de 6 meses en todos los equipos</li>
              <li className="mb-0"><i className="bi bi-credit-card me-2 text-danger"></i>WebPay Plus, Débito, Crédito y Transferencia</li>
            </ul>
          </div>
        </div>

        <div className="border-top border-secondary pt-3 text-center text-secondary small">
          <p className="mb-0">© 2026 Sonido Vivo - Tienda de Instrumentos Musicales. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
