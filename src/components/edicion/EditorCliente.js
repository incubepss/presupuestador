import React from "react";
import { addInDatabase, editInDatabase } from "../../hooks/useRepository";
import { usePouch } from "use-pouchdb";
import { handleMissingFields } from "../../hooks/calcs";

function EditorCliente({
  setIsEditing,
  editingElement,
  setSentData,
  validacion,
  setMissingFields,
  isAdding,
  setEditingElement,
  children,
}) {
  const db = usePouch();

  const handleAdd = () => {
    const errorFields = handleMissingFields({
      requiredFields: validacion,
      nuevoCampo: editingElement,
    });

    setMissingFields(errorFields);

    return errorFields;
  };

  return (
    <>
      <div
        className="blur-editor-cliente"
        onClick={() => setIsEditing(false)}
      ></div>
      <div className="container-editor-cliente py-30 px-30 bg-white-2 border-10">
        {/* inicio contenido */}
        <div className="d-flex">{children}</div>
        {/* fin contenido */}
        {/* inicio botones  */}
        <div className="d-flex mt-20 justify-between">
          <button
            className="btn btn-primary"
            onClick={() => setIsEditing(false)}
          >
            Cancelar
          </button>
          <button
            className="btn bg-blanco bg-success-lt"
            onClick={() => {
              const errorFields = handleAdd();

              if (errorFields.length === 0) {
                if (isAdding) {
                  addInDatabase(
                    errorFields?.length === 0,
                    db,
                    editingElement,
                    setEditingElement,
                    "cliente",
                    setSentData
                  );
                  setIsEditing(false);
                } else {
                  editInDatabase(
                    db,
                    editingElement._id,
                    editingElement,
                    setIsEditing,
                    setSentData
                  );
                }
              }
            }}
          >
            Guardar cambios
          </button>
        </div>
        {/* fin botones  */}
      </div>
    </>
  );
}

export default EditorCliente;
