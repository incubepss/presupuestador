import React from "react";
import { handleEditItemFicha, handleMissingFields } from "../../hooks/calcs";
import TableLabels from "../forms/TableLabels";

function Editoritem({
  title,
  setIsEditing,
  datos,
  editingElement,
  producto,
  setProducto,
  index,
  validacion,
  setMissingFields,
  children,
}) {
  const handleAdd = () => {
    const errorFields = handleMissingFields({
      requiredFields: validacion,
      nuevoCampo: editingElement,
    });

    setMissingFields(errorFields);

    return errorFields;
  };

  return (
    <div
      className="modal fade"
      id={editingElement.descripcion}
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
              data-dismiss="modal"
              onClick={() => {
                if (handleAdd().length === 0) {
                  if (title === "trabajo") {
                    handleEditItemFicha(
                      producto,
                      "remuneracion",
                      editingElement,
                      setProducto,
                      index,
                      setIsEditing
                    );
                  } else if (title === "insumo") {
                    handleEditItemFicha(
                      producto,
                      "insumos",
                      editingElement,
                      setProducto,
                      index,
                      setIsEditing
                    );
                  } else {
                    handleEditItemFicha(
                      producto,
                      "productos",
                      editingElement,
                      setProducto,
                      index,
                      setIsEditing
                    );
                  }
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

export default Editoritem;
