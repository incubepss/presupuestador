import React, { useContext } from "react";
import BotonesConfirmar from "./BotonesConfirmar";
import PresupuestosContext from "../../context/PresupuestosContext";

export default function Confirmar({
  data,
  setIsLoadingPresupuesto,
  misPresupuestos,
}) {
  const { setShowConfirmar } = useContext(PresupuestosContext);

  return (
    <>
      <div
        className="blur-editor-compartir"
        onClick={() => setShowConfirmar(false)}
      ></div>

      <div className="container-compartir">
        <div className="d-flex w-100 flex-column align-center">
          <img
            width="124px"
            height="124px"
            src="/icons/warning.png"
            alt="Alerta"
          />
          <h1 className="titulo-secundario text-center mb-30">
            Si confirmás el presupuesto
            <br /> ya no podrás volver a modificarlo.
          </h1>
        </div>

        <BotonesConfirmar
          data={data}
          setIsLoadingPresupuesto={setIsLoadingPresupuesto}
          misPresupuestos={misPresupuestos}
        />
      </div>
    </>
  );
}
