import React, { createContext, useContext, useState, useEffect } from 'react';
import { productosIniciales } from '../data/productos';

const InventoryContext = createContext();

const PEDIDOS_DEMO = [
  {
    id: 'SV-1001',
    fecha: '14-10-2026',
    cliente: 'Maximiliano Dinamarca',
    rut: '19.876.543-2',
    email: 'maxi.cliente@gmail.com',
    telefono: '+56 9 8765 4321',
    tipoEntrega: 'domicilio',
    direccion: 'Av. Libertad 450, Viña del Mar',
    metodoPago: 'Webpay / Débito',
    estado: 'En preparación',
    total: 134980,
    items: [
      { id: 'GA001', nombre: 'Guitarra Acústica Folk Yamaha F310', cantidad: 1, precio: 129990 }
    ]
  },
  {
    id: 'SV-1002',
    fecha: '13-10-2026',
    cliente: 'Patricio Muñoz',
    rut: '18.765.432-1',
    email: 'pato.rock@gmail.com',
    telefono: '+56 9 9123 4567',
    tipoEntrega: 'retiro',
    direccion: 'Retiro en Tienda Viña del Mar',
    metodoPago: 'Transferencia Bancaria',
    estado: 'Despachado',
    total: 159980,
    items: [
      { id: 'PE001', nombre: 'Pedal Distorsión Boss DS-1', cantidad: 2, precio: 79990 }
    ]
  }
];

export function InventoryProvider({ children }) {
  const [productos, setProductos] = useState(() => {
    const guardado = localStorage.getItem('sv_productos');
    if (guardado) {
      try {
        return JSON.parse(guardado);
      } catch (e) {
        return productosIniciales;
      }
    }
    return productosIniciales;
  });

  const [pedidos, setPedidos] = useState(() => {
    const guardado = localStorage.getItem('sv_pedidos');
    if (guardado) {
      try {
        return JSON.parse(guardado);
      } catch (e) {
        return PEDIDOS_DEMO;
      }
    }
    return PEDIDOS_DEMO;
  });

  useEffect(() => {
    localStorage.setItem('sv_productos', JSON.stringify(productos));
  }, [productos]);

  useEffect(() => {
    localStorage.setItem('sv_pedidos', JSON.stringify(pedidos));
  }, [pedidos]);

  const registrarPedido = (datosCliente, items, tipoEnvio, metodoPago, total) => {
    const nuevoCodigo = 'SV-' + Math.floor(1000 + Math.random() * 9000);
    const fechaActual = new Date().toLocaleDateString('es-CL');

    const nuevoPedido = {
      id: nuevoCodigo,
      fecha: fechaActual,
      cliente: `${datosCliente.nombre} ${datosCliente.apellido}`,
      rut: datosCliente.rut,
      email: datosCliente.email,
      telefono: datosCliente.telefono,
      tipoEntrega: tipoEnvio,
      direccion: tipoEnvio === 'domicilio' 
        ? `${datosCliente.direccion}, ${datosCliente.ciudad}`
        : 'Retiro en Tienda Central Viña del Mar (Calle Valparaíso #580)',
      metodoPago: metodoPago,
      estado: 'En preparación',
      total: total,
      items: items.map(i => ({
        id: i.id,
        nombre: `${i.nombre} ${i.marca} ${i.modelo}`,
        cantidad: i.cantidad,
        precio: i.precio
      }))
    };

    setPedidos(prev => [nuevoPedido, ...prev]);

    setProductos(prevProductos => {
      return prevProductos.map(prod => {
        const itemComprado = items.find(i => i.id === prod.id);
        if (itemComprado) {
          const nuevoStock = Math.max(0, prod.stock - itemComprado.cantidad);
          return { ...prod, stock: nuevoStock };
        }
        return prod;
      });
    });

    return nuevoPedido;
  };

  const actualizarEstadoPedido = (pedidoId, nuevoEstado) => {
    setPedidos(prev => prev.map(p => 
      p.id === pedidoId ? { ...p, estado: nuevoEstado } : p
    ));
  };

  const actualizarStockProducto = (productoId, nuevoStock) => {
    setProductos(prev => prev.map(p => 
      p.id === productoId ? { ...p, stock: Math.max(0, parseInt(nuevoStock, 10) || 0) } : p
    ));
  };

  const agregarProducto = (nuevoProd) => {
    const idGenerado = nuevoProd.id || 'PROD-' + Date.now().toString().slice(-4);
    setProductos(prev => [{ ...nuevoProd, id: idGenerado }, ...prev]);
  };

  const eliminarProducto = (productoId) => {
    setProductos(prev => prev.filter(p => p.id !== productoId));
  };

  const resetearCatalogo = () => {
    setProductos(productosIniciales);
    localStorage.removeItem('sv_productos');
  };

  return (
    <InventoryContext.Provider value={{
      productos,
      pedidos,
      registrarPedido,
      actualizarEstadoPedido,
      actualizarStockProducto,
      agregarProducto,
      eliminarProducto,
      resetearCatalogo
    }}>
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory debe ser usado dentro de un InventoryProvider');
  }
  return context;
}
