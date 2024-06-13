import React, { useState, useEffect } from "react";
import { tiposDeOrg } from "../../data/mis-datos";
import NumberFormat from "react-number-format";
import { GetUserStatus } from "../../hooks/session";

function Paso1({ formData, func }) {
  const [email, SetEmail] = useState();
  const [emailExist, setEmailExist] = useState({});

  const handleChange = (id, e) => {
    func({ ...formData, [id]: e.target.value });
  };

  const mailValidate = (e) => {
    SetEmail(e.target.value);
    GetUserStatus(e.target.value, setEmailExist);
  };
  useEffect(() => {
    emailExist.status
      ? func({ ...formData, ["mail"]: "" })
      : func({ ...formData, ["mail"]: email });
  }, [emailExist]);

  useEffect(() => {
    func({ ...formData, ["mail_contacto"]: email });
  }, [email]);

  const org = () => tiposDeOrg?.find((e) => e.nombre === formData?.tipo_org);

  return (
    <div className="mt-60">
      <h1 className="title-wizard">Tipo de Organización</h1>
      <p className="p-wizard mt-5 mb-60">
        Seleccione el tipo de organización a la que pertenece.
      </p>
      <hr />
      <div className="w-100 d-flex align-column-resp">
        <div className="w-40 shortcut w-100-resp">
          <span className={org()?.color}>
            <img
              className="img-responsive"
              src={`/images/iconos/${org()?.img}`}
              alt={org()?.nombre}
            />
          </span>
          <h3>{formData?.tipo_org}</h3>
        </div>
        <div className="w-60 w-100-resp">
          <div className="form-group">
            <label className="control-label">Nombre de la organización</label>
            <input
              className="form-control input-table-required"
              value={formData?.nombre ? formData?.nombre : ""}
              type="text"
              onChange={(e) => handleChange("nombre", e)}
            />
          </div>
          <div className="d-flex justify-between align-column-resp">
            <div className="form-group w-45 w-100-resp">
              <label className="control-label">Teléfono</label>
              <NumberFormat
                format={"+54 (###) ####-####"}
                mask="_"
                value={formData?.telefono}
                allowLeadingZeros={true}
                allowNegative={false}
                allowEmptyFormatting={true}
                className="form-control input-table-required"
                onValueChange={(values) => {
                  const { floatValue } = values;

                  func({
                    ...formData,
                    telefono: floatValue,
                  });
                }}
              />
            </div>
            <div
              className={`form-group w-45 w-100-resp ${
                emailExist.status === true && "has-error"
              }`}
            >
              <label className="control-label">Correo electrónico</label>
              <input
                className="form-control input-table-required"
                type="email"
                value={email}
                onChange={(e) => {
                  SetEmail(e.target.value);
                }}
                onBlur={(e) => mailValidate(e)}
              />
              {emailExist.status === true && (
                <div className={`alert alert-danger mt-10`}>
                  {emailExist?.msg}
                </div>
              )}
            </div>
          </div>
          <>
            {formData?.tipo_org === "Cooperativa" ? (
              <div className="form-group d-flex flex-column">
                <label className="control-label">Tipo de organización</label>
                <select
                  className="form-control input-table-required"
                  onChange={(e) => handleChange("tipo", e)}
                  value={formData?.tipo ? formData?.tipo : ""}
                >
                  <option></option>
                  <option>Cooperativa de Trabajo</option>
                  <option>Cooperativa de Consumo</option>
                  <option>Otras</option>
                </select>
              </div>
            ) : (
              formData?.tipo_org === "Otro" && (
                <div className="form-group">
                  <label className="control-label">Tipo de organización</label>
                  <input
                    value={formData?.tipo ? formData?.tipo : ""}
                    className="form-control input-table-required"
                    type="text"
                    onChange={(e) => handleChange("tipo", e)}
                  />
                </div>
              )
            )}
          </>
        </div>
      </div>
    </div>
  );
}

export default Paso1;
