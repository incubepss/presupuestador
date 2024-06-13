import React, { useState, useEffect } from "react";
import { handleChange, handleKeyDown } from "../../hooks/useRepository";
import NumberFormat from "react-number-format";
import { um } from "../../data/um";
import {
  getPrecioUnitarioInsumo,
  multiSimple,
  getPrecioUnitario,
} from "../../hooks/calcs";

function InputFormInsumos({
  modelo,
  data,
  setData,
  misCV,
  missingFields,
  keyDown,
  handleAdd,
}) {
  const [tipo, setTipo] = useState();
  const [miCV, setMiCV] = useState();

  useEffect(() => {
    if (data?.unidad_medida != undefined) {
      setTipo(um.find((e) => e.descripcion === data.unidad_medida).tipo);
      setMiCV(misCV?.find((i) => i._id === data?.descripcion));
    } else {
      setMiCV();
      setTipo();
    }
  }, [data]);

  const selectType = () => {
    return um.filter((e) => e.tipo === tipo);
  };

  function AddLabel(props) {
    return (
      <>
        {keyDown === false && <label>{props.label}</label>}
        {props.children}
      </>
    );
  }

  return (
    <>
      {modelo?.map((m, i) => {
        return (
          <div
            className={`${
              missingFields?.includes(m.nombre) ? "has-error" : ""
            } ${keyDown === false ? "mb-20" : `table-${m?.width}`}`}
            key={`insumosmodel-${i}`}
          >
            {m.nombre === "descripcion" && (
              <AddLabel label={m?.label}>
                <select
                  className={`input-table label-table input-table-required border-10 me-10`}
                  data-placeholder="Elegí una opción"
                  onChange={(e) => {
                    setData({
                      ...data,
                      ["descripcion"]: e.target.value,
                      ["unidad_medida"]: misCV.find(
                        (cv) => e.target.value === cv._id
                      ).unidad_medida,
                      ["cantidad"]: "",
                    });
                  }}
                  value={data?.descripcion ? data?.descripcion : ""}
                  onKeyDown={(e) => {
                    if (keyDown) {
                      handleKeyDown(e, handleAdd);
                    }
                  }}
                >
                  <option></option>
                  {misCV
                    ?.sort((a, b) =>
                      a.descripcion.localeCompare(b.descripcion, "es", {
                        sensitivity: "base",
                      })
                    )
                    .map((e) => {
                      return (
                        <option key={`selectdesc-${e?._id}`} value={e?._id}>
                          {e?.descripcion}
                        </option>
                      );
                    })}
                </select>
              </AddLabel>
            )}
            {m?.nombre === "unidad_medida" && (
              <>
                <AddLabel label={m?.label}>
                  <select
                    className={`input-table label-table input-table-required border-10 me-10`}
                    data-placeholder="Elegí una opción"
                    onChange={(e) => {
                      handleChange(
                        e.target.value,
                        `${m.nombre}`,
                        data,
                        setData
                      );
                    }}
                    value={data?.[m.nombre] ? data?.[m.nombre] : ""}
                    onKeyDown={(e) => {
                      if (keyDown) {
                        handleKeyDown(e, handleAdd);
                      }
                    }}
                  >
                    {selectType().map((e) => {
                      return (
                        <option
                          key={`optselecttype-${e.value}`}
                          value={e?.descripcion}
                        >
                          {e?.descripcion}
                        </option>
                      );
                    })}
                  </select>
                </AddLabel>
              </>
            )}
            {m.nombre === "cantidad" && (
              <>
                {keyDown === false && <label>{m?.label}</label>}
                <NumberFormat
                  value={data?.[m.nombre] ? data?.[m.nombre] : ""}
                  thousandSeparator={"."}
                  decimalSeparator={","}
                  allowLeadingZeros={true}
                  allowNegative={false}
                  allowEmptyFormatting={true}
                  decimalScale={3}
                  className={`input-table label-table input-table-required border-10 me-10`}
                  onValueChange={(values) => {
                    const { floatValue } = values;
                    handleChange(floatValue, `${m.nombre}`, data, setData);
                  }}
                  onKeyDown={(e) => {
                    if (keyDown) {
                      handleKeyDown(e, handleAdd);
                    }
                  }}
                />
              </>
            )}
            {m?.nombre === "precio_unitario" && (
              <AddLabel label={m?.label}>
                <div className="input-noedit border-10 me-10">
                  <NumberFormat
                    displayType="text"
                    value={getPrecioUnitario(miCV?.valor, miCV?.cantidad)}
                    thousandSeparator={"."}
                    decimalSeparator={","}
                    prefix={"$"}
                    suffix={` x ${
                      miCV?.unidad_medida &&
                      um.find((e) => e.descripcion === miCV.unidad_medida).value
                    }`}
                    decimalScale={2}
                    fixedDecimalScale={true}
                  />
                </div>
              </AddLabel>
            )}
            {m?.nombre === "valor" && (
              <AddLabel label={m?.label}>
                <div className="input-noedit border-10 me-10">
                  <NumberFormat
                    displayType="text"
                    value={multiSimple(
                      getPrecioUnitarioInsumo(
                        miCV?.valor,
                        miCV?.cantidad,
                        data?.unidad_medida,
                        miCV?.unidad_medida
                      ),
                      data?.cantidad
                    )}
                    thousandSeparator={"."}
                    decimalSeparator={","}
                    prefix={m.nombre === "cantidad" ? "" : "$"}
                    decimalScale={m.nombre === "cantidad" ? 3 : 2}
                    fixedDecimalScale={true}
                  />
                </div>
              </AddLabel>
            )}
          </div>
        );
      })}
    </>
  );
}

export default InputFormInsumos;
