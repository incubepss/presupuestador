import React from "react";
import { handleChange, handleKeyDown } from "../../hooks/useRepository";
import NumberFormat from "react-number-format";

function InputFormPresupuesto({
  modelo,
  data,
  setData,
  misProductos,
  missingFields,
  keyDown,
  handleAdd,
}) {
  return (
    <>
      {modelo?.map((m, i) => {
        return (
          <div
            className={`${
              missingFields?.includes(m.nombre) ? "has-error" : ""
            } table-${m.width}`}
            key={i}
          >
            {m?.nombre === "descripcion" ? (
              <select
                className="chosen-select input-table label-table input-table-required form-control"
                data-placeholder="Elegí una opción"
                onChange={(e) => {
                  handleChange(e.target.value, `${m.nombre}`, data, setData);
                }}
                value={data?.[m.nombre] ? data?.[m.nombre] : ""}
                onKeyDown={(e) => {
                  if (keyDown) {
                    handleKeyDown(e, handleAdd);
                  }
                }}
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
            ) : m?.nombre !== "unidad_medida" ? (
              <NumberFormat
                value={data?.[m.nombre] ? data?.[m.nombre] : 0}
                thousandSeparator={"."}
                decimalSeparator={","}
                suffix={m.nombre === "excedente" ? "%" : ""}
                decimalScale={2}
                fixedDecimalScale={true}
                allowLeadingZeros={true}
                allowNegative={false}
                allowEmptyFormatting={true}
                className="input-table label-table input-table-required form-control"
                onValueChange={(values) => {
                  const { floatValue } = values;

                  setData({
                    ...data,
                    [m.nombre]: floatValue,
                  });
                }}
                onKeyDown={(e) => {
                  if (keyDown) {
                    handleKeyDown(e, handleAdd);
                  }
                }}
              />
            ) : (
              <div
                className="input-table label-table input-table-required"
                key={i}
              >
                {
                  misProductos?.find((i) => i._id === data?.descripcion)?.[
                    m.nombre
                  ]
                }
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}

export default InputFormPresupuesto;
