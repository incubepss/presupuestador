import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getReduced } from "../../hooks/calcs";
import NumberFormat from "react-number-format";

export default function Costos({ costosFijos, TrabajoFijo }) {
  const [sumaCostosFijos, setSumaCostosFijos] = useState(0);
  const [sumaTrabajoFijo, setSumaTrabajoFijo] = useState(0);

  useEffect(() => {
    const temp = getReduced(costosFijos, "valor");
    setSumaCostosFijos(temp);
  }, [costosFijos]);

  useEffect(() => {
    setSumaTrabajoFijo(getReduced(TrabajoFijo, "valor"));
  }, [TrabajoFijo]);
  if (sumaCostosFijos === 0 && sumaTrabajoFijo === 0) {
    return false;
  }
  return (
    <div className="card">
      <Link href="/remuneracion">
        <a href="#" className="btn btn-primary pull-right" role="button">
          Ver más
        </a>
      </Link>
      <h2>Mis costos</h2>
      <div className="card-content row">
        <div className="col col-sm-6">
          <Link href={"/costos/fijos"}>
            <div className="card-tag card-tag-sm">
              <h5>Costos fijos por mes</h5>
              <NumberFormat
                value={sumaCostosFijos}
                displayType="text"
                thousandSeparator={"."}
                decimalSeparator={","}
                prefix={"$"}
                decimalScale={2}
                fixedDecimalScale={true}
                renderText={(value, props) => <h3 {...props}>{value}</h3>}
              />
            </div>
          </Link>
        </div>
        <div className="col col-sm-6">
          <Link href="/remuneracion">
            <div className="card-tag">
              <h5>Remuneración al trabajo por mes</h5>
              <NumberFormat
                value={sumaTrabajoFijo}
                displayType="text"
                thousandSeparator={"."}
                decimalSeparator={","}
                prefix={"$"}
                decimalScale={2}
                fixedDecimalScale={true}
                renderText={(value, props) => <h3 {...props}>{value}</h3>}
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
