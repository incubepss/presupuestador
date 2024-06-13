import React from "react";

function DeleteIcon({ handleDelete }) {
  return (
    <div className="table-12 mb-10">
      <img
        src="/icons/delete-table.png"
        className="my-12 mx-auto cursor-pointer"
        alt="Eliminar"
        onClick={() => handleDelete()}
      />
    </div>
  );
}

export default DeleteIcon;
