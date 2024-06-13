import React, { useState, useEffect } from "react";
import Layout from "../../components/layout";
import DatosBasicos from "../../components/perfil/DatosBasicos";
import DatosBancarios from "../../components/perfil/DatosBancarios";
import DatosContacto from "../../components/perfil/DatosContacto";
import CabeceraProductos from "../../components/CabeceraProductos";
import { useDoc, usePouch } from "use-pouchdb";
import Loader from "../../components/loader/Loader";
import { useRouter } from "next/router";
import DatosRedesSociales from "../../components/perfil/DatosRedesSociales";

export default function MiPerfil() {
  const [datosPerfil, setDatosPerfil] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [sentData, setSentData] = useState(false);
  const [errores, setErrores] = useState({});
  const { doc: docperfil, loading, error } = useDoc("misDatos");

  const db = usePouch();

  const router = useRouter();

  useEffect(() => {
    if (!loading && docperfil?._id) {
      setDatosPerfil(docperfil);
    }
  }, [loading, docperfil]);

  const handleSendData = (e) => {
    e.preventDefault();

    if (Object.keys(errores).length === 0) {
      db?.put(datosPerfil);
      router.push("/miperfil");
    }
  };
  return (
    <Loader isloading={loading}>
      <div className="mb-40">
        <DatosBasicos
          perfil={datosPerfil}
          funct={setDatosPerfil}
          errores={errores}
          setErrores={setErrores}
        />
        <DatosBancarios perfil={datosPerfil} funct={setDatosPerfil} />
        <DatosContacto perfil={datosPerfil} funct={setDatosPerfil} />
        <DatosRedesSociales perfil={datosPerfil} funct={setDatosPerfil} />
        <button
          className="mt-40 btn btn-lg btn-primary"
          onClick={(e) => handleSendData(e)}
          disabled={Object.keys(errores).length > 0}
        >
          Guardar
        </button>
      </div>
    </Loader>
  );
}

MiPerfil.getLayout = function getLayout(page) {
  const headProductos = <CabeceraProductos></CabeceraProductos>;
  return <Layout headPage={headProductos}>{page}</Layout>;
};
