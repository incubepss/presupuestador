import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { usePouch } from "use-pouchdb";
import { deleteInDatabase } from "../../hooks/useRepository";
import PresupuestosContext from "../../context/PresupuestosContext";

export default function ModalBorrarPresupuesto({ show, setShowModal }) {
  const router = useRouter();
  const db = usePouch();
  const [isLoaging, setIsLoaging] = useState(false);
  const { setSentData } = useContext(PresupuestosContext);

  const handleOnClick = () => {
    deleteInDatabase(db, router?.query?.id, setIsLoaging, setSentData);
    setShowModal(!show);
    router?.push(`/presupuesto`);
  };

  return (
    <div
      className="modal fade"
      id="myModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-hidden="true"
            >
              &times;
            </button>
            <h4 className="modal-title" id="myModalLabel">
              ¿Desea eliminar este presupuesto?
            </h4>
          </div>
          <div className="modal-body">
            ¡ATENCIÓN! Esta acción es irreversible.
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-default"
              data-dismiss="modal"
            >
              Cerrar
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-dismiss="modal"
              onClick={handleOnClick}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
