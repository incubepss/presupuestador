import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";

import { useDoc, usePouch } from "use-pouchdb";
import { handleChange, editInDatabase } from "../../hooks/useRepository";
import Loader from "../loader/Loader";

function Integrantes() {
  const [misDatos, setMisDatos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sentData, setSentData] = useState(false);
  const [fadeProp, setFadeProp] = useState(
    "alert alert-success me-20 mb-0 alert-custom"
  );

  const db = usePouch();

  const { doc: docMisDatos, loading, error } = useDoc("misDatos");

  useEffect(() => {
    if (!loading && docMisDatos?._id) {
      setMisDatos(docMisDatos);
    }
  }, [loading, docMisDatos]);

  useEffect(() => {
    const timeout = setInterval(() => {
      setFadeProp("alert alert-success me-20 mb-0 alert-custom");
    }, 1500);
    return () => clearInterval(timeout);
  }, [fadeProp]);

  const handleSubmit = () => {
    editInDatabase(db, "misDatos", misDatos, setIsLoading, setSentData);
    setFadeProp("alert alert-success me-20 mb-0 alert-custom fade-in");
  };

  return (
    <Loader isLoading={isLoading && loading}>
      <div className="col bg-grisclaro my-30 py-30 col-md-12">
        <div className="row">
          <div className="col col-md-4 col-sm-3">
            <form role="form">
              <label className="control-label" type="text" for="inputSuccess2">
                Indique la cantidad de integrantes
              </label>
              <div>
                <label>Mujeres</label>
                <NumberFormat
                  value={misDatos?.integrantes?.mujeres}
                  className="form-control"
                  thousandSeparator={"."}
                  decimalSeparator={","}
                  decimalScale={0}
                  allowNegative={false}
                  onValueChange={(values) => {
                    const { formattedValue } = values;

                    setMisDatos({
                      ...misDatos,
                      integrantes: {
                        ...misDatos?.integrantes,
                        mujeres: formattedValue,
                      },
                    });
                  }}
                />
                <label className="mt-10">Varones</label>
                <NumberFormat
                  value={misDatos?.integrantes?.varones}
                  className="form-control"
                  thousandSeparator={"."}
                  decimalSeparator={","}
                  decimalScale={0}
                  allowNegative={false}
                  onValueChange={(values) => {
                    const { formattedValue } = values;

                    setMisDatos({
                      ...misDatos,
                      integrantes: {
                        ...misDatos?.integrantes,
                        varones: formattedValue,
                      },
                    });
                  }}
                />
                <label className="mt-10">Otros</label>
                <NumberFormat
                  value={misDatos?.integrantes?.nobinarie}
                  className="form-control"
                  thousandSeparator={"."}
                  decimalSeparator={","}
                  decimalScale={0}
                  allowNegative={false}
                  onValueChange={(values) => {
                    const { formattedValue } = values;

                    setMisDatos({
                      ...misDatos,
                      integrantes: {
                        ...misDatos?.integrantes,
                        nobinarie: formattedValue,
                      },
                    });
                  }}
                />
              </div>
            </form>
          </div>
          <div className="col col-md-8 col-sm-9">
            <label className="control-label" type="text" for="inputSuccess2">
              La remuneración al trabajo de les integrantes es
            </label>
            <form
              role="form"
              className="colflex"
              onChange={(e) =>
                handleChange(
                  e.target.value,
                  "remuneracion",
                  misDatos,
                  setMisDatos
                )
              }
            >
              <input
                className="me-5 mt-5 input-radio"
                type="radio"
                name="action"
                value="jornada"
                checked={
                  misDatos?.remuneracion && misDatos?.remuneracion === "jornada"
                }
              />
              <label className="mr-15 mt-5 label-table">Por Jornada</label>
              <input
                className="me-5 mt-5 input-radio"
                type="radio"
                name="action"
                value="produccion"
                checked={
                  misDatos?.remuneracion &&
                  misDatos?.remuneracion === "produccion"
                }
              />
              <label className="mr-15 mt-5 label-table">Por Producción</label>
              <input
                className="me-5 mt-5 input-radio"
                type="radio"
                value="mixta"
                name="action"
                checked={
                  misDatos?.remuneracion && misDatos?.remuneracion === "mixta"
                }
              />
              <label className="label-table mt-5">
                Mixta (Una parte por jornada y otra por producción)
              </label>
            </form>
          </div>
        </div>
        <div className="d-flex mt-20 justify-end">
          <div className={fadeProp}>Datos guadados con éxito</div>
          <button
            className="btn btn-lg btn-primary"
            onClick={() => handleSubmit()}
          >
            Guardar Cambios
          </button>
          <br />
        </div>
      </div>
    </Loader>
  );
}

export default Integrantes;
