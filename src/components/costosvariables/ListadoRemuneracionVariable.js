import { useEffect, useState } from "react";
import Loader from "../loader/Loader";
import {
  addInDatabase,
  findInDatabase,
  deleteInDatabase,
  formatDate,
} from "../../hooks/useRepository";
import { usePouch } from "use-pouchdb";
import {
  modeloRemuneraciones,
  modeloRemuneracionesEdita,
} from "../../data/costos-variables";
import NumberFormat from "react-number-format";
import TableLabels from "../forms/TableLabels";
import Editor from "../edicion/Editor";
import InputFormCostosFijos from "../costos/InputFormCostosFijos";
import DeleteIcon from "../forms/DeleteIcon";
import AddIcon from "../forms/AddIcon";
import { getTotales, handleMissingFields } from "../../hooks/calcs";

export default function ListadoRemuneracionVariable() {
  const [isLoadingRV, setIsLoadingRV] = useState(true);
  const [nuevaRV, setNuevaRV] = useState({});
  const [sentData, setSentData] = useState(true);
  const [misRV, setMisRV] = useState();
  const [isLoadingDatos, setIsLoadingDatos] = useState(true);
  const [misDatos, setMisDatos] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [editingCosto, setEditingCosto] = useState({});
  const [totalRV, setTotalRV] = useState(0);
  const [missingFields, setMissingFields] = useState([]);
  const [missingEditorFields, setMissingEditorFields] = useState([]);

  const db = usePouch();

  // OBTENGO DATA EN PRIMER RENDER
  useEffect(() => {
    findInDatabase(db, "remuneracionvar", setMisRV, setIsLoadingRV);
    findInDatabase(db, "misDatos", setMisDatos, setIsLoadingDatos);
  }, [db, sentData]);

  useEffect(() => {
    getTotales(setIsLoadingRV, misRV, setTotalRV);
  }, [sentData, misRV]);

  const startsEditing = (e) => {
    setIsEditing(true);
    setEditingCosto(e);
  };

  const handleAdd = () => {
    const errorFields = handleMissingFields({
      requiredFields: ["descripcion", "valor"],
      nuevoCampo: nuevaRV,
    });

    setMissingFields(errorFields);

    addInDatabase(
      errorFields?.length === 0,
      db,
      nuevaRV,
      setNuevaRV,
      "remuneracionvar",
      setSentData
    );
  };

  return (
    <Loader isloading={isLoadingRV && isLoadingDatos}>
      {isEditing && (
        <Editor
          borderless={false}
          title="costo variable"
          setIsEditing={setIsEditing}
          datos={modeloRemuneraciones}
          editingElement={editingCosto}
          setSentData={setSentData}
          validacion={["descripcion", "valor"]}
          setMissingFields={setMissingEditorFields}
        >
          <InputFormCostosFijos
            modelo={modeloRemuneraciones}
            data={editingCosto}
            setData={setEditingCosto}
            missingFields={missingEditorFields}
            keyDown={false}
          />
        </Editor>
      )}

      {/* -------------------------- INICIO REMUNERACION VARIABLE -------------------------- */}
      <>
        {misDatos && (
          <div className="d-flex flex-column w-100">
            <div>
              <h2 className="titulo-secundario mt-60 mb-20">
                Remuneración al trabajo variable
              </h2>
              <p className="bajadas mb-20">
                A diferencia de la opción anterior, si dentro de tu UP el pago o
                el retiro se establece por la cantidad de horas trabajadas o por
                el volumen de producción de bienes o servicios, entonces la
                remuneración al trabajo es considerada como un{" "}
                <strong>costo variable</strong>. Es decir, que si aumenta o
                disminuye la producción el pago o el retiro va a variar en el
                mismo sentido.
              </p>
            </div>
            {/* inicio labels */}
            <div className="table-overflow bg-white-2 mt-20 py-20 px-20 border-10">
              <div className="table-overflow-content">
                <div className="d-flex">
                  <TableLabels modelo={modeloRemuneraciones} />
                </div>
                {/* fin labels */}
                {/* inicio listado */}
                {misRV?.map((e, i) => {
                  return (
                    <div className="my-0" key={`revar-${i}`}>
                      <div className="d-flex">
                        {modeloRemuneraciones?.map((m, mi) => {
                          return (
                            <div
                              className={`table-${m.width} mb-10`}
                              key={`revar-${mi}`}
                              data-toggle="modal"
                              data-target={`#${e._id}`}
                              onClick={() => startsEditing(e)}
                            >
                              {m?.nombre === "actualizacion" && (
                                <div className={`input-noedit border-10 me-10`}>
                                  {e?.[m?.nombre]
                                    ? formatDate(e?.[m?.nombre])
                                    : ""}
                                </div>
                              )}
                              {m?.nombre === "valor" && (
                                <NumberFormat
                                  className={`input-table label-table input-table-required border-10 me-10`}
                                  value={e?.[m?.nombre]}
                                  displayType="text"
                                  thousandSeparator={"."}
                                  decimalSeparator={","}
                                  prefix={"$"}
                                  decimalScale={2}
                                  fixedDecimalScale={true}
                                />
                              )}
                              {m?.nombre === "descripcion" && (
                                <div className="input-table label-table input-table-required border-10 me-10">
                                  {e?.[m?.nombre]}
                                </div>
                              )}
                            </div>
                          );
                        })}
                        <DeleteIcon
                          handleDelete={() =>
                            deleteInDatabase(
                              db,
                              e?._id,
                              setIsLoadingRV,
                              setSentData
                            )
                          }
                        />
                      </div>
                    </div>
                  );
                })}
                {/* fin listado */}
                {/* inicio agrega */}

                <div className="d-flex">
                  <InputFormCostosFijos
                    modelo={modeloRemuneraciones}
                    data={nuevaRV}
                    setData={setNuevaRV}
                    missingFields={missingEditorFields}
                    keyDown={true}
                    handleAdd={handleAdd}
                  />
                  <AddIcon handleAdd={handleAdd} />
                </div>

                {/* fin agrega */}
              </div>
            </div>
          </div>
        )}
      </>
      {/* -------------------------- FIN REMUNERACION VARIABLE -------------------------- */}
    </Loader>
  );
}
