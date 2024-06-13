import React, { useContext } from "react";

import {
  multiSimple,
  getPrecioUnitarioPresupuesto,
  handleDeleteItemVacio,
  getCostoUnitario,
  getCostoTotal,
} from "../../hooks/calcs";
import { modeloLabelsProductos } from "../../data/presupuesto";
import NumberFormat from "react-number-format";
import DeleteIcon from "../forms/DeleteIcon";
import TableLabelsBorderless from "../forms/TableLabelsBorderless";
import { handleChangePresupuesto } from "../../hooks/useRepository";
import PresupuestosContext from "../../context/PresupuestosContext";

function Productos({
  misProductos,
  missingFieldsPresupuesto,
  totalCF,
  totalRF,
  misCV,
  misRV,
}) {
  const { miPresupuesto, setMiPresupuesto } = useContext(PresupuestosContext);

  return (
    <div className="table-overflow bg-white-2 mt-20 py-20 px-20 border-10">
      {/* inicio labels */}
      <div className="table-overflow-content">
        <div className="d-flex">
          <TableLabelsBorderless modelo={modeloLabelsProductos} />
        </div>
        {/* fin labels */}
        {/* INICIO LISTADO */}
        {miPresupuesto?.productos?.map((e, i) => {
          return (
            <div className="d-flex mb-10" key={i}>
              {modeloLabelsProductos?.map((m) => {
                const unit = getPrecioUnitarioPresupuesto(
                  misProductos,
                  e,
                  totalCF,
                  totalRF,
                  miPresupuesto,
                  misCV,
                  misRV
                );
                return (
                  <div className={`table-${m.width}`}>
                    {/* inicio no editable */}
                    <>
                      {(m.nombre === "precio_unitario" ||
                        m.nombre === "valor") && (
                        <NumberFormat
                          className={`input-noedit border-10 ${
                            m.nombre === "precio_unitario" ? "me-10" : ""
                          }`}
                          value={
                            m.nombre === "valor"
                              ? multiSimple(unit, e?.cantidad)
                              : unit
                          }
                          displayType="text"
                          thousandSeparator="."
                          decimalSeparator=","
                          prefix="$"
                          suffix={m.nombre === "excedente" ? "%" : ""}
                          decimalScale={2}
                          fixedDecimalScale={true}
                        />
                      )}
                      {m.nombre === "unidad_medida" && (
                        <div className="input-noedit border-10 me-10">
                          {
                            misProductos?.find(
                              (i) => i._id === e?.descripcion
                            )?.[m.nombre]
                          }
                        </div>
                      )}
                    </>
                    {/* fin no editable */}

                    {/* inicio editable */}
                    <>
                      {m.nombre === "descripcion" && (
                        <select
                          className="input-table label-table input-table-required border-10 me-10"
                          data-placeholder="Elegí una opción"
                          onChange={(event) => {
                            const productoSeleccionado = misProductos.find(
                              (producto) => producto._id === event.target.value
                            );
                            const costo =
                              getCostoUnitario(
                                totalCF + totalRF,
                                productoSeleccionado.produccion_promedio_mensual,
                                productoSeleccionado.cantidad_promedio_mensual
                              ) +
                              getCostoTotal(productoSeleccionado, misCV, misRV);
                            console.log(costo);
                            let productosNew = miPresupuesto.productos;
                            productosNew[i].costo = costo;
                            productosNew[i][m.nombre] = event.target.value;

                            setMiPresupuesto({
                              ...miPresupuesto,
                              productos: productosNew,
                            });

                            console.log(miPresupuesto.productos[0]);
                          }}
                          value={e?.[m.nombre] ? e?.[m.nombre] : ""}
                        >
                          <option></option>
                          {misProductos?.map((e, i) => {
                            return (
                              <option key={i} value={e?._id}>
                                {e?.descripcion}
                              </option>
                            );
                          })}
                        </select>
                      )}

                      {(m.nombre === "excedente" ||
                        m.nombre === "cantidad") && (
                        <NumberFormat
                          className="input-table label-table input-table-required border-10 me-10"
                          value={e?.[m.nombre]}
                          thousandSeparator={"."}
                          decimalSeparator={","}
                          suffix={m.nombre === "excedente" ? "%" : ""}
                          decimalScale={2}
                          fixedDecimalScale={true}
                          onValueChange={(values) => {
                            const { floatValue } = values;

                            handleChangePresupuesto(
                              e,
                              i,
                              "productos",
                              miPresupuesto,
                              setMiPresupuesto,
                              m.nombre,
                              floatValue
                            );
                          }}
                        />
                      )}
                    </>
                    {/* fin editable */}
                  </div>
                );
              })}
              <DeleteIcon
                handleDelete={() =>
                  handleDeleteItemVacio(
                    miPresupuesto,
                    setMiPresupuesto,
                    i,
                    "productos"
                  )
                }
              />
            </div>
          );
        })}
        {/* FIN LISTADO */}
        {/* AGREGAR PRODUCTO */}
        <>
          <div className="text-center mt-20">
            <button
              className="btn btn-lg btn-primary"
              onClick={() =>
                setMiPresupuesto({
                  ...miPresupuesto,
                  productos: [
                    ...miPresupuesto?.productos,
                    {
                      descripcion: "",
                      cantidad: "",
                      excedente: "",
                      costo: 0,
                    },
                  ],
                })
              }
            >
              Agregar producto
            </button>
          </div>
          {missingFieldsPresupuesto?.includes("productos") && (
            <p className="text-danger mt-10">
              Debes agregar al menos un producto
            </p>
          )}
        </>
        {/* FIN AGREGAR PRODUCTO */}
      </div>
    </div>
  );
}

export default Productos;
