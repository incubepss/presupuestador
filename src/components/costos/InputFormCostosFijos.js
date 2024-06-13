import React from "react";
import {
  handleChange,
  handleKeyDown,
  formatDate,
} from "../../hooks/useRepository";
import NumberFormat from "react-number-format";

function InputFormCostosFijos({
  modelo,
  data,
  setData,
  missingFields,
  keyDown,
  handleAdd,
}) {
  return (
    <>
      {modelo?.map((m, i) => {
        return (
          <div
            key={`ifcfm-${i}`}
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
            {m?.nombre === "valor" && (
              <>
                {keyDown === false && <label>{m?.label}</label>}
                <NumberFormat
                  value={data?.[m.nombre] ? data?.[m.nombre] : ""}
                  thousandSeparator={"."}
                  decimalSeparator={","}
                  allowLeadingZeros={true}
                  allowNegative={false}
                  allowEmptyFormatting={true}
                  prefix={"$"}
                  decimalScale={2}
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
            {m?.nombre === "descripcion" && (
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

export default InputFormCostosFijos;
