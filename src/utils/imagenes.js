const IMAGENES_CATEGORIA = {
  'Guitarras Acústicas': '/images/guitarras_acusticas.webp',
  'Guitarras Eléctricas': '/images/guitarras_electricas.webp',
  'Bajos Eléctricos': '/images/bajos_electricos.webp',
  'Baterías': '/images/baterias.webp',
  'Teclados y Pianos': '/images/teclados_pianos.webp',
  'Amplificadores': '/images/amplificadores.webp',
  'Micrófonos': '/images/microfonos.webp',
  'Pedales de Efectos': '/images/pedales_efectos.webp',
  'Accesorios': '/images/accesorios.webp',
  'Estudio y Grabación': '/images/estudio_grabacion.webp'
};

export function obtenerImagenProducto(producto) {
  if (producto?.imagen) return producto.imagen;
  return IMAGENES_CATEGORIA[producto?.categoria] || '/images/guitarras_electricas.webp';
}
