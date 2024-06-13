import React, { useRef, useState } from "react";
import { estadosCambio, getStatusConfig, useOutsideAlerter } from "./functions";
import { editInDatabase } from "../../hooks/useRepository";
import { usePouch } from "use-pouchdb";

function CambioEstado({ presu, setIsLoadingPresus, setSentData }) {
  const [muestraSelect, setMuestraSelect] = useState(false);

  const db = usePouch();

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setMuestraSelect);

  return (
    <>
      {presu?.estado === "Confirmado" ||
      presu?.estado === "Aprobado" ||
      presu?.estado === "Rechazado" ? (
        <div
          className={`px-10 pt-10 container-cambio-estado ${
            muestraSelect ? " box-shadow bg-white" : "bg-white-2"
          }`}
          ref={wrapperRef}
        >
          {muestraSelect ? (
            estadosCambio.map((m, i) => {
              return (
                <button
                  className={`status-description mb-10 btn-no ${
                    getStatusConfig(m).bgClass
                  } ${getStatusConfig(m).color}`}
                  key={i}
                  onClick={() => {
                    try {
                      editInDatabase(
                        db,
                        presu._id,
                        { ...presu, estado: m },
                        setIsLoadingPresus,
                        setSentData,
                        false
                      );
                    } finally {
                      setMuestraSelect(false);
                    }
                  }}
                >
                  {m}
                </button>
              );
            })
          ) : (
            <>
              <div
                className={`status-description ${
                  getStatusConfig(presu?.estado).bgClass
                } ${getStatusConfig(presu?.estado).color}`}
                onClick={() => setMuestraSelect(true)}
              >
                <span className="me-3">{presu?.estado}</span>
                <img src="/icons/arrow-down.png" alt="Ver opciones" />
              </div>
            </>
          )}
        </div>
      ) : (
        <div
          className={`status-description mx-auto ${
            getStatusConfig(presu?.estado).bgClass
          } ${getStatusConfig(presu?.estado).color}`}
        >
          <span>{presu?.estado}</span>
        </div>
      )}
    </>
  );
}

export default CambioEstado;
