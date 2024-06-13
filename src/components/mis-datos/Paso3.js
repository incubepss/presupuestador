import React from "react";
import { tiposSubrubro } from "../../data/mis-datos";

function Paso3({ data, func }) {
  return (
    <div className="mt-60">
      <h1 className="title-wizard">Rubros</h1>
      <p className="p-wizard mt-5 mb-60">
        Seleccione el rubro al que se dedica la organización.
      </p>
      <hr />
      <div className="d-flex align-column-resp">
        {tiposSubrubro?.map((e) => {
          return (
            <div
              className={
                "w-20 shortcut w-100-resp" +
                `${data?.subrubro === e.nombre ? " shortcut-seleccionado" : ""}`
              }
              onClick={() => func({ ...data, subrubro: e.nombre })}
            >
              <span className={e.color}>
                <img
                  className="img-responsive"
                  src={`/images/iconos/${e.img}`}
                  alt={e.nombre}
                />
              </span>
              <h3>{e.nombre}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Paso3;
