import React from "react";
import Cabecera from "../../components/presupuestos/Cabecera";
import Layout from "../../components/layout";
import Presupuesto from "../../components/presupuestos/Presupuesto";

export default function PresupuestoEdit() {
  return <Presupuesto />;
}

PresupuestoEdit.getLayout = function getLayout(page) {
  const headPresupuestos = <Cabecera />;

  return <Layout headPage={headPresupuestos}>{page}</Layout>;
};
