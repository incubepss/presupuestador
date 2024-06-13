import React from "react";
import { um } from "../../data/um";
function TablaEquivalencias() {
  const peso = um.filter((unidad) => unidad.tipo === "Peso");
  const volumen = um.filter((unidad) => unidad.tipo === "Volumen");
  const unidad = um.filter((unidad) => unidad.tipo === "Unidad");
  const tiempo = um.filter((unidad) => unidad.tipo === "Tiempo");
  const distancia = um.filter((unidad) => unidad.tipo === "Distancia");

  function Tabla({ unidad }) {
    return (
      <section className="ml-10">
        <h4 className="mt-0 example-title">{unidad[0].tipo}:</h4>
        <p className="example-text"></p>
        {unidad.map((e) => {
          return (
            <p key={e}>
              {e.descripcion}: {e.valor}
            </p>
          );
        })}
      </section>
    );
  }
  return (
    <div className="col bg-primary-lt mb-20 mt-40 py-20 px-20 col-md-12 border-10">
      <h2 className="titulo-secundario mt-0 mb-20">Equivalencia de medidas</h2>
      <div className="d-flex space-between flex-wrap">
        <Tabla unidad={peso}></Tabla>
        <Tabla unidad={volumen}></Tabla>
        <Tabla unidad={unidad}></Tabla>
        <Tabla unidad={tiempo}></Tabla>
        <Tabla unidad={distancia}></Tabla>
      </div>
    </div>
  );
}

export default TablaEquivalencias;
