import Layout from "../../components/layout";
import CabeceraProductos from "../../components/CabeceraProductos";
import Loader from "../../components/loader/Loader";
import ListadoRemuneracionFija from "../../components/costosfijos/ListadoRemuneracion";
import ListadoRemuneracionVariable from "../../components/costosvariables/ListadoRemuneracionVariable";
import Integrantes from "../../components/costos/Integrantes";
import Ejemplos from "../../components/costos/Ejemplos";

export default function Remuneracion() {
  return (
    <Loader isloading={false}>
      <p className="bajadas mb-10">
        ¿Qué significa remuneración al trabajo? Es el <strong>ingreso</strong> o{" "}
        <strong>retiro</strong> que recibe el emprendedor/a o el/la asociada de
        la unidad productiva (UP) por el trabajo realizado.
      </p>
      <p className="bajadas mb-10">
        Acá, tenes que listar los roles o funciones dentro del proceso
        productivo que cumplen cada una de las personas que forman parte de tu
        Unidad Productiva (UP).
      </p>
      <p className="bajadas">
        Pero primero, tenes que definir cómo se calcula este pago o retiro
        dentro de la UP. Por ejemplo, puede ser calculado por jornada de
        trabajo, por cantidad de producción realizada o por una combinación de
        estos dos parámetros.
      </p>
      <ListadoRemuneracionFija />
      <ListadoRemuneracionVariable />
      <Ejemplos />
    </Loader>
  );
}

Remuneracion.getLayout = function getLayout(page) {
  const headProductos = <CabeceraProductos></CabeceraProductos>;
  return <Layout headPage={headProductos}>{page}</Layout>;
};
