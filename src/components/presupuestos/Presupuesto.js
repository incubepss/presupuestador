import React, { useEffect, useState, useContext } from "react";
import {
  findInDatabase,
  handleChange,
  findByIdInDatabase,
} from "../../hooks/useRepository";

import Loader from "../loader/Loader";
import { usePouch } from "use-pouchdb";
import {
  roundNumber,
  getTotales,
  getPrecioUnitarioPresupuesto,
} from "../../hooks/calcs";
import { useRouter } from "next/router";
import NumberFormat from "react-number-format";
import PresupuestosContext from "../../context/PresupuestosContext";
import PresupuestoEnviado from "./PresupuestoEnviado";
import VistaPrevia from "./VistaPrevia";
import ModalBorrarPresupuesto from "./ModalBorrarPresupuesto";
import Prestamo from "./Prestamo";
import Productos from "./Productos";
import GastosExtra from "./GastosExtra";
import CostoLogistica from "./CostoLogistica";
import BotonesPresupuesto from "./BotonesPresupuesto";

export default function Presupuesto() {
  const [misProductos, setMisProductos] = useState([]);
  const [misClientes, setMisClientes] = useState([]);
  const [isLoadingClientes, setIsLoadingClientes] = useState(true);
  const [isLoadingProductos, setIsLoadingProductos] = useState(true);
  const [nuevoProducto, setNuevoProducto] = useState({});
  const [totalCF, setTotalCF] = useState(0);
  const [totalRF, setTotalRF] = useState(0);
  const [misCF, setMisCF] = useState();
  const [isLoadingCF, setIsLoadingCF] = useState(true);
  const [misRF, setMisRF] = useState();
  const [isLoadingRF, setIsLoadingRF] = useState(true);
  const [misCV, setMisCV] = useState();
  const [isLoadingCV, setIsLoadingCV] = useState(true);
  const [misRV, setMisRV] = useState();
  const [isLoadingRV, setIsLoadingRV] = useState(true);
  const [totalPresupuesto, setTotalPresupuesto] = useState(0);
  const [subtotalPresupuesto, setSubtotalPresupuesto] = useState(0);
  const [isLoadingPresupuesto, setIsLoadingPresupuesto] = useState(true);
  const [misPresupuestos, setMisPresupuestos] = useState();
  const [isLoadingPresupuestos, setIsLoadingPresupuestos] = useState(true);
  const [imprimir, setImprimir] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [notificacionProductoEliminado, setNotificacionProductoEliminado] =
    useState(false);
  const [missingFieldsPresupuesto, setMissingFieldsPresupuesto] = useState([]);

  const db = usePouch();

  const router = useRouter();

  const {
    setMuestraLista,
    showImprimir,
    setShowImprimir,
    miPresupuesto,
    setMiPresupuesto,
  } = useContext(PresupuestosContext);

  const setPrestamo = (prestamo) => {
    setMiPresupuesto({ ...miPresupuesto, prestamo });
  };

  // OBTENGO DATA EN PRIMER RENDER
  useEffect(() => {
    findByIdInDatabase(
      db,
      router?.query?.id,
      setMiPresupuesto,
      setIsLoadingPresupuesto
    );
    findInDatabase(db, "producto", setMisProductos, setIsLoadingProductos);
    findInDatabase(db, "cliente", setMisClientes, setIsLoadingClientes);
    findInDatabase(db, "costovariable", setMisCV, setIsLoadingCV);
    findInDatabase(db, "remuneracionvar", setMisRV, setIsLoadingRV);
    findInDatabase(db, "remuneracionfija", setMisRF, setIsLoadingRF);
    findInDatabase(db, "costofijo", setMisCF, setIsLoadingCF);
    findInDatabase(
      db,
      "presupuesto",
      setMisPresupuestos,
      setIsLoadingPresupuestos
    );
  }, [router, db]);

  useEffect(() => {
    getTotales(setIsLoadingCF, misCF, setTotalCF);
  }, [misCF]);

  useEffect(() => {
    getTotales(setIsLoadingRF, misRF, setTotalRF);
  }, [misRF]);

  useEffect(() => {
    let temp = 0;
    temp = miPresupuesto?.productos
      ?.map((e) => {
        if (e?.descripcion && e?.cantidad && e?.excedente) {
          return roundNumber(
            getPrecioUnitarioPresupuesto(
              misProductos,
              e,
              totalCF,
              totalRF,
              miPresupuesto,
              misCV,
              misRV
            ) * Number(e?.cantidad)
          );
        } else {
          return 0;
        }
      })
      ?.reduce(function (acc, obj) {
        return acc + Number(obj);
      }, 0);

    let iva = (temp * Number(miPresupuesto?.iva)) / 100;

    setSubtotalPresupuesto(roundNumber(temp));
    setTotalPresupuesto(roundNumber(temp + iva));
  }, [miPresupuesto, misProductos, totalCF, totalRF, misCV, misRV]);

  useEffect(() => {
    if (miPresupuesto?.estado === "Borrador") {
      const productosExistentes = misProductos?.map((producto) => producto._id);

      const miPresupuestoFiltrado = {
        ...miPresupuesto,
        productos: miPresupuesto?.productos?.filter((item) =>
          productosExistentes.includes(item.descripcion)
        ),
      };

      // Verificar si se eliminó algún producto
      if (
        miPresupuestoFiltrado?.productos?.length <
        miPresupuesto?.productos?.length
      ) {
        setNotificacionProductoEliminado(true);
      } else {
        setNotificacionProductoEliminado(false);
      }

      setMiPresupuesto(miPresupuestoFiltrado);
    }
  }, [misProductos]);

  return (
    <Loader
      isloading={
        isLoadingProductos &&
        isLoadingClientes &&
        isLoadingCF &&
        isLoadingRF &&
        isLoadingCV &&
        isLoadingRV &&
        isLoadingPresupuesto &&
        totalPresupuesto &&
        isLoadingPresupuestos
      }
    >
      {miPresupuesto?.estado === "Confirmado" ||
      miPresupuesto?.estado === "Aprobado" ||
      miPresupuesto?.estado === "Rechazado" ? (
        <PresupuestoEnviado />
      ) : (
        <>
          {showImprimir && <VistaPrevia imprimir={imprimir} />}
          <h2 className="titulo-secundario mt-0 mb-20">Mis Presupuestos</h2>
          {/* inicio cliente */}
          <div className="container-fluid">
            <div className="row border-10 py-20 px-20 mb-20 bg-white-2">
              <div className="col col-md-2 mb-20-resp">
                <div className="status-description mt-5 bg-warning-dk text-white">
                  <span>Borrador</span>
                </div>
              </div>
              <div className="col col-md-6 col-md-offset-1">
                <div className="row mb-20">
                  <div className="col col-md-12 d-flex align-center">
                    <label className="control-label me-10">Presupuesto</label>
                    <input
                      className="input-table-presupuesto border-6 label-table"
                      type="text"
                      onChange={(e) =>
                        handleChange(
                          e.target.value,
                          "titulo",
                          miPresupuesto,
                          setMiPresupuesto
                        )
                      }
                      placeholder="Nuevo Presupuesto"
                      value={miPresupuesto?.titulo}
                    />
                  </div>
                </div>
                <div className="row mb-20">
                  <div
                    className={`${
                      missingFieldsPresupuesto?.includes("cliente")
                        ? "has-error"
                        : ""
                    } d-flex align-center col col-md-12`}
                  >
                    <label className="control-label min-w-label me-10">
                      Cliente
                    </label>
                    <select
                      className="input-table-presupuesto border-6 label-table form-control-border"
                      data-placeholder="Elegí una opción"
                      onChange={(e) => {
                        const value = e.target.value.toString().trim();
                        handleChange(
                          value,
                          "cliente",
                          miPresupuesto,
                          setMiPresupuesto
                        );
                      }}
                      value={
                        miPresupuesto?.cliente ? miPresupuesto?.cliente : ""
                      }
                    >
                      <option></option>
                      {misClientes?.map((e, i) => {
                        return (
                          <option value={e?.razon_social} key={i}>
                            {e?.razon_social}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="row mb-20-resp">
                  <div
                    className={`${
                      missingFieldsPresupuesto?.includes("fecha")
                        ? "has-error"
                        : ""
                    } col col-md-6 d-flex align-center mb-20-resp`}
                  >
                    <label className="control-label min-w-label me-10">
                      Fecha
                    </label>
                    <input
                      className="input-table-presupuesto border-6 label-table form-control-border"
                      type="date"
                      onChange={(e) => {
                        const value = e.target.value.toString().trim();
                        handleChange(
                          value,
                          "fecha",
                          miPresupuesto,
                          setMiPresupuesto
                        );
                      }}
                      value={miPresupuesto?.fecha ? miPresupuesto?.fecha : ""}
                    />
                  </div>
                  <div
                    className={`col col-md-6 d-flex align-center 
                      ${
                        missingFieldsPresupuesto?.includes("validez")
                          ? "has-error"
                          : ""
                      }`}
                  >
                    <label className="control-label min-w-label me-10">
                      Validez
                    </label>
                    <NumberFormat
                      value={
                        miPresupuesto?.validez ? miPresupuesto?.validez : ""
                      }
                      thousandSeparator={"."}
                      decimalSeparator={","}
                      allowLeadingZeros={true}
                      allowEmptyFormatting={true}
                      decimalScale={0}
                      fixedDecimalScale={true}
                      className="input-table-presupuesto border-6 label-table form-control-border"
                      suffix=" días"
                      onValueChange={(values) => {
                        const { floatValue } = values;

                        setMiPresupuesto({
                          ...miPresupuesto,
                          validez: floatValue,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col col-md-3">
                <NumberFormat
                  value={totalPresupuesto}
                  displayType="text"
                  thousandSeparator={"."}
                  decimalSeparator={","}
                  prefix={"$"}
                  decimalScale={2}
                  fixedDecimalScale={true}
                  className="text-end-lg titulo-secundario m-0"
                  renderText={(value, props) => <h2 {...props}>{value}</h2>}
                />
              </div>
            </div>
          </div>
          {/* fin cliente */}

          {notificacionProductoEliminado && (
            <div className="alert alert-danger">
              Un producto cargado a este presupuesto fue eliminado
            </div>
          )}

          {/* INICIO PRODUCTOS */}
          <Productos
            misProductos={misProductos}
            missingFieldsPresupuesto={missingFieldsPresupuesto}
            totalCF={totalCF}
            totalRF={totalRF}
            misCV={misCV}
            misRV={misRV}
          />
          {/* FIN PRODUCTOS */}

          {/* GASTOS EXTRAS */}
          <GastosExtra subtotalPresupuesto={subtotalPresupuesto} />
          {/* FIN GASTOS EXTRAS */}

          {/* INICIO LOGISTICA */}
          <CostoLogistica />
          {/* FIN LOGISTICA */}

          {/* INICIO PRESTAMO */}
          <Prestamo
            setPrestamo={setPrestamo}
            setNuevoProducto={setNuevoProducto}
          />
          {/* FIN PRESTAMO */}

          {/* INICIO BOTONES */}
          <BotonesPresupuesto
            setMuestraLista={setMuestraLista}
            setShowModal={setShowModal}
            totalPresupuesto={totalPresupuesto}
            misProductos={misProductos}
            totalCF={totalCF}
            totalRF={totalRF}
            misCV={misCV}
            misRV={misRV}
            subtotalPresupuesto={subtotalPresupuesto}
            setImprimir={setImprimir}
            setShowImprimir={setShowImprimir}
            setMissingFieldsPresupuesto={setMissingFieldsPresupuesto}
            misPresupuestos={misPresupuestos}
            setIsLoadingPresupuesto={setIsLoadingPresupuesto}
          />
          {/* FIN BOTONES */}
        </>
      )}
      {showModal && (
        <ModalBorrarPresupuesto show={showModal} setShowModal={setShowModal} />
      )}
    </Loader>
  );
}
