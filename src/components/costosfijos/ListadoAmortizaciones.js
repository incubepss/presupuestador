import { useEffect, useState } from "react";
import {
  addInDatabase,
  deleteInDatabase,
  formatDate,
  findInDatabaseAlphabeticCostoFijo,
} from "../../hooks/useRepository";
import { usePouch } from "use-pouchdb";
import Loader from "../loader/Loader";
import { handleMissingFields, roundNumber } from "../../hooks/calcs";
import {
  modeloAmortizaciones,
  modeloAmortizacionesAgrega,
  modeloAmortizacionesEdita,
} from "../../data/costos-fijos";
import NumberFormat from "react-number-format";
import Editor from "../edicion/Editor";
import InputFormAmortizaciones from "../costos/InputFormAmortizaciones";
import TableLabelsBorderless from "../forms/TableLabelsBorderless";
import DeleteIcon from "../forms/DeleteIcon";
import AddIcon from "../forms/AddIcon";
import { handleChange, handleKeyDown } from "../../hooks/useRepository";

export default function ListadoAmortizaciones({ sentData, setSentData }) {
  const [misAmortizaciones, setMisAmortizaciones] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [nuevaAmortizacion, setNuevaAmortizacion] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editingAmortizacion, setEditingAmortizacion] = useState({});
  const [missingFields, setMissingFields] = useState([]);
  const [missingEditorFields, setMissingEditorFields] = useState([]);

  const db = usePouch();

  // OBTENGO DATA EN PRIMER RENDER
  useEffect(() => {
    findInDatabaseAlphabeticCostoFijo(
      db,
      "costofijo",
      setMisAmortizaciones,
      setIsLoading,
      "amortizacion"
    );
  }, [db, sentData]);

  const startsEditing = (e) => {
    setIsEditing(true);
    setEditingAmortizacion(e);
  };

  const handleAdd = () => {
    const errorFields = handleMissingFields({
      requiredFields: ["descripcion", "precio", "meses"],
      nuevoCampo: nuevaAmortizacion,
    });

    setMissingFields(errorFields);

    addInDatabase(
      errorFields?.length === 0,
      db,
      {
        ...nuevaAmortizacion,
        tipo: "amortizacion",
        valor: roundNumber(
          nuevaAmortizacion?.precio / nuevaAmortizacion?.meses
        ),
      },
      setNuevaAmortizacion,
      "costofijo",
      setSentData
    );
  };

  return (
    <Loader isloading={isLoading}>
      {isEditing && (
        <Editor
          borderless={false}
          title="amortización"
          setIsEditing={setIsEditing}
          datos={modeloAmortizacionesEdita}
          editingElement={editingAmortizacion}
          setSentData={setSentData}
          validacion={["descripcion", "precio", "meses"]}
          setMissingFields={setMissingEditorFields}
          esAmortizacion={true}
        >
          <InputFormAmortizaciones
            modelo={modeloAmortizaciones}
            data={editingAmortizacion}
            setData={setEditingAmortizacion}
            missingFields={missingEditorFields}
            keyDown={false}
          />
        </Editor>
      )}
      {/* ------------------------------ INICIO AMORTIZACIONES ------------------------------ */}
      <>
        {/* INICIO INTRO */}
        <>
          <div className="d-flex justify-between">
            <h2 className="titulo-secundario mt-60 mb-20">
              Amortización de equipamiento
            </h2>
          </div>
          <p className="bajadas mb-20">
            La amortización es el desgaste del bien o maquinaria por el uso o
            por el paso del tiempo. ¿Por qué es importante tenerlo en cuenta?
            Porque una vez que se produce dicho desgaste deberán reinvertir para
            poder repararlo o reemplazarlo (por avance tecnológico o por falta
            de funcionamiento).
          </p>
          <p className="bajadas mb-40">
            ¿Cómo calcularlo en esta tabla? Los meses de amortización se definen
            según el uso que le de cada UP al bien o maquinaria, y de esa manera
            se determina su vida útil. El valor hace referencia al monto de
            dinero que costaría reponerlo. Ingresar el valor total de la
            maquinaria o equipamiento que se utiliza para la producción.
          </p>
        </>
        {/* FIN INTRO */}
        <div className="table-overflow bg-white-2 mt-20 py-20 px-20 border-10">
          <div className="table-overflow-content">
            {/* INICIO LISTADO */}
            {/* inicio labels */}
            <div className="d-flex">
              <TableLabelsBorderless modelo={modeloAmortizaciones} />
            </div>
            {/* fin labels */}
            {misAmortizaciones?.map((e, i) => {
              return (
                <div className="my-0" key={`amortizaciones-${i}`}>
                  <div className="d-flex">
                    {modeloAmortizaciones?.map((m, mi) => {
                      return (
                        <div
                          className={`table-${m?.width} mb-10`}
                          data-toggle="modal"
                          data-target={`#${e._id}`}
                          onClick={() => startsEditing(e)}
                          key={`amoin-${mi}`}
                        >
                          {m?.nombre === "actualizacion" && (
                            <div className={`input-noedit border-10 me-10`}>
                              {formatDate(e?.[m?.nombre])}
                            </div>
                          )}
                          {m?.nombre === "descripcion" && (
                            <input
                              type="text"
                              className={`input-table label-table input-table-required border-10 me-10`}
                              value={e?.[m.nombre] ? e?.[m.nombre] : ""}
                            />
                          )}
                          {m?.nombre === "precio" && (
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
                          {m?.nombre === "meses" && (
                            <NumberFormat
                              className="input-table label-table input-table-required border-10 me-10"
                              value={e?.[m?.nombre]}
                              displayType="text"
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
              <InputFormAmortizaciones
                modelo={modeloAmortizaciones}
                data={nuevaAmortizacion}
                setData={setNuevaAmortizacion}
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
      {/* ------------------------------ FIN AMORTIZACIONES ------------------------------ */}
    </Loader>
  );
}
