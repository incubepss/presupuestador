import { useState, useEffect } from "react";
import Layout from "../components/layout";
import { ClienteData } from "../model/cliente";
import { ProductoData } from "../model/producto";
import { PresupuestoData } from "../model/presupuesto";
import TableEntityList from "../components/table-entity/TableListEntity";
import { Button } from "react-bootstrap";

import { usePouch } from "use-pouchdb";
import Loader from "../components/loader/Loader";
import { addSimpleDatabase, findAllDocs } from "../hooks/useRepository";
import { costosfijosinit } from "../data/costos-fijos";
import { InsumoData } from "../model/insumo";

export default function AdminDB() {
  const [sentData, setSentData] = useState(false);
  const [isLoadingDb, setIsLoadingDb] = useState(true);
  const [data, setData] = useState();

  const db = usePouch();

  useEffect(() => {
    findAllDocs(db, setData, setIsLoadingDb);
  }, [db, sentData]);

  const fillDb = () => {
    try {
      ClienteData.getInstallData().map((cli) => {
        existInDb(cli);
      });
      InsumoData.getInstallData().map((ins) => {
        existInDb(ins);
      });
      ProductoData.getInstallData().map((prod) => {
        existInDb(prod);
      });
      PresupuestoData.getInstallData().map((presu) => {
        existInDb(presu);
      });
      costosfijosinit?.map((e) => {
        return addSimpleDatabase(db, { ...e, tipo: "costo" }, "costofijo");
      });
    } finally {
      setSentData((prevSentData) => !prevSentData);
    }
  };

  const existInDb = (instance) => {
    db.put(instance)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const destroyDb = () => {
    db.destroy()
      .then(function (response) {
        setSentData((prevSentData) => !prevSentData);
        setData();
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const createMisDatos = () => {
    const misDatos = {
      _id: "misDatos",
      tipo_org: "Cooperativa",
      nombre: "La Solidaria",
      tipo: "",
      mail: "solidaria@gmail.com",
      cuit: "30564789256",
    };
    db.put(misDatos, { force: true })
      .then(function (response) {
        setSentData((prevSentData) => !prevSentData);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  return (
    <Loader isloading={isLoadingDb}>
      <h2 className="titulo-secundario mt-20 mb-20">Documentos</h2>
      <TableEntityList
        data={data}
        setLoading={() => setIsLoadingDb}
        setSent={() => setSentData()}
      />
      <div className="mt-20">
        <Button
          as="input"
          className="me-10"
          value="Datos Test"
          onClick={() => fillDb()}
        />
        <Button
          as="input"
          value="Crear empresa"
          className="me-10"
          onClick={() => createMisDatos()}
        />
        <Button as="input" value="Borrar Datos" onClick={() => destroyDb()} />
      </div>
    </Loader>
  );
}

AdminDB.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
