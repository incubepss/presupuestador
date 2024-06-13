import React from "react";
import { tiposDeOrg } from "../../data/mis-datos";

function Paso0({ data, func }) {
  return (
    <div className="mt-60">
      <h1 className="title-wizard">Tipo de Organización</h1>
      <p className="p-wizard mt-5 mb-60">
        Seleccione el tipo de organización a la que pertenece.
      </p>
      <hr />
      <div className="d-flex align-column-resp">
        {tiposDeOrg?.map((e) => {
          return (
            <div
              className={
                "w-20 shortcut w-100-resp" +
                `${data?.tipo_org === e.nombre ? " shortcut-seleccionado" : ""}`
              }
              onClick={() => func({ ...data, tipo_org: e.nombre })}
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

export default Paso0;
