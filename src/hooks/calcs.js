import { um } from "../data/um";

export const getReduced = (arr, keyLook) => {
  // recorro array de objetos
  // reduzco a un numero
  return arr?.reduce(function (acc, obj) {
    return acc + Number(obj[keyLook]);
  }, 0);
};

export const roundNumber = (number) => {
  return Math.round((Number(number) + Number.EPSILON) * 100) / 100;
};

export const getPorcentaje = (arr, keyLook, prom) => {
  // sumo todas las facturaciones
  let sum = getReduced(arr, keyLook);

  // calculo porcentaje unitario
  const unit = (Number(prom) / sum) * 100;

  return roundNumber(unit);
};

export const getCostoUnitario = (totalCostos, porcentajeMensual, cantidad) => {
  // el unitario de cada producto es:
  // (total costos fijos * porcentaje mensual) / capacidad promedio

  // divido el porcentaje por 100
  // el dato que llega es 70 pero en este caso necestaria el 70%
  // por tanto es el 0.7

  return roundNumber((totalCostos * (porcentajeMensual / 100)) / cantidad);
};

export const getPrecioUnitario = (valor, cantidad) => {
  return roundNumber(Number(valor) / Number(cantidad));
};

export const getPrecioUnitarioInsumo = (
  valor,
  cantidad,
  unidadMedidaNueva,
  unidadMedidaOriginal
) => {
  if (unidadMedidaNueva != undefined && unidadMedidaOriginal != undefined) {
    const equivalenciaNuevo = um.find(
      (e) => unidadMedidaNueva === e.descripcion
    ).valor;
    const equivalenciaOriginal = um.find(
      (e) => unidadMedidaOriginal === e.descripcion
    ).valor;

    return (
      (getPrecioUnitario(valor, cantidad) * equivalenciaNuevo) /
      equivalenciaOriginal
    );
  }
  return "";
};

function truncarDecimales(numero, decimales) {
  let numeroString = numero ? numero.toString() : "";
  let partes = numeroString.split(".");
  if (partes.length === 2 && partes[1].length > decimales) {
    let parteDecimal = partes[1].substring(0, decimales);
    return parseFloat(`${partes[0]}.${parteDecimal}`);
  }
  return numero;
}

export const getPrecioUnitarioInsumoNoRound = (
  valor,
  cantidad,
  unidadMedidaNueva,
  unidadMedidaVieja
) => {
  let precioUnitario = getPrecioUnitarioInsumo(
    valor,
    cantidad,
    unidadMedidaNueva,
    unidadMedidaVieja
  );

  let noRound = truncarDecimales(precioUnitario, 2);

  return noRound;
};

export const getTotales = (setIsLoading, data, setData) => {
  try {
    setIsLoading(true);

    let temp = data?.reduce(function (acc, obj) {
      return acc + (Number(obj.valor) ? Number(obj.valor) : 0);
    }, 0);
    setData(temp);
  } finally {
    setIsLoading(false);
  }
};

export const multiSimple = (a, b) => {
  return Number(a) * Number(b);
};

export const getDifferenceDates = (date) => {
  var day1 = new Date(date);
  var day2 = new Date();

  var difference = Math.abs(day2 - day1);
  let days = difference / (1000 * 3600 * 24);

  return Math.round(days);
};

export const getCostoTotal = (producto, misCV, misRV) => {
  let tempCV = producto?.insumos
    ?.map((e) => {
      let miCV = misCV?.find((i) => i._id === e?.descripcion);

      let u_m = um.find((i) => i.descripcion === e.unidad_medida)?.descripcion;
      // primero saco el valor unitario del insumo
      // luego lo multiplico por la cantidad de veces que requiere
      // y dependiendo de la cantidad elegida en ficha lo divido

      return (
        (getPrecioUnitarioInsumo(
          miCV?.valor,
          miCV?.cantidad,
          u_m,
          miCV?.unidad_medida
        ) *
          e.cantidad) /
        (producto?.cantidad_unitaria
          ? producto?.cantidad_unitaria
          : producto?.cantidad_promedio_mensual)
      );
    })
    ?.reduce(function (acc, obj) {
      return acc + Number(obj);
    }, 0);

  let tempRV = producto?.remuneracion
    ?.map((e) => {
      // tomo el valor unitario y lo multiplico las veces que requiera
      // luego lo divido por la cantidad elegida en ficha
      return (
        (Number(misRV?.find((i) => i._id === e.descripcion)?.valor) *
          e.cantidad) /
        (producto?.cantidad_unitaria
          ? producto?.cantidad_unitaria
          : producto?.cantidad_promedio_mensual)
      );
    })
    ?.reduce(function (acc, obj) {
      return acc + Number(obj);
    }, 0);

  let reducedCV = isNaN(tempCV) ? 0 : tempCV;
  let reducedRV = isNaN(tempRV) ? 0 : tempRV;

  return roundNumber(reducedCV + reducedRV);
};

export const getPrecioUnitarioPresupuesto = (
  misProductos,
  e,
  totalCF,
  totalRF,
  miPresupuesto,
  misCV,
  misRV
) => {
  let producto = misProductos?.find((i) => i._id === e?.descripcion);
  let costo =
    getCostoUnitario(
      totalCF + totalRF,
      producto?.produccion_promedio_mensual,
      producto?.cantidad_promedio_mensual
    ) + getCostoTotal(producto, misCV, misRV);

  let excedente = (costo * Number(e?.excedente)) / 100;

  let gastos_bancarios =
    (costo * Number(miPresupuesto?.gastos_bancarios)) / 100;

  let gastos_financiamiento =
    (costo * Number(miPresupuesto?.gastos_financiamiento)) / 100;

  // calculo total de cantidades
  let total_cantidades = miPresupuesto?.productos?.reduce(function (acc, obj) {
    return acc + (Number(obj.cantidad) ? Number(obj.cantidad) : 0);
  }, 0);
  // calculo el proporcional de logistica por unidad
  let logistica_proporcional = miPresupuesto?.logistica
    ? miPresupuesto?.logistica / total_cantidades
    : 0;

  // calculo el proporcional de otros costos por unidad
  let otrosCostos_proporcional = miPresupuesto?.otrosCostos
    ? miPresupuesto?.otrosCostos / total_cantidades
    : 0;

  // calculo el proporcional del prestamo por unidad
  let prestamo_proporcional = miPresupuesto?.prestamo?.interesTotal
    ? miPresupuesto?.prestamo?.interesTotal / total_cantidades
    : 0;

  return roundNumber(
    costo +
      excedente +
      gastos_bancarios +
      gastos_financiamiento +
      logistica_proporcional +
      otrosCostos_proporcional +
      prestamo_proporcional
  );
};

export const handleAddProducto = (
  nuevoProducto,
  setMiPresupuesto,
  miPresupuesto,
  setNuevoProducto
) => {
  if (
    nuevoProducto?.descripcion &&
    nuevoProducto?.cantidad &&
    nuevoProducto?.excedente
  ) {
    try {
      setMiPresupuesto({
        ...miPresupuesto,
        productos: [...miPresupuesto?.productos, nuevoProducto],
      });
    } finally {
      setNuevoProducto({});
    }
  }
};

export const handleDeleteItem = (miData, e, setMiData, id) => {
  let ins = miData?.[id]?.filter((i) => i.descripcion !== e.descripcion);

  setMiData({
    ...miData,
    [id]: [...ins],
  });
};

export const handleDeleteItemVacio = (miData, setMiData, index, key) => {
  let ins = miData?.[key];

  if (index > -1 && index < ins.length) {
    ins.splice(index, 1);

    setMiData({
      ...miData,
      [key]: [...ins],
    });
  }
};

export const formatNumber = (number) => {
  let formated = number?.toLocaleString(undefined, {
    maximumFractionDigits: 2,
  });

  return formated;
};

export const formatPrices = (price) => {
  return "$" + formatNumber(price);
};

export const formatCUIT = (cuit) => {
  var cleaned = ("" + cuit).replace(/\D/g, "");
  var match = cleaned.match(/^(\d{2})(\d{8})(\d{1})$/);

  if (match) {
    return match?.[1] + "-" + match?.[2] + "-" + match?.[3];
  }
  return cleaned;
};

export const formatPhoneNumber = (phoneNumberString) => {
  var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    return "+ (" + match?.[1] + ") " + match?.[2] + "-" + match?.[3];
  }
  return cleaned;
};

export const handleAddItemFicha = (
  validacion,
  producto,
  id,
  nuevoInsumo,
  setProducto,
  setNuevoInsumo
) => {
  if (validacion) {
    let ins = producto?.[id] ? [...producto?.[id], nuevoInsumo] : [nuevoInsumo];

    try {
      setProducto({ ...producto, [id]: [...ins] });
    } finally {
      setNuevoInsumo({});
    }
  }
};

export const handleEditItemFicha = (
  producto,
  id,
  nuevoInsumo,
  setProducto,
  index,
  setIsEditing
) => {
  try {
    let temp = producto?.[id]?.map((obj, i) => {
      if (i === index) {
        return nuevoInsumo;
      }
      return obj;
    });

    setProducto({ ...producto, [id]: [...temp] });
  } finally {
    setIsEditing(false);
  }
};

export const orderByDates = (
  setIsLoading,
  misCostosVariables,
  orderFecha,
  setMisCostosVariables,
  setOrderFecha
) => {
  try {
    setIsLoading(true);

    let tempOrder = !orderFecha;

    let temp = [...misCostosVariables];

    if (!tempOrder) {
      temp?.sort(function (a, b) {
        return new Date(a.actualizacion) - new Date(b.actualizacion);
      });
    } else {
      temp?.sort(function (a, b) {
        return new Date(b.actualizacion) - new Date(a.actualizacion);
      });
    }
    console.log("tempOrder", temp);
    setOrderFecha(tempOrder);
    setMisCostosVariables(temp);
  } finally {
    setIsLoading(false);
  }
};

export const orderByAlphabetic = (
  setIsLoading,
  misCostosVariables,
  orderInsumo,
  setMisCostosVariables,
  setOrderInsumo,
  descripcion = "descripcion"
) => {
  try {
    setIsLoading(true);

    let tempOrder = !orderInsumo;

    let temp = [...misCostosVariables];
    if (!tempOrder) {
      temp?.sort((a, b) =>
        b[descripcion].localeCompare(a[descripcion], "es", {
          sensitivity: "base",
        })
      );
    } else {
      temp?.sort((a, b) =>
        a[descripcion].localeCompare(b[descripcion], "es", {
          sensitivity: "base",
        })
      );
    }

    setOrderInsumo(tempOrder);
    setMisCostosVariables(temp);
  } finally {
    setIsLoading(false);
  }
};

export const orderByAlphabeticInsumo = (
  setIsLoading,
  producto,
  orderInsumo,
  setProducto,
  setOrderInsumo,
  misCV
) => {
  try {
    setIsLoading(true);

    let tempOrder = !orderInsumo;

    let temp = producto?.insumos
      ? producto?.insumos?.map((e) => {
          return {
            ...e,
            name: misCV?.find((i) => i._id === e?.descripcion)?.descripcion,
          };
        })
      : [];

    if (!tempOrder) {
      temp?.sort((a, b) =>
        b.name.localeCompare(a.name, "es", {
          sensitivity: "base",
        })
      );
    } else {
      temp?.sort((a, b) =>
        a.name.localeCompare(b.name, "es", {
          sensitivity: "base",
        })
      );
    }

    setOrderInsumo(tempOrder);
    setProducto({ ...producto, insumos: [...temp] });
  } finally {
    setIsLoading(false);
  }
};

export const handleMissingFields = ({
  requiredFields,
  nuevoCampo,
  setNuevoCampo,
}) => {
  const missingFields = requiredFields?.filter((e) => {
    if (e === "productos") {
      //filtro
      let productosFiltrados = nuevoCampo?.productos?.filter((e) => {
        if (e.descripcion && e.cantidad && e.excedente) {
          return e;
        }
      });

      setNuevoCampo({ ...nuevoCampo, productos: [...productosFiltrados] });

      // guardar este listado de productos en el presupuesto
      if (productosFiltrados?.length === 0) {
        return nuevoCampo?.productos;
      }
    } else {
      return !nuevoCampo?.[e];
    }
  });

  return missingFields;
};
