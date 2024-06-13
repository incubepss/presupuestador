import React from "react";

import NumberFormat from "react-number-format";

const DatosBasicos = ({ perfil, funct, errores, setErrores }) => {
  const handleChange = (e, id) => {
    funct({ ...perfil, [id]: e.target.value });

    if (e.target.value.trim() === "") {
      setErrores({ ...errores, [id]: "Este campo es requerido" });
    } else {
      const nuevosErrores = { ...errores };
      delete nuevosErrores[id];
      setErrores(nuevosErrores);
    }
  };

  const handleImage = (e) => {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
      funct({ ...perfil, foto: reader.result });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="mt-20">
      <div className="row">
        <div className="col col-sm-9">
          <div className="row">
            <div className="col-sm-8">
              <div className="form-group">
                <label className="control-label" htmlFor="inputSuccess2">
                  Nombre de la organización
                </label>
                <input
                  className="form-control"
                  data-placeholder="Elegí una opción"
                  onChange={(e) => handleChange(e, "nombre")}
                  value={perfil?.nombre}
                />
                {errores["nombre"] && (
                  <div className="error">{errores["nombre"]}</div>
                )}
              </div>
            </div>
          </div>
          <div className="row mt-20">
            <div className="col col-sm-4">
              <div className="form-group has-button">
                <label className="control-label" for="inputSuccess2">
                  Rubro
                </label>
                <select
                  className="form-control chosen-select"
                  data-placeholder="Elegí una opción"
                  onChange={(e) => handleChange(e, "rubro")}
                  value={perfil?.rubro}
                >
                  <option></option>
                  <option value="Alimentación y Gastronomía">
                    Alimentación y Gastronomía
                  </option>
                  <option value="Textil, Confección y Calzado">
                    Textil, Confección y Calzado
                  </option>
                  <option value="Ecología Urbana">Ecología Urbana</option>
                  <option value="Juguetes">Juguetes</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
            </div>
            <div className="col-sm-8">
              <div className="form-group has-button">
                <label className="control-label" for="inputSuccess2">
                  Tipo de Organización
                </label>
                <select
                  className="form-control chosen-select"
                  data-placeholder="Elegí una opción"
                  onChange={(e) => handleChange(e, "tipo_org")}
                  value={perfil?.tipo_org}
                >
                  <option></option>
                  <option value="Cooperativa">Cooperativa</option>
                  <option value="Grupo Asociativo">Grupo Asociativo</option>
                  <option value="Asociación Civil">Asociación Civil</option>
                  <option value="Emprendedor Individual">
                    Emprendedor Individual
                  </option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row mt-20">
            <div className="col col-sm-4">
              <div className="form-group has-button">
                <label className="control-label" for="inputSuccess2">
                  Condición de IVA
                </label>
                <select
                  className="form-control chosen-select"
                  data-placeholder="Elegí una opción"
                  onChange={(e) => handleChange(e, "condicion_iva")}
                  value={perfil?.condicion_iva}
                >
                  <option></option>
                  <option value="Responsable Inscripto">
                    Responsable Inscripto
                  </option>
                  <option value="Responsable no Inscripto">
                    Responsable no Inscripto
                  </option>
                  <option value="Responsable Monotributo">
                    Responsable Monotributo
                  </option>
                  <option value="Sujeto Exento">Sujeto Exento</option>
                  <option value="Monotributista Social">
                    Monotributista Social
                  </option>
                </select>
              </div>
            </div>
            <div className="col col-sm-4">
              <div className="form-group">
                <label
                  className="control-label"
                  type="text"
                  for="inputSuccess2"
                >
                  CUIT
                </label>
                <NumberFormat
                  format="##-########-#"
                  mask="_"
                  value={perfil?.cuit}
                  className="form-control"
                  onValueChange={(values) => {
                    const { formattedValue } = values;

                    funct({ ...perfil, cuit: formattedValue });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col col-sm-3">
          <div className="d-flex align-center flex-column">
            {perfil?.foto ? (
              <img
                src={perfil?.foto}
                alt="foto de perfil"
                className="image-perfil"
              />
            ) : (
              <div className="image-perfil bg-white-3 mb-20">
                <i className="glyphicon glyphicon-picture"></i>
              </div>
            )}
            <input
              type="file"
              id="img"
              name="img"
              accept="image/*"
              onChange={(e) => handleImage(e)}
              className="bg-white-3 text-dark boton-input"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatosBasicos;
