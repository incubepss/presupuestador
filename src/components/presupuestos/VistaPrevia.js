import React, { useEffect, useState, useContext } from "react";
import NumberFormat from "react-number-format";
import html2canvas from "html2canvas";
import { findInDatabase, formatDateSimple } from "../../hooks/useRepository";
import Loader from "../loader/Loader";
import { usePouch, useDoc } from "use-pouchdb";
import { modeloLabels } from "../../data/imprimir";
import TableLabels from "../forms/TableLabels";
import PresupuestosContext from "../../context/PresupuestosContext";
import Confirmar from "./Confirmar";
import BotonesImprimir from "./BotonesImprimir";

export default function VistaPrevia({ imprimir }) {
  const [isLoadingPresupuesto, setIsLoadingPresupuesto] = useState(true);
  const [isLoadingDatos, setIsLoadingDatos] = useState(true);
  const [total, setTotal] = useState(0);
  const [misPresupuestos, setMisPresupuestos] = useState();
  const [isLoadingPresupuestos, setIsLoadingPresupuestos] = useState(true);
  const [image, setImage] = useState();

  const db = usePouch();

  const { setShowImprimir, setIsConfirmed, showConfirmar } =
    useContext(PresupuestosContext);

  const imageGenerator = () => {
    // Obtener el elemento "divToPrint"
    const element = document.getElementById("divToPrint");

    // Crear un canvas temporal y dibujar el contenido en él
    html2canvas(element)
      .then((canvas) => {
        // Obtener la URL de la imagen
        const dataURL = canvas.toDataURL("image/png");
        setImage({ url: dataURL, width: canvas.width, height: canvas.height });
      })
      .catch((error) => {
        console.error("Error al convertir el contenido en una imagen:", error);
      });
  };
  const { doc: misDatos } = useDoc("misDatos");

  // OBTENGO DATA EN PRIMER RENDER
  useEffect(() => {
    findInDatabase(
      db,
      "presupuesto",
      setMisPresupuestos,
      setIsLoadingPresupuestos
    );
  }, [db]);

  useEffect(() => {
    let temp = imprimir?.productos?.reduce(function (acc, obj) {
      return acc + obj.valor;
    }, 0);

    setTotal(temp);
  }, [imprimir]);

  useEffect(() => {
    imageGenerator();
  }, [misDatos]);

  return (
    <Loader
      isloading={
        isLoadingPresupuesto && isLoadingDatos && isLoadingPresupuestos
      }
    >
      <div
        className="blur-editor"
        onClick={(e) => {
          setShowImprimir(false);
          setIsConfirmed(false);
        }}
      ></div>
      {showConfirmar && (
        <Confirmar
          data={imprimir}
          setIsLoadingPresupuesto={setIsLoadingPresupuesto}
          misPresupuestos={misPresupuestos}
        />
      )}
      <div className="container-imprimir">
        <div className="modal-header">
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-hidden="true"
            onClick={(e) => {
              setShowImprimir(false);
              setIsConfirmed(false);
            }}
          >
            ×
          </button>
          <h4 className="modal-title" id="myModalLabel">
            Vista previa
          </h4>
        </div>
        {image ? (
          <img
            useR
            src={image.url}
            alt="presupuesto"
            className="canvas-presupuesto"
          ></img>
        ) : (
          <div id="divToPrint" className="print-container">
            {/* inicio datos empresa */}
            <div className="bg-white-2 border-10 py-20 px-20 d-flex justify-between mb-20">
              <div className="w-100">
                <div className="d-flex justify-between w-100">
                  <h1 className="titulos">
                    {misDatos?.tipo_org + " " + misDatos?.nombre}
                  </h1>
                </div>

                <p className="bajadas my-5">
                  {(misDatos?.calle ? misDatos?.calle : "") +
                    " " +
                    (misDatos?.numero ? misDatos?.numero : "") +
                    (misDatos?.postal ? " (" + misDatos?.postal + ") " : "") +
                    (misDatos?.localidad ? misDatos?.localidad : "")}
                </p>
                <p className="bajadas my-5">
                  {misDatos?.mail_contacto
                    ? misDatos?.mail_contacto
                    : misDatos?.mail}
                </p>
                <p className="bajadas my-5">
                  {misDatos?.rrss ? misDatos?.rrss : ""}
                </p>

                <NumberFormat
                  format="+54 (###) ####-####"
                  value={misDatos?.telefono ? misDatos?.telefono : ""}
                  className="bajadas my-5"
                  displayType="text"
                />
              </div>
              {misDatos?.foto && (
                <img
                  src={misDatos?.foto}
                  alt="foto de perfil"
                  className="image-perfil-print"
                />
              )}
            </div>
            {/* fin datos empresa */}

            {/* inicio cliente */}
            <div className="bg-white-2 border-10 mb-20 py-20 px-20 d-flex align-center justify-between">
              <div className="d-flex flex-column">
                <p className="chalet-table my-12">{imprimir?.titulo}</p>
                <p className="chalet-table my-12">
                  Cliente: {imprimir?.cliente}
                </p>
              </div>
              <div className="d-flex flex-column">
                <span className="bajadas">
                  {formatDateSimple(imprimir?.fecha)}
                </span>
                <p className="bajadas">
                  Válido por {imprimir?.validez} días corridos
                </p>
              </div>
            </div>
            {/* fin cliente */}

            {/* INICIO PRODUCTOS */}
            <div className="bg-white-2 border-10 py-20 px-20">
              {/* inicio labels */}
              <div className="d-flex">
                <TableLabels modelo={modeloLabels} />
              </div>
              {/* fin labels */}
              {/* inicio listado */}
              {imprimir?.productos?.map((e) => {
                return (
                  <div className="d-flex">
                    {modeloLabels?.map((m) => {
                      return (
                        <div className={`table-${m.width}`}>
                          <label className="title-table label-table">
                            {m.nombre === "descripcion" ? (
                              e?.[m.nombre]
                            ) : (
                              <NumberFormat
                                value={e?.[m.nombre]}
                                displayType="text"
                                thousandSeparator={"."}
                                decimalSeparator={","}
                                prefix={m.nombre === "cantidad" ? "" : "$"}
                                decimalScale={2}
                                fixedDecimalScale={true}
                              />
                            )}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
              <div className="d-flex justify-between align-end w-100">
                <span className="italic-print">
                  {imprimir?.logistica > 0 ? "Incluye logística" : ""}
                </span>
                <div className="w-40 d-flex flex-column">
                  <div className="d-flex w-100">
                    <div className="table-50">
                      <label className="title-table label-table height-label-print label-bold-print">
                        Subtotal
                      </label>
                    </div>
                    <div className="table-50">
                      <NumberFormat
                        value={total}
                        displayType="text"
                        fixedDecimalScale={true}
                        thousandSeparator={"."}
                        decimalSeparator={","}
                        prefix={"$"}
                        className="title-table label-table height-label-print"
                        renderText={(value, props) => (
                          <label {...props}>{value}</label>
                        )}
                      />
                    </div>
                  </div>
                  <div className="d-flex w-100">
                    <div className="table-50">
                      <label className="title-table label-table height-label-print label-bold-print">
                        IVA ({imprimir?.iva}%)
                      </label>
                    </div>
                    <div className="table-50">
                      <NumberFormat
                        value={imprimir?.total_iva}
                        displayType="text"
                        decimalScale={2}
                        fixedDecimalScale={true}
                        thousandSeparator={"."}
                        decimalSeparator={","}
                        prefix={"$"}
                        className="title-table label-table height-label-print"
                        renderText={(value, props) => (
                          <label {...props}>{value}</label>
                        )}
                      />
                    </div>
                  </div>
                  <div className="d-flex w-100">
                    <div className="table-50">
                      <label className="title-table label-table height-label-print label-bold-print">
                        TOTAL
                      </label>
                    </div>
                    <div className="table-50">
                      <NumberFormat
                        value={imprimir?.total}
                        displayType="text"
                        fixedDecimalScale={true}
                        thousandSeparator={"."}
                        decimalSeparator={","}
                        prefix={"$"}
                        className="title-table label-table height-label-print"
                        renderText={(value, props) => (
                          <label {...props}>{value}</label>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* fin listado */}
            </div>
            {/* FIN PRODUCTOS */}

            {/* inicio textos */}
            <>
              <div className="bg-white-2 border-10 mb-20 py-20 px-20 my-20">
                <span className="text-print">
                  Aceptación por escrito, sello de la empresa, fecha y firma
                </span>
              </div>
              <div className="bg-white-2 border-10 mb-20 py-20 px-20 my-20">
                <span className="text-print">
                  {misDatos?.cuit ? (
                    <>
                      CUIT:{" "}
                      <NumberFormat
                        format="##-########-#"
                        value={misDatos?.cuit}
                        displayType="text"
                        fixedDecimalScale={true}
                      />
                    </>
                  ) : (
                    ""
                  )}
                  {misDatos?.condicion_iva
                    ? " - " + misDatos?.condicion_iva
                    : ""}
                  {misDatos?.banco ? " | Banco " + misDatos?.banco : ""}
                  {misDatos?.cbu ? " | CBU: " + misDatos?.cbu : ""}
                  {misDatos?.alias ? " | Alias: " + misDatos?.alias : ""}
                  {misDatos?.redes?.length > 0 && (
                    <div>
                      {misDatos?.redes.map((red) => {
                        return (
                          <span className="label label-redes">{red.text}</span>
                        );
                      })}
                    </div>
                  )}
                </span>
              </div>
            </>
            {/* fin textos */}
          </div>
        )}

        {/* INICIO BOTONES */}
        <BotonesImprimir image={image} />
        {/* FIN BOTONES */}
      </div>
    </Loader>
  );
}
