import React from "react";
import NumberFormat from "react-number-format";

function Card({ e, costos, setCostos, setShowDetalle, setDetalle }) {
  const changeSeleccionado = () => {
    setCostos(e);
  };

  const getTotal = () => {
    return e?.items?.reduce(function (acc, obj) {
      return acc + Number(obj.valor);
    }, 0);
  };

  return (
    <div
      className={`d-flex flex-column justify-center ${
        costos?.descripcion === e?.descripcion ? "" : "blurry-card"
      }`}
    >
      <div onClick={() => changeSeleccionado()} className="cursor-pointer">
        <div
          className={`card-costo position-relative border-10 d-flex justify-center align-center mb-20 ${e?.clases}`}
        >
          <label className="container-check">
            <input
              type="checkbox"
              checked={costos?.descripcion === e?.descripcion}
            />
            <span className="checkmark border-6"></span>
          </label>
          <NumberFormat
            value={getTotal()}
            className="important-ficha"
            displayType="text"
            thousandSeparator={"."}
            decimalSeparator={","}
            prefix={"$"}
          />
        </div>
        <div className="text-center h-50 mb-10">
          <span className="semititle text-center">{e?.descripcion}</span>
        </div>
      </div>

      <button
        className="btn-no bg-white item-form"
        onClick={() => {
          setDetalle(e);
          setShowDetalle((prevShowDetalle) => !prevShowDetalle);
        }}
      >
        Ver más
      </button>
    </div>
  );
}

export default Card;
