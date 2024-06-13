import React from "react";
import { handleChange, handleKeyDown } from "../../hooks/useRepository";
import NumberFormat from "react-number-format";

function InputForm({
  datos,
  data,
  setData,
  missingFields,
  keyDown,
  handleAdd,
}) {
  return (
    <div className="row">
      <div className="col col-xs-12 d-flex align-center mb-20">
        <img src="/icons/cliente.png" alt="Avatar" className="mx-auto" />
      </div>
      {datos?.map((m) => {
        return (
          <div
            className={`${
              missingFields?.includes(m.nombre) ? "has-error" : ""
            } col col-xs-12 mb-15`}
          >
            <label className="item-form mb-10">{m.label}</label>
            {m.nombre === "telefono" || m.nombre === "cuit" ? (
              <NumberFormat
                format={
                  m.nombre === "telefono"
                    ? "+54 (###) ####-####"
                    : "##-########-#"
                }
                mask="_"
                value={
                  data?.[m.nombre]
                    ? data?.[m.nombre]
                    : m.nombre === "telefono"
                    ? "+54 (000) 0000-0000"
                    : "00-00000000-0"
                }
                allowLeadingZeros={true}
                allowNegative={false}
                allowEmptyFormatting={true}
                className={`input-table-presupuesto label-table form-control ${
                  m.required ? "input-table-required" : ""
                }`}
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
              <input
                type="text"
                className={`input-table-presupuesto label-table form-control ${
                  m.required ? "input-table-required" : ""
                }`}
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
            )}
            {m.nombre === "razon_social" && (
              <small className="form-text text-muted">
                Nombre con que una entidad o sociedad mercantil está registrada
                legalmente.
              </small>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default InputForm;
