import React, { useState, useEffect, useContext } from "react";
import NumberFormat from "react-number-format";
import PresupuestosContext from "../../context/PresupuestosContext";

export default function Prestamo({ setPrestamo }) {
  const [showModal, setShowModal] = useState(false);
  const [monto, setMonto] = useState();
  const [tiempo, setTiempo] = useState();
  const [interes, setInteres] = useState();
  const [interesTotal, setInteresTotal] = useState();
  const [llenarTabla, setLlenarTabla] = useState([]);

  const { miPresupuesto } = useContext(PresupuestosContext);

  function calcularCuota() {
    let pagoInteres = 0,
      pagoCapital,
      cuota,
      sumaInteres = 0;
    let nuevoMonto = monto;
    const interesMensual = interes / 12;
    setLlenarTabla([]);
    cuota =
      (nuevoMonto *
        ((Math.pow(1 + interesMensual / 100, tiempo) * interesMensual) / 100)) /
      (Math.pow(1 + interesMensual / 100, tiempo) - 1);

    for (let i = 1; i <= tiempo; i++) {
      pagoInteres = parseFloat(nuevoMonto * (interesMensual / 100));
      pagoCapital = cuota - pagoInteres;
      nuevoMonto = parseFloat(nuevoMonto - pagoCapital);

      const row = {
        cuota: cuota.toFixed(2),
        pagoCapital: pagoCapital.toFixed(2),
        pagoInteres: pagoInteres.toFixed(2),
        monto: nuevoMonto.toFixed(2),
      };

      sumaInteres += pagoInteres;
      setLlenarTabla((llenarTabla) => [...llenarTabla, row]);
    }
    setInteresTotal(sumaInteres);
  }

  const handleOnClick = () => {
    setShowModal(false);
  };

  useEffect(() => {
    setMonto(miPresupuesto?.prestamo?.monto);
    setTiempo(miPresupuesto?.prestamo?.tiempo);
    setInteres(miPresupuesto?.prestamo?.interes);
  }, [miPresupuesto]);

  useEffect(() => {
    calcularCuota();
  }, [monto, tiempo, interes]);

  useEffect(() => {
    setPrestamo({
      monto,
      tiempo,
      interes,
      interesTotal,
    });
  }, [interesTotal]);

  return (
    <div className="bg-white-2 py-20 px-20 border-10 mt-40">
      <div className="d-flex justify-between">
        <h2 className="titulo-secundario mt-0">Estimación de prestamo</h2>
      </div>
      <div className="form-group row">
        <div className="col-md-3 mb-20">
          <label className="label-borderless mb-20">Monto</label>
          <NumberFormat
            value={monto ? monto : ""}
            thousandSeparator={"."}
            decimalSeparator={","}
            prefix={"$"}
            allowLeadingZeros={true}
            allowEmptyFormatting={true}
            allowNegative={false}
            decimalScale={2}
            className="input-table-presupuesto label-table input-table-required border-10 me-20"
            onValueChange={(values) => {
              const { floatValue } = values;

              setMonto(floatValue);
            }}
          />
        </div>
        <div className="col-md-3">
          <label className="label-borderless mb-20">Cuotas</label>
          <NumberFormat
            value={tiempo ? tiempo : ""}
            thousandSeparator={"."}
            decimalSeparator={","}
            allowLeadingZeros={true}
            allowEmptyFormatting={true}
            allowNegative={false}
            className="input-table-presupuesto label-table input-table-required border-10 me-20"
            isAllowed={(values) => {
              const { floatValue } = values;
              return floatValue < 37;
            }}
            onValueChange={(values) => {
              const { floatValue } = values;

              setTiempo(floatValue);
            }}
          />
        </div>
        <div className="col-md-3 mb-20">
          <label className="label-borderless mb-20">Interés anual (TNA)</label>
          <NumberFormat
            value={interes ? interes : ""}
            thousandSeparator={"."}
            decimalSeparator={","}
            suffix="%"
            allowLeadingZeros={true}
            allowEmptyFormatting={true}
            allowNegative={false}
            decimalScale={2}
            className="input-table-presupuesto label-table input-table-required border-10 me-20"
            onValueChange={(values) => {
              const { floatValue } = values;

              setInteres(floatValue);
            }}
          />
        </div>
        <div className="col-md-3 mb-20">
          <p className="label-borderless mb-20">
            Interes total: &nbsp;
            <strong>
              {interesTotal ? (
                <NumberFormat
                  value={interesTotal}
                  displayType="text"
                  thousandSeparator={"."}
                  decimalSeparator={","}
                  prefix={"$"}
                  decimalScale={2}
                  fixedDecimalScale={true}
                />
              ) : (
                "$0,00"
              )}
            </strong>
          </p>

          <button
            className={interesTotal ? "btn btn-lg btn-primary" : "btn btn-lg"}
            data-toggle="modal"
            data-target="#myModal"
            onClick={(e) => {
              e.preventDefault();
              interesTotal > 0 && setShowModal(true);
            }}
          >
            Ver detalle
          </button>
        </div>
      </div>
      {showModal && (
        <div
          className="modal fade"
          id="myModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="myModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-hidden="true"
                >
                  &times;
                </button>
                <h4 className="modal-title" id="myModalLabel">
                  Detalle de las cuotas
                </h4>
              </div>
              <div className="modal-body">
                <table id="lista-tabla" className="table">
                  <thead>
                    <tr>
                      <th>Mes</th>
                      <th>Cuota</th>
                      <th>Capital</th>
                      <th>Interés</th>
                      <th>Saldo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {llenarTabla.map((linea, i) => {
                      return (
                        <tr key={`meses-${i}`}>
                          <td>{i + 1}</td>
                          <td>{linea.cuota}</td>
                          <td>{linea.pagoCapital}</td>
                          <td>{linea.pagoInteres}</td>
                          <td>{linea.monto}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                  onClick={handleOnClick}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
