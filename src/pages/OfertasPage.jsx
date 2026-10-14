import React from 'react';
import { useInventory } from '../context/InventoryContext';
import { useCart } from '../context/CartContext';
import ProductoCard from '../components/ProductoCard';
import { Link } from 'react-router-dom';

export default function OfertasPage() {
  const { productos } = useInventory();
  const { agregarAlCarrito } = useCart();

  const ofertas = productos.filter((_, idx) => idx % 4 === 0);

  return (
    <div className="container py-4">
      <div className="bg-danger text-white p-4 rounded shadow-sm mb-4">
        <div className="row align-items-center">
          <div className="col-12 col-md-8">
            <span className="badge bg-white text-danger fw-bold text-uppercase mb-2">Descuentos Especiales</span>
            <h1 className="fw-bold mb-2">Ofertas del Mes de la Música</h1>
            <p className="mb-0">
              Aprovecha precios rebajados en guitarras acústicas, micrófonos de estudio y pedales seleccionados por tiempo limitado en Sonido Vivo Viña del Mar.
            </p>
          </div>
          <div className="col-12 col-md-4 text-md-end mt-3 mt-md-0">
            <Link to="/catalogo" className="btn btn-light fw-bold">
              Ver Todo el Catálogo
            </Link>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold text-dark mb-0">Instrumentos y Accesorios en Promoción ({ofertas.length})</h5>
      </div>

      <div className="row g-4">
        {ofertas.map(producto => (
          <div key={producto.id} className="col-12 col-sm-6 col-lg-4">
            <ProductoCard 
              producto={producto} 
              onAgregar={agregarAlCarrito} 
            />
          </div>
        ))}
      </div>
    </div>
  );
}
