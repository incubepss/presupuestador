import React, { useEffect, useState, useContext } from "react";
import NumberFormat from "react-number-format";
import { usePouch } from "use-pouchdb";
import { useRouter } from "next/router";

import {
  findByIdInDatabase,
  formatDateSimple,
} from "../../hooks/useRepository";

import Loader from "../loader/Loader";
import {
  labelsCostos,
  modeloCostos,
  modeloLabelsProductosEnviado,
} from "../../data/presupuesto";
import PresupuestosContext from "../../context/PresupuestosContext";
import { getStatusConfig } from "./functions";
import TableLabelsGrey from "../forms/TableLabelsGrey";
import BotonesEnviado from "./BotonesEnviado";
import VistaPrevia from "./VistaPrevia";
import { um } from "../../data/um";

export default function PresupuestoEnviado() {
  const [isLoadingPresupuesto, setIsLoadingPresupuesto] = useState(true);

  const db = usePouch();

  const router = useRouter();

  const { setMuestraLista, showImprimir, miPresupuesto, setMiPresupuesto } =
    useContext(PresupuestosContext);

  // OBTENGO DATA EN PRIMER RENDER
  useEffect(() => {
    findByIdInDatabase(
      db,
      router?.query?.id,
      setMiPresupuesto,
      setIsLoadingPresupuesto
    );
  }, [router, db]);

  return (
    <Loader isloading={isLoadingPresupuesto}>
      {showImprimir && <VistaPrevia imprimir={miPresupuesto} />}
      <div>
        <h2 className="titulo-secundario mt-0 mb-20">Mis Presupuestos</h2>
        {/* inicio cliente */}
        <div className="container-fluid mb-40">
          <div className="row border-10 py-20 px-20 bg-white-2">
            <div className="col col-md-2 mb-20-resp">
              <div
                className={`status-description mt-5 ${
                  getStatusConfig(miPresupuesto.estado).bgClass
                } ${getStatusConfig(miPresupuesto.estado).color}`}
              >
                <span>{miPresupuesto.estado}</span>
              </div>
            </div>
            <div className="col col-md-6 col-md-offset-1">
              <div className="row mb-20">
                <div className="col col-md-12 d-flex align-center">
                  <label className="control-label me-10">Presupuesto</label>
                  <span className="input-table-presupuesto border-6 label-table bg-white">
                    {miPresupuesto?.titulo}
                  </span>
                </div>
              </div>
              <div className="row mb-20">
                <div className="d-flex align-center col col-md-12">
                  <label className="control-label min-w-label me-10">
                    Cliente
                  </label>
                  <span className="input-table-presupuesto border-6 label-table form-control-border">
                    {miPresupuesto?.cliente ? miPresupuesto?.cliente : ""}
                  </span>
                </div>
              </div>
              <div className="row mb-20-resp">
                <div className="col col-md-6 d-flex align-center mb-20-resp">
                  <label className="control-label min-w-label me-10">
                    Fecha
                  </label>
                  <span className="input-table-presupuesto border-6 label-table form-control-border">
                    {miPresupuesto?.fecha
                      ? formatDateSimple(miPresupuesto?.fecha)
                      : ""}
                  </span>
                </div>
                <div className="col col-md-6 d-flex align-center">
                  <label className="control-label min-w-label me-10">
                    Validez
                  </label>
                  <NumberFormat
                    value={miPresupuesto?.validez ? miPresupuesto?.validez : ""}
                    thousandSeparator={"."}
                    decimalSeparator={","}
                    allowLeadingZeros={true}
                    allowEmptyFormatting={true}
                    decimalScale={0}
                    fixedDecimalScale={true}
                    className="input-table-presupuesto border-6 label-table form-control-border"
                    suffix=" días"
                    displayType="text"
                  />
                </div>
              </div>
            </div>
            <div className="col col-md-3">
              <NumberFormat
                value={miPresupuesto?.total}
                displayType="text"
                thousandSeparator={"."}
                decimalSeparator={","}
                prefix={"$"}
                decimalScale={2}
                fixedDecimalScale={true}
                className="text-end-lg titulo-secundario m-0"
                renderText={(value, props) => <h2 {...props}>{value}</h2>}
              />
            </div>
          </div>
        </div>
        {/* fin cliente */}

        {/* INICIO PRODUCTOS */}
        <div className="border-10 over-hidden border-grey">
          {/* inicio labels */}
          <div className="d-flex bg-gray-3">
            <TableLabelsGrey modelo={modeloLabelsProductosEnviado} />
          </div>
          {/* fin labels */}
          {/* INICIO LISTADO */}
          {miPresupuesto?.productos?.map((e, i) => {
            return (
              <div className="d-flex">
                {modeloLabelsProductosEnviado?.map((m) => {
                  return (
                    <div
                      className={`table-${m.width} ${
                        i !== miPresupuesto?.productos?.length - 1
                          ? "border-bottom"
                          : ""
                      }`}
                    >
                      <label className="item-borderless px-10">
                        {m.nombre === "descripcion" ? (
                          e?.[m.nombre]
                        ) : (
                          <>
                            <NumberFormat
                              value={e?.[m.nombre]}
                              displayType="text"
                              thousandSeparator={"."}
                              decimalSeparator={","}
                              prefix={
                                m.nombre === "excedente" ||
                                m.nombre === "cantidad"
                                  ? ""
                                  : "$"
                              }
                              suffix={m.nombre === "excedente" ? "%" : ""}
                              decimalScale={2}
                              fixedDecimalScale={true}
                            />{" "}
                            {m.nombre === "cantidad" &&
                              um.find((u) => u.descripcion === e.unidad_medida)
                                .value}
                          </>
                        )}
                      </label>
                    </div>
                  );
                })}
              </div>
            );
          })}
          {/* FIN LISTADO */}
        </div>
        {/* FIN PRODUCTOS */}

        {/* GASTOS EXTRAS */}
        <>
          <div className="d-flex">
            <h2 className="titulo-secundario mb-20 mt-40">Gastos extras</h2>
          </div>
          <div className="border-10 over-hidden border-grey">
            <div className="d-flex bg-gray-3">
              <TableLabelsGrey modelo={labelsCostos} />
            </div>
            {modeloCostos?.map((m, i) => {
              return (
                <div
                  className={`my-0 d-flex ${
                    i !== modeloCostos.length - 1 && "border-bottom"
                  }`}
                >
                  <div className="table-40">
                    <div className="px-10 item-borderless">{m?.label}</div>
                  </div>
                  <div className="table-30">
                    <NumberFormat
                      value={
                        miPresupuesto?.[m.nombre]
                          ? miPresupuesto?.[m.nombre]
                          : ""
                      }
                      thousandSeparator={"."}
                      displayType="text"
                      decimalSeparator={","}
                      allowLeadingZeros={true}
                      allowEmptyFormatting={true}
                      suffix={"%"}
                      decimalScale={2}
                      fixedDecimalScale={true}
                      className="px-10 item-borderless"
                    />
                  </div>
                  <div className="table-30">
                    <div className="px-10 item-borderless">
                      <NumberFormat
                        value={miPresupuesto?.[`total_${m.nombre}`]}
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
              );
            })}
          </div>
        </>
        {/* FIN GASTOS EXTRAS */}

        {/* INICIO LOGISTICA */}
        <div className="mt-60 mb-50 border-10 over-hidden border-grey">
          <div className="d-flex bg-gray-3">
            <div className="table-50 d-flex bg-gray-3 align-center border-bottom">
              <label className="label-borderless px-10 mb-0">
                Costo de logística
              </label>
            </div>
            <div className="table-50 d-flex bg-gray-3 align-center border-bottom">
              <label className="label-borderless px-10 mb-0">
                Otros costos
              </label>
            </div>
          </div>
          <div className="my-0 d-flex">
            <div className="table-50">
              <div className="px-10 item-borderless">
                <NumberFormat
                  value={
                    miPresupuesto?.logistica ? miPresupuesto?.logistica : 0
                  }
                  displayType="text"
                  thousandSeparator={"."}
                  decimalSeparator={","}
                  prefix={"$"}
                  allowLeadingZeros={true}
                  allowEmptyFormatting={true}
                  decimalScale={2}
                  className="table-100 px-10 item-borderless"
                  fixedDecimalScale={true}
                />
              </div>
            </div>
            <div className="table-50">
              <div className="px-10 item-borderless">
                <NumberFormat
                  value={
                    miPresupuesto?.otrosCostos ? miPresupuesto?.otrosCostos : 0
                  }
                  displayType="text"
                  thousandSeparator={"."}
                  decimalSeparator={","}
                  prefix={"$"}
                  allowLeadingZeros={true}
                  allowEmptyFormatting={true}
                  decimalScale={2}
                  className="table-100 px-10 item-borderless"
                  fixedDecimalScale={true}
                />
              </div>
            </div>
          </div>
        </div>
        {/* FIN LOGISTICA */}

        {/* GASTOS Prestamo */}
        <>
          <div className="d-flex">
            <h2 className="titulo-secundario mb-20 mt-40">
              Estimación de prestamo
            </h2>
          </div>
          <div className="border-10 over-hidden border-grey">
            <div className="d-flex bg-gray-3">
              <div className="table-25 d-flex bg-gray-3 align-center border-bottom">
                <label className="label-borderless px-10 mb-0">Monto</label>
              </div>
              <div className="table-25 d-flex bg-gray-3 align-center border-bottom">
                <label className="label-borderless px-10 mb-0">Cuota</label>
              </div>
              <div className="table-25 d-flex bg-gray-3 align-center border-bottom">
                <label className="label-borderless px-10 mb-0">
                  Interés anual (TNA)
                </label>
              </div>
              <div className="table-25 d-flex bg-gray-3 align-center border-bottom">
                <label className="label-borderless px-10 mb-0">
                  Interés total
                </label>
              </div>
            </div>

            <div className="my-0 d-flex">
              <div className="table-25">
                <div className="px-10 item-borderless">
                  <NumberFormat
                    value={miPresupuesto?.prestamo.monto}
                    displayType="text"
                    thousandSeparator={"."}
                    decimalSeparator={","}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                  />
                </div>
              </div>
              <div className="table-25">
                <div className="px-10 item-borderless">
                  <NumberFormat
                    value={miPresupuesto?.prestamo.tiempo}
                    displayType="text"
                    fixedDecimalScale={true}
                  />
                </div>
              </div>
              <div className="table-25">
                <NumberFormat
                  value={miPresupuesto?.prestamo.interes}
                  thousandSeparator={"."}
                  displayType="text"
                  decimalSeparator={","}
                  allowLeadingZeros={true}
                  allowEmptyFormatting={true}
                  suffix={"%"}
                  decimalScale={2}
                  fixedDecimalScale={true}
                  className="px-10 item-borderless"
                />
              </div>
              <div className="table-25">
                <div className="px-10 item-borderless">
                  <NumberFormat
                    value={miPresupuesto?.prestamo.interesTotal}
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
        </>
        {/* FIN PRESTAMO */}
      </div>

      {/* INICIO BOTONES */}
      <BotonesEnviado setMuestraLista={setMuestraLista} />
      {/* FIN BOTONES */}
    </Loader>
  );
}
