import React, { useContext, useState, useEffect } from "react";

import PresupuestosContext from "../../context/PresupuestosContext";
import {
  getDifferenceDates,
  getTotales,
  getPrecioUnitarioPresupuesto,
} from "../../hooks/calcs";
import { duplicateInDatabase, findInDatabase } from "../../hooks/useRepository";
import { usePouch } from "use-pouchdb";
import Loader from "../loader/Loader";
import { useRouter } from "next/router";
import NumberFormat from "react-number-format";
import SelectFiltro from "../presupuestos/SelectFiltro";
import CambioEstado from "../presupuestos/CambioEstado";

export default function Presupuestos({
  presus,
  setIsLoadingPresus,
  mostrarMas,
}) {
  const [misProductos, setMisProductos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
  const [muestraSelect, setMuestraSelect] = useState(false);

  const db = usePouch();

  const router = useRouter();

  const { setSentData } = useContext(PresupuestosContext);

  useEffect(() => {
    findInDatabase(db, "producto", setMisProductos, setIsLoading);
    findInDatabase(db, "costovariable", setMisCV, setIsLoadingCV);
    findInDatabase(db, "remuneracionvar", setMisRV, setIsLoadingRV);
    findInDatabase(db, "remuneracionfija", setMisRF, setIsLoadingRF);
    findInDatabase(db, "costofijo", setMisCF, setIsLoadingCF);
  }, [db]);

  useEffect(() => {
    getTotales(setIsLoadingCF, misCF, setTotalCF);
  }, [misCF]);

  useEffect(() => {
    getTotales(setIsLoadingRF, misRF, setTotalRF);
  }, [misRF]);

  const getTotal = (e) => {
    let temp = e?.productos
      ?.map((i) => {
        if (i?.descripcion && i?.cantidad && i?.excedente) {
          return (
            getPrecioUnitarioPresupuesto(
              misProductos,
              i,
              totalCF,
              totalRF,
              e,
              misCV,
              misRV
            ) * Number(i.cantidad)
          );
        } else {
          return 0;
        }
      })
      ?.reduce(function (acc, obj) {
        return acc + Number(obj);
      }, 0);

    let iva = Number(e?.iva) !== 0 ? temp * (Number(e?.iva) / 100) : 0;

    return temp + iva;
  };

  return (
    <Loader
      isloading={
        isLoading && isLoadingCF && isLoadingRF && isLoadingCV && isLoadingRV
      }
    >
      <div className="">
        <div className="row d-flex align-center mb-20">
          <h2
            className={`titulo-secundario mt-0 mb-0 ${
              router.asPath === "/presupuesto" ? "d-block-md" : "mb-40"
            } me-20`}
          >
            Mis Presupuestos
          </h2>

          <div className="d-flex align-center position-relative mt-20 mb-30">
            <SelectFiltro
              muestraSelect={muestraSelect}
              setMuestraSelect={setMuestraSelect}
            />
          </div>
        </div>

        <div className="col">
          {presus.slice(0, mostrarMas)?.map((e, i) => {
            return (
              <div
                className="row bg-white-2 border-10 mb-20 py-20 d-flex-md align-center"
                key={i}
              >
                {/* estado */}
                <div className="col position-relative my-auto d-block-md col-md-2 col-sm-12">
                  <CambioEstado
                    presu={e}
                    setIsLoadingPresus={setIsLoadingPresus}
                    setSentData={setSentData}
                  />
                </div>
                {/* datos basicos */}
                <div className="col col-md-5 col-sm-12">
                  <span className="bajadas-heavy">{e?.titulo}</span>
                  <p className="bajadas">
                    Cliente: {e?.cliente} |{" "}
                    {getDifferenceDates(e?.actualizacion) < 1 ? (
                      "NUEVO"
                    ) : (
                      <>
                        HACE {getDifferenceDates(e?.actualizacion)}{" "}
                        {getDifferenceDates(e?.actualizacion) > 1
                          ? "DÍAS"
                          : "DÍA"}
                      </>
                    )}
                  </p>
                </div>
                {/* monto */}
                <div className="col col-md-3 col-sm-12">
                  <NumberFormat
                    value={e?.estado === "Borrador" ? getTotal(e) : e?.total}
                    displayType="text"
                    thousandSeparator={"."}
                    decimalSeparator={","}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    className="titulo-secundario m-0"
                    renderText={(value, props) => <h2 {...props}>{value}</h2>}
                  />
                </div>
                {/* estado responsive */}
                <div className="col position-relative my-auto d-none-md col-md-2 col-sm-2 col-xs-2">
                  <CambioEstado
                    presu={e}
                    setIsLoadingPresus={setIsLoading}
                    setSentData={setSentData}
                  />
                </div>
                {/* visualizar */}
                <div className="col d-flex-block col-md-2 col-md-offset-0 col-sm-2 col-sm-offset-8 col-xs-offset-6 col-xs-4">
                  {e.estado === "Borrador" ? (
                    <img
                      src="/icons/show-icon.png"
                      className="cursor-pointer me-20"
                      alt="editar"
                      onClick={(event) => {
                        event.preventDefault();
                        router?.push(`/presupuesto/${e._id}`);
                      }}
                    />
                  ) : (
                    <span
                      className="presupusto-preview glyphicon glyphicon-eye-open cursor-pointer me-20"
                      alt="editar"
                      onClick={(event) => {
                        event.preventDefault();
                        router?.push(`/presupuesto/${e._id}`);
                      }}
                    ></span>
                  )}
                  <img
                    src="/icons/duplicate.png"
                    className="cursor-pointer"
                    alt="descargar"
                    onClick={() => {
                      duplicateInDatabase(
                        e?.productos?.length > 0 && e?.cliente?.length > 0,
                        db,
                        {
                          ...e,
                          titulo: `${
                            e.titulo.includes("Copia")
                              ? e.titulo
                              : "Copia " + e.titulo
                          }`,
                          total: undefined,
                          estado: "Borrador",
                          productos: e.productos.map((elem) => {
                            if (elem.id) {
                              return {
                                descripcion: elem.id,
                                cantidad: elem.cantidad,
                                excedente: elem.excedente,
                                costo: elem.costo,
                              };
                            }
                            return { ...elem };
                          }),
                        },
                        "presupuesto",
                        setSentData
                      );
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Loader>
  );
}
