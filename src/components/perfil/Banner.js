import React from "react";
import NumberFormat from "react-number-format";

export default function Banner({ perfil }) {
  return (
    <div className="py-10 mb-20 bg-blanco">
      <div className="row d-flex align">
        <div className="col col-sm-10">
          <div className="d-flex align-column-resp">
            <div className="d-flex flex-column me-80">
              <p className="bajadas bg-blanco">
                {perfil?.calle} {perfil?.numero}
              </p>
              <p className="bajadas bg-blanco">
                {perfil?.localidad}
                {perfil?.postal && ", " + perfil?.postal}
              </p>
              <NumberFormat
                format="+54 (###) ####-####"
                value={perfil?.telefono}
                className="bajadas bg-blanco"
                displayType="text"
              />
            </div>
            <div className="d-flex flex-column">
              <p className="bajadas bg-blanco">
                {perfil?.mail_contacto ? perfil?.mail_contacto : perfil?.mail}
              </p>
              <p className="bajadas bg-blanco">{perfil?.rrss}</p>
              <p className="bajadas bg-blanco">{perfil?.cuit}</p>
              <p className="bajadas bg-blanco">{perfil?.cbu}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
