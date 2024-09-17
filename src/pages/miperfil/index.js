import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import PouchDB from "pouchdb";
import { usePouch } from "use-pouchdb";
import { useSession } from "next-auth/react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import NumberFormat from "react-number-format";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import Costos from "../../components/perfil/Costos";
import Pasos from "../../components/perfil/Pasos";
import CabeceraProductos from "../../components/CabeceraProductos";
import { findInDatabase } from "../../hooks/useRepository";
import Loader from "../../components/loader/Loader";
import PresupuestosContext from "../../context/PresupuestosContext";
import LoginBtn from "../../components/login-btn";
import { setup_session } from "../../hooks/session";
import { um } from "../../data/um";

export default function MiPerfil() {
  const [misPresupuestos, setMisPresupuestos] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingDatos, setIsLoadingDatos] = useState(true);
  const [isLoadingCostos, setIsLoadingCostos] = useState(true);
  const [isLoadingRemuneracion, setIsLoadingRemuneracion] = useState(true);
  const [isLoadingProducto, setIsLoadingProducto] = useState(true);
  const [isLoadingCliente, setIsLoadingCliente] = useState(true);
  const [misDatos, setMisDatos] = useState();
  const [misCostosFijos, setMisCostosFijos] = useState();
  const [misRF, setMisRF] = useState();
  const [misProductos, setMisProductos] = useState();
  const [clientes, setClientes] = useState();
  const { data: session } = useSession();

  const db = usePouch();
  const router = useRouter();
  const { sentData, index } = useContext(PresupuestosContext);
  const localDB = new PouchDB("dbPresupuestos");

  const countPresupuestos = (status) =>
    misPresupuestos?.filter((presupuesto) => presupuesto.estado === status)
      .length;

  function CardDestacadoItem({ status, color }) {
    return (
      <div className="card-destacados-item">
        <h1 style={{ backgroundColor: color }}>{countPresupuestos(status)}</h1>
        <h6>{status}</h6>
      </div>
    );
  }

  const suma = (lista, item) => lista?.reduce((acc, obj) => acc + obj[item], 0);

  const sumaPresupuestos = (presupuestosAprobados) => {
    let interes = 0;
    presupuestosAprobados?.map(
      (presupuesto) => (interes = interes + presupuesto.prestamo.interesTotal)
    );
    return interes;
  };
  function PresupuestoChart() {
    const presupuestosAprobados = misPresupuestos?.filter(
      (presupuesto) => presupuesto.estado === "Aprobado"
    );
    const totalGastosBancarios = suma(
      presupuestosAprobados,
      "total_gastos_bancarios"
    );
    const totalFinanciamiento = suma(
      presupuestosAprobados,
      "total_gastos_financiamiento"
    );
    const totalLogistica = suma(presupuestosAprobados, "logistica");
    const totalOtros = suma(presupuestosAprobados, "otrosCostos");
    const totalPrestamo = sumaPresupuestos(presupuestosAprobados);
    const totalIVA = suma(presupuestosAprobados, "total_iva");
    const productos = presupuestosAprobados?.map((presupuesto) => {
      let excedenteTotal = 0;
      let costoTotal = 0;

      presupuesto.productos.map((producto) => {
        // tengo que guardar el costo cuando exporto
        let costoProducto = producto.costo * producto.cantidad;
        let excedenteProducto = (costoProducto * producto.excedente) / 100;
        costoTotal = costoTotal + costoProducto;
        excedenteTotal = excedenteTotal + excedenteProducto;
      });

      return { excedente: excedenteTotal, costo: costoTotal };
    });
    const totalProductos = suma(productos, "costo");
    const totalExcedentes = suma(productos, "excedente");

    const dataRaw = [
      { name: "Costo de productos", value: totalProductos },
      { name: "Excedente", value: totalExcedentes },
      { name: "Gastos Bancarios", value: totalGastosBancarios },
      //{ name: "Gastos Financieros", value: totalFinanciamiento },
      { name: "Logística", value: totalLogistica },
      { name: "Otros gastos", value: totalOtros },
      { name: "Prestamos", value: totalPrestamo },
      { name: "IVA (21%)", value: totalIVA },
    ];
    const data = dataRaw.filter((d) => d.value > 0);
    console.log("data", dataRaw);
    const COLORS = [
      "#2EBC98",
      "#F3A32D",
      "#0389D1",
      "#9D6DB6",
      "#F562A2",
      //"#FF9F24",
      "#E76056",
      "#19C3E3",
    ];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      percent,
      index,
    }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);

      return (
        <text
          x={x}
          y={y}
          fill="white"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    };

    return (
      <div className="row">
        <div className="col col-sm-4">
          {data.map((d, i) => {
            return (
              <p className="card-list-item">
                <span
                  className="badge pull-right"
                  style={{ backgroundColor: COLORS[i] }}
                >
                  <NumberFormat
                    value={d.value}
                    displayType="text"
                    thousandSeparator={"."}
                    decimalSeparator={","}
                    allowLeadingZeros={true}
                    allowEmptyFormatting={true}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    prefix="$"
                  />
                </span>
                <strong>{d.name}:</strong>
              </p>
            );
          })}
        </div>
        <div className="col col-sm-8" style={{ height: 300 }}>
          <ResponsiveContainer>
            <PieChart width={300} height={300}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
                labelLine={false}
                label={renderCustomizedLabel}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

  useEffect(() => {
    setup_session(localDB, session);
  }, [session]);

  useEffect(() => {
    if (!isLoadingDatos && misDatos.length === 0) {
      router.push("/");
    }
  }, [misDatos]);

  useEffect(() => {
    findInDatabase(db, "presupuesto", setMisPresupuestos, setIsLoading);
    findInDatabase(db, "misDatos", setMisDatos, setIsLoadingDatos);
    findInDatabase(db, "costofijo", setMisCostosFijos, setIsLoadingCostos);
    findInDatabase(db, "remuneracionfija", setMisRF, setIsLoadingRemuneracion);
    findInDatabase(db, "producto", setMisProductos, setIsLoadingProducto);
    findInDatabase(db, "cliente", setClientes, setIsLoadingCliente);
  }, [db, sentData]);

  return (
    <Loader
      isloading={
        isLoading &&
        isLoadingDatos &&
        isLoadingCostos &&
        isLoadingRemuneracion &&
        isLoadingProducto &&
        isLoadingCliente
      }
    >
      <LoginBtn></LoginBtn>

      {misPresupuestos && misPresupuestos?.length > 0 && (
        <div className="card">
          <Link href="/presupuesto">
            <a href="#" className="btn btn-primary pull-right" role="button">
              Ver más
            </a>
          </Link>
          <h2>Mis presupuestos</h2>
          <div className="card-content row">
            <div className="col col-sm-12">
              <div className="card-destacados">
                <CardDestacadoItem status="Borrador" color="#F3A32D" />
                <CardDestacadoItem status="Confirmado" color="#19C3E3" />
                <CardDestacadoItem status="Aprobado" color="#2EBC98" />
                <CardDestacadoItem status="Rechazado" color="#E76056" />
              </div>
            </div>
          </div>
          <div className="card-content row">
            <div className="col col-sm-12 mt-20">
              <h2>Composición de presupuestos aprobados</h2>
              <PresupuestoChart />
            </div>
          </div>
        </div>
      )}

      <Costos costosFijos={misCostosFijos} TrabajoFijo={misRF} />
      {clientes && clientes.length > 0 && (
        <div className="card">
          <Link href="/cliente">
            <a href="#" className="btn btn-primary pull-right" role="button">
              Ver más
            </a>
          </Link>

          <h2>
            Clientes destacados <span className="badge">Presupuestos</span>
          </h2>
          <div className="card-content row">
            <div className="col col-sm-3 card-content-center">
              <h1>{clientes.length}</h1>
              <h6>{clientes.length > 1 ? "Clientes" : "Cliente"}</h6>
            </div>
            <div className="col col-sm-9 card-list">
              {clientes.map((cliente) => {
                return (
                  <div
                    className="card-list-item"
                    key={`cliente-${cliente._id}`}
                  >
                    <span className="badge pull-right mt-20">
                      {
                        misPresupuestos.filter(
                          (presu) => presu.cliente === cliente.razon_social
                        ).length
                      }
                    </span>
                    <h4>{cliente.razon_social}</h4>
                    {cliente.mail}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {misProductos && misProductos.length > 0 && (
        <div className="card">
          <Link href="/capacidad-productiva">
            <a href="#" className="btn btn-primary pull-right" role="button">
              Ver más
            </a>
          </Link>
          <h2>Productos destacados</h2>
          <div className="card-content row">
            <div className="col col-sm-3 card-content-center">
              <h1>{misProductos.length}</h1>
              <h6>{misProductos.length > 1 ? "Productos" : "Producto"}</h6>
            </div>
            <div className="col col-sm-9 card-list">
              {misProductos.map((producto) => {
                return (
                  <div
                    className="card-list-item"
                    key={`producto-${producto._id}`}
                  >
                    <h4>{producto.descripcion}</h4>
                    Producción mensual estimada:{" "}
                    {producto.cantidad_promedio_mensual}{" "}
                    {
                      um.find((u) => u.descripcion === producto.unidad_medida)
                        .value
                    }
                    <br />({producto.produccion_promedio_mensual}% de la
                    producción total)
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {misPresupuestos && misPresupuestos.length === 0 && <Pasos />}
    </Loader>
  );
}

MiPerfil.getLayout = function getLayout(page) {
  const headProductos = <CabeceraProductos></CabeceraProductos>;

  return <Layout headPage={headProductos}>{page}</Layout>;
};
