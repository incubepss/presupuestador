import React from "react";

function EditDeleteIcon({ handleEdit, handleDelete }) {
  return (
    <div className="table-12 d-flex">
      <span
        className="glyphicon glyphicon-edit btn-edit my-12 mx-auto cursor-pointer text-warning"
        onClick={() => handleEdit()}
      />
      <img
        src="/icons/delete-table.png"
        className="my-12 mx-auto cursor-pointer"
        alt="Eliminar"
        onClick={() => handleDelete()}
      />
    </div>
  );
}

export default EditDeleteIcon;
