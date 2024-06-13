import React from "react";

function TableLabelsGrey({ modelo }) {
  return (
    <>
      {modelo?.map((m, i) => {
        return (
          <div key={i} className={`table-${m.width} d-flex align-center`}>
            <label className="px-10 label-borderless mb-0">{m.label}</label>
          </div>
        );
      })}
    </>
  );
}

export default TableLabelsGrey;
