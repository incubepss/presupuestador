import React from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

function TableLabelsBorderless({ modelo }) {
  const tooltip = (
    <Tooltip id="tooltipe" placement="top">
      El concepto de excedente hace referencia a las <strong>ganancias</strong>.
    </Tooltip>
  );

  return (
    <>
      {modelo?.map((e, i) => {
        return (
          <div key={i} className={`table-${e.width}`}>
            <label className="label-borderless">
              {e.label}{" "}
              {e.nombre === "excedente" && (
                <OverlayTrigger defaultOverlayShown={true} overlay={tooltip}>
                  <i
                    className="glyphicon glyphicon-question-sign info-tooltip"
                    title="El concepto de excedente hace referencia a las ganancias."
                  ></i>
                </OverlayTrigger>
              )}
            </label>
          </div>
        );
      })}
    </>
  );
}

export default TableLabelsBorderless;
