import { useEffect, useState } from "react";
import {
  addInDatabase,
  deleteInDatabase,
  formatDate,
  findInDatabaseAlphabeticCostoFijo,
  findInDatabaseAlphabetic,
} from "../../hooks/useRepository";
import { usePouch } from "use-pouchdb";
import Loader from "../loader/Loader";
import {
  getTotales,
  orderByDates,
  orderByAlphabetic,
  handleMissingFields,
} from "../../hooks/calcs";
import {
  modeloCostosFijos,
  modeloCostosFijosEdita,
} from "../../data/costos-fijos";
import NumberFormat from "react-number-format";
import Editor from "../edicion/Editor";
import InputFormCostosFijos from "../costos/InputFormCostosFijos";
import DeleteIcon from "../forms/DeleteIcon";
import AddIcon from "../forms/AddIcon";

export default function ListadoCostos({ sentData, setSentData }) {
  const [misCostosFijos, setMisCostosFijos] = useState();
  const [misCostosFijosTotales, setMisCostosFijosTotales] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [nuevoCostoFijo, setNuevoCostoFijo] = useState({});
  const [totalCF, setTotalCF] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCosto, setEditingCosto] = useState({});
  const [orderFecha, setOrderFecha] = useState(true);
  const [orderValor, setOrderValor] = useState(true);
  const [orderInsumo, setOrderInsumo] = useState(true);
  const [missingFields, setMissingFields] = useState([]);
  const [missingEditorFields, setMissingEditorFields] = useState([]);

  const db = usePouch();

  // OBTENGO DATA EN PRIMER RENDER
  useEffect(() => {
    findInDatabaseAlphabeticCostoFijo(
      db,
      "costofijo",
      setMisCostosFijos,
      setIsLoading,
      "costo"
    );
    findInDatabaseAlphabetic(
      db,
      "costofijo",
      setMisCostosFijosTotales,
      setIsLoading
    );
  }, [db, sentData]);

  useEffect(() => {
    getTotales(setIsLoading, misCostosFijosTotales, setTotalCF);
  }, [sentData, misCostosFijosTotales]);

  const startsEditing = (e) => {
    setIsEditing(true);
    setEditingCosto(e);
  };

  const handleAdd = () => {
    const errorFields = handleMissingFields({
      requiredFields: ["descripcion", "valor"],
      nuevoCampo: nuevoCostoFijo,
    });

    setMissingFields(errorFields);

    addInDatabase(
      errorFields?.length === 0,
      db,
      { ...nuevoCostoFijo, tipo: "costo" },
      setNuevoCostoFijo,
      "costofijo",
      setSentData
    );
  };

  return (
    <Loader isloading={isLoading}>
      {isEditing && (
        <Editor
          borderless={false}
          title="costo-fijo"
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
            setSentData={setSentData}
          />
        </Editor>
      )}
      {/* ------------------------------ INICIO COSTOS FIJOS ------------------------------ */}
      <>
        {/* INICIO INTRO */}
        <>
          <div className="d-flex justify-between">
            <h2 className="titulo-secundario mt-0 mb-20">Costos fijos</h2>
            <NumberFormat
              value={totalCF}
              className="titulo-secundario mt-0 mb-20 pe-35"
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
            Los costos fijos, también conocidos como gastos de estructura, son
            todos aquellos gastos a los que Unidad Productiva debe pagar para
            llevar adelante la producción de bienes y servicios. Esto sin
            importar el volumen de producción ni las ventas que realice. En
            general estos gastos tienen una periodicidad de pago mensual.
          </p>
          <p className="bajadas mb-20">
            Algunos ejemplos de costos fijos son: el alquiler, los servicios,
            los impuestos, los seguros, los servicios profesionales, los
            servicios de mantenimiento de maquinarias y equipos, entre otros.
          </p>
          <p className="bajadas mb-40">
            Si al inicio optaste por la plantilla con información precargada,
            tené en cuenta que fue pensada a modo de ejemplo. La información
            allí disponible puede ser editada (tanto los campos de número como
            de texto) o borrada. Recomendamos mantener actualizados estos datos
            para un correcto análisis de costos dentro de la UP.
          </p>
        </>
        {/* FIN INTRO */}
        {/* INICIO LISTADO */}
        {/* inicio labels */}
        <div className="table-overflow bg-white-2 mt-20 py-20 px-20 border-10">
          <div className="table-overflow-content">
            <div className="d-flex">
              {modeloCostosFijos?.map((m, i) => {
                return (
                  <div
                    className={`table-${m.width}  mb-10`}
                    key={`labels-${i}`}
                  >
                    <label className="label-borderless">
                      {m?.label}
                      {m.nombre === "actualizacion" && (
                        <span
                          className="cursor-pointer"
                          onClick={() =>
                            orderByDates(
                              setIsLoading,
                              misCostosFijos,
                              orderFecha,
                              setMisCostosFijos,
                              setOrderFecha
                            )
                          }
                        >
                          {orderFecha ? (
                            <span className="ml-10 glyphicon glyphicon-arrow-down"></span>
                          ) : (
                            <span className="ml-10 glyphicon glyphicon-arrow-up"></span>
                          )}
                        </span>
                      )}
                      {m.nombre === "descripcion" && (
                        <span
                          className="cursor-pointer"
                          onClick={() =>
                            orderByAlphabetic(
                              setIsLoading,
                              misCostosFijos,
                              orderInsumo,
                              setMisCostosFijos,
                              setOrderInsumo
                            )
                          }
                        >
                          {orderInsumo ? (
                            <span className="ml-10 glyphicon glyphicon-arrow-down"></span>
                          ) : (
                            <span className="ml-10 glyphicon glyphicon-arrow-up"></span>
                          )}
                        </span>
                      )}
                      {m.nombre === "valor" && (
                        <span className="cursor-pointer"></span>
                      )}
                    </label>
                  </div>
                );
              })}
            </div>
            {/* fin labels */}
            {misCostosFijos?.map((e, index) => {
              return (
                <div className="my-0" key={`costos-${index}`}>
                  <div className="d-flex">
                    {modeloCostosFijos?.map((m, mi) => {
                      return (
                        <div
                          className={`table-${m?.width} mb-10`}
                          key={`mi-${mi}`}
                          data-toggle="modal"
                          data-target={`#${e._id}`}
                          onClick={() => startsEditing(e)}
                        >
                          {m?.nombre === "actualizacion" && (
                            <div className={`input-noedit border-10 me-10`}>
                              {e?.[m?.nombre] ? formatDate(e?.[m?.nombre]) : ""}
                            </div>
                          )}
                          {m?.nombre === "descripcion" && (
                            <input
                              type="text"
                              className={`input-table label-table input-table-required border-10 me-10`}
                              value={e?.[m.nombre] ? e?.[m.nombre] : ""}
                            />
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
                              data
                              fixedDecimalScale={true}
                            />
                          )}
                        </div>
                      );
                    })}
                    <DeleteIcon
                      handleDelete={() =>
                        deleteInDatabase(db, e._id, setIsLoading, setSentData)
                      }
                    />
                  </div>
                </div>
              );
            })}
            {/* FIN LISTADO */}
            {/* INICIO AGREGA */}
            <div className="d-flex">
              <InputFormCostosFijos
                modelo={modeloCostosFijos}
                data={nuevoCostoFijo}
                setData={setNuevoCostoFijo}
                missingFields={missingFields}
                keyDown={true}
                handleAdd={handleAdd}
              />
              <AddIcon handleAdd={handleAdd} />
            </div>
            {/* FIN AGREGA */}
          </div>
        </div>
      </>
      {/* ------------------------------ FIN COSTOS FIJOS ------------------------------ */}
    </Loader>
  );
}
