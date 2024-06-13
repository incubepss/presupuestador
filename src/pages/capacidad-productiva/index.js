import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import CabeceraProductos from "../../components/CabeceraProductos";
import Loader from "../../components/loader/Loader";
import Link from "next/link";
import { um } from "../../data/um";

import {
  addInDatabase,
  findInDatabase,
  deleteInDatabase,
} from "../../hooks/useRepository";
import { usePouch } from "use-pouchdb";
import {
  modeloProductos,
  modeloAgregaProductosEditing,
} from "../../data/capacidad-productiva";
import NumberFormat from "react-number-format";
import TableLabelsBorderless from "../../components/forms/TableLabelsBorderless";
import Editor from "../../components/edicion/Editor";
import InputForm from "../../components/capacidad-productiva/InputForm";
import DeleteIcon from "../../components/forms/DeleteIcon";
import AddIcon from "../../components/forms/AddIcon";
import { handleMissingFields } from "../../hooks/calcs";
import { getCostoUnitario, getTotales, getCostoTotal } from "../../hooks/calcs";

export default function ProductoList() {
  const [misProductos, setMisProductos] = useState([]);
  const [isLoadingProductos, setIsLoadingProductos] = useState(true);
  const [isLoadingRF, setIsLoadingRF] = useState(true);
  const [isLoadingCV, setIsLoadingCV] = useState(true);
  const [isLoadingCF, setIsLoadingCF] = useState(true);
  const [isLoadingRV, setIsLoadingRV] = useState(true);
  const [nuevoProducto, setNuevoProducto] = useState({});
  const [sentData, setSentData] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProducto, setEditingProducto] = useState({});
  const [missingFields, setMissingFields] = useState([]);
  const [missingEditorFields, setMissingEditorFields] = useState([]);
  const [misCostosFijos, setMisCostosFijos] = useState();
  const [misRF, setMisRF] = useState();
  const [totalCF, setTotalCF] = useState(0);
  const [totalRF, setTotalRF] = useState(0);
  const [misCV, setMisCV] = useState();
  const [misRV, setMisRV] = useState();
  const [isAdding, setIsAdding] = useState(false);
  const db = usePouch();

  useEffect(() => {
    findInDatabase(db, "producto", setMisProductos, setIsLoadingProductos);
    findInDatabase(db, "costofijo", setMisCostosFijos, setIsLoadingCF);
    findInDatabase(db, "remuneracionfija", setMisRF, setIsLoadingRF);
    findInDatabase(db, "costovariable", setMisCV, setIsLoadingCV);
    findInDatabase(db, "remuneracionvar", setMisRV, setIsLoadingRV);
  }, [db, sentData]);

  useEffect(() => {
    getTotales(setIsLoadingCF, misCostosFijos, setTotalCF);
  }, [misCostosFijos]);

  useEffect(() => {
    getTotales(setIsLoadingRF, misRF, setTotalRF);
  }, [misRF]);

  const startsEditing = (e) => {
    setIsEditing(true);
    setEditingProducto(e);
  };

  const handleAdd = () => {
    const errorFields = handleMissingFields({
      requiredFields: [
        "descripcion",
        "unidad_medida",
        "cantidad_promedio_mensual",
        "produccion_promedio_mensual",
      ],
      nuevoCampo: nuevoProducto,
    });

    setMissingFields(errorFields);
    if (errorFields?.length === 0) setIsAdding(false);

    addInDatabase(
      errorFields?.length === 0,
      db,
      nuevoProducto,
      setNuevoProducto,
      "producto",
      setSentData
    );
  };

  function Costos(props) {
    return (
      <NumberFormat
        value={props.value}
        displayType="text"
        thousandSeparator={"."}
        decimalSeparator={","}
        prefix={"$"}
        decimalScale={2}
        fixedDecimalScale={true}
      />
    );
  }

  return (
    <Loader
      isLoading={isLoadingProductos}
      isloading={
        isLoadingCF &&
        isLoadingRF &&
        isLoadingCV &&
        isLoadingRV &&
        isLoadingProductos
      }
    >
      {/* INICIO EDITOR */}
      {isEditing && (
        <Editor
          borderless={true}
          title="producto"
          setIsEditing={setIsEditing}
          datos={modeloAgregaProductosEditing}
          editingElement={editingProducto}
          setSentData={setSentData}
          validacion={[
            "descripcion",
            "unidad_medida",
            "cantidad_promedio_mensual",
            "produccion_promedio_mensual",
          ]}
          setMissingFields={setMissingEditorFields}
          handleAdd={undefined}
        >
          <InputForm
            datos={modeloAgregaProductosEditing}
            data={editingProducto}
            setData={setEditingProducto}
            missingFields={missingEditorFields}
            keyDown={false}
          />
        </Editor>
      )}
      {/* FIN EDITOR */}

      {/* inicio agregar */}
      {isAdding && (
        <Editor
          borderless={true}
          title="producto"
          setIsEditing={setIsAdding}
          datos={modeloAgregaProductosEditing}
          editingElement={{ _id: "nuevoproducto" }}
          setSentData={setSentData}
          validacion={[
            "descripcion",
            "unidad_medida",
            "cantidad_promedio_mensual",
            "produccion_promedio_mensual",
          ]}
          setMissingFields={setMissingEditorFields}
          handleAdd={handleAdd}
        >
          <InputForm
            datos={modeloAgregaProductosEditing}
            data={nuevoProducto}
            setData={setNuevoProducto}
            missingFields={missingFields}
            keyDown={false}
          />
        </Editor>
      )}
      {/* fin agregar */}

      {/* INICIO INTRO */}
      <>
        <div className="pull-right mt-10">
          <button
            className="btn btn-primary"
            data-toggle="modal"
            data-target={`#nuevoproducto`}
            onClick={() => {
              setIsAdding(true);
              window.scrollTo(0, 0);
            }}
          >
            Nuevo producto o servicio
          </button>
        </div>
        <h2 className="titulo-secundario mt-0 mb-20">
          Listado de productos y servicios
        </h2>

        <p className="bajadas mb-20">
          Acá tenes que listar todos los bienes o servicios que producen en tu
          Unidad Productiva. Si comercializas una gran variedad, te recomendamos
          comenzar por los más vendidos o, al menos, aquellos que quieras
          incluir en tu presupuesto. Por cada uno, tenes que completar el{" "}
          <strong>nombre</strong>, su{" "}
          <strong>producción promedio mensual</strong> y el{" "}
          <strong>porcentaje mensual de producción</strong>.
        </p>
        <p className="bajadas mb-20">
          Una vez ingresada esta información, podrás completar la{" "}
          <strong>ficha técnica o receta</strong> de una unidad o la cantidad
          que vos definas necesario para luego elaborar el presupuesto.
        </p>
      </>
      {/* FIN INTRO */}

      {/* INICIO LISTADO */}
      <div className="row mb-20 mt-40">
        {/* inicio listado */}
        {misProductos?.map((e, i) => {
          return (
            <div
              className="col col-lg-6 col-xs-12 mb-30 card-capacidad-productiva"
              key={`cap-${i}`}
            >
              <div className="bg-white-2 py-15 px-15 border-10">
                {modeloProductos?.map((m, mi) => {
                  return (
                    <>
                      {m?.nombre === "descripcion" && (
                        <div className="d-flex justify-between">
                          <h2 className="mt-10 mb-30">{e?.[m?.nombre]}</h2>
                          <div className="">
                            <Link href={`/fichas/${e._id}`}>
                              <button className="btn btn-lg btn-primary mr-10">
                                Editar Ficha técnica
                              </button>
                            </Link>
                            <span>
                              <img
                                src="/icons/delete-table.png"
                                className="my-12 mx-auto cursor-pointer ml-10"
                                alt="Eliminar"
                                onClick={() => {
                                  deleteInDatabase(
                                    db,
                                    e?._id,
                                    setIsLoadingProductos,
                                    setSentData
                                  );
                                }}
                              />
                            </span>
                          </div>
                        </div>
                      )}

                      {m?.nombre === "cantidad_promedio_mensual" && (
                        <div
                          className={`table-${m?.width} input-table input-big input-table-required border-10 me-10 mb-10`}
                          onClick={() => startsEditing(e)}
                          data-toggle="modal"
                          data-target={`#${e._id}`}
                        >
                          PRODUCCIÓN PROMEDIO
                          <br />
                          MENSUAL
                          <br />
                          <NumberFormat
                            className="input-table-ficha important-ficha"
                            value={e?.[m?.nombre]}
                            displayType="text"
                            thousandSeparator={"."}
                            decimalSeparator={","}
                            suffix={
                              um.find(
                                (u) => u.descripcion == e?.["unidad_medida"]
                              ).value
                            }
                            decimalScale={2}
                            fixedDecimalScale={true}
                          />
                        </div>
                      )}

                      {m?.nombre === "produccion_promedio_mensual" && (
                        <div
                          className={`table-${m?.width} input-table input-big input-table-required border-10 me-10 mb-10`}
                          onClick={() => startsEditing(e)}
                          data-toggle="modal"
                          data-target={`#${e._id}`}
                        >
                          PORCENTAJE MENSUAL
                          <br /> DE PRODUCCIÓN
                          <br />
                          <NumberFormat
                            className="input-table-ficha important-ficha"
                            value={e?.[m?.nombre]}
                            displayType="text"
                            thousandSeparator={"."}
                            decimalSeparator={","}
                            suffix="%"
                            decimalScale={2}
                            fixedDecimalScale={true}
                          />
                        </div>
                      )}
                    </>
                  );
                })}
                <div className="capacidad-productiva-suma d-flex">
                  <div className="input-table input-noedit input-big border-10 me-10">
                    Costo fijo
                    <br /> por unidad <br />
                    <Costos
                      label="Costo Fijo"
                      value={getCostoUnitario(
                        totalCF + totalRF,
                        e?.produccion_promedio_mensual,
                        e?.cantidad_promedio_mensual
                      )}
                    />
                  </div>
                  <span>+</span>
                  <div className="input-table input-noedit input-big border-10 me-10">
                    Costo variable
                    <br /> por unidad <br />
                    <Costos
                      label="Costo variables"
                      value={getCostoTotal(e, misCV, misRV)}
                    />
                  </div>
                  <span>=</span>
                  <div className="input-table input-noedit input-big border-10 me-10">
                    Costo total
                    <br /> por unidad <br />
                    <Costos
                      label="Total"
                      value={
                        getCostoUnitario(
                          totalCF + totalRF,
                          e?.produccion_promedio_mensual,
                          e?.cantidad_promedio_mensual
                        ) + getCostoTotal(e, misCV, misRV)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {/* fin listado */}
      </div>
      <div className="col bg-primary-lt mb-20 mt-40 py-20 px-20 col-md-12 border-10">
        <h2 className="titulo-secundario mt-0 mb-20">
          ¿Cómo calculo toda la información solicitada en este apartado?
        </h2>
        <p className="example-text mb-20"></p>
        <p className="example-text mb-20">
          Por ejemplo, colocamos el ítem “remera de algodón” cuya unidad de
          medida para la comercialización sea la docena (12 unidades). Pero
          ¿cómo calcular la producción promedio mensual? Tendrás que pensar la
          cantidad de docenas que producís en tu UP en un mes. Siguiendo el
          ejemplo, la UP podría producir diez docenas de remeras al mes.
        </p>
        <p className="example-text mb-20">
          Entonces ¿cómo calcular el porcentaje mensual de producción? Aquí
          debes asignarle un porcentaje a cada uno de los bienes y servicios que
          producís respecto del total. Si asumimos que el total de la producción
          es el 100%, ¿qué porcentaje implica el bien o servicio que querés
          completar? Siguiendo el ejemplo si una UP produce diez docenas remeras
          de algodón, cinco docenas de pantalones de corderoy y treinta docenas
          de guardapolvos en un mes. Entonces el 100% de la producción serían:
        </p>
        <p className="example-text mb-20">10 + 5 + 30 = 45 docenas</p>
        <p className="example-text mb-20">
          Por lo tanto, porcentaje mensual de producción de mis remeras sería:
        </p>
        <p className="example-text mb-20">10 docenas /45 docenas = 22%</p>
        <p className="example-text mb-20">
          Aquí la pregunta que nos realizaremos es, si el total o el 100% de las
          docenas producidas son 45, ¿qué porcentaje del total representan las
          remeras de algodón? El cálculo que realizaremos será:
        </p>
        <p className="example-text">(10 x 100) / 45 = 22%</p>
      </div>
      {/* FIN LISTADO */}
    </Loader>
  );
}

ProductoList.getLayout = function getLayout(page) {
  const headProductos = <CabeceraProductos></CabeceraProductos>;

  return <Layout headPage={headProductos}>{page}</Layout>;
};
