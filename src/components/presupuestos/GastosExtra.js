import React, { useContext } from "react";

import { multiSimple } from "../../hooks/calcs";
import { labelsCostos, modeloCostos } from "../../data/presupuesto";
import NumberFormat from "react-number-format";
import TableLabelsBorderless from "../forms/TableLabelsBorderless";
import PresupuestosContext from "../../context/PresupuestosContext";

function GastosExtra({ subtotalPresupuesto }) {
  const { miPresupuesto, setMiPresupuesto } = useContext(PresupuestosContext);

  return (
    <div className="bg-white-2 py-20 px-20 border-10 mt-40">
      <div className="d-flex justify-between">
        <h2 className="titulo-secundario mt-0">Gastos extras</h2>
      </div>
      {/* INICIO LABELS */}
      <div className="d-flex">
        <TableLabelsBorderless modelo={labelsCostos} />
      </div>
      {/* FIN LABELS */}
      {/* INICIO CONTENIDO */}
      {modeloCostos?.map((m, i) => {
        return (
          <div className="my-0 d-flex mb-20" key={i}>
            <div className="table-40">
              <div className="item-borderless">{m?.label}</div>
            </div>
            <div className="table-30">
              <NumberFormat
                value={
                  miPresupuesto?.[m.nombre] ? miPresupuesto?.[m.nombre] : ""
                }
                thousandSeparator={"."}
                decimalSeparator={","}
                allowLeadingZeros={true}
                allowEmptyFormatting={true}
                suffix={"%"}
                decimalScale={2}
                fixedDecimalScale={true}
                className="input-table-presupuesto label-table input-table-required border-10 me-20"
                onValueChange={(values) => {
                  const { floatValue } = values;

                  setMiPresupuesto({
                    ...miPresupuesto,
                    [m.nombre]: floatValue,
                  });
                }}
              />
            </div>
            <div className="table-30">
              <NumberFormat
                className="input-noedit border-10 me-10"
                value={multiSimple(
                  subtotalPresupuesto,
                  miPresupuesto?.[m.nombre] / 100
                )}
                displayType="text"
                thousandSeparator={"."}
                decimalSeparator={","}
                prefix={"$"}
                decimalScale={2}
                fixedDecimalScale={true}
                allowLeadingZeros={true}
                allowNegative={false}
                allowEmptyFormatting={true}
              />
            </div>
          </div>
        );
      })}
      {/* FIN CONTENIDO */}
    </div>
  );
}

export default GastosExtra;
