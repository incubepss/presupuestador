import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import CabeceraProductos from "../../components/CabeceraProductos";
import Loader from "../../components/loader/Loader";
import { findInDatabase } from "../../hooks/useRepository";
import { usePouch } from "use-pouchdb";
import { getCostoUnitario, getTotales, getCostoTotal } from "../../hooks/calcs";
import Link from "next/link";
import { modeloProductos } from "../../data/ficha";
import NumberFormat from "react-number-format";
import TableLabels from "../../components/forms/TableLabels";

export default function ProductoList() {
  const [misProductos, setMisProductos] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingCF, setIsLoadingCF] = useState(true);
  const [isLoadingRF, setIsLoadingRF] = useState(true);
  const [misCostosFijos, setMisCostosFijos] = useState();
  const [misRF, setMisRF] = useState();
  const [totalCF, setTotalCF] = useState(0);
  const [totalRF, setTotalRF] = useState(0);
  const [misCV, setMisCV] = useState();
  const [isLoadingCV, setIsLoadingCV] = useState(true);
  const [misRV, setMisRV] = useState();
  const [isLoadingRV, setIsLoadingRV] = useState(true);

  const db = usePouch();

  useEffect(() => {
    findInDatabase(db, "producto", setMisProductos, setIsLoading);
    findInDatabase(db, "costofijo", setMisCostosFijos, setIsLoading);
    findInDatabase(db, "remuneracionfija", setMisRF, setIsLoadingRF);
    findInDatabase(db, "costovariable", setMisCV, setIsLoadingCV);
    findInDatabase(db, "remuneracionvar", setMisRV, setIsLoadingRV);
  }, [db]);

  useEffect(() => {
    getTotales(setIsLoadingCF, misCostosFijos, setTotalCF);
  }, [misCostosFijos]);

  useEffect(() => {
    getTotales(setIsLoadingRF, misRF, setTotalRF);
  }, [misRF]);

  return (
    <Loader
      isloading={
        isLoading && isLoadingCF && isLoadingRF && isLoadingCV && isLoadingRV
      }
    >
      <>
        {/* inicio intro */}
        <>
          <h2 className="titulo-secundario mt-0 mb-20">Ficha técnica</h2>
        </>
        {/* fin listado */}

        {/* inicio listado */}
        <>
          {/* inicio labels */}
          <div className="d-flex">
            <TableLabels modelo={modeloProductos} />
          </div>
          {/* fin labels */}
          <div className="mb-40">
            {misProductos?.map((e, i) => {
              return (
                <div
                  key={`misprod-${i}`}
                  className="d-flex bg-white-2 mt-10 mb-10 py-10 px-10 border-10"
                >
                  {modeloProductos?.map((m) => {
                    return (
                      <div className={`table-${m.width}`}>
                        <label className="label-table chalet-table py-10 px-10">
                          {m.nombre === "produccion_promedio_mensual" ? (
                            e[m.nombre] + "%"
                          ) : m.nombre === "costo_unitario_fijo" ||
                            m.nombre === "costo_unitario_variable" ? (
                            <NumberFormat
                              value={
                                m.nombre === "costo_unitario_fijo"
                                  ? getCostoUnitario(
                                      totalCF + totalRF,
                                      e?.produccion_promedio_mensual,
                                      e?.cantidad_promedio_mensual
                                    )
                                  : getCostoTotal(e, misCV, misRV)
                              }
                              displayType="text"
                              thousandSeparator={"."}
                              decimalSeparator={","}
                              prefix={"$"}
                              decimalScale={2}
                              fixedDecimalScale={true}
                            />
                          ) : (
                            e[m.nombre]
                          )}
                        </label>
                      </div>
                    );
                  })}
                  <div className="table-20">
                    <Link href={`/fichas/${e._id}`}>
                      <button className="btn btn-primary btn-lg ms-10">
                        Ver Ficha técnica
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </>
        {/* fin listado */}
      </>
    </Loader>
  );
}

ProductoList.getLayout = function getLayout(page) {
  const headProductos = <CabeceraProductos></CabeceraProductos>;
  return <Layout headPage={headProductos}>{page}</Layout>;
};
