import React from "react";

import NumberFormat from "react-number-format";

const DatosBancarios = ({ perfil, funct }) => {
  const handleChange = (e, id) => {
    if (id !== "bancoNacion") {
      funct({ ...perfil, [id]: e.target.value });
    } else {
      funct({ ...perfil, [id]: e.target.checked });
    }
  };

  return (
    <div>
      <h2 className="titulo-secundario">Datos Bancarios</h2>
      <div className="row">
        <div className="col col-sm-3">
          <div className="form-group has-button">
            <label className="control-label" for="inputSuccess2">
              Banco
            </label>
            <input
              className="form-control"
              data-placeholder="Elegí una opción"
              onChange={(e) => handleChange(e, "banco")}
              value={perfil?.banco}
            />
          </div>
        </div>
        <div className="col col-sm-3">
          <div className="form-group">
            <label className="control-label" type="text" for="inputSuccess2">
              CBU Nº
            </label>
            <NumberFormat
              format="#########-#############"
              mask="_"
              className="form-control chosen-select"
              data-placeholder="Elegí una opción"
              value={perfil?.cbu}
              onValueChange={(values) => {
                const { formattedValue } = values;

                funct({ ...perfil, cbu: formattedValue });
              }}
            />
          </div>
        </div>
        <div className="col col-sm-2">
          <div className="form-group has-button">
            <label className="control-label" for="inputSuccess2">
              Alias
            </label>
            <input
              className="form-control"
              data-placeholder="Elegí una opción"
              onChange={(e) => handleChange(e, "alias")}
              value={perfil?.alias}
            />
          </div>
        </div>
        <div className="col col-sm-4">
          <form className="mt-25 d-flex align-center">
            <input
              className="form-control input-checkbox me-10"
              type="checkbox"
              data-placeholder="Elegí una opción"
              onChange={(e) => handleChange(e, "bancoNacion")}
              checked={perfil?.bancoNacion}
            />
            <label className="control-label m-0" for="inputSuccess2">
              Tiene cuenta en el Banco Ciudad
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DatosBancarios;
