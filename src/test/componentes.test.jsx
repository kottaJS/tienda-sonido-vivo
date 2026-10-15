import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductoCard from '../components/ProductoCard';
import FiltroCategorias from '../components/FiltroCategorias';
import Footer from '../components/Footer';

const renderConRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Pruebas unitarias de componentes e interacciones con RTL', () => {
  const productoMock = {
    id: 'GA001',
    categoria: 'Guitarras Acústicas',
    nombre: 'Guitarra Acústica Folk',
    marca: 'Yamaha',
    modelo: 'F310',
    stock: 5,
    precio: 129990,
    descripcion: 'Tapa de abeto, ideal para principiantes.'
  };

  it('6. ProductoCard debe renderizar el nombre, marca y precio formateado', () => {
    renderConRouter(<ProductoCard producto={productoMock} onAgregar={vi.fn()} />);

    expect(screen.getByText('Guitarra Acústica Folk')).toBeInTheDocument();
    expect(screen.getByText(/Yamaha • F310/i)).toBeInTheDocument();
    expect(screen.getByText('$129.990')).toBeInTheDocument();
    expect(screen.getByText('Stock: 5')).toBeInTheDocument();
  });

  it('7. ProductoCard debe mostrar badge Agotado y deshabilitar boton cuando el stock es 0', () => {
    const productoAgotado = { ...productoMock, stock: 0 };
    renderConRouter(<ProductoCard producto={productoAgotado} onAgregar={vi.fn()} />);

    expect(screen.getByText('Agotado')).toBeInTheDocument();
    const boton = screen.getByRole('button', { name: /agregar/i });
    expect(boton).toBeDisabled();
  });

  it('8. ProductoCard debe ejecutar la funcion mock onAgregar al hacer clic en el boton', () => {
    const mockOnAgregar = vi.fn();
    renderConRouter(<ProductoCard producto={productoMock} onAgregar={mockOnAgregar} />);

    const boton = screen.getByRole('button', { name: /agregar/i });
    fireEvent.click(boton);

    expect(mockOnAgregar).toHaveBeenCalledTimes(1);
    expect(mockOnAgregar).toHaveBeenCalledWith(productoMock);
  });

  it('9. FiltroCategorias debe renderizar categorias y ejecutar la funcion mock al seleccionar', () => {
    const categorias = ['Guitarras Acústicas', 'Bajos Eléctricos', 'Pedales de Efectos'];
    const mockSeleccionar = vi.fn();

    render(
      <FiltroCategorias
        categorias={categorias}
        categoriaSeleccionada="Todas"
        onSeleccionarCategoria={mockSeleccionar}
      />
    );

    expect(screen.getByText('Guitarras Acústicas')).toBeInTheDocument();
    expect(screen.getByText('Bajos Eléctricos')).toBeInTheDocument();

    const botonBajo = screen.getByText('Bajos Eléctricos');
    fireEvent.click(botonBajo);

    expect(mockSeleccionar).toHaveBeenCalledWith('Bajos Eléctricos');
  });

  it('10. Footer debe renderizar información de contacto, despacho y navegación de la tienda', () => {
    renderConRouter(<Footer />);

    expect(screen.getByText('Calle Valparaíso #580, Viña del Mar')).toBeInTheDocument();
    expect(screen.getByText(/contacto@sonidovivo.cl/i)).toBeInTheDocument();
    expect(screen.getByText(/Compras y Despacho/i)).toBeInTheDocument();
    expect(screen.getByText(/Catálogo Completo/i)).toBeInTheDocument();
  });
});

// Cobertura de renderizado de componentes y simulacion de eventos con mocks
