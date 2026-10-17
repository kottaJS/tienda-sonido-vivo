# Especificación de Requerimientos de Software (ERS)
## Proyecto: Tienda Online Sonido Vivo (Viña del Mar)
### Asignatura: DSY1104 - Desarrollo FullStack II
### Sección: DSY1104-006D
### Evaluación Parcial 2 (EP2) · Versión 2.0

---

### Integrantes del Equipo
1. **Maximiliano Dinamarca**
2. **Patricio Muñoz**

**Docente Guía:** Profesor DSY1104  
**Institución:** Duoc UC  
**Fecha:** Octubre 2026  

---

## 1. Introducción y Contexto del Negocio

### 1.1 Propósito
El presente documento describe la Especificación de Requerimientos de Software (ERS) en su **Versión 2.0**, correspondiente a la entrega de la Evaluación Parcial 2 (EP2). Establece el alcance funcional, no funcional y la arquitectura frontend implementada para modernizar los canales de venta y gestión de la tienda **Sonido Vivo**.

### 1.2 Alcance del Sistema
**Sonido Vivo** es una tienda especializada en instrumentos musicales, equipos de sonido y accesorios, ubicada en Calle Valparaíso #580, Viña del Mar, Región de Valparaíso, con 11 años de trayectoria. Cuenta con un catálogo oficial de más de 340 referencias distintas (guitarras acústicas/eléctricas, bajos, baterías, teclados, amplificadores, micrófonos, pedales, cuerdas y audio de estudio).

Históricamente la tienda operó de forma presencial. Con el auge de consultas por WhatsApp e Instagram, el negocio colapsó operativamente: 3 de cada 10 clientes remotos quedaban sin respuesta, no existía sincronización de inventario en tiempo real (llevado en cuadernos y planillas Excel manuales), y dos vendedores podían vender el mismo producto simultáneamente.

La solución de frontend en **React + Vite** desarrollada en esta etapa proporciona:
* Catálogo digital público con filtros por categoría y búsqueda en tiempo real.
* Control de inventario en tiempo real con alertas de stock crítico y agotado.
* Carrito de compras y checkout formal con validación estricta de RUT chileno, email y dirección.
* Opciones de retiro gratuito en tienda física de Viña del Mar o despacho a domicilio vía Starken / Chilexpress.
* Integración de mapa interactivo con **Leaflet** para geolocalizar la tienda y los puntos de retiro.
* Panel de administración interno con control de acceso basado en roles (**RBAC**) para Administrador y Vendedor.

---

## 2. Actores y Roles del Sistema (RBAC)

| Rol | Descripción | Permisos y Accesos |
| :--- | :--- | :--- |
| **Cliente** | Músico o comprador particular presencial o remoto. | Navegar catálogo, filtrar por categoría/precio, buscar productos, añadir al carrito, realizar checkout, seleccionar despacho o retiro, y recibir comprobante con código de seguimiento. |
| **Vendedor / Empleado** | Personal de ventas y mesón en Viña del Mar. | Acceso al panel interno, visualización de pedidos remotos centralizados, actualización del estado de pedidos (*En preparación, Despachado, Entregado*), ajuste y monitoreo de stock. |
| **Administrador** | Dueño de la tienda (Don Roberto). | Control total del sistema. Gestión de pedidos, control total de inventario y precios, gestión de usuarios (creación, edición de rol y eliminación), visualización de métricas y restablecimiento de catálogo. |

---

## 3. Requerimientos Funcionales (RF)

### Módulo Catálogo y Navegación
* **RF01 - Visualización del Catálogo:** El sistema debe listar los productos disponibles organizados por categoría, mostrando nombre, marca, modelo, precio en pesos chilenos (CLP) y disponibilidad de stock.
* **RF02 - Búsqueda de Productos:** El usuario puede buscar por coincidencia de texto en nombre, marca, modelo, código o descripción.
* **RF03 - Filtrado por Categorías:** El sistema permite filtrar dinámicamente por las 10 categorías oficiales (*Guitarras Acústicas, Guitarras Eléctricas, Bajos Eléctricos, Baterías, Teclados y Pianos, Amplificadores, Micrófonos, Pedales de Efectos, Accesorios, Estudio y Grabación*).
* **RF04 - Detalle de Producto:** Vista dedicada con especificaciones técnicas, selector de cantidad limitado al stock disponible y botón de compra.
* **RF05 - Sección de Ofertas:** Vista exclusiva con productos seleccionados con promociones y descuentos especiales.

### Módulo Carrito y Checkout
* **RF06 - Gestión del Carrito:** El cliente puede agregar productos, aumentar o disminuir cantidades (sin exceder el stock real) y eliminar artículos.
* **RF07 - Selección de Modalidad de Entrega:** Permite elegir entre *Retiro en Tienda Física en Viña del Mar* ($0) o *Despacho a Domicilio* ($4.990).
* **RF08 - Formulario de Checkout:** Captura obligatoria de Nombre, Apellido, RUT, Teléfono y Correo Electrónico. Para despacho a domicilio exige Calle, Número y Ciudad.
* **RF09 - Validación de Datos:** Validación matemática del dígito verificador del RUT chileno (módulo 11), formato de correo electrónico y campos vacíos con feedback visual instantáneo.
* **RF10 - Generación de Pedido Formal:** Al confirmar la compra, se genera un código de orden único (ej. `SV-1045`), se descuenta el stock de los productos adquiridos en tiempo real y se emite la pantalla de confirmación.

### Módulo Mapa y Geolocalización
* **RF11 - Mapa Interactivo de Puntos de Retiro:** Visualización en mapa interactivo (Leaflet) con marcadores de la Casa Matriz (Calle Valparaíso #580, Viña del Mar) y los puntos asociados en Valparaíso y Quilpué, incluyendo dirección, horarios y teléfonos.

### Módulo de Administración y Ventas (RBAC)
* **RF12 - Control de Acceso por Roles:** Las rutas y vistas de gestión interna validan el rol del usuario autenticado; usuarios con rol *Cliente* tienen acceso denegado.
* **RF13 - Centralización de Pedidos:** Los vendedores y el administrador pueden ver el listado de órdenes remotas y cambiar su estado operativo (*En preparación, Despachado, Entregado, Cancelado*).
* **RF14 - Actualización de Stock en Tiempo Real:** El personal puede consultar y modificar las existencias físicas de cualquier producto desde la interfaz.
* **RF15 - Gestión de Usuarios (Admin):** El administrador puede crear nuevos empleados/vendedores, asignar roles y remover usuarios del sistema.

---

## 4. Requerimientos No Funcionales (RNF)

* **RNF01 - Rendimiento y Tiempos de Carga:** La SPA en React + Vite debe compilar en menos de 3 segundos y responder a las interacciones de filtrado y búsqueda de manera inmediata (< 100 ms).
* **RNF02 - Diseño Responsivo:** La interfaz se adapta fluidamente a teléfonos móviles (≥ 360 px con menú hamburguesa colapsable), tabletas (≥ 768 px) y computadores de escritorio (≥ 1280 px) utilizando Bootstrap 5.
* **RNF03 - Persistencia de Datos:** El estado de inventario, pedidos, usuarios y carrito se sincroniza de forma transparente en `localStorage`, permitiendo mantener la sesión y los cambios tras recargar el navegador.
* **RNF04 - Usabilidad y Claridad:** Los usuarios de la tienda (vendedores sin experiencia en ERPs avanzados) cuentan con interfaces sencillas, etiquetas en español y botones con iconografía clara de Bootstrap Icons.
* **RNF05 - Cobertura de Pruebas Unitarias:** El frontend cuenta con una suite automatizada de 10 pruebas unitarias con Vitest y React Testing Library que validan lógica de negocio, renderizado, mocks y eventos.

---

## 5. Arquitectura del Frontend

```
tienda-sonido-vivo/
├── docs/
│   ├── ERS_V2_SonidoVivo.md          # Especificación de Requerimientos V2
│   ├── COBERTURA_TESTING.md          # Informe técnico de testing y métricas
│   └── GUIA_DEFENSA_Y_VIDEO.md       # Libreto del video y pauta de defensa
├── src/
│   ├── components/                   # Componentes reutilizables
│   │   ├── Navbar.jsx                # Barra de navegación responsive con RBAC
│   │   ├── Footer.jsx                # Pie de página y datos académicos
│   │   ├── ProductoCard.jsx          # Tarjeta de producto con stock y agregar
│   │   ├── FiltroCategorias.jsx      # Selector por categorías de catálogo
│   │   └── MapaTienda.jsx            # Mapa interactivo Leaflet
│   ├── context/                      # Estado global con React Context API
│   │   ├── AuthContext.jsx           # Manejo de usuarios y roles RBAC
│   │   ├── CartContext.jsx           # Manejo del carrito y cálculos
│   │   └── InventoryContext.jsx      # Catálogo, pedidos y persistencia local
│   ├── data/
│   │   └── productos.js              # 50 referencias oficiales del Excel de Forma B
│   ├── pages/                        # Vistas de la aplicación
│   │   ├── HomePage.jsx              # Portada con destacados y beneficios
│   │   ├── CatalogoPage.jsx          # Catálogo con búsqueda, filtros y orden
│   │   ├── OfertasPage.jsx           # Productos en oferta
│   │   ├── ProductoDetallePage.jsx   # Ficha técnica individual
│   │   ├── CarritoPage.jsx           # Detalle de compra y selección de envío
│   │   ├── CheckoutPage.jsx          # Formulario con validación estricta
│   │   ├── CompraExitosaPage.jsx     # Voucher de orden con código de seguimiento
│   │   ├── TiendaMapaPage.jsx        # Mapa de ubicación en Viña del Mar
│   │   └── AdminPage.jsx             # Panel de gestión de pedidos, stock y usuarios
│   ├── test/                         # Suite de pruebas unitarias
│   │   ├── setup.js                  # Configuración de Vitest + jest-dom
│   │   ├── validaciones.test.js      # Pruebas 1 a 5 (Lógica y validaciones)
│   │   └── componentes.test.jsx      # Pruebas 6 a 10 (RTL, eventos y mocks)
│   ├── utils/
│   │   └── formatters.js             # Formato CLP, validador de RUT y Email
│   ├── App.jsx                       # Enrutador principal (React Router DOM v6)
│   ├── index.css                     # Estilos base y tokens de Bootstrap
│   └── main.jsx                      # Entrada React
├── index.html                        # Plantilla HTML5 con viewport responsive
├── package.json                      # Dependencias y scripts
├── vite.config.js                    # Configuración de Vite y Vitest
└── README.md                         # Documentación de instalación y uso
```

---

## 6. Conclusiones y Próximos Pasos (Hacia EP3)
En esta entrega (EP2) se logró consolidar una SPA completa, desacoplada y validada mediante testing automatizado. Para la Evaluación Parcial 3 (EP3), se integrará la capa de microservicios con **Spring Boot (Java)** y la base de datos relacional **MySQL** normalizada en 3FN, sustituyendo los servicios de persistencia local por peticiones HTTP asíncronas REST a través de Axios o Fetch API.
