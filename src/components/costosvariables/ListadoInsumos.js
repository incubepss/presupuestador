import { useEffect, useState, useRef } from "react";
import Loader from "../loader/Loader";
import {
  addInDatabase,
  deleteInDatabase,
  formatDate,
  findInDatabaseAlphabetic,
} from "../../hooks/useRepository";
import { usePouch } from "use-pouchdb";
import {
  getPrecioUnitario,
  orderByDates,
  orderByAlphabetic,
  handleMissingFields,
} from "../../hooks/calcs";
import { modeloLabelsCostosVariables } from "../../data/costos-variables";
import NumberFormat from "react-number-format";
import InputFormCostosVariables from "../costos/InputFormCostosVariables";
import Editor from "../edicion/Editor";
import DeleteIcon from "../forms/DeleteIcon";
import AddIcon from "../forms/AddIcon";

export default function ListadoInsumos() {
  const [isLoading, setIsLoading] = useState(true);
  const [sentData, setSentData] = useState(true);
  const [misCostosVariables, setMisCostosVariables] = useState([]);
  const [nuevoCostoVariable, setNuevoCostoVariable] = useState({});
  const [orderFecha, setOrderFecha] = useState(true);
  const [orderInsumo, setOrderInsumo] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCosto, setEditingCosto] = useState({});
  const [missingFields, setMissingFields] = useState([]);
  const [missingEditorFields, setMissingEditorFields] = useState([]);

  const db = usePouch();

  // OBTENGO DATA EN PRIMER RENDER
  useEffect(() => {
    findInDatabaseAlphabetic(
      db,
      "costovariable",
      setMisCostosVariables,
      setIsLoading
    );
  }, [db, sentData]);

  const startsEditing = (e) => {
    setIsEditing(true);
    setEditingCosto(e);
  };

  const handleAdd = () => {
    const errorFields = handleMissingFields({
      requiredFields: ["cantidad", "descripcion", "unidad_medida", "valor"],
      nuevoCampo: nuevoCostoVariable,
    });

    setMissingFields(errorFields);

    addInDatabase(
      errorFields?.length === 0,
      db,
      nuevoCostoVariable,
      setNuevoCostoVariable,
      "costovariable",
      setSentData
    );
  };

  return (
    <Loader isloading={isLoading}>
      {isEditing && (
        <Editor
          borderless={false}
          title="costo variable"
          setIsEditing={setIsEditing}
          datos={modeloLabelsCostosVariables}
          editingElement={editingCosto}
          setSentData={setSentData}
          validacion={["cantidad", "descripcion", "unidad_medida", "valor"]}
          setMissingFields={setMissingEditorFields}
        >
          <InputFormCostosVariables
            modelo={modeloLabelsCostosVariables}
            data={editingCosto}
            setData={setEditingCosto}
            missingFields={missingEditorFields}
            keyDown={false}
          />
        </Editor>
      )}

      {/* ---------------------------------- INICIO COSTOS VARIABLES ------------------------------ */}
      <>
        <h2 className="titulo-secundario mt-0 mb-20">
          Listado de insumos vinculados a la producción
        </h2>
        {/* inicia listado */}

        {/* inicio labels */}
        <div className="table-overflow bg-white-2 mt-20 py-20 px-20 border-10">
          <div className="table-overflow-content">
            <div className="d-flex">
              {modeloLabelsCostosVariables?.map((m, i) => {
                return (
                  <div className={`table-${m.width} mb-10`} key={i}>
                    <label className="label-borderless">
                      {m?.label}
                      {m.nombre === "actualizacion" && (
                        <span
                          className="cursor-pointer"
                          onClick={() =>
                            orderByDates(
                              setIsLoading,
                              misCostosVariables,
                              orderFecha,
                              setMisCostosVariables,
                              setOrderFecha
                            )
                          }
                        >
                          {orderFecha ? (
                            <span className="glyphicon glyphicon-arrow-down"></span>
                          ) : (
                            <span className="glyphicon glyphicon-arrow-up"></span>
                          )}
                        </span>
                      )}
                      {m.nombre === "descripcion" && (
                        <span
                          className="cursor-pointer"
                          onClick={() =>
                            orderByAlphabetic(
                              setIsLoading,
                              misCostosVariables,
                              orderInsumo,
                              setMisCostosVariables,
                              setOrderInsumo
                            )
                          }
                        >
                          {orderInsumo ? (
                            <span className="glyphicon glyphicon-arrow-down"></span>
                          ) : (
                            <span className="glyphicon glyphicon-arrow-up"></span>
                          )}
                        </span>
                      )}
                    </label>
                  </div>
                );
              })}
            </div>
            {/* fin labels */}
            {/* inicia contenido */}
            {misCostosVariables?.map((e, i) => {
              return (
                <div
                  className="my-0"
                  key={`amortizaciones-${i}`}
                  data-toggle="modal"
                  data-target={`#${e._id}`}
                  onClick={() => startsEditing(e)}
                >
                  <div className="d-flex">
                    {modeloLabelsCostosVariables?.map((m, mi) => {
                      return (
                        <div className={`table-${m.width} mb-10`} key={mi}>
                          {m?.nombre === "actualizacion" && (
                            <div className={`input-noedit border-10 me-10`}>
                              {e?.[m?.nombre] ? formatDate(e?.[m?.nombre]) : ""}
                            </div>
                          )}
                          {(m?.nombre === "precio_unitario" ||
                            m?.nombre === "valor" ||
                            m?.nombre === "cantidad") && (
                            <NumberFormat
                              className={
                                m?.nombre === "precio_unitario"
                                  ? "input-noedit border-10 me-10"
                                  : "input-table label-table input-table-required border-10 me-10"
                              }
                              value={
                                m?.nombre === "precio_unitario"
                                  ? getPrecioUnitario(e?.valor, e?.cantidad)
                                  : e?.[m?.nombre]
                              }
                              displayType="text"
                              thousandSeparator={"."}
                              decimalSeparator={","}
                              prefix={m?.nombre === "cantidad" ? "" : "$"}
                              decimalScale={2}
                              fixedDecimalScale={true}
                            />
                          )}
                          {(m?.nombre === "descripcion" ||
                            m?.nombre === "unidad_medida") && (
                            <div className="input-table label-table input-table-required border-10 me-10">
                              {e?.[m?.nombre]}
                            </div>
                          )}
                        </div>
                      );
                    })}
                    <DeleteIcon
                      handleDelete={() =>
                        deleteInDatabase(db, e?._id, setIsLoading, setSentData)
                      }
                    />
                  </div>
                </div>
              );
            })}
            {/* fin contenido */}
            {/* fin listado */}
            {/* inicia agregar */}
            <div className="d-flex">
              <InputFormCostosVariables
                modelo={modeloLabelsCostosVariables}
                data={nuevoCostoVariable}
                setData={setNuevoCostoVariable}
                missingFields={missingFields}
                keyDown={true}
                handleAdd={handleAdd}
              />
              <AddIcon handleAdd={handleAdd} />
            </div>
            {/* fin agregar */}
          </div>{" "}
        </div>
      </>
      {/* -------------------------- FIN COSTOS VARIABLES -------------------------- */}
    </Loader>
  );
}
