import React, { useContext } from "react";
import NumberFormat from "react-number-format";
import PresupuestosContext from "../../context/PresupuestosContext";

function CostoLogistica() {
  const { miPresupuesto, setMiPresupuesto } = useContext(PresupuestosContext);

  return (
    <div className="bg-white-2 py-20 px-20 border-10 mt-40">
      <div className="row">
        <div className="col-md-6">
          <label className="label-borderless mb-20">Costo de logística</label>
          <NumberFormat
            value={miPresupuesto?.logistica ? miPresupuesto?.logistica : ""}
            thousandSeparator={"."}
            decimalSeparator={","}
            prefix={"$"}
            allowLeadingZeros={true}
            allowEmptyFormatting={true}
            allowNegative={false}
            decimalScale={2}
            className="input-table-presupuesto label-table input-table-required border-10"
            onValueChange={(values) => {
              const { floatValue } = values;

              setMiPresupuesto({
                ...miPresupuesto,
                logistica: floatValue,
              });
            }}
          />
        </div>
        <div className="col-md-6">
          <label className="label-borderless mb-20">Otros Costos</label>
          <NumberFormat
            value={miPresupuesto?.otrosCostos ? miPresupuesto?.otrosCostos : ""}
            thousandSeparator={"."}
            decimalSeparator={","}
            prefix={"$"}
            allowLeadingZeros={true}
            allowEmptyFormatting={true}
            allowNegative={false}
            decimalScale={2}
            className="input-table-presupuesto label-table input-table-required border-10"
            onValueChange={(values) => {
              const { floatValue } = values;

              setMiPresupuesto({
                ...miPresupuesto,
                otrosCostos: floatValue,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default CostoLogistica;
