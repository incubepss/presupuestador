import Layout from "../../components/layout";
import Loader from "../../components/loader/Loader";
import {
  findInDatabase,
  deleteInDatabase,
  addInDatabase,
} from "../../hooks/useRepository";
import { handleMissingFields } from "../../hooks/calcs";
import { useState, useEffect } from "react";
import { usePouch } from "use-pouchdb";
import { datosModelo, datosModeloEditing } from "../../data/cliente";
import NumberFormat from "react-number-format";
import InputForm from "../../components/clientes/InputForm";
import EditorCliente from "../../components/edicion/EditorCliente";

export default function ClienteList() {
  const [misClientes, setMisClientes] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [nuevoCliente, setNuevoCliente] = useState({});
  const [sentData, setSentData] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editingCliente, setEditingCliente] = useState({});
  const [missingFields, setMissingFields] = useState([]);
  const [missingEditorFields, setMissingEditorFields] = useState([]);

  const db = usePouch();

  // OBTENGO DATA EN PRIMER RENDER
  useEffect(() => {
    findInDatabase(db, "cliente", setMisClientes, setIsLoading);
  }, [db, sentData]);

  const startsEditing = (e) => {
    setIsEditing(true);
    setEditingCliente(e);
    window.scrollTo(0, 0);
  };

  const handleAdd = () => {
    const errorFields = handleMissingFields({
      requiredFields: ["razon_social"],
      nuevoCampo: nuevoCliente,
    });

    setMissingFields(errorFields);

    addInDatabase(
      errorFields?.length === 0,
      db,
      nuevoCliente,
      setNuevoCliente,
      "cliente",
      setSentData
    );
  };

  return (
    <Loader isLoading={isLoading}>
      {/* --------------------------- SE MUESTRA PARA AGREGAR --------------------------*/}
      {isAdding && (
        <EditorCliente
          setIsEditing={setIsAdding}
          editingElement={nuevoCliente}
          setSentData={setSentData}
          validacion={["razon_social"]}
          setMissingFields={setMissingFields}
          isAdding={true}
          setEditingElement={setNuevoCliente}
        >
          <InputForm
            datos={datosModelo}
            data={nuevoCliente}
            setData={setNuevoCliente}
            missingFields={missingFields}
            keyDown={true}
            handleAdd={handleAdd}
          />
        </EditorCliente>
      )}
      {/* --------------------------- FIN AGREGAR --------------------------*/}

      {/* --------------------------- SE MUESTRA PARA EDITAR --------------------------*/}
      {isEditing && (
        <EditorCliente
          setIsEditing={setIsEditing}
          editingElement={editingCliente}
          setSentData={setSentData}
          validacion={["razon_social"]}
          setMissingFields={setMissingEditorFields}
          isAdding={false}
        >
          <InputForm
            datos={datosModeloEditing}
            data={editingCliente}
            setData={setEditingCliente}
            missingFields={missingEditorFields}
            keyDown={false}
          />
        </EditorCliente>
      )}
      {/* --------------------------- FIN EDITAR --------------------------*/}

      {/* INICIO CONTENIDO */}
      <div>
        <div className="row mb-20 mt-40">
          <div className="col col-xs-12 vcenter">
            <div className="pull-right mt-10">
              <button
                className="btn btn-primary"
                onClick={() => {
                  setIsAdding(true);
                  window.scrollTo(0, 0);
                }}
              >
                Nuevo cliente
              </button>
            </div>
            <h2>Clientes</h2>
            <p className="title-home">
              Previo al armado del presupuesto, recordá que es importante que
              completes la información del cliente a quien le estarás
              presupuestando.
            </p>
          </div>
        </div>
        <div className="row">
          {misClientes?.map((e, i) => {
            return (
              <div className="col col-sm-6 col-xs-12 mb-30">
                <div className="bg-white-2 py-15 px-15 border-10">
                  <div className="row">
                    <div className="col col-md-2 col-sm-3 col-xs-3 vcenter">
                      <img
                        width="68px"
                        height="68px"
                        src="/icons/cliente.png"
                        alt="perfil"
                        className="mx-auto"
                      />
                    </div>
                    <div className="col col-md-8 col-sm-7 col-xs-9 vcenter">
                      <h2 className="chalet-table">{e?.razon_social}</h2>
                      <span className="example-title">
                        Referente:{" "}
                        <span className="example-text">
                          {e?.referente ? e?.referente : "-"}
                        </span>
                      </span>
                    </div>
                    <div className="col col-md-2 col-xs-12 text-end vcenter">
                      <img
                        className="cursor-pointer"
                        src="/icons/show-icon.png"
                        alt="perfil"
                        onClick={() => startsEditing(e)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col col-xs-12 mt-20">
                      <h6>CUIT:</h6>
                      <NumberFormat
                        className="input-table-cliente label-table form-control"
                        format="##-########-#"
                        value={e?.cuit ? e?.cuit : ""}
                        displayType="text"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col col-md-5 col-xs-12 mt-20">
                      <h6>Teléfono:</h6>
                      <NumberFormat
                        className="input-table-cliente label-table form-control"
                        format="+54 (###) ####-####"
                        value={e?.telefono}
                        displayType="text"
                      />
                    </div>
                    <div className="col col-md-7 col-xs-12 mt-20">
                      <h6>Correo electrónico:</h6>
                      <div className="input-table-cliente label-table form-control">
                        {e?.mail}
                      </div>
                    </div>
                  </div>
                  <div className="row comentario">
                    <div className="col col-xs-12">
                      <h3 className="example-title">Comentarios:</h3>
                      <p className="example-text comentario-p">
                        {e?.comentario ? e?.comentario : "-"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* FIN CONTENIDO */}
    </Loader>
  );
}

ClienteList.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
