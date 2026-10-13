import React, { createContext, useContext, useState, useEffect } from 'react';
import { calcularResumen } from '../utils/formatters';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem('sv_carrito');
    if (guardado) {
      try {
        return JSON.parse(guardado);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [tipoEnvio, setTipoEnvio] = useState('retiro');

  useEffect(() => {
    localStorage.setItem('sv_carrito', JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto, cantidad = 1) => {
    setCarrito(prev => {
      const existe = prev.find(item => item.id === producto.id);
      if (existe) {
        const nuevaCantidad = existe.cantidad + cantidad;
        if (nuevaCantidad > producto.stock) {
          alert('No hay suficiente stock disponible de este producto.');
          return prev;
        }
        return prev.map(item => 
          item.id === producto.id 
            ? { ...item, cantidad: nuevaCantidad } 
            : item
        );
      }
      if (cantidad > producto.stock) {
        alert('No hay suficiente stock disponible de este producto.');
        return prev;
      }
      return [...prev, { ...producto, cantidad }];
    });
  };

  const quitarDelCarrito = (productoId) => {
    setCarrito(prev => prev.filter(item => item.id !== productoId));
  };

  const actualizarCantidad = (productoId, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      quitarDelCarrito(productoId);
      return;
    }
    setCarrito(prev => prev.map(item => {
      if (item.id === productoId) {
        if (nuevaCantidad > item.stock) {
          alert('Stock máximo disponible: ' + item.stock);
          return item;
        }
        return { ...item, cantidad: nuevaCantidad };
      }
      return item;
    }));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const resumen = calcularResumen(carrito, tipoEnvio);

  return (
    <CartContext.Provider value={{
      carrito,
      tipoEnvio,
      setTipoEnvio,
      agregarAlCarrito,
      quitarDelCarrito,
      actualizarCantidad,
      vaciarCarrito,
      resumen
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
}
