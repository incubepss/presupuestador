import React from "react";

function TableLabels({ modelo }) {
  return (
    <>
      {modelo?.map((m, i) => {
        return (
          <div className={`table-${m.width}  mb-10`} key={`labels-${i}`}>
            <label className="label-borderless">{m.label}</label>
          </div>
        );
      })}
    </>
  );
}

export default TableLabels;
