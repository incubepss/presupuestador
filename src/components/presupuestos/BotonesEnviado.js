import React, { useContext } from "react";
import { useRouter } from "next/router";
import PresupuestosContext from "../../context/PresupuestosContext";

function BotonesEnviado({ setMuestraLista }) {
  const router = useRouter();

  const { setShowImprimir, setIsConfirmed } = useContext(PresupuestosContext);

  return (
    <div className="d-flex w-100 justify-between mt-60 mb-40">
      <button
        className="btn btn-lg btn-primary"
        onClick={(e) => {
          setMuestraLista(true);
          e.preventDefault();
          router?.push(`/presupuesto`);
        }}
      >
        Volver
      </button>
      <div>
        <button
          className="btn btn-lg btn-primary"
          onClick={() => {
            setShowImprimir(true);
            setIsConfirmed(true);
            window.scrollTo(0, 0);
          }}
        >
          Vista previa
        </button>
      </div>
    </div>
  );
}

export default BotonesEnviado;
