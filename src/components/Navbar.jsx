import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { resumen } = useCart();
  const { usuario, usuariosSistema, cambiarUsuario } = useAuth();
  const [menuAbierto, setMenuAbierto] = useState(false);

  const handleToggle = () => {
    setMenuAbierto(!menuAbierto);
  };

  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  const handleCambiarUsuario = (e) => {
    cambiarUsuario(e.target.value);
  };

  return (
    <header className="w-100">
      <div className="bg-dark text-white py-1 small border-bottom border-secondary">
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-1 text-center text-md-start">
          <div className="text-truncate w-100 w-md-auto" style={{ fontSize: '0.78rem' }}>
            <i className="bi bi-geo-alt-fill text-danger me-1"></i>
            <span>Viña del Mar: Calle Valparaíso #580 | Fono: +56 32 234 5678</span>
          </div>
          <div className="d-flex align-items-center justify-content-center gap-2 flex-wrap w-100 w-md-auto mt-1 mt-md-0">
            <span className="text-secondary" style={{ fontSize: '0.75rem' }}>Usuario:</span>
            <select 
              className="form-select form-select-sm py-0 px-2 bg-secondary text-white border-0" 
              value={usuario ? usuario.id : ''}
              onChange={handleCambiarUsuario}
              style={{ maxWidth: '190px', fontSize: '0.75rem' }}
              aria-label="Simular rol de usuario"
            >
              {usuariosSistema.map(u => (
                <option key={u.id} value={u.id}>
                  {u.nombre} ({u.rol})
                </option>
              ))}
            </select>
            <span className="badge bg-danger" style={{ fontSize: '0.72rem' }}>
              {usuario?.rol || 'Cliente'}
            </span>
          </div>
        </div>
      </div>

      <nav className="navbar navbar-expand-lg navbar-dark bg-sonido-vivo shadow-sm sticky-top">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center gap-2 fw-bold" to="/" onClick={cerrarMenu}>
            <i className="bi bi-music-note-beamed text-danger fs-3"></i>
            <div>
              <span className="text-white">SONIDO</span>
              <span className="text-danger ms-1">VIVO</span>
              <div className="small text-secondary fw-normal" style={{ fontSize: '0.68rem', marginTop: '-4px' }}>
                INSTRUMENTOS MUSICALES
              </div>
            </div>
          </Link>

          <button 
            className="navbar-toggler" 
            type="button" 
            onClick={handleToggle}
            aria-expanded={menuAbierto}
            aria-label="Abrir navegación"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${menuAbierto ? 'show' : ''}`} id="menuPrincipal">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/" onClick={cerrarMenu}>
                  Inicio
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/catalogo" onClick={cerrarMenu}>
                  Catálogo
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/ofertas" onClick={cerrarMenu}>
                  Ofertas
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/mapa" onClick={cerrarMenu}>
                  Tienda & Retiro
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/mis-compras" onClick={cerrarMenu}>
                  <i className="bi bi-bag-check me-1"></i>
                  Mis Compras
                </NavLink>
              </li>
              {(usuario?.rol === 'Administrador' || usuario?.rol === 'Vendedor') && (
                <li className="nav-item">
                  <NavLink className="nav-link text-warning fw-semibold" to="/admin" onClick={cerrarMenu}>
                    <i className="bi bi-speedometer2 me-1"></i>
                    Panel {usuario?.rol}
                  </NavLink>
                </li>
              )}
            </ul>

            <div className="d-flex align-items-center gap-3">
              <Link to="/carrito" className="btn btn-outline-light position-relative" onClick={cerrarMenu}>
                <i className="bi bi-cart3 fs-5"></i>
                {resumen.totalArticulos > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {resumen.totalArticulos}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

// Barra de navegacion responsiva con contador reactivo de carrito
