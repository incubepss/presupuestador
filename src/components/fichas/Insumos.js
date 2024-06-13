import React, { useState, useEffect, Children } from "react";
import {
  getPrecioUnitarioInsumo,
  multiSimple,
  handleAddItemFicha,
  orderByAlphabeticInsumo,
  getPrecioUnitarioInsumoNoRound,
  handleMissingFields,
  handleDeleteItemVacio,
} from "../../hooks/calcs";
import Loader from "../loader/Loader";
import { modeloInsumos } from "../../data/ficha";
import NumberFormat from "react-number-format";
import InputFormInsumos from "./InputFormInsumos";
import EditorItem from "../edicion/EditorItem";
import DeleteIcon from "../forms/DeleteIcon";
import AddIcon from "../forms/AddIcon";
import { um } from "../../data/um";

function Insumos({
  producto,
  setProducto,
  orderInsumo,
  setOrderInsumo,
  misCV,
  isLoading,
  setIsLoading,
}) {
  const [nuevoInsumo, setNuevoInsumo] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editingInsumo, setEditingInsumo] = useState({});
  const [index, setIndex] = useState();
  const [sentData, setSentData] = useState(true);
  const [missingFields, setMissingFields] = useState([]);
  const [missingEditorFields, setMissingEditorFields] = useState([]);

  const startsEditing = (e, i) => {
    setIsEditing(true);
    setEditingInsumo(e);
    setIndex(i);
  };

  useEffect(() => {
    orderByAlphabeticInsumo(
      setIsLoading,
      producto,
      orderInsumo,
      setProducto,
      setOrderInsumo,
      misCV
    );
  }, [sentData]);

  const handleAdd = () => {
    const errorFields = handleMissingFields({
      requiredFields: ["descripcion", "cantidad", "unidad_medida"],
      nuevoCampo: nuevoInsumo,
    });

    setMissingFields(errorFields);

    try {
      handleAddItemFicha(
        errorFields?.length === 0,
        producto,
        "insumos",
        nuevoInsumo,
        setProducto,
        setNuevoInsumo
      );
    } finally {
      if (errorFields?.length === 0) {
        setSentData((prevSentData) => !prevSentData);
      }
    }
  };

  return (
    <Loader isloading={isLoading}>
      {isEditing && (
        <EditorItem
          title="insumo"
          setIsEditing={setIsEditing}
          datos={modeloInsumos}
          editingElement={editingInsumo}
          producto={producto}
          setProducto={setProducto}
          index={index}
          validacion={["descripcion", "cantidad", "unidad_medida"]}
          setMissingFields={setMissingEditorFields}
        >
          <InputFormInsumos
            modelo={modeloInsumos}
            data={editingInsumo}
            setData={setEditingInsumo}
            misCV={misCV}
            missingFields={missingEditorFields}
            keyDown={false}
          />
        </EditorItem>
      )}
      <div>
        <h2 className="titulo-secundario">Insumos</h2>
        <div className="table-overflow bg-white-2 mt-20 py-20 px-20 border-10">
          <div className="table-overflow-content">
            {/* inicio labels */}
            <div className="d-flex mb-0">
              {modeloInsumos?.map((m, mi) => {
                return (
                  <div
                    className={`table-${m.width} mb-10`}
                    key={`labelinsumos-${mi}`}
                  >
                    <label className="label-borderless">
                      {m?.label}

                      {m.nombre === "descripcion" && (
                        <span
                          className="cursor-pointer"
                          onClick={() =>
                            orderByAlphabeticInsumo(
                              setIsLoading,
                              producto,
                              orderInsumo,
                              setProducto,
                              setOrderInsumo,
                              misCV
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
            {/* inicio contenido */}
            {producto?.insumos &&
              producto?.insumos?.length > 0 &&
              producto?.insumos?.map((e, i) => {
                return (
                  <>
                    <div className="d-flex">
                      {modeloInsumos?.map((m, im) => {
                        let miCV = misCV?.find((i) => i._id === e?.descripcion);

                        return (
                          <div
                            className={`table-${m.width} mb-10`}
                            onClick={() => startsEditing(e, i)}
                            data-toggle="modal"
                            data-target={`#${e.descripcion}`}
                            key={`insumos-${e.descripcion}${im}`}
                          >
                            {m.nombre === "precio_unitario" ||
                            m.nombre === "valor" ||
                            m.nombre === "cantidad" ? (
                              <NumberFormat
                                className={`${
                                  m.nombre === "cantidad"
                                    ? "input-table label-table input-table-required"
                                    : "input-noedit"
                                }  border-10 me-10`}
                                value={
                                  m.nombre === "valor"
                                    ? multiSimple(
                                        getPrecioUnitarioInsumo(
                                          miCV?.valor,
                                          miCV?.cantidad,
                                          e.unidad_medida,
                                          miCV?.unidad_medida
                                        ),
                                        e?.cantidad
                                      )
                                    : m.nombre === "cantidad"
                                    ? e?.cantidad
                                    : getPrecioUnitarioInsumoNoRound(
                                        miCV?.valor,
                                        miCV?.cantidad,
                                        e.unidad_medida,
                                        miCV?.unidad_medida
                                      )
                                }
                                displayType="text"
                                thousandSeparator={"."}
                                decimalSeparator={","}
                                prefix={m.nombre === "cantidad" ? "" : "$"}
                                decimalScale={2}
                                fixedDecimalScale={true}
                              />
                            ) : m.nombre === "descripcion" ? (
                              <div className="input-table label-table input-table-required border-10 me-10">
                                {miCV?.[m.nombre]}
                              </div>
                            ) : (
                              <div className="input-table label-table input-table-required border-10 me-10">
                                {e.unidad_medida}
                              </div>
                            )}
                          </div>
                        );
                      })}
                      <DeleteIcon
                        handleDelete={() =>
                          handleDeleteItemVacio(
                            producto,
                            setProducto,
                            i,
                            "insumos"
                          )
                        }
                      />
                    </div>
                  </>
                );
              })}
            {/* inicio agregar */}
            <div className="d-flex">
              <InputFormInsumos
                modelo={modeloInsumos}
                data={nuevoInsumo}
                setData={setNuevoInsumo}
                misCV={misCV}
                missingFields={missingEditorFields}
                keyDown={true}
                handleAdd={handleAdd}
              />
              <AddIcon handleAdd={handleAdd} />
            </div>
            {/* fin agregar */}
            {/* fin contenido */}
          </div>
        </div>
      </div>
    </Loader>
  );
}

export default Insumos;
