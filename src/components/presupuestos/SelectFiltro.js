import React, { useContext, useRef } from "react";
import { estados, getStatusConfig, useOutsideAlerter } from "./functions";
import PresupuestosContext from "../../context/PresupuestosContext";
import { useRouter } from "next/router";

function SelectFiltro({ muestraSelect, setMuestraSelect }) {
  const { index, setIndex } = useContext(PresupuestosContext);

  const router = useRouter();

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setMuestraSelect);

  return (
    <div
      className={`container-filtro d-flex ${
        router.asPath === "/miperfil" ? "position-perfil" : ""
      }`}
      ref={wrapperRef}
    >
      <img
        className="cursor-pointer h-fit me-10 mt-12"
        src="/icons/filter.png"
        alt="Filtrar"
        onClick={() =>
          setMuestraSelect((prevMuestraSelect) => !prevMuestraSelect)
        }
      />
      <div
        className={`px-10 pt-10 ${
          muestraSelect ? "bg-white box-shadow select-bord" : ""
        }`}
      >
        {muestraSelect ? (
          estados.map((e) => {
            return (
              <button
                className={`status-description mb-10 btn-no ${
                  getStatusConfig(e).bgClass
                } ${getStatusConfig(e).color}`}
                onClick={() => {
                  setMuestraSelect(false);
                  setIndex(e);
                }}
              >
                {e}
              </button>
            );
          })
        ) : (
          <button
            className={`status-description btn-no ${
              getStatusConfig(index).bgClass
            } ${getStatusConfig(index).color}`}
            onClick={() =>
              setMuestraSelect((prevMuestraSelect) => !prevMuestraSelect)
            }
          >
            {index}
          </button>
        )}
      </div>
    </div>
  );
}

export default SelectFiltro;
