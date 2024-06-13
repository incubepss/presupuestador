import React from "react";
import { handleChange, handleKeyDown } from "../../hooks/useRepository";
import NumberFormat from "react-number-format";
import { multiSimple } from "../../hooks/calcs";

function InputFormTrabajo({
  modelo,
  data,
  setData,
  misRV,
  missingFields,
  keyDown,
  handleAdd,
}) {
  function valorTotal() {
    const multi = multiSimple(
      misRV?.find((i) => i._id === data?.descripcion)?.valor,
      data?.cantidad
    );
    return multi > 0 ? multi : "";
  }

  return (
    <>
      {modelo?.map((m, i) => {
        return (
          <div
            className={`${
              missingFields?.includes(m.nombre) ? "has-error" : ""
            } ${keyDown === false ? "mb-20" : `table-${m?.width}`}`}
            key={`trabmodel-${i}`}
          >
            {m.nombre === "descripcion" && (
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
                  {misRV?.map((e) => {
                    return (
                      <option key={`trabajoopt-${e._id}`} value={e?._id}>
                        {e?.descripcion}
                      </option>
                    );
                  })}
                </select>
              </>
            )}
            {m.nombre === "cantidad" && (
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
            {m.nombre === "unidad_medida" && (
              <>
                {keyDown === false && <label>{m?.label}</label>}
                <div className="input-noedit border-10 me-10">
                  {misRV?.find((i) => i._id === data?.descripcion)?.valor}
                </div>
              </>
            )}
            {m.nombre === "valor" && (
              <>
                {keyDown === false && <label>{m?.label}</label>}
                <div className="input-noedit border-10 me-10">
                  {valorTotal()}
                </div>
              </>
            )}
          </div>
        );
      })}
    </>
  );
}

export default InputFormTrabajo;
