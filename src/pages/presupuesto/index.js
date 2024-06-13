import { useEffect, useState, useContext } from "react";
import Layout from "../../components/layout";
import Loader from "../../components/loader/Loader";
import Cabecera from "../../components/presupuestos/Cabecera";
import { usePouch } from "use-pouchdb";
import Presupuestos from "../../components/perfil/Presupuestos";
import { findByDateInDatabase } from "../../hooks/useRepository";
import PresupuestosContext from "../../context/PresupuestosContext";
import Presupuesto from "../../components/presupuestos/Presupuesto";
import Steps from "../../components/Steps";

export default function PresupuestoList() {
  const [misPresupuestos, setMisPresupuestos] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [mostrarMas, setMostrarMas] = useState(10);

  const db = usePouch();

  const { index, muestraLista, setMuestraLista, sentData, setMiPresupuesto } =
    useContext(PresupuestosContext);

  // cambiar aca para ordenar
  useEffect(() => {
    findByDateInDatabase(db, "presupuesto", setMisPresupuestos, setIsLoading);
  }, [index, muestraLista, sentData]);

  const handleOnMostrarMas = () => {
    setMostrarMas((prevMostrarMas) => prevMostrarMas + 10);
  };

  const steps = [
    {
      target: ".btn-new",
      content: "Apretando comenzarás a elaborar tu presupuesto",
    },
  ];

  return (
    <Loader isloading={isLoading}>
      {muestraLista && (
        <div className="container-relative">
          <Steps
            steps={steps}
            showProgress={false}
            run={misPresupuestos?.length < 1}
          />
          <div className="pull-right mt-20">
            <button
              className="btn btn-primary btn-new"
              onClick={() => {
                setMuestraLista(false);
                setMiPresupuesto({
                  gastos_bancarios: 5,
                  gastos_financiamiento: 0,
                  iva: 21,
                  productos: [],
                  cliente: "",
                  estado: "Borrador",
                  logistica: 0,
                  prestamo: {
                    monto: 0,
                    tiempo: 0,
                    interes: 0,
                    interesTotal: 0,
                  },
                  fecha: new Date().toISOString().split("T")[0],
                  validez: 10,
                });
              }}
            >
              Nuevo presupuesto
            </button>
          </div>
          {misPresupuestos?.length > 0 ? (
            <>
              <Presupuestos
                setIsLoadingPresus={setIsLoading}
                mostrarMas={mostrarMas}
                presus={
                  index === "Todos"
                    ? misPresupuestos
                    : misPresupuestos.filter((e) => e.estado === index)
                }
              />
              {mostrarMas < misPresupuestos.length && (
                <div className="col col-sm-12">
                  <button
                    type="button"
                    className="btn btn-lg btn-primary d-block mx-auto"
                    onClick={handleOnMostrarMas}
                  >
                    Ver más
                  </button>
                </div>
              )}
              <div className="col bg-primary-lt mb-20 mt-40 py-20 px-20 col-md-12 border-10">
                <p className="example-text mb-20">
                  En esta sección vas a podés elaborar tus presupuestos y luego
                  encontrarlos listados. Aquí verás distintos filtros que podrás
                  aplicarle a los presupuestos que realizaste. ¿Qué significa
                  cada uno?
                </p>
                <p className="example-text mb-20">
                  <strong>Borrador</strong>: se trata de un presupuesto que está
                  en proceso de edición.
                </p>
                <p className="example-text mb-20">
                  <strong>Confirmado</strong>: se trata de un presupuesto que se
                  terminó de elaborar y fue cerrado. Es decir, es un presupuesto
                  que ya no se puede editar y al que tampoco le impacta el
                  cambio que se haga en costos fijos o costos variables; quedan
                  congelados los precios. No obstante, si precisas reutilizarlo,
                  podés duplicarlo y de esa manera editarlo. Una vez que el
                  presupuesto fue Confirmado, luego podrás indicar si fue
                  aprobado o rechazado por tu cliente. ¿Qué significa cada
                  estado del presupuesto?
                </p>
                <p className="example-text mb-20">
                  <strong>Aprobado</strong>: se trata de un presupuesto que fue
                  aprobado o aceptado por tu cliente. Estos datos son lo que
                  podrás ver dentro de las estadísticas que encontrarás en la
                  página de inicio del Presupuestador.
                </p>
                <p className="example-text">
                  <strong>Rechazado</strong>: se trata de un presupuesto que fue
                  no fue aprobado ni aceptado por tu cliente.
                </p>
              </div>
            </>
          ) : (
            <h2 className="titulo-secundario mt-0 mb-20">
              En esta sección vas a poder elaborar tus presupuestos y luego los
              encontrarás listados.
            </h2>
          )}
        </div>
      )}
      {!muestraLista && <Presupuesto />}
    </Loader>
  );
}

PresupuestoList.getLayout = function getLayout(page) {
  const headPresupuestos = <Cabecera />;

  return <Layout headPage={headPresupuestos}>{page}</Layout>;
};
