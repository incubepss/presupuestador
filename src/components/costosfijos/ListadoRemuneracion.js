import { useEffect, useState } from "react";
import {
  findInDatabase,
  addInDatabase,
  deleteInDatabase,
  formatDate,
} from "../../hooks/useRepository";
import { usePouch } from "use-pouchdb";
import Loader from "../loader/Loader";
import { getTotales, handleMissingFields } from "../../hooks/calcs";
import {
  modeloCostosFijos,
  modeloCostosFijosEdita,
} from "../../data/costos-fijos";
import NumberFormat from "react-number-format";
import Editor from "../edicion/Editor";
import InputFormCostosFijos from "../costos/InputFormCostosFijos";
import TableLabels from "../forms/TableLabels";
import DeleteIcon from "../forms/DeleteIcon";
import AddIcon from "../forms/AddIcon";

export default function ListadoRemuneracionFija() {
  const [sentData, setSentData] = useState(true);
  const [misRF, setMisRF] = useState();
  const [isLoadingRF, setIsLoadingRF] = useState(true);
  const [nuevaRF, setNuevaRF] = useState({});
  const [totalRF, setTotalRF] = useState(0);
  const [isLoadingDatos, setIsLoadingDatos] = useState(true);
  const [misDatos, setMisDatos] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [editingCosto, setEditingCosto] = useState({});
  const [missingFields, setMissingFields] = useState([]);
  const [missingEditorFields, setMissingEditorFields] = useState([]);

  const db = usePouch();

  // OBTENGO DATA EN PRIMER RENDER
  useEffect(() => {
    findInDatabase(db, "remuneracionfija", setMisRF, setIsLoadingRF);
    findInDatabase(db, "misDatos", setMisDatos, setIsLoadingDatos);
  }, [db, sentData]);

  useEffect(() => {
    getTotales(setIsLoadingRF, misRF, setTotalRF);
  }, [sentData, misRF]);

  const startsEditing = (e) => {
    setIsEditing(true);
    setEditingCosto(e);
  };

  const handleAdd = () => {
    const errorFields = handleMissingFields({
      requiredFields: ["descripcion", "valor"],
      nuevoCampo: nuevaRF,
    });

    setMissingFields(errorFields);

    addInDatabase(
      errorFields?.length === 0,
      db,
      nuevaRF,
      setNuevaRF,
      "remuneracionfija",
      setSentData
    );
  };

  return (
    <Loader isloading={isLoadingRF && isLoadingDatos}>
      {isEditing && (
        <Editor
          borderless={false}
          title="costo fijo"
          setIsEditing={setIsEditing}
          datos={modeloCostosFijos}
          editingElement={editingCosto}
          setSentData={setSentData}
          validacion={["descripcion", "valor"]}
          setMissingFields={setMissingEditorFields}
        >
          <InputFormCostosFijos
            modelo={modeloCostosFijos}
            data={editingCosto}
            setData={setEditingCosto}
            missingFields={missingEditorFields}
            keyDown={false}
          />
        </Editor>
      )}
      {/* ------------------------------ INICIO REMUNIERACION FIJA  ------------------------------ */}
      <>
        {misDatos && (
          <div className="d-flex flex-column w-100">
            {/* INICIO INTRO */}
            <>
              <div className="d-flex justify-between">
                <h2 className="titulo-secundario mt-60 mb-20">
                  Remuneración al trabajo fijo
                </h2>

                <NumberFormat
                  value={totalRF}
                  className="titulo-secundario mt-60 mb-20 pe-35"
                  displayType="text"
                  thousandSeparator={"."}
                  decimalSeparator={","}
                  prefix={"$"}
                  decimalScale={2}
                  fixedDecimalScale={true}
                  renderText={(value, props) => <h2 {...props}>{value}</h2>}
                />
              </div>
              <p className="bajadas mb-20">
                Si dentro de tu UP el pago o el retiro se establece por jornada
                de trabajo o turno, sin importar la cantidad de producción
                realizada, entonces la remuneración al trabajo es considerada un{" "}
                <strong>costo fijo</strong>. Es decir, que si aumenta o
                disminuye la producción el pago o el retiro por jornada
                trabajada es el mismo. No se contemplan aquí las horas extras.
              </p>
            </>
            {/* FIN INTRO */}

            {/* INICIO LISTADO */}
            <div className="table-overflow bg-white-2 mt-20 py-20 px-20 border-10">
              <div className="table-overflow-content">
                {/* inicio labels */}
                <div className="d-flex">
                  <TableLabels modelo={modeloCostosFijos} />
                </div>
                {/* fin labels */}
                {/* inicio contenido  */}
                {misRF?.map((e, i) => {
                  return (
                    <div className="my-0" key={`rem-${i}`}>
                      <div className="d-flex">
                        {modeloCostosFijos?.map((m, mi) => {
                          return (
                            <div
                              className={`table-${m.width} mb-10`}
                              key={`rem-${mi}`}
                              data-toggle="modal"
                              data-target={`#${e._id}`}
                              onClick={() => startsEditing(e)}
                            >
                              {m?.nombre === "valor" && (
                                <NumberFormat
                                  className="input-table label-table input-table-required border-10 me-10"
                                  value={e?.[m?.nombre]}
                                  displayType="text"
                                  thousandSeparator={"."}
                                  decimalSeparator={","}
                                  prefix={"$"}
                                  decimalScale={2}
                                  fixedDecimalScale={true}
                                />
                              )}
                              {m?.nombre === "actualizacion" && (
                                <div className={`input-noedit border-10 me-10`}>
                                  {e?.[m?.nombre]
                                    ? formatDate(e?.[m?.nombre])
                                    : ""}
                                </div>
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
                              setIsLoadingRF,
                              setSentData
                            )
                          }
                        />
                      </div>
                    </div>
                  );
                })}
                {/* fin contenido */}
                {/* INICIO AGREGA */}
                <div className="d-flex">
                  <InputFormCostosFijos
                    modelo={modeloCostosFijos}
                    data={nuevaRF}
                    setData={setNuevaRF}
                    missingFields={missingFields}
                    keyDown={true}
                    handleAdd={handleAdd}
                  />
                  <AddIcon handleAdd={handleAdd} />
                </div>
                {/* FIN AGREGA */}
              </div>
            </div>
            {/* FIN LISTADO */}
          </div>
        )}
      </>
      {/* ------------------------------ FIN REMUNIERACION FIJA ------------------------------ */}
    </Loader>
  );
}
