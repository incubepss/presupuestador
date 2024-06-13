import React from "react";

import NumberFormat from "react-number-format";

const DatosContacto = ({ perfil, funct }) => {
  const handleChange = (e, id) => {
    funct({ ...perfil, [id]: e.target.value });
  };

  return (
    <div>
      <h2 className="titulo-secundario mt-30">Datos de Contacto</h2>
      <div className="row">
        <div className="col col-sm-4">
          <div className="form-group">
            <label className="control-label" for="inputSuccess2">
              Calle
            </label>
            <input
              className="form-control"
              data-placeholder="Elegí una opción"
              onChange={(e) => handleChange(e, "calle")}
              value={perfil?.calle}
            />
          </div>
        </div>
        <div className="col col-sm-2">
          <div className="form-group">
            <label className="control-label" type="text" for="inputSuccess2">
              Número
            </label>
            <input
              className="form-control"
              data-placeholder="Elegí una opción"
              onChange={(e) => handleChange(e, "numero")}
              value={perfil?.numero}
            />
          </div>
        </div>
        <div className="col col-sm-3">
          <div className="form-group">
            <label className="control-label" type="text" for="inputSuccess2">
              Localidad
            </label>
            <input
              className="form-control"
              data-placeholder="Elegí una opción"
              onChange={(e) => handleChange(e, "localidad")}
              value={perfil?.localidad}
            />
          </div>
        </div>
        <div className="col col-sm-3">
          <div className="form-group">
            <label className="control-label" type="text" for="inputSuccess2">
              Código Postal
            </label>
            <input
              className="form-control"
              data-placeholder="Elegí una opción"
              onChange={(e) => handleChange(e, "postal")}
              value={perfil?.postal}
            />
          </div>
        </div>
      </div>
      <div className="row mt-20">
        <div className="col col-sm-4">
          <div className="form-group">
            <label className="control-label" type="text" for="inputSuccess2">
              Teléfono
            </label>
            <NumberFormat
              format="+54 (###) ####-####"
              value={perfil?.telefono}
              className="form-control"
              allowNegative={false}
              onValueChange={(values) => {
                const { formattedValue } = values;

                funct({ ...perfil, telefono: formattedValue });
              }}
            />
          </div>
        </div>
        <div className="col col-sm-4">
          <div className="form-group">
            <label className="control-label" type="text" for="inputSuccess2">
              Correo electrónico
            </label>
            <input
              className="form-control"
              onChange={(e) => handleChange(e, "mail_contacto")}
              value={perfil?.mail_contacto}
              data-placeholder="Elegí una opción"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatosContacto;
