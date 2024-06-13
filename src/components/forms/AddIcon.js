import React from "react";

function AddIcon({ handleAdd }) {
  return (
    <div className="table-12 d-flex">
      <img
        src="/icons/add-table.png"
        className="my-12 mx-auto cursor-pointer"
        alt="Agregar"
        onClick={() => {
          handleAdd();
        }}
      />
    </div>
  );
}

export default AddIcon;
