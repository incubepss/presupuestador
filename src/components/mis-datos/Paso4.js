import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import { tiposDeOrg } from "../../data/mis-datos";
import NumberFormat from "react-number-format";
import Card from "./Card";
import { plantillas_costos } from "../../data/costos-fijos";
import DetallePlantilla from "./DetallePlantilla";

function Paso4({ formData, costos, setCostos }) {
  const [showDetalle, setShowDetalle] = useState(false);
  const [detalle, setDetalle] = useState();

  const org = () => tiposDeOrg?.find((e) => e.nombre === formData?.tipo_org);

  useEffect(() => {
    let seleccionado = plantillas_costos?.find(
      (e) => e.descripcion === formData?.rubro
    );

    setCostos({ ...seleccionado });
  }, []);

  return (
    <>
      {/* inicio resumen */}
      <div className="mt-60">
        <h1 className="title-wizard">Detalle del perfil</h1>
        <hr />
        <div className="w-100 d-flex align-column-resp">
          <div className="w-40 shortcut w-100-resp">
            <span className={org()?.color}>
              <img
                className="img-responsive"
                src={`/images/iconos/${org()?.img}`}
                alt={org()?.nombre}
              />
            </span>
            <h3>{formData?.tipo_org}</h3>
          </div>
          <div className="w-60 w-100-resp d-flex flex-column justify-center">
            <div className="form-group">
              <span className="semititle">{formData?.nombre}</span>
            </div>
            <div className="d-flex justify-between align-column-resp">
              <div className="form-group w-45 w-100-resp">
                <NumberFormat
                  format={"+54 (###) ####-####"}
                  mask="_"
                  value={formData?.telefono}
                  allowLeadingZeros={true}
                  allowNegative={false}
                  allowEmptyFormatting={true}
                  className="control-label"
                  displayType="text"
                />
              </div>
              <div className="form-group w-45 w-100-resp">
                <span className="control-label">{formData?.mail}</span>
              </div>
            </div>
            <div className="form-group d-flex flex-column">
              <label className="control-label">{formData?.tipo}</label>
            </div>
          </div>
        </div>
        <hr />
      </div>
      {/* fin resumen */}

      {/* inicio costos fijos */}
      <div className="mt-40 mb-60 position-relative">
        <h3 className="subtitle-chalet">Costos fijos</h3>
        <p className="title-home mb-40">
          El mismo corresponde a los costos fijos de la Unidad Productiva para
          poner en marcha la producción, por ejemplo: gastos de alquiler, de
          servicios, entre otros. Para facilitar la carga inicial, te proponemos
          utilizar alguna de las siguientes plantillas de referencia.Una vez
          guardados, los vas a poder editar y adaptar a tu organización.
        </p>
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={30}
          className="swiper-costos"
        >
          {plantillas_costos?.map((e) => {
            return (
              <SwiperSlide>
                <Card
                  e={e}
                  costos={costos}
                  setCostos={setCostos}
                  setShowDetalle={setShowDetalle}
                  setDetalle={setDetalle}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>

        {showDetalle && (
          <DetallePlantilla e={detalle} setShowDetalle={setShowDetalle} />
        )}
      </div>
      {/* fin costos fijos */}
    </>
  );
}

export default Paso4;
