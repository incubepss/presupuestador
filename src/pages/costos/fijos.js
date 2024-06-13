import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import CabeceraProductos from "../../components/CabeceraProductos";
import { findInDatabase } from "../../hooks/useRepository";
import { usePouch } from "use-pouchdb";
import Loader from "../../components/loader/Loader";
import ListadoCostos from "../../components/costosfijos/ListadoCostos";
import ListadoAmortizaciones from "../../components/costosfijos/ListadoAmortizaciones";

export default function CostoFijosList() {
  const [setMisCostosFijos] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [isLoadingRF] = useState(true);
  const [sentData, setSentData] = useState(false);

  const db = usePouch();

  // OBTENGO DATA EN PRIMER RENDER
  useEffect(() => {
    findInDatabase(db, "costofijo", setMisCostosFijos, setIsLoading);
  }, [db, sentData]);

  return (
    <Loader isloading={isLoading && isLoadingRF}>
      <ListadoCostos sentData={sentData} setSentData={setSentData} />
      <ListadoAmortizaciones sentData={sentData} setSentData={setSentData} />
    </Loader>
  );
}

CostoFijosList.getLayout = function getLayout(page) {
  const headProductos = <CabeceraProductos></CabeceraProductos>;
  return <Layout headPage={headProductos}>{page}</Layout>;
};
