import React, { useState, useMemo } from 'react';
import { useInventory } from '../context/InventoryContext';
import { useCart } from '../context/CartContext';
import ProductoCard from '../components/ProductoCard';
import FiltroCategorias from '../components/FiltroCategorias';

export default function CatalogoPage() {
  const { productos } = useInventory();
  const { agregarAlCarrito } = useCart();

  const [busqueda, setBusqueda] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');
  const [orden, setOrden] = useState('relevancia');

  const categoriasUnicas = useMemo(() => {
    const setCats = new Set(productos.map(p => p.categoria));
    return Array.from(setCats).sort();
  }, [productos]);

  const productosFiltrados = useMemo(() => {
    return productos
      .filter(p => {
        const coincideCat = categoriaSeleccionada === 'Todas' || p.categoria === categoriaSeleccionada;
        const texto = busqueda.toLowerCase().trim();
        const coincideBusqueda = !texto || 
          p.nombre.toLowerCase().includes(texto) ||
          p.marca.toLowerCase().includes(texto) ||
          p.modelo.toLowerCase().includes(texto) ||
          p.descripcion.toLowerCase().includes(texto) ||
          p.id.toLowerCase().includes(texto);
        return coincideCat && coincideBusqueda;
      })
      .sort((a, b) => {
        if (orden === 'precio-menor') return a.precio - b.precio;
        if (orden === 'precio-mayor') return b.precio - a.precio;
        if (orden === 'nombre-az') return a.nombre.localeCompare(b.nombre);
        return 0;
      });
  }, [productos, busqueda, categoriaSeleccionada, orden]);

  return (
    <div className="container py-4">
      <div className="mb-4">
        <h1 className="fw-bold mb-1">Catálogo de Productos</h1>
        <p className="text-muted small">Explora nuestros 340 modelos de guitarras, amplificadores, pedales y accesorios.</p>
      </div>

      <div className="card shadow-sm p-3 mb-4 bg-white border-0">
        <div className="row g-3 align-items-center">
          <div className="col-12 col-md-7">
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0">
                <i className="bi bi-search text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0"
                placeholder="Buscar por nombre, marca (Fender, Yamaha, Boss...) o modelo"
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
              />
              {busqueda && (
                <button 
                  className="btn btn-outline-secondary" 
                  type="button"
                  onClick={() => setBusqueda('')}
                >
                  <i className="bi bi-x"></i>
                </button>
              )}
            </div>
          </div>

          <div className="col-12 col-md-5 d-flex justify-content-md-end align-items-center gap-2">
            <label className="text-muted small text-nowrap mb-0">Ordenar por:</label>
            <select 
              className="form-select form-select-sm" 
              style={{ width: 'auto' }}
              value={orden}
              onChange={e => setOrden(e.target.value)}
            >
              <option value="relevancia">Relevancia</option>
              <option value="precio-menor">Precio: Menor a Mayor</option>
              <option value="precio-mayor">Precio: Mayor a Menor</option>
              <option value="nombre-az">Nombre (A - Z)</option>
            </select>
          </div>
        </div>
      </div>

      <FiltroCategorias
        categorias={categoriasUnicas}
        categoriaSeleccionada={categoriaSeleccionada}
        onSeleccionarCategoria={setCategoriaSeleccionada}
      />

      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-muted small">
          Mostrando <strong>{productosFiltrados.length}</strong> productos
          {categoriaSeleccionada !== 'Todas' && ` en "${categoriaSeleccionada}"`}
        </span>
      </div>

      {productosFiltrados.length === 0 ? (
        <div className="text-center py-5 bg-white rounded shadow-sm border">
          <i className="bi bi-emoji-frown fs-1 text-muted d-block mb-3"></i>
          <h5>No encontramos productos que coincidan con tu búsqueda</h5>
          <p className="text-muted small mb-3">Prueba cambiando los términos de búsqueda o seleccionando otra categoría.</p>
          <button 
            className="btn btn-outline-danger btn-sm"
            onClick={() => { setBusqueda(''); setCategoriaSeleccionada('Todas'); }}
          >
            Restablecer Filtros
          </button>
        </div>
      ) : (
        <div className="row g-4">
          {productosFiltrados.map(producto => (
            <div key={producto.id} className="col-12 col-sm-6 col-lg-4">
              <ProductoCard 
                producto={producto} 
                onAgregar={agregarAlCarrito} 
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Modulo catalogo y filtros reactivos Sonido Vivo Vina del Mar
