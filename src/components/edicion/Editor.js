import React from "react";
import { editInDatabase } from "../../hooks/useRepository";
import { usePouch } from "use-pouchdb";
import TableLabels from "../forms/TableLabels";
import Labels from "../forms/Labels";
import { handleMissingFields, roundNumber } from "../../hooks/calcs";

function Editor({
  borderless,
  title,
  setIsEditing,
  datos,
  editingElement,
  setSentData,
  validacion,
  setMissingFields,
  esAmortizacion,
  children,
  handleAdd,
}) {
  const db = usePouch();

  return (
    <div
      className="modal fade"
      id={editingElement._id}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button
              onClick={() => setIsEditing(false)}
              type="button"
              className="close"
              data-dismiss="modal"
              aria-hidden="true"
            >
              &times;
            </button>
            <h4 className="modal-title" id="myModalLabel">
              Editar {title}
            </h4>
          </div>
          <div className="modal-body">
            <div className="bg-white-2 mt-20 py-20 px-20 border-10">
              {children}
            </div>
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
              className="btn btn-primary"
              type="button"
              data-dismiss="modal"
              onClick={() => {
                if (handleAdd === undefined) {
                  editInDatabase(
                    db,
                    editingElement._id,
                    esAmortizacion
                      ? {
                          ...editingElement,
                          valor: roundNumber(
                            editingElement?.precio / editingElement?.meses
                          ),
                        }
                      : editingElement,
                    setIsEditing,
                    setSentData
                  );
                } else {
                  handleAdd();
                }
              }}
            >
              Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Editor;
