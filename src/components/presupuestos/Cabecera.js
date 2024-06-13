import { useDoc } from "use-pouchdb";
import Loader from "../loader/Loader";

export default function Cabecera() {
  const { doc: docMisDatos, loading, error } = useDoc("misDatos");

  return (
    <>
      <Loader isloading={loading}>
        <div className="bg-acua-lt pt-20 mb-40">
          <div className="container">
            <div className="row d-flex justify-content-between mb-60">
              <div className="col col-sm-9">
                <h1 className="mt-10 mb-20 bg-blanco">
                  {`${docMisDatos?.tipo_org} 
                  ${docMisDatos?.tipo !== undefined ? docMisDatos?.tipo : ""} 
                  ${docMisDatos?.nombre}`}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </Loader>
    </>
  );
}
