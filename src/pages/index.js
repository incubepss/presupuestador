import Layout from "../components/layout";
import JumbotronBA from "../components/bastrap/jumbotron-ba";

import { useRouter } from "next/router";
import { useEffect, useContext } from "react";
import Loader from "../components/loader/Loader";
import UserDataContext from "../context/UserDataContext";
import Introduccion from "../components/perfil/Introduccion";
import { useSession, getSession } from "next-auth/react";

export default function Index() {
  const router = useRouter();
  const { data: session } = useSession();
  const { isLoading, userData } = useContext(UserDataContext);

  useEffect(() => {
    if (session) {
      router.push("/miperfil");
    }
  }, [session]);

  useEffect(() => {
    if (!isLoading && userData?._id) {
      router.push("/miperfil");
    }
  }, [isLoading, userData]);

  const handleRedirect = (e) => {
    e.preventDefault();
    router.push("/misdatos");
  };

  return (
    <Loader isloading={isLoading}>
      <section>
        <Introduccion />
        <hr />
        <div className="row mb-60">
          <div className="col mt-20 col-sm-12">
            <button
              type="button"
              onClick={(e) => handleRedirect(e)}
              className="btn btn-lg btn-primary col-md-offset-10 col-md-2"
            >
              Registrarse
            </button>
          </div>
        </div>
      </section>
    </Loader>
  );
}

Index.getLayout = function getLayout(page) {
  var jumboBA = (
    <>
      <JumbotronBA img="/images/header.png" title="¡Bienvenidos/as!">
        <p className="lead">
          Esta herramienta te permitirá identificar los costos y elaborar
          presupuestos
        </p>
      </JumbotronBA>
    </>
  );
  return <Layout jumbo={jumboBA}>{page}</Layout>;
};
