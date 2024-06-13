import React from "react";
import { handleChange, handleKeyDown } from "../../hooks/useRepository";
import NumberFormat from "react-number-format";
import { um } from "../../data/um";

function InputForm({
  datos,
  data,
  setData,
  missingFields,
  keyDown,
  handleAdd,
}) {
  return (
    <>
      {datos?.map((m) => {
        return (
          <div
            className={`${
              missingFields?.includes(m.nombre) ? "has-error" : ""
            } ${keyDown === false ? "mb-20" : `table-${m?.width}`}`}
          >
            {m.nombre === "unidad_medida" ? (
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
            ) : m.nombre === "produccion_promedio_mensual" ||
              m.nombre === "cantidad_promedio_mensual" ? (
              <>
                {keyDown === false && <label>{m?.label}</label>}
                <NumberFormat
                  value={data?.[m.nombre] ? data?.[m.nombre] : ""}
                  thousandSeparator={"."}
                  decimalSeparator={","}
                  suffix={m.nombre === "produccion_promedio_mensual" ? "%" : ""}
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
            ) : (
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
          </div>
        );
      })}
    </>
  );
}

export default InputForm;
