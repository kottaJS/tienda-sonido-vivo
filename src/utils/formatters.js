export function formatPrecio(valor) {
  if (typeof valor !== 'number') {
    valor = Number(valor) || 0;
  }
  return '$' + valor.toLocaleString('es-CL');
}

export function validarRut(rut) {
  if (!rut || typeof rut !== 'string') return false;
  
  const limpio = rut.replace(/[^0-9kK]/g, '').toUpperCase();
  if (limpio.length < 8 || limpio.length > 9) return false;

  const cuerpo = limpio.slice(0, -1);
  const dv = limpio.slice(-1);

  let suma = 0;
  let multiplo = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i], 10) * multiplo;
    multiplo = multiplo === 7 ? 2 : multiplo + 1;
  }

  const resto = suma % 11;
  const dvEsperado = 11 - resto;
  
  let dvCalculado = '';
  if (dvEsperado === 11) {
    dvCalculado = '0';
  } else if (dvEsperado === 10) {
    dvCalculado = 'K';
  } else {
    dvCalculado = dvEsperado.toString();
  }

  return dv === dvCalculado;
}

export function validarEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.trim());
}

export function calcularResumen(carrito, tipoEnvio = 'retiro') {
  const subtotal = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  const costoEnvio = tipoEnvio === 'domicilio' ? 4990 : 0;
  const total = subtotal + costoEnvio;

  return {
    subtotal,
    costoEnvio,
    total,
    totalArticulos: carrito.reduce((acc, item) => acc + item.cantidad, 0)
  };
}
