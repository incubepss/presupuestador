import { nanoid } from "nanoid";
import { multiSimple, getPrecioUnitarioPresupuesto } from "./calcs";

export function useNewRandomId(prefix) {
  return prefix + nanoid();
}

export const findAllDocs = (db, setData, setIsLoading) => {
  try {
    setIsLoading(true);

    db.allDocs({
      include_docs: true,
      attachments: true,
    })
      .then((result) => {
        if (result?.rows !== undefined) {
          setData(result.rows);
        } else {
          setData();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } finally {
    setIsLoading(false);
  }
};

export const findByDateInDatabase = (db, doc, setData, setIsLoading) => {
  try {
    setIsLoading(true);

    db.find({
      selector: { entity: doc },
    })
      .then((result) => {
        if (result !== undefined) {
          let sorted = result.docs.sort(
            (a, b) => new Date(b.actualizacion) - new Date(a.actualizacion)
          );
          setData(sorted);
        } else {
          setData();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } finally {
    setIsLoading(false);
  }
};

export const findInDatabase = (db, doc, setData, setIsLoading) => {
  try {
    setIsLoading(true);

    db.find({
      selector: { entity: doc },
    })
      .then((result) => {
        if (result !== undefined) {
          setData(result.docs);
        } else {
          setData();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } finally {
    setIsLoading(false);
  }
};

export const findOneInDatabase = (db, doc, setData, setIsLoading) => {
  try {
    setIsLoading(true);

    db.find({
      selector: { entity: doc },
    })
      .then((result) => {
        if (result !== undefined) {
          setData(result.docs);
        } else {
          setData();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } finally {
    setIsLoading(false);
  }
};

export const findInDatabaseAlphabetic = (db, doc, setData, setIsLoading) => {
  try {
    setIsLoading(true);

    db.find({
      selector: { entity: doc },
    })
      .then((result) => {
        if (result !== undefined) {
          let sorted = result.docs.sort((a, b) =>
            a.descripcion.localeCompare(b.descripcion, "es", {
              sensitivity: "base",
            })
          );
          setData(sorted);
        } else {
          setData();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } finally {
    setIsLoading(false);
  }
};

export const findInDatabaseAlphabeticCostoFijo = (
  db,
  doc,
  setData,
  setIsLoading,
  tipo
) => {
  try {
    setIsLoading(true);

    db.find({
      selector: { entity: doc },
    })
      .then((result) => {
        if (result !== undefined) {
          let sorted = result.docs
            .filter((e) => {
              return e.tipo === tipo;
            })
            .sort((a, b) =>
              a.descripcion.localeCompare(b.descripcion, "es", {
                sensitivity: "base",
              })
            );
          setData(sorted);
        } else {
          setData();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } finally {
    setIsLoading(false);
  }
};

export const deleteInDatabase = (db, doc, setIsLoading, setSentData) => {
  try {
    setIsLoading(true);

    db.get(doc)
      .then(function (doc) {
        return db.remove(doc);
      })
      .then(function (result) {
        setIsLoading(false);
      })
      .catch(function (err) {
        setIsLoading(false);
        console.log(err);
      });
  } finally {
    setSentData((prevSentData) => !prevSentData);
  }
};

export const editInDatabase = (
  db,
  id,
  data,
  setIsLoading,
  setSentData,
  seteaPresupuesto,
  setMiPresupuesto
) => {
  try {
    setIsLoading(true);

    db.get(id)
      .then(function (doc) {
        let fecha = new Date();

        if (
          data.entity === "costofijo" ||
          data.entity === "remuneracionfija" ||
          data.entity === "remuneracionvar" ||
          data.entity === "costovariable"
        ) {
          return db?.put({
            ...data,
            actualizacion: fecha,
          });
        } else if (data.entity === "presupuesto") {
          if (seteaPresupuesto) {
            setMiPresupuesto({ ...data });
          }

          return db.put({
            ...data,
          });
        } else {
          return db.put({
            ...data,
          });
        }
      })
      .then(function (response) {
        setIsLoading(false);
      })
      .catch(function (err) {
        setIsLoading(false);
        console.log(err);
      });
  } finally {
    setSentData((prevSentData) => !prevSentData);
  }
};

export const addSimpleDatabase = (db, data, entity) => {
  var newId = useNewRandomId(`${entity}_`);

  db?.put({
    ...data,
    _id: newId,
    entity: entity,
  });
};

export const firstAddInDatabase = (
  validacion,
  db,
  data,
  entity,
  setSentData,
  misCostos
) => {
  if (validacion) {
    try {
      db?.put({ ...data, _id: entity, entity: entity })
        .then(() => {
          misCostos?.items?.map((e) => {
            return addSimpleDatabase(db, { ...e, tipo: "costo" }, "costofijo");
          });
        })
        .then(() => {
          addSimpleDatabase(
            db,
            {
              razon_social: "GCBA",
              cuit: "34999032089",
              mail: "valorpopular@buenosaires.gob.ar",
            },
            "cliente"
          );
        });
    } finally {
      setSentData((prevSentData) => !prevSentData);
    }
  }
};

export const addInDatabase = (
  validacion,
  db,
  data,
  setData,
  entity,
  setSentData,
  setMiPresupuesto,
  setsPresupuesto
) => {
  if (validacion) {
    try {
      let fecha = new Date();
      var newId = useNewRandomId(`${entity}_`);

      if (
        entity === "costofijo" ||
        entity === "remuneracionfija" ||
        entity === "remuneracionvar" ||
        entity === "costovariable"
      ) {
        db?.put({
          ...data,
          _id: newId,
          entity: entity,
          actualizacion: fecha,
        });
      } else if (entity === "presupuesto") {
        let presu = {
          ...data,
          entity: entity,
          actualizacion: fecha,
        };
        db?.put({ ...presu });

        // este hacer solo si confirma
        if (setsPresupuesto) {
          setMiPresupuesto({ ...presu });
        }
      } else {
        db?.put({ ...data, _id: newId, entity: entity });
      }
    } finally {
      setData({});
      setSentData((prevSentData) => !prevSentData);
    }
  }
};

export const simpleAddInDatabase = (db, data, entity, setIsLoading) => {
  try {
    setIsLoading(true);
    var newId = `${entity}_1`;

    db?.put({ value: data[0].value, _id: newId, entity: entity });
  } finally {
    setIsLoading(false);
  }
};

export const handleChange = (e, id, data, setData) => {
  setData({ ...data, [id]: e });
};

export const handleChangePresupuesto = (
  item,
  index,
  id,
  data,
  setData,
  nombre,
  value
) => {
  let prod = { ...item, [nombre]: value };
  let temp = [...data?.[id]];
  temp[index] = { ...prod };

  setData({ ...data, [id]: temp });
};

export const handleKeyDown = (event, handleAdd) => {
  if (event.key === "Enter") {
    handleAdd();
  }
};

function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

export const formatDate = (date) => {
  let formated = new Date(date);
  return [
    padTo2Digits(formated.getDate()),
    padTo2Digits(formated.getMonth() + 1),
    formated.getFullYear(),
  ].join("/");
};

export const formatDateSimple = (date) => {
  const year = date?.[0] + date?.[1] + date?.[2] + date?.[3];
  const month = date?.[5] + date?.[6];
  const day = date?.[8] + date?.[9];

  return [day, month, year].join("/");
};

export const findByIdInDatabase = (db, id, setProducto, setIsLoading) => {
  try {
    setIsLoading(true);

    db.get(id)
      .then((result) => {
        setProducto(result);
      })
      .catch(function (err) {
        setIsLoading(false);
        console.log(err);
      });
  } finally {
    setIsLoading(false);
  }
};

export const findByIdInDatabaseInsumo = (
  db,
  id,
  setProducto,
  setIsLoading,
  misCV,
  orderInsumo
) => {
  try {
    setIsLoading(true);

    db.get(id)
      .then((result) => {
        if (result !== undefined) {
          if (misCV) {
            let temp = result?.insumos
              ? result?.insumos?.map((e) => {
                  return {
                    ...e,
                    name: misCV?.find((i) => i._id === e?.descripcion)
                      ?.descripcion,
                  };
                })
              : [];

            if (!orderInsumo) {
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

            setProducto({ ...result, insumos: [...temp] });
          } else {
            setProducto({ ...result });
          }
        } else {
          setProducto({});
        }
      })
      .catch(function (err) {
        setIsLoading(false);
        console.log(err);
      });
  } finally {
    setIsLoading(false);
  }
};

export const duplicateInDatabase = (
  validacion,
  db,
  data,
  entity,
  setSentData
) => {
  try {
    if (validacion) {
      let fecha = new Date();
      var newId = useNewRandomId(`${entity}_`);
      let newData = {
        ...data,
        _id: newId,
        entity: entity,
        actualizacion: fecha,
      };
      delete newData._rev;

      db?.put({
        ...newData,
      });
    }
  } finally {
    setSentData((prevSentData) => !prevSentData);
  }
};

export const saveCompletePresupuesto = (
  db,
  id,
  setIsLoading,
  setHasConfirmed,
  setMiPresupuestoEnviado,
  temp,
  setMiPresupuesto
) => {
  if (id) {
    editInDatabase(
      db,
      id,
      temp,
      setIsLoading,
      setHasConfirmed,
      true,
      setMiPresupuesto
    );
  } else {
    addInDatabase(
      true,
      db,
      temp,
      setMiPresupuestoEnviado,
      "presupuesto",
      setHasConfirmed,
      setMiPresupuesto,
      true
    );
  }
};

export const showPrintPresupuesto = (
  data,
  total,
  misProductos,
  totalCF,
  totalRF,
  misCV,
  misRV,
  subtotalSinIva,
  setImprimir
) => {
  let temp = {};

  //necesito dejar guardados
  // productos
  // totales
  // gastos extra
  const subtotalCostos = data.productos.reduce(
    (acc, obj) => acc + obj.costo * (obj.excedente / 100 + 1) * obj.cantidad,
    0
  );
  temp = {
    ...data,
    estado: "Confirmado",
    total_gastos_bancarios: multiSimple(
      subtotalCostos,
      data?.gastos_bancarios / 100
    ),
    total_gastos_financiamiento: multiSimple(
      subtotalCostos,
      data?.gastos_financiamiento / 100
    ),
    total_iva: multiSimple(subtotalSinIva, data?.iva / 100),
    total: total,
    productos: [
      ...data?.productos?.map((e) => {
        let prod = misProductos?.find((i) => i._id === e?.descripcion);

        return {
          id: prod?._id,
          descripcion: prod?.descripcion,
          unidad_medida: prod?.unidad_medida,
          cantidad: e?.cantidad,
          excedente: e?.excedente,
          costo: e?.costo,
          precio_unitario: getPrecioUnitarioPresupuesto(
            misProductos,
            e,
            totalCF,
            totalRF,
            data,
            misCV,
            misRV
          ),
          valor: multiSimple(
            getPrecioUnitarioPresupuesto(
              misProductos,
              e,
              totalCF,
              totalRF,
              data,
              misCV,
              misRV
            ),
            e?.cantidad
          ),
        };
      }),
    ],
  };
  setImprimir(temp);
};
