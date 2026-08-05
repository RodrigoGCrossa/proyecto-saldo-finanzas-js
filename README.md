# CashFlow

Aplicación web para registrar y visualizar ingresos y gastos personales.

## Descripción

CashFlow permite agregar movimientos financieros, calcular automáticamente el saldo disponible y consultar un historial de ingresos y gastos.

La aplicación carga movimientos iniciales desde un archivo JSON mediante Fetch. Los movimientos agregados por el usuario permanecen durante la sesión actual.

## Funcionalidades

- Registro de ingresos y gastos
- Validación del formulario
- Cálculo automático del saldo
- Totales de ingresos y gastos
- Historial dinámico
- Filtro por tipo de movimiento
- Orden por fecha
- Carga de datos con Fetch
- Manejo de errores con try/catch
- Notificaciones con Toastify
- Diseño adaptable a pantallas pequeñas

## Tecnologías

- HTML
- CSS
- JavaScript
- JSON
- Fetch API
- Toastify
- Git y GitHub

## Funcionamiento de los datos

Los movimientos iniciales se cargan desde `data/movimientos.json`.

Los movimientos agregados mediante el formulario se almacenan en el array de la aplicación durante la sesión. Al actualizar la página, vuelven a cargarse los datos iniciales porque el proyecto no utiliza una base de datos.

## Autor

Rodrigo Grossa
