import React from "react";
import Layout from "../../components/layout";
import CabeceraProductos from "../../components/CabeceraProductos";
import ListadoInsumos from "../../components/costosvariables/ListadoInsumos";

export default function VariablesList() {
  return (
    <>
      <h2 className="titulo-secundario mt-0 mb-20">Costos variables</h2>
      <p className="bajadas mb-20">
        Son aquellos necesarios para llevar adelante la producción de los bienes
        y servicios de una Unidad Productiva y comercializarlos. En este
        sentido, serán considerados los insumos y las materias primas
        intervinientes en toda la cadena de producción, incluidos aquellos
        necesarios para empaquetarlos y envolverlos.
      </p>

      <ListadoInsumos />
      <div className="col bg-primary-lt mb-20 mt-40 py-20 px-20 col-md-12 border-10">
        <h2 className="titulo-secundario mt-0 mb-20">
          ¿Cómo completar este apartado?
        </h2>
        <p className="example-text mb-20">
          Les recomendamos listar{" "}
          <strong>todos los insumos y materias primas</strong> necesarias para
          la producción de los bienes o servicios. O al menos de aquellos más
          vendidos o que quieran incluir en el presupuesto que quieren elaborar.
        </p>
        <p className="example-text mb-20">
          Esos sos insumos y materias primas deben ser cargadas en la{" "}
          <strong>magnitud mayorista</strong> que suelan comprarla. Deben
          definir su unidad de medida (kilos, docena, litros, unidad, etc.) y
          precio mayorista. Y, luego el sistema los arrojará el valor unitario
          según la unidad de medida definida.
        </p>
        <p className="example-text mb-20">
          En el próximo apartado podrán colocar las cantidades necesarias para
          producir el bien o servicio tomando el valor unitario que la
          herramienta calcula automáticamente gracias a la información que vos
          le ingreses.
        </p>
        <p className="example-text">
          Es muy importante mantener actualizados los precios en este apartado
          para un buen cálculo de costos y posterior determinación de precios.
        </p>
      </div>
    </>
  );
}

VariablesList.getLayout = function getLayout(page) {
  const headProductos = <CabeceraProductos></CabeceraProductos>;
  return <Layout headPage={headProductos}>{page}</Layout>;
};
