let movimientos = [];

// Elementos del resumen financiero
const saldoTotal = document.getElementById("saldo-total");
const ingresosTotal = document.getElementById("ingresos-total");
const gastosTotal = document.getElementById("gastos-total");

// Historial
const listaMovimientos = document.getElementById("lista-movimientos");
const filtroTipo = document.getElementById("filtro-tipo");
const ordenMovimientos = document.getElementById("orden-movimientos");

// Resumen de actividad
const cantidadMovimientos = document.getElementById("cantidad-movimientos");

const cantidadIngresos = document.getElementById("cantidad-ingresos");

const cantidadGastos = document.getElementById("cantidad-gastos");

// Formulario
const formularioMovimiento = document.getElementById("formulario-movimiento");

const tipoInput = document.getElementById("tipo");
const descripcionInput = document.getElementById("descripcion");
const categoriaInput = document.getElementById("categoria");
const montoInput = document.getElementById("monto");
const fechaInput = document.getElementById("fecha");

const mensajeFormulario = document.getElementById("mensaje-formulario");

// Cargar los movimientos iniciales desde el JSON
async function cargarMovimientos() {
  try {
    const respuesta = await fetch("./data/movimientos.json");

    if (!respuesta.ok) {
      throw new Error("No se pudieron cargar los movimientos");
    }

    movimientos = await respuesta.json();

    actualizarResumen();
    aplicarFiltrosYOrden();
  } catch (error) {
    listaMovimientos.textContent =
      "Ocurrió un error al cargar los movimientos.";
  }
}

// Calcular saldo, ingresos y gastos
function actualizarResumen() {
  const movimientosDeIngreso = movimientos.filter(
    (movimiento) => movimiento.tipo === "ingreso",
  );

  const movimientosDeGasto = movimientos.filter(
    (movimiento) => movimiento.tipo === "gasto",
  );

  const ingresos = movimientosDeIngreso.reduce((acumulador, movimiento) => {
    return acumulador + movimiento.monto;
  }, 0);

  const gastos = movimientosDeGasto.reduce((acumulador, movimiento) => {
    return acumulador + movimiento.monto;
  }, 0);

  const saldo = ingresos - gastos;

  saldoTotal.textContent = `$U ${saldo}`;
  ingresosTotal.textContent = `$U ${ingresos}`;
  gastosTotal.textContent = `$U ${gastos}`;

  cantidadMovimientos.textContent = movimientos.length;
  cantidadIngresos.textContent = movimientosDeIngreso.length;
  cantidadGastos.textContent = movimientosDeGasto.length;
}

// Filtrar y ordenar antes de mostrar
function aplicarFiltrosYOrden() {
  const tipoSeleccionado = filtroTipo.value;
  const ordenSeleccionado = ordenMovimientos.value;

  const movimientosParaMostrar = movimientos.filter((movimiento) => {
    if (tipoSeleccionado === "todos") {
      return true;
    }

    return movimiento.tipo === tipoSeleccionado;
  });

  if (ordenSeleccionado === "antiguos") {
    movimientosParaMostrar.sort((movimientoA, movimientoB) => {
      if (movimientoA.fecha > movimientoB.fecha) {
        return 1;
      }

      if (movimientoA.fecha < movimientoB.fecha) {
        return -1;
      }

      return movimientoA.id - movimientoB.id;
    });
  } else {
    movimientosParaMostrar.sort((movimientoA, movimientoB) => {
      if (movimientoA.fecha < movimientoB.fecha) {
        return 1;
      }

      if (movimientoA.fecha > movimientoB.fecha) {
        return -1;
      }

      return movimientoB.id - movimientoA.id;
    });
  }

  renderizarMovimientos(movimientosParaMostrar);
}

// Mostrar los movimientos en el historial
function renderizarMovimientos(movimientosParaMostrar) {
  listaMovimientos.innerHTML = "";

  if (movimientosParaMostrar.length === 0) {
    listaMovimientos.textContent = "No hay movimientos para este filtro.";

    return;
  }

  movimientosParaMostrar.forEach((movimiento) => {
    const tarjetaMovimiento = document.createElement("article");

    const descripcion = document.createElement("h3");

    const detalles = document.createElement("p");

    const monto = document.createElement("p");

    tarjetaMovimiento.className = `movimiento movimiento-${movimiento.tipo}`;

    descripcion.textContent = movimiento.descripcion;

    detalles.textContent = `${movimiento.categoria} | ${movimiento.fecha}`;

    if (movimiento.tipo === "ingreso") {
      monto.textContent = `+$U ${movimiento.monto}`;
    } else {
      monto.textContent = `-$U ${movimiento.monto}`;
    }

    tarjetaMovimiento.appendChild(descripcion);
    tarjetaMovimiento.appendChild(detalles);
    tarjetaMovimiento.appendChild(monto);

    listaMovimientos.appendChild(tarjetaMovimiento);
  });
}

// Crear un movimiento desde el formulario
function agregarMovimiento(evento) {
  evento.preventDefault();

  const tipo = tipoInput.value;
  const descripcion = descripcionInput.value.trim();
  const categoria = categoriaInput.value;
  const monto = Number(montoInput.value);
  const fecha = fechaInput.value;

  if (
    tipo === "" ||
    descripcion === "" ||
    categoria === "" ||
    monto <= 0 ||
    fecha === ""
  ) {
    mensajeFormulario.textContent = "Completá correctamente todos los campos.";

    return;
  }

  const nuevoMovimiento = {
    id: movimientos.length + 1,
    tipo: tipo,
    descripcion: descripcion,
    categoria: categoria,
    monto: monto,
    fecha: fecha,
  };

  movimientos.push(nuevoMovimiento);

  actualizarResumen();
  aplicarFiltrosYOrden();

  formularioMovimiento.reset();

  mensajeFormulario.textContent = "Movimiento agregado correctamente.";
}

// Eventos
formularioMovimiento.addEventListener("submit", agregarMovimiento);

filtroTipo.addEventListener("change", aplicarFiltrosYOrden);

ordenMovimientos.addEventListener("change", aplicarFiltrosYOrden);

// Iniciar CashFlow
cargarMovimientos();
