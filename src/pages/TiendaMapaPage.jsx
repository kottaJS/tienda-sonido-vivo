import React from 'react';
import MapaTienda from '../components/MapaTienda';

export default function TiendaMapaPage() {
  return (
    <div className="container py-4">
      <div className="mb-4">
        <h1 className="fw-bold mb-1">Tienda Física y Puntos de Retiro</h1>
        <p className="text-muted small">
          Conoce nuestra ubicación central en Viña del Mar y los puntos de entrega asociados para compras online.
        </p>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-12 col-lg-8">
          <div className="card border-0 shadow-sm p-4 mb-4">
            <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
              <i className="bi bi-geo-alt-fill text-danger"></i>
              Mapa Interactivo de Locales y Puntos de Retiro
            </h5>
            <MapaTienda />
          </div>

          <div className="card border-0 shadow-sm p-4">
            <h5 className="fw-bold mb-3">¿Cómo Llegar a Nuestra Casa Matriz?</h5>
            
            <div className="row g-3 small">
              <div className="col-12 col-md-6">
                <div className="p-3 bg-light rounded">
                  <h6 className="fw-bold text-dark mb-1">
                    <i className="bi bi-train-front text-primary me-2"></i>
                    En Metro Valparaíso (EFE)
                  </h6>
                  <p className="text-muted mb-0">
                    Bájate en <strong>Estación Miramar</strong> o <strong>Estación Viña del Mar</strong>. Estamos a solo 4 cuadras caminando por Calle Valparaíso en dirección poniente.
                  </p>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="p-3 bg-light rounded">
                  <h6 className="fw-bold text-dark mb-1">
                    <i className="bi bi-bus-front text-success me-2"></i>
                    En Micro / Transporte Público
                  </h6>
                  <p className="text-muted mb-0">
                    Cualquier micro con recorrido por Calle Álvarez o Plaza Sucre te deja a pasos de nuestro local (Líneas 100, 200, 300 y 600).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-4">
          <div className="card border-0 shadow-sm p-4 mb-4 bg-white">
            <h5 className="fw-bold mb-3 border-bottom pb-2">Casa Matriz Viña del Mar</h5>
            
            <div className="mb-3">
              <div className="text-muted small">Dirección Oficial:</div>
              <div className="fw-bold">Calle Valparaíso #580, Local 3</div>
              <div className="text-muted small">Viña del Mar, Región de Valparaíso</div>
            </div>

            <div className="mb-3">
              <div className="text-muted small">Horario de Atención:</div>
              <div className="fw-semibold">Lunes a Viernes: 10:30 a 19:30 hrs</div>
              <div className="fw-semibold">Sábados: 11:00 a 16:30 hrs</div>
              <div className="text-danger small">Domingos y Festivos: Cerrado</div>
            </div>

            <div className="mb-3">
              <div className="text-muted small">Contacto Directo:</div>
              <div><i className="bi bi-telephone text-danger me-2"></i>+56 32 234 5678</div>
              <div><i className="bi bi-whatsapp text-success me-2"></i>+56 9 8765 4321</div>
              <div><i className="bi bi-envelope text-primary me-2"></i>contacto@sonidovivo.cl</div>
            </div>

            <div className="border-top pt-3 small text-muted">
              <strong>Servicios en tienda:</strong>
              <ul className="mt-2 ps-3 mb-0">
                <li>Prueba de instrumentos en sala insonorizada</li>
                <li>Taller de luthería y calibración</li>
                <li>Retiro inmediato de pedidos online</li>
                <li>Asesoría personalizada por músicos</li>
              </ul>
            </div>
          </div>

          <div className="card border-0 shadow-sm p-4 bg-dark text-white">
            <h6 className="fw-bold text-warning mb-2">Despachos Fuera de Viña del Mar</h6>
            <p className="small text-white-50 mb-0">
              Si vives en Valparaíso, Quilpué, Concón, Santiago u otra región de Chile, puedes pedir en línea y te despachamos en 24 a 48 horas con guía de seguimiento formal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
