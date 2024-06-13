import React from "react";
import {
  handleChange,
  handleKeyDown,
  formatDate,
} from "../../hooks/useRepository";
import NumberFormat from "react-number-format";
import { um } from "../../data/um";
import { getPrecioUnitario } from "../../hooks/calcs";

function InputFormCostosVariables({
  modelo,
  data,
  setData,
  missingFields,
  keyDown,
  handleAdd,
}) {
  return (
    <>
      {modelo?.map((m) => {
        return (
          <div
            className={`${
              missingFields?.includes(m.nombre) ? "has-error" : ""
            } ${keyDown === false ? "mb-20" : `table-${m?.width}`}`}
          >
            {m?.nombre === "actualizacion" && (
              <>
                {keyDown === false && <label>{m?.label}</label>}
                <div className={`input-noedit border-10 me-10`}>
                  {formatDate(new Date().toISOString())}
                </div>
              </>
            )}
            {m.nombre === "unidad_medida" && (
              <>
                {keyDown === false && <label>{m?.label}</label>}
                <select
                  className="input-table label-table input-table-required border-10 me-10"
                  data-placeholder="Elegí una opción"
                  onChange={(e) =>
                    handleChange(e.target.value, `${m.nombre}`, data, setData)
                  }
                  value={data?.[m.nombre] ? data?.[m.nombre] : ""}
                  onKeyDown={(e) => {
                    if (keyDown) {
                      handleKeyDown(e, handleAdd);
                    }
                  }}
                >
                  <option></option>
                  {um?.map((e) => {
                    return (
                      <option value={e?.descripcion}>{e?.descripcion}</option>
                    );
                  })}
                </select>
              </>
            )}
            {(m.nombre === "cantidad" || m.nombre === "valor") && (
              <>
                {keyDown === false && <label>{m?.label}</label>}
                <NumberFormat
                  value={data?.[m.nombre] ? data?.[m.nombre] : ""}
                  thousandSeparator={"."}
                  decimalSeparator={","}
                  prefix={m.nombre === "valor" ? "$" : ""}
                  decimalScale={2}
                  allowLeadingZeros={true}
                  allowNegative={false}
                  allowEmptyFormatting={true}
                  className="input-table label-table input-table-required border-10 me-10"
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
              </>
            )}
            {m.nombre === "descripcion" && (
              <>
                {keyDown === false && <label>{m?.label}</label>}
                <input
                  type="text"
                  className="input-table label-table input-table-required border-10 me-10"
                  value={data?.[m.nombre] ? data?.[m.nombre] : ""}
                  onChange={(e) =>
                    handleChange(e.target.value, `${m.nombre}`, data, setData)
                  }
                  onKeyDown={(e) => {
                    if (keyDown) {
                      handleKeyDown(e, handleAdd);
                    }
                  }}
                />
              </>
            )}
            {m.nombre === "precio_unitario" && (
              <>
                {keyDown === false && <label>{m?.label}</label>}
                <div className={`input-noedit border-10 me-10`}>
                  <NumberFormat
                    value={getPrecioUnitario(data?.valor, data?.cantidad)}
                    displayType="text"
                    thousandSeparator={"."}
                    decimalSeparator={","}
                    prefix={m?.nombre === "cantidad" ? "" : "$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                  />
                </div>
              </>
            )}
          </div>
        );
      })}
    </>
  );
}

export default InputFormCostosVariables;
