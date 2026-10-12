import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { InventoryProvider } from './context/InventoryContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BotonWhatsapp from './components/BotonWhatsapp';

import HomePage from './pages/HomePage';
import CatalogoPage from './pages/CatalogoPage';
import OfertasPage from './pages/OfertasPage';
import ProductoDetallePage from './pages/ProductoDetallePage';
import CarritoPage from './pages/CarritoPage';
import CheckoutPage from './pages/CheckoutPage';
import CompraExitosaPage from './pages/CompraExitosaPage';
import CompraFallidaPage from './pages/CompraFallidaPage';
import TiendaMapaPage from './pages/TiendaMapaPage';
import MisPedidosPage from './pages/MisPedidosPage';
import AdminPage from './pages/AdminPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <InventoryProvider>
          <CartProvider>
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/catalogo" element={<CatalogoPage />} />
                <Route path="/ofertas" element={<OfertasPage />} />
                <Route path="/producto/:id" element={<ProductoDetallePage />} />
                <Route path="/carrito" element={<CarritoPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/compra-exitosa" element={<CompraExitosaPage />} />
                <Route path="/compra-fallida" element={<CompraFallidaPage />} />
                <Route path="/mis-compras" element={<MisPedidosPage />} />
                <Route path="/mapa" element={<TiendaMapaPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <BotonWhatsapp />
            <Footer />
          </CartProvider>
        </InventoryProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
