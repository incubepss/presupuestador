import React from "react";

function Ejemplos() {
  return (
    <div className="col bg-primary-lt mb-20 mt-40 py-20 px-20 col-md-12 border-10">
      <h2 className="titulo-secundario mt-0 mb-20">
        Remuneración al trabajo mixto (fijo y variable):
      </h2>
      <p className="example-text mb-20">
        Si dentro de tu UP el pago o el retiro se calcula como una combinación
        de los anteriores. Es decir, hay una base fija que recibe o retira la
        persona sin importar la producción realizada o el servicio suministrado.
        Y, otra parte, que depende de la cantidad de horas trabajadas o de
        productos realizados (pago de horas extras o extras por productividad),
        de personas atendidas/asistidas (propinas o comisión), entre otros
        ejemplos. Entonces la remuneración al trabajo es considerada como un{" "}
        <strong>costo mixto</strong>.
      </p>
      <p className="example-text">
        Si este es tu caso, tendrás que completar los valores dentro de los
        casilleros de remuneración como costo fijo y como costo variable, según
        corresponda, para cada rol dentro de tu UP.
      </p>
    </div>
  );
}

export default Ejemplos;
