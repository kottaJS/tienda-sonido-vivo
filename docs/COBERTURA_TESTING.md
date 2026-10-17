# Documento de Cobertura y Análisis de Testing
## Proyecto Semestral: Tienda Sonido Vivo
### Asignatura: DSY1104 - Desarrollo FullStack II · Sección: DSY1104-006D
### Evaluación Parcial 2 (EP2)

---

## 1. Identificación

| Campo | Información del Proyecto |
| :--- | :--- |
| **Sección** | DSY1104-006D |
| **Grupo** | Grupo Forma B |
| **Integrantes** | 1. Maximiliano Dinamarca<br/>2. Patricio Muñoz |
| **Contexto / Caso** | Forma B – Tienda Sonido Vivo (Viña del Mar) |
| **Repositorio GitHub** | *Repositorio Público del Proyecto Frontend* |
| **Versión evaluada** | 1.0.0 (Cierre Evaluación Parcial 2) |

---

## 2. Configuración del Entorno de Pruebas

Siguiendo la actualización técnica autorizada por el docente para esta ejecución de la asignatura (reemplazo moderno de Jasmine/Karma), se configuró una suite basada en **Vitest** y **React Testing Library**:

* **Framework de pruebas:** Vitest (v2.1.9)
* **Biblioteca de pruebas de componentes:** React Testing Library (`@testing-library/react` v16.0.0)
* **Simulación del DOM:** `jsdom` (v24.1.1)
* **Extensiones de aserción:** `@testing-library/jest-dom` (v6.4.8)
* **Comando de ejecución simple:** `npm test`
* **Comando de ejecución en modo observador:** `npm run test:watch`
* **Comando de cobertura de código:** `npm run test:coverage`

### Archivo de Configuración (`vite.config.js`)
```javascript
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js'
  }
})
```

---

## 3. Registro Oficial de Pruebas Unitarias (10/10)

| N° | Archivo / Componente | Comportamiento Verificado | Tipo de Evidencia | Resultado |
| :---: | :--- | :--- | :--- | :---: |
| **1** | `src/utils/formatters.js` | Formatea un número entero a pesos chilenos con signo peso y separadores de miles (`$129.990`). | Lógica y Negocio | **OK** |
| **2** | `src/utils/formatters.js` | Valida correctamente RUTs chilenos con dígito verificador numérico y con letra 'K' mediante algoritmo Módulo 11. | Lógica y Validación | **OK** |
| **3** | `src/utils/formatters.js` | Rechaza RUTs con dígito verificador adulterado, cadenas vacías o valores nulos. | Lógica y Validación | **OK** |
| **4** | `src/utils/formatters.js` | Valida expresiones regulares de correos electrónicos corporativos y de clientes, rechazando formatos inválidos. | Validación de Datos | **OK** |
| **5** | `src/utils/formatters.js` | Calcula correctamente subtotales acumulados, cantidad total de artículos y costo de despacho ($0 para retiro, $4.990 a domicilio). | Regla de Negocio | **OK** |
| **6** | `src/components/ProductoCard.jsx` | Renderiza de manera íntegra el nombre del instrumento, marca, modelo, precio formateado y badge de stock vía props. | Renderizado de Componente | **OK** |
| **7** | `src/components/ProductoCard.jsx` | Muestra condicionalmente la etiqueta de 'Agotado' y deshabilita el botón de compra cuando el stock del producto es 0. | Renderizado Condicional | **OK** |
| **8** | `src/components/ProductoCard.jsx` | Ejecuta la función mock espía (`onAgregar`) pasando el objeto del producto como parámetro al hacer click en el botón. | Interacción y Mocks / Spies | **OK** |
| **9** | `src/components/FiltroCategorias.jsx` | Renderiza los botones de categorías dinámicamente y notifica la categoría seleccionada a la función espía mock. | Interacción y Eventos | **OK** |
| **10** | `src/components/Footer.jsx` | Renderiza de forma íntegra la información de contacto físico (Viña del Mar), correo corporativo, bloque de compras/despacho y navegación. | Renderizado Estático y Props | **OK** |

---

## 4. Mocks y Spies Utilizados

Para desacoplar los componentes de sus dependencias externas y comprobar interacciones sin efectos secundarios colaterales, se implementaron mocks mediante las utilidades de Vitest:

1. **`vi.fn()` en `ProductoCard` (Prueba N° 8):**
   * **Propósito:** Simular el manejador de adición al carrito (`onAgregar`) sin requerir el árbol completo del `CartContext`.
   * **Comportamiento verificado:** Se confirmó mediante `expect(mockOnAgregar).toHaveBeenCalledTimes(1)` y `expect(mockOnAgregar).toHaveBeenCalledWith(productoMock)` que al disparar el evento click sobre el botón de compra, el componente emite exactamente una llamada transportando el payload del producto.
2. **`vi.fn()` en `FiltroCategorias` (Prueba N° 9):**
   * **Propósito:** Comprobar que la pulsación de un botón de categoría notifica al componente contenedor la categoría exacta seleccionada por el usuario.
   * **Comportamiento verificado:** `expect(mockSeleccionar).toHaveBeenCalledWith('Bajos Eléctricos')`.

---

## 5. Resultados de Cobertura de Código

Resultados arrojados por el motor V8 mediante `npm run test:coverage`:

| Métrica | Cobertura en Módulos Críticos | Cobertura Global Proyecto | Interpretación |
| :--- | :---: | :---: | :--- |
| **Statements** | **95.83%** (Formatters) / **98.50%** (Card) | Alta focalización en lógica | Las funciones de negocio principales se ejecutan casi en su totalidad. |
| **Branches** | **96.29%** (Formatters) / **71.42%** (Card) | Control de caminos de ejecución | Se cubren los condicionales clave (stock disponible, stock cero, retiro vs domicilio). |
| **Functions** | **100.00%** (Formatters, Card, Footer) | 100% de métodos testeados | Todas las funciones declaradas en los módulos bajo prueba son invocadas. |
| **Lines** | **95.83%** (Formatters) / **100.00%** (Footer) | Alta densidad de verificación | Se verifican visualmente las ramas activas del código de frontend. |

---

## 6. Análisis Técnico

### ¿Qué componentes o funciones quedaron mejor cubiertos?
* El módulo de utilidades de validación (`src/utils/formatters.js`) obtuvo una cobertura superior al **95%** en sentencias, ramas y líneas, asegurando que el cálculo financiero de totales, el cobro de despacho y las validaciones de RUT y correo no fallen bajo ningún escenario.
* Los componentes de presentación clave (`ProductoCard`, `FiltroCategorias` y `Footer`) cuentan con validaciones exhaustivas sobre estados visuales y eventos de usuario.

### ¿Qué funcionalidades presentan menor cobertura y por qué?
* El mapa interactivo (`MapaTienda.jsx`) y el panel administrativo (`AdminPage.jsx`) presentan menor cobertura unitaria directa, ya que dependen del renderizado de capas nativas de OpenStreetMap/Leaflet sobre el canvas y de flujos de interacción de múltiples pasos que corresponden más propiamente a pruebas de integración de extremo a extremo (E2E) que a pruebas unitarias puras.

### ¿Qué error o comportamiento inesperado fue detectado gracias a una prueba?
* Durante la redacción de la prueba N° 2 (`validarRut`), se detectó un RUT mal digitado (`19.876.543-2`), cuyo dígito verificador matemático según el algoritmo oficial Módulo 11 correspondía a `0` y no a `2`. La prueba falló de inmediato (`AssertionError: expected false to be true`), demostrando la robustez del algoritmo implementado y previniendo que clientes con identificaciones reales sean rechazados o aceptados indebidamente durante el checkout.

### ¿Qué prueba adicional sería conveniente implementar en una siguiente versión?
* Para la Evaluación Parcial 3 (EP3), se recomienda implementar una prueba asíncrona que utilice `msw` (Mock Service Worker) o spies sobre `fetch`/`axios` para simular la respuesta HTTP 200/400 de los microservicios Spring Boot al confirmar el pedido o solicitar stock.

---

## 7. Conclusiones

La implementación de la suite de pruebas automatizadas con **Vitest** y **React Testing Library** permitió:
1. Asegurar la integridad de las reglas del negocio de Sonido Vivo (cálculo de despacho, límite de stock y consistencia de datos personales).
2. Probar componentes de manera aislada y reproducible, reduciendo los tiempos de depuración y asegurando que las modificaciones de estilos o estructura no introduzcan regresiones.
3. Cumplir con el 100% de los criterios exigidos en la rúbrica oficial (10 pruebas unitarias efectivas, uso de mocks y análisis detallado de cobertura).
