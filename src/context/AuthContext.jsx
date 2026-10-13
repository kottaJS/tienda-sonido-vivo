import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const USUARIOS_INICIALES = [
  { id: 1, nombre: 'Maximiliano Dinamarca', email: 'maximiliano.dueño@sonidovivo.cl', rol: 'Administrador', rut: '19.876.543-0', ciudad: 'Viña del Mar' },
  { id: 2, nombre: 'Patricio Muñoz', email: 'patricio.ventas@sonidovivo.cl', rol: 'Vendedor', rut: '18.765.432-1', ciudad: 'Viña del Mar' },
  { id: 3, nombre: 'Cliente Particular', email: 'cliente@gmail.com', rol: 'Cliente', rut: '11.111.111-1', ciudad: 'Valparaíso' }
];

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const guardado = localStorage.getItem('sv_usuario_v2');
    if (guardado) {
      try {
        return JSON.parse(guardado);
      } catch (e) {
        return USUARIOS_INICIALES[0];
      }
    }
    return USUARIOS_INICIALES[0];
  });

  const [usuariosSistema, setUsuariosSistema] = useState(() => {
    const guardado = localStorage.getItem('sv_usuarios_sistema_v2');
    if (guardado) {
      try {
        return JSON.parse(guardado);
      } catch (e) {
        return USUARIOS_INICIALES;
      }
    }
    return USUARIOS_INICIALES;
  });

  useEffect(() => {
    localStorage.setItem('sv_usuario_v2', JSON.stringify(usuario));
  }, [usuario]);

  useEffect(() => {
    localStorage.setItem('sv_usuarios_sistema_v2', JSON.stringify(usuariosSistema));
  }, [usuariosSistema]);

  const cambiarUsuario = (id) => {
    const encontrado = usuariosSistema.find(u => u.id === Number(id));
    if (encontrado) {
      setUsuario(encontrado);
    }
  };

  const cambiarRolActual = (nuevoRol) => {
    setUsuario(prev => ({ ...prev, rol: nuevoRol }));
  };

  const agregarUsuario = (nuevo) => {
    const nuevoObj = {
      id: Date.now(),
      ...nuevo
    };
    setUsuariosSistema(prev => [...prev, nuevoObj]);
  };

  const actualizarUsuario = (id, datosActualizados) => {
    setUsuariosSistema(prev => prev.map(u => u.id === id ? { ...u, ...datosActualizados } : u));
    if (usuario && usuario.id === id) {
      setUsuario(prev => ({ ...prev, ...datosActualizados }));
    }
  };

  const eliminarUsuario = (id) => {
    setUsuariosSistema(prev => prev.filter(u => u.id !== id));
  };

  return (
    <AuthContext.Provider value={{
      usuario,
      usuariosSistema,
      cambiarUsuario,
      cambiarRolActual,
      agregarUsuario,
      actualizarUsuario,
      eliminarUsuario
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}
