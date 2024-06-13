import React, { useState, useEffect } from "react";
import Layout from "../../components/layout";
import CabeceraProductos from "../../components/CabeceraProductos";
import { useDoc, usePouch } from "use-pouchdb";
import Loader from "../../components/loader/Loader";
import { useRouter } from "next/router";

export default function MiPerfil() {
  const [datosPerfil, setDatosPerfil] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { doc: docperfil, loading } = useDoc("misDatos");

  const db = usePouch();

  const router = useRouter();

  useEffect(() => {
    if (!loading && docperfil?._id) {
      setDatosPerfil(docperfil);
    }
  }, [loading, docperfil]);

  const handleSendData = (e) => {
    e.preventDefault();
    router.push("/miperfil");
  };

  return (
    <Loader isloading={loading}>
      <div className="mb-40">
        <h2 className="titulo-secundario mt-0">
          Configuación de sincronización
        </h2>
        <p>
          <input type="checkbox" checked="checked" /> Mantener los datos
          actualizados con el servidor cada una hora
        </p>
        <button className="mt-40 btn btn-lg btn-primary">
          Sincronizar ahora
        </button>
        <hr />

        <h2 className="titulo-secundario mt-0">
          Conectar con el servidor desde otro dispositivo
        </h2>
        <p>
          Para iniciar sesión, te enviaremos un correo electrónico a{" "}
          <strong>{datosPerfil?.mail}</strong> con un enlace para iniciar
          sesión.
        </p>
        <button className="mt-40 btn btn-lg btn-primary">
          Enviar correo electrónico
        </button>
        <hr />

        <h2 claclassNamess="titulo-secundario mt-0">Cerrar sesión</h2>
        <div className="alert alert-danger">
          Sincroniza los datos con el servidor y los borra de forma local.
        </div>
        <button className="mt-40 btn btn-lg btn-danger">Cerrar sesión</button>
        <hr />

        <button
          className="mt-40 btn btn-lg btn-primary"
          onClick={(e) => handleSendData(e)}
        >
          Volver
        </button>
      </div>
    </Loader>
  );
}

MiPerfil.getLayout = function getLayout(page) {
  const headProductos = <CabeceraProductos></CabeceraProductos>;
  return <Layout headPage={headProductos}>{page}</Layout>;
};
