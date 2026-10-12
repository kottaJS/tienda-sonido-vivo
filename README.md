# Tienda Sonido Vivo

Proyecto de frontend en React + Vite para la tienda de instrumentos musicales Sonido Vivo (Viña del Mar). Evaluación Parcial 2 - DSY1104 Desarrollo FullStack II (Sección DSY1104-006D).

## Integrantes
- Maximiliano Dinamarca
- Patricio Muñoz

## Video de Presentación
- Enlace al video de defensa (Google Drive): [PEGAR_AQUI_ENLACE_DE_GOOGLE_DRIVE]

## Instrucciones para ejecutar
1. Instalar dependencias:
```bash
npm install
```

2. Iniciar servidor local:
```bash
npm run dev
```
La aplicación quedará disponible en `http://localhost:8080/`.

## Pruebas unitarias
Para correr la suite de 10 pruebas con Vitest:
```bash
npm test
```

Para ver la cobertura:
```bash
npm run test:coverage
```

## Estructura del proyecto
- `src/components/`: Componentes reutilizables (Navbar, Footer, Tarjeta de producto, Filtros, Mapa Leaflet).
- `src/context/`: Manejo de estado global con Context API (Auth/Roles, Inventario con persistencia en localStorage y Carrito de compras).
- `src/pages/`: Vistas de la aplicación (Catálogo, Detalle, Carrito, Checkout con RUT, Compra Exitosa, Pago Fallido, Historial y Panel Admin).
- `src/test/`: 10 pruebas unitarias de lógica y componentes con Vitest y Testing Library.
- `docs/`: Documentación oficial del encargo (ERS V2, informe de cobertura de testing y manual de estudio).

<!-- Entrega EP2 completada para evaluacion docente -->
