import React from 'react';

export default function FiltroCategorias({ categorias, categoriaSeleccionada, onSeleccionarCategoria }) {
  return (
    <div className="d-flex flex-wrap gap-2 mb-4">
      <button
        type="button"
        className={`btn btn-sm ${categoriaSeleccionada === 'Todas' ? 'btn-dark' : 'btn-outline-secondary'}`}
        onClick={() => onSeleccionarCategoria('Todas')}
      >
        Todas ({categorias.length})
      </button>

      {categorias.map(cat => (
        <button
          key={cat}
          type="button"
          className={`btn btn-sm ${categoriaSeleccionada === cat ? 'btn-dark' : 'btn-outline-secondary'}`}
          onClick={() => onSeleccionarCategoria(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
