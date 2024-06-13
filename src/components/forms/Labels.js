import React from "react";

function Labels({ modelo }) {
  return (
    <>
      {modelo?.map((m) => {
        return (
          <div className={`table-${m.width}`}>
            <label className="title-table-borderless label-table">
              {m.label}
            </label>
          </div>
        );
      })}
    </>
  );
}

export default Labels;
