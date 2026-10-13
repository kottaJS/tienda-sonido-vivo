import React from 'react';

export default function BotonWhatsapp() {
  const fono = '56987654321';
  const mensaje = encodeURIComponent('Hola Sonido Vivo Viña del Mar, tengo una consulta sobre disponibilidad de instrumentos.');
  const url = `https://wa.me/${fono}?text=${mensaje}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-success rounded-circle shadow-lg position-fixed d-flex align-items-center justify-content-center"
      style={{
        bottom: '24px',
        right: '24px',
        width: '56px',
        height: '56px',
        zIndex: 1050,
        fontSize: '1.75rem'
      }}
      title="Contactar a Sonido Vivo Viña por WhatsApp"
      aria-label="Contactar a Sonido Vivo Viña por WhatsApp"
    >
      <i className="bi bi-whatsapp"></i>
    </a>
  );
}
