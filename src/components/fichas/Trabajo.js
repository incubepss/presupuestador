import React, { useState, useEffect } from "react";
import { HeadTableAdd, FooterTableAdd } from "../forms/HeadFooterTableAdd";
import { findInDatabase } from "../../hooks/useRepository";
import Loader from "../loader/Loader";
import { usePouch } from "use-pouchdb";
import {
  multiSimple,
  handleDeleteItem,
  handleAddItemFicha,
  handleMissingFields,
} from "../../hooks/calcs";
import {
  modeloTrabajo,
  modeloAgregaTrabajo,
  modeloAgregaTrabajoEdita,
} from "../../data/ficha";
import NumberFormat from "react-number-format";
import TableLabels from "../forms/TableLabels";
import InputFormTrabajo from "./InputFormTrabajo";
import EditorItem from "../edicion/EditorItem";
import DeleteIcon from "../forms/DeleteIcon";
import AddIcon from "../forms/AddIcon";

function Trabajo({ producto, setProducto }) {
  const [misDatos, setMisDatos] = useState();
  const [isLoadingDatos, setIsLoadingDatos] = useState(true);
  const [nuevoTrabajo, setNuevoTrabajo] = useState({});
  const [misRV, setMisRV] = useState();
  const [isLoadingRV, setIsLoadingRV] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTrabajo, setEditingTrabajo] = useState({});
  const [index, setIndex] = useState();
  const [missingFields, setMissingFields] = useState([]);
  const [missingEditorFields, setMissingEditorFields] = useState([]);

  const db = usePouch();

  useEffect(() => {
    findInDatabase(db, "misDatos", setMisDatos, setIsLoadingDatos);
    findInDatabase(db, "remuneracionvar", setMisRV, setIsLoadingRV);
  }, [producto]);

  const startsEditing = (e, i) => {
    setIsEditing(true);
    setEditingTrabajo(e);
    setIndex(i);
  };

  const handleAdd = () => {
    const errorFields = handleMissingFields({
      requiredFields: ["descripcion", "cantidad"],
      nuevoCampo: nuevoTrabajo,
    });

    setMissingFields(errorFields);

    handleAddItemFicha(
      errorFields?.length === 0,
      producto,
      "remuneracion",
      nuevoTrabajo,
      setProducto,
      setNuevoTrabajo
    );
  };

  return (
    <Loader isloading={isLoadingDatos && isLoadingRV}>
      {isEditing && (
        <EditorItem
          title="trabajo"
          setIsEditing={setIsEditing}
          datos={modeloTrabajo}
          editingElement={editingTrabajo}
          producto={producto}
          setProducto={setProducto}
          index={index}
          validacion={["descripcion", "cantidad"]}
          setMissingFields={setMissingEditorFields}
        >
          <InputFormTrabajo
            modelo={modeloTrabajo}
            data={editingTrabajo}
            setData={setEditingTrabajo}
            misRV={misRV}
            missingFields={missingEditorFields}
            keyDown={false}
          />
        </EditorItem>
      )}
      <>
        {misDatos && (
          <div>
            <h2 className="titulo-secundario mt-60">Remuneración al trabajo</h2>
            <div className="table-overflow bg-white-2 mt-20 py-20 px-20 border-10">
              <div className="table-overflow-content">
                {/* inicio labels */}
                <div className="d-flex mb-0">
                  <TableLabels modelo={modeloTrabajo} />
                </div>
                {/* fin labels */}
                {/* inicio contenido */}
                {producto?.remuneracion &&
                  producto?.remuneracion?.length > 0 &&
                  producto?.remuneracion?.map((e, i) => {
                    return (
                      <div className="my-0">
                        <div className="d-flex">
                          {modeloTrabajo?.map((m) => {
                            return (
                              <div
                                className={`table-${m.width} mb-10`}
                                onClick={() => startsEditing(e, i)}
                                data-toggle="modal"
                                data-target={`#${e.descripcion}`}
                              >
                                {m.nombre === "valor" ||
                                m.nombre === "cantidad" ? (
                                  <NumberFormat
                                    className={`${
                                      m.nombre === "valor"
                                        ? "input-noedit"
                                        : "input-table label-table input-table-required"
                                    } border-10 me-10`}
                                    value={
                                      m.nombre === "cantidad"
                                        ? e?.cantidad
                                        : multiSimple(
                                            misRV?.find(
                                              (i) => i._id === e?.descripcion
                                            )?.valor,
                                            e?.cantidad
                                          )
                                    }
                                    displayType="text"
                                    thousandSeparator={"."}
                                    decimalSeparator={","}
                                    prefix={m.nombre === "cantidad" ? "" : "$"}
                                    decimalScale={2}
                                    fixedDecimalScale={true}
                                  />
                                ) : m.nombre === "unidad_medida" ? (
                                  <NumberFormat
                                    className="input-noedit border-10 me-10"
                                    value={
                                      misRV?.find(
                                        (i) => i._id === e?.descripcion
                                      )?.valor
                                    }
                                    displayType="text"
                                    thousandSeparator={"."}
                                    decimalSeparator={","}
                                    prefix={m.nombre === "cantidad" ? "" : "$"}
                                    decimalScale={2}
                                    fixedDecimalScale={true}
                                  />
                                ) : (
                                  <span className="input-table label-table input-table-required border-10 me-10">
                                    {
                                      misRV?.find(
                                        (i) => i._id === e?.descripcion
                                      )?.[m.nombre]
                                    }
                                  </span>
                                )}
                              </div>
                            );
                          })}
                          <DeleteIcon
                            handleDelete={() =>
                              handleDeleteItem(
                                producto,
                                e,
                                setProducto,
                                "remuneracion"
                              )
                            }
                          />
                        </div>
                      </div>
                    );
                  })}
                {/* fin contenido */}
                {/* inicio agregar */}
                <div className="mb-40">
                  <div className="d-flex">
                    <InputFormTrabajo
                      modelo={modeloTrabajo}
                      data={nuevoTrabajo}
                      setData={setNuevoTrabajo}
                      misRV={misRV}
                      missingFields={missingEditorFields}
                      keyDown={true}
                      handleAdd={handleAdd}
                    />
                    <AddIcon handleAdd={handleAdd} />
                  </div>
                </div>
                {/* fin agregar */}
              </div>
            </div>
          </div>
        )}
      </>
    </Loader>
  );
}

export default Trabajo;
