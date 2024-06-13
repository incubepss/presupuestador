import { useState, useEffect } from "react";
import Link from "next/link";
import { useDoc, useAllDocs } from "use-pouchdb";
import Loader from "./loader/Loader";
import Banner from "./perfil/Banner";
import { useRouter } from "next/router";
import Steps from "./Steps";

export default function CabeceraProductos() {
  const [esPerfil, setEsPerfil] = useState(false);

  const { doc: docMisDatos, loading, error } = useDoc("misDatos");
  const { rows: remuneracion } = useAllDocs({
    startkey: "remuneracion",
    endkey: "remuneracion" + "\ufff0",
  });
  const { rows: costofijo } = useAllDocs({
    startkey: "costofijo",
    endkey: "costofijo" + "\ufff0",
  });
  const { rows: costovariable } = useAllDocs({
    startkey: "costovariable",
    endkey: "costovariable" + "\ufff0",
  });
  const { rows: productos } = useAllDocs({
    startkey: "producto",
    endkey: "producto" + "\ufff0",
  });
  const stepsRun =
    remuneracion.length < 1 ||
    costofijo.length < 1 ||
    costovariable.length < 1 ||
    productos.length < 1;
  const router = useRouter();

  const steps = [
    {
      target: "#remuneracion",
      content:
        "Corresponde al retiro o pago que recibe una persona por su trabajo.",
    },
    {
      target: "#costos-fijos",
      content:
        "Corresponde al gasto que la UP debe afrontar independientemente de la cantidad de bienes y servicios producidos y a las ventas realizadas.",
    },
    {
      target: "#costos-variables",
      content:
        "Corresponde a los gastos que varían junto a la variación de la producción de un bien o servicio.",
    },
    {
      target: "#productos",
      content:
        "Corresponde al listado de todos bienes y servicios de tu UP o de los más vendidos.",
    },
  ];

  useEffect(() => {
    if (router.asPath === "/miperfil") {
      setEsPerfil(true);
    } else if (router.asPath === "/miperfil/edita") {
      setEsPerfil(true);
    } else if (router.asPath === "/miperfil/config") {
      setEsPerfil(true);
    } else {
      setEsPerfil(false);
    }
  }, [router]);

  return (
    <>
      <Loader isloading={loading}>
        <Steps steps={steps} run={stepsRun} />
        <div className="bg-acua-lt pt-20 mb-40">
          <div className="container">
            <div className="row d-flex justify-content-between align-column-resp">
              <div className="col col-md-9 col-sm-12">
                <h1 className="mt-10 mb-20 bg-blanco">
                  {`${docMisDatos?.tipo_org}
                  ${docMisDatos?.nombre}`}
                </h1>
              </div>
              <div className="col d-flex flex-column col-md-3 col-md-offset-1 col-sm-3">
                <Link href="/miperfil/edita">
                  <a className="btn btn-lg btn-light mt-10 mb-10">
                    Editar Perfil
                  </a>
                </Link>
              </div>
            </div>
            {esPerfil && <Banner perfil={docMisDatos}></Banner>}
            {!esPerfil && router?.asPath !== "/presupuesto" && (
              <ul className="nav nav-pills nav-costos">
                <Link href="/remuneracion">
                  <li
                    className={
                      router?.asPath === "/remuneracion" ? "active" : ""
                    }
                  >
                    <a id="remuneracion">
                      Remuneración al trabajo ({remuneracion.length})
                    </a>
                  </li>
                </Link>
                <Link href="/costos/fijos">
                  <li
                    className={
                      router?.asPath === "/costos/fijos" ? "active" : ""
                    }
                  >
                    <a id="costos-fijos">Costos Fijos ({costofijo.length})</a>
                  </li>
                </Link>
                <Link href="/costos/variables">
                  <li
                    className={
                      router?.asPath === "/costos/variables" ? "active" : ""
                    }
                  >
                    <a id="costos-variables">
                      Costos Variables ({costovariable.length})
                    </a>
                  </li>
                </Link>
                <Link href="/capacidad-productiva">
                  <li
                    className={`${
                      router?.asPath === "/capacidad-productiva" ||
                      router?.asPath.includes("/fichas")
                        ? "active"
                        : ""
                    }`}
                  >
                    <a id="productos">
                      Productos y servicios ({productos.length})
                    </a>
                  </li>
                </Link>
              </ul>
            )}
          </div>
        </div>
      </Loader>
    </>
  );
}
