import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

const PUNTOS_RETIRO = [
  {
    id: 1,
    nombre: 'Sonido Vivo - Casa Matriz Viña del Mar',
    direccion: 'Calle Valparaíso #580, Viña del Mar',
    horario: 'Lunes a Sábado: 10:30 a 19:30 hrs',
    telefono: '+56 32 234 5678',
    tipo: 'Tienda Física y Taller',
    coords: [-33.0245, -71.5518]
  },
  {
    id: 2,
    nombre: 'Punto de Retiro Valparaíso (Enlace Starken)',
    direccion: 'Av. Pedro Montt #2050, Valparaíso',
    horario: 'Lunes a Viernes: 09:00 a 18:00 hrs',
    telefono: '+56 32 288 1234',
    tipo: 'Punto de Entrega Asociado',
    coords: [-33.0482, -71.6143]
  },
  {
    id: 3,
    nombre: 'Punto de Retiro Quilpué (Centro)',
    direccion: 'Calle Los Carrera #720, Quilpué',
    horario: 'Lunes a Sábado: 10:00 a 18:30 hrs',
    telefono: '+56 32 291 9900',
    tipo: 'Punto de Entrega Asociado',
    coords: [-33.0475, -71.4429]
  }
];

export default function MapaTienda() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current).setView([-33.03, -71.55], 12);
    mapInstanceRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    PUNTOS_RETIRO.forEach(punto => {
      const marker = L.marker(punto.coords).addTo(map);
      marker.bindPopup(`
        <div style="font-family: inherit; font-size: 13px;">
          <strong style="color: #d9381e;">${punto.nombre}</strong><br/>
          <span style="color: #555;">${punto.tipo}</span><br/>
          <hr style="margin: 4px 0;"/>
          📍 <b>Dirección:</b> ${punto.direccion}<br/>
          🕒 <b>Horario:</b> ${punto.horario}<br/>
          📞 <b>Teléfono:</b> ${punto.telefono}
        </div>
      `);
      if (punto.id === 1) {
        marker.openPopup();
      }
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div>
      <div ref={mapRef} className="mapa-contenedor shadow-sm"></div>
      
      <div className="row g-3 mt-3">
        {PUNTOS_RETIRO.map(p => (
          <div key={p.id} className="col-12 col-md-4">
            <div className="card h-100 border-0 bg-light p-3 shadow-sm">
              <div className="d-flex align-items-center gap-2 mb-2">
                <i className="bi bi-geo-alt-fill text-danger fs-5"></i>
                <h6 className="card-title fw-bold text-dark mb-0">{p.nombre}</h6>
              </div>
              <p className="card-text text-muted small mb-1">
                <strong>Dirección:</strong> {p.direccion}
              </p>
              <p className="card-text text-muted small mb-1">
                <strong>Horario:</strong> {p.horario}
              </p>
              <p className="card-text text-muted small mb-0">
                <strong>Fono:</strong> {p.telefono}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Componente de geolocalizacion interactiva con Leaflet en Vina del Mar
