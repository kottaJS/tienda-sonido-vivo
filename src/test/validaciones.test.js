import { describe, it, expect } from 'vitest';
import { formatPrecio, validarRut, validarEmail, calcularResumen } from '../utils/formatters';

describe('Pruebas unitarias de logica y validaciones', () => {
  it('1. formatPrecio debe retornar el valor formateado en pesos chilenos', () => {
    const resultado = formatPrecio(129990);
    expect(resultado).toBe('$129.990');
  });

  it('2. validarRut debe aceptar RUTs validos chilenos con numero y con K', () => {
    expect(validarRut('11.111.111-1')).toBe(true);
    expect(validarRut('12.345.678-5')).toBe(true);
    expect(validarRut('10.000.013-K')).toBe(true);
  });

  it('3. validarRut debe rechazar RUTs con digito verificador incorrecto o vacios', () => {
    expect(validarRut('19.876.543-9')).toBe(false);
    expect(validarRut('')).toBe(false);
    expect(validarRut('123')).toBe(false);
    expect(validarRut(null)).toBe(false);
  });

  it('4. validarEmail debe verificar correctamente el formato de correo', () => {
    expect(validarEmail('maxi@sonidovivo.cl')).toBe(true);
    expect(validarEmail('pato.musico@gmail.com')).toBe(true);
    expect(validarEmail('correo-invalido')).toBe(false);
    expect(validarEmail('correo@dominio')).toBe(false);
    expect(validarEmail('')).toBe(false);
  });

  it('5. calcularResumen debe calcular subtotal y costo segun tipo de entrega', () => {
    const items = [
      { id: 'GA001', precio: 100000, cantidad: 2 },
      { id: 'AC001', precio: 10000, cantidad: 1 }
    ];

    const retiro = calcularResumen(items, 'retiro');
    expect(retiro.subtotal).toBe(210000);
    expect(retiro.costoEnvio).toBe(0);
    expect(retiro.total).toBe(210000);
    expect(retiro.totalArticulos).toBe(3);

    const domicilio = calcularResumen(items, 'domicilio');
    expect(domicilio.subtotal).toBe(210000);
    expect(domicilio.costoEnvio).toBe(4990);
    expect(domicilio.total).toBe(214990);
  });
});

// Suite de pruebas unitarias para algoritmo Modulo 11 de RUT
