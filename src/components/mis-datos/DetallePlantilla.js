import React from "react";
import NumberFormat from "react-number-format";

function DetallePlantilla({ e, setShowDetalle }) {
  return (
    <>
      <div className="blur-editor" onClick={() => setShowDetalle(false)}></div>
      <div className="detalles-costos">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-hidden="true"
              onClick={() => setShowDetalle(false)}
            >
              &times;
            </button>
            <h4 className="modal-title" id="myModalLabel">
              Detalle
            </h4>
          </div>
          <div className="modal-body">
            <table id="lista-tabla" className="table">
              <thead>
                <tr>
                  <th>DESCRIPCIÓN</th>
                  <th>VALOR</th>
                </tr>
              </thead>
              <tbody>
                {e?.items?.length === 0 ? (
                  <tr>
                    <td>Iniciar sin costos fijos</td>
                    <td>$0</td>
                  </tr>
                ) : (
                  e?.items?.map((i, indice) => {
                    return (
                      <tr key={indice}>
                        <td>{i.descripcion}</td>
                        <td>
                          <NumberFormat
                            value={i?.valor}
                            thousandSeparator={"."}
                            displayType="text"
                            decimalSeparator={","}
                            allowLeadingZeros={true}
                            allowEmptyFormatting={true}
                            prefix={"$"}
                            decimalScale={0}
                            fixedDecimalScale={true}
                          />
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-default"
              data-dismiss="modal"
              onClick={() => setShowDetalle(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetallePlantilla;
