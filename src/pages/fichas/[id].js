import React, { useState, useEffect } from "react";

import Joyride from "react-joyride";
import Layout from "../../components/layout";

import CabeceraProductos from "../../components/CabeceraProductos";
import Loader from "../../components/loader/Loader";
import { usePouch } from "use-pouchdb";
import {
  editInDatabase,
  findByIdInDatabaseInsumo,
  findInDatabase,
  handleChange,
} from "../../hooks/useRepository";
import { useRouter } from "next/router";
import { getCostoUnitario, getTotales, getCostoTotal } from "../../hooks/calcs";
import Insumos from "../../components/fichas/Insumos";
import Trabajo from "../../components/fichas/Trabajo";
import TablaEquivalencias from "../../components/fichas/TablaEquivalencias";
import Steps from "../../components/Steps";
import NumberFormat from "react-number-format";
import { um } from "../../data/um";

export default function Ficha() {
  const [producto, setProducto] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [misCV, setMisCV] = useState();
  const [isLoadingCV, setIsLoadingCV] = useState(true);
  const [misRV, setMisRV] = useState();
  const [isLoadingRV, setIsLoadingRV] = useState(true);
  const [sentData, setSentData] = useState(true);
  const [totalCF, setTotalCF] = useState(0);
  const [totalRF, setTotalRF] = useState(0);
  const [misCF, setMisCF] = useState();
  const [isLoadingCF, setIsLoadingCF] = useState(true);
  const [misRF, setMisRF] = useState();
  const [isLoadingRF, setIsLoadingRF] = useState(true);
  const [costoVariableUnitario, setCostoVariableUnitario] = useState(0);
  const [orderInsumo, setOrderInsumo] = useState(true);

  const steps = [
    {
      target: "#paso1",
      content:
        "Corresponde definir la unidad o cantidad de unidades de la que se quiera calcular su costo variable unitario.",
    },
    {
      target: "#paso2",
      content:
        "Corresponde seleccionar cada uno de los insumos y materias primas del listado previamente definido. También definir las cantidades necesarias de cada uno.",
    },
    {
      target: "#paso3",
      content:
        "Corresponde completarlo si el pago o retiro por lo trabajado dentro de tu UP es considerado un costo variable o mixto.",
    },
  ];

  const [showAlert, setShowAlert] = useState({
    show: false,
    type: "",
  });

  const db = usePouch();

  const router = useRouter();

  // obtiene datos necesarios
  useEffect(() => {
    findInDatabase(db, "costovariable", setMisCV, setIsLoadingCV);
    findInDatabase(db, "remuneracionvar", setMisRV, setIsLoadingRV);
    findInDatabase(db, "remuneracionfija", setMisRF, setIsLoadingRF);
    findInDatabase(db, "costofijo", setMisCF, setIsLoadingCF);
  }, [producto]);

  // OBTENGO DATA EN PRIMER RENDER
  useEffect(() => {
    findByIdInDatabaseInsumo(
      db,
      router?.query?.id,
      setProducto,
      setIsLoading,
      misCV,
      orderInsumo
    );
  }, [db, router, sentData]);

  useEffect(() => {
    getTotales(setIsLoadingCF, misCF, setTotalCF);
  }, [sentData, misCF]);

  useEffect(() => {
    getTotales(setIsLoadingRF, misRF, setTotalRF);
  }, [sentData, misRF]);

  useEffect(() => {
    setIsLoading(true);
    if (producto?._id) {
      try {
        setCostoVariableUnitario(getCostoTotal(producto, misCV, misRV));
      } finally {
        setIsLoading(false);
      }
    }
  }, [producto, misCV, misRV]);

  const validacionExistenciaDatos = () => {
    const insumos = misCV?.map((costo) => costo._id);
    const remuneracionF = misRF?.map((remuneracion) => remuneracion._id);
    const remuneracionV = misRV?.map((remuneracion) => remuneracion._id);

    const remuneracion = remuneracionF?.concat(remuneracionV);

    const insumosFiltrados = producto?.insumos?.filter((item) =>
      insumos?.includes(item.descripcion)
    );
    const remuneracionFiltrada = producto?.remuneracion?.filter((item) =>
      remuneracion?.includes(item.descripcion)
    );

    // Verificar si se eliminó algún insumo o remuneración
    if (insumosFiltrados?.length !== producto?.insumos?.length) {
      setShowAlert({ show: true, type: "insumo" });
    } else if (
      remuneracionFiltrada?.length !== producto?.remuneracion?.length
    ) {
      setShowAlert({ show: true, type: "remuneracion" });
    }

    const productoFiltrado = {
      ...producto,
      insumos: insumosFiltrados,
      remuneracion: remuneracionFiltrada,
    };

    // Verificar si productoFiltrado es diferente al estado actual de producto
    if (JSON.stringify(productoFiltrado) !== JSON.stringify(producto)) {
      setProducto(productoFiltrado);
    }
  };

  useEffect(() => {
    //validacionExistenciaDatos();
  }, [misCV, misRF, misRV]);

  return (
    <Loader
      isloading={
        isLoadingCV && isLoadingRV && isLoading && isLoadingRF && isLoadingCF
      }
    >
      {/* inicio descripcion */}
      <>
        <h2 className="titulo-secundario mt-0 mb-20">
          Detalle de ficha técnica
          <Steps steps={steps} run={producto?.insumos === undefined} />
        </h2>
        <p className="bajadas">
          Este apartado sirve para calcular el costo variable de un producto o
          servicio determinado. Aquí podrás encontrar todos los insumos y
          materias primas necesarios seleccionando dentro del listado de insumos
          que hayas completado en el apartado anterior. No olvides de incluir
          los costos asociados al envoltorio y empaquetado.
        </p>
        <hr className="mt-40" />
      </>
      {/* fin descripcion */}

      {/* inicio producto  */}
      <>
        <h2 className="titulo-secundario">{producto?.descripcion}</h2>
        <div className="bg-white-2 mt-20 py-20 px-20 border-10">
          <div className="row">
            <div className="col col-md-3">
              <div
                id="paso1"
                className="input-table input-big input-table-required border-10 me-10 mb-10"
              >
                Cantidad a presupuestar
                <br />
                <NumberFormat
                  value={
                    producto?.cantidad_unitaria
                      ? producto?.cantidad_unitaria
                      : 1
                  }
                  thousandSeparator={"."}
                  decimalSeparator={","}
                  allowLeadingZeros={true}
                  allowNegative={false}
                  allowEmptyFormatting={true}
                  decimalScale={2}
                  fixedDecimalScale={true}
                  suffix={
                    um?.find((i) => i.descripcion === producto?.unidad_medida)
                      ?.value
                  }
                  className="input-table-ficha important-ficha"
                  onValueChange={(values) => {
                    const { floatValue } = values;

                    handleChange(
                      floatValue,
                      `cantidad_unitaria`,
                      producto,
                      setProducto
                    );
                  }}
                />
              </div>
            </div>
            <div className="col col-md-3">
              <div className="input-noedit input-big border-10 me-10 mb-10">
                Costo fijo unitario
                <NumberFormat
                  value={getCostoUnitario(
                    totalCF + totalRF,
                    producto?.produccion_promedio_mensual,
                    producto?.cantidad_promedio_mensual
                  )}
                  displayType="text"
                  thousandSeparator={"."}
                  decimalSeparator={","}
                  prefix={"$"}
                  decimalScale={2}
                  fixedDecimalScale={true}
                />
              </div>
            </div>
            <div className="col col-md-3">
              <div className="input-noedit input-big  border-10 me-10 mb-10">
                Costo variable unitario
                <NumberFormat
                  value={costoVariableUnitario}
                  displayType="text"
                  thousandSeparator={"."}
                  decimalSeparator={","}
                  prefix={"$"}
                  decimalScale={2}
                  fixedDecimalScale={true}
                />
              </div>
            </div>
            <div className="col col-md-3">
              <div className="input-noedit input-big border-10 me-10">
                Costo total unitario
                <NumberFormat
                  value={
                    getCostoUnitario(
                      totalCF + totalRF,
                      producto?.produccion_promedio_mensual,
                      producto?.cantidad_promedio_mensual
                    ) + costoVariableUnitario
                  }
                  displayType="text"
                  thousandSeparator={"."}
                  decimalSeparator={","}
                  prefix={"$"}
                  decimalScale={2}
                  fixedDecimalScale={true}
                />
              </div>
            </div>
          </div>
        </div>
        {/* inicio insumos */}
        <div id="paso2">
          <Insumos
            producto={producto}
            setProducto={setProducto}
            orderInsumo={orderInsumo}
            setOrderInsumo={setOrderInsumo}
            misCV={misCV}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </div>
        {/* fin insumos */}
        {showAlert.show && (
          <div className="alert alert-danger">
            {showAlert.type === "remuneracion" ? "Una" : "Un"} {showAlert.type}{" "}
            cargado a esta ficha fue eliminado
          </div>
        )}
        {/* inicio trabajo */}
        <div id="paso3">
          <Trabajo producto={producto} setProducto={setProducto} />
        </div>
        {/* fin trabajo */}
        {/* INICIO BOTONES */}
        <div className="d-flex mt-50 justify-between">
          <button
            className="btn btn-lg btn-primary me-10"
            onClick={(e) => {
              router?.push("/capacidad-productiva");
            }}
          >
            Cancelar
          </button>
          <button
            className="btn btn-lg btn-primary me-10"
            onClick={(e) => {
              if (
                producto?.remuneracion?.length > 0 ||
                producto?.insumos?.length > 0
              ) {
                try {
                  editInDatabase(
                    db,
                    producto?._id,
                    producto,
                    setIsLoading,
                    setSentData
                  );
                } finally {
                  router?.push("/capacidad-productiva");
                }
              }
            }}
          >
            Guardar Cambios
          </button>
        </div>
        {/* FIN BOTONES */}
        <TablaEquivalencias></TablaEquivalencias>
      </>
      {/* fin producto */}
    </Loader>
  );
}

Ficha.getLayout = function getLayout(page) {
  const headProductos = <CabeceraProductos></CabeceraProductos>;
  return <Layout headPage={headProductos}>{page}</Layout>;
};
