import React, { useContext, useState } from "react";
import { usePouch } from "use-pouchdb";
import { useRouter } from "next/router";

import {
  saveCompletePresupuesto,
  useNewRandomId,
} from "../../hooks/useRepository";
import PresupuestosContext from "../../context/PresupuestosContext";

function BotonesConfirmar({ data, setIsLoadingPresupuesto, misPresupuestos }) {
  const [miPresupuestoEnviado, setMiPresupuestoEnviado] = useState({});

  const db = usePouch();

  const router = useRouter();

  const {
    setShowImprimir,
    setShowConfirmar,
    setHasConfirmed,
    setMiPresupuesto,
  } = useContext(PresupuestosContext);

  return (
    <div className="d-flex mx-auto w-fit">
      <button
        type="button"
        className="btn btn-primary btn-lg me-20 d-flex justify-center align-center"
        onClick={(e) => setShowConfirmar(false)}
      >
        Cancelar
      </button>
      <button
        type="button"
        className="btn bg-success-lt btn-lg text-white "
        onClick={(e) => {
          let newId = data?._id ? data?._id : useNewRandomId("presupuesto_");
          let titulo = data?._id
            ? data?.titulo
            : `Presupuesto Nro. ${misPresupuestos?.length + 1}`;
          try {
            let temp = {
              ...data,
              titulo: titulo,
              _id: newId,
            };

            saveCompletePresupuesto(
              db,
              data?._id,
              setIsLoadingPresupuesto,
              setHasConfirmed,
              setMiPresupuestoEnviado,
              temp,
              setMiPresupuesto
            );
          } finally {
            setShowConfirmar(false);
            setShowImprimir(false);
            router.push(`/presupuesto/${newId}`);
          }
        }}
      >
        Confirmar
      </button>
    </div>
  );
}

export default BotonesConfirmar;
