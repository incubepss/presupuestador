import React, { useContext } from "react";
import { useRouter } from "next/router";
import { usePouch } from "use-pouchdb";

import { handleMissingFields } from "../../hooks/calcs";
import {
  addInDatabase,
  editInDatabase,
  showPrintPresupuesto,
  useNewRandomId,
} from "../../hooks/useRepository";
import PresupuestosContext from "../../context/PresupuestosContext";
import Steps from "../../components/Steps";

function BotonesPresupuesto({
  setMuestraLista,
  setShowModal,
  totalPresupuesto,
  misProductos,
  totalCF,
  totalRF,
  misCV,
  misRV,
  subtotalPresupuesto,
  setImprimir,
  setShowImprimir,
  setMissingFieldsPresupuesto,
  misPresupuestos,
  setIsLoadingPresupuesto,
}) {
  const db = usePouch();

  const { setIsConfirmed, setSentData, setMiPresupuesto, miPresupuesto } =
    useContext(PresupuestosContext);

  const redirect = (e) => {
    e.preventDefault();
    router?.push("/presupuesto");
  };

  const steps = [
    {
      target: "#guardar",
      content: "Apretando aquí se guardarán los datos que completaste",
    },
    {
      target: "#vistaPrevia",
      content:
        "Apretando aquí podrás confirmar tu presupuesto y luego descargarlo o compartírselo a tus clientes",
    },
  ];

  const requiredFields = ["cliente", "productos", "fecha", "validez"];

  const getErrorFields = () => {
    const errorFields = handleMissingFields({
      requiredFields: requiredFields,
      nuevoCampo: miPresupuesto,
      setNuevoCampo: setMiPresupuesto,
    });

    return errorFields;
  };

  const handleAddPresupuesto = () => {
    const errorFields = getErrorFields();

    setMissingFieldsPresupuesto(errorFields);

    // elimino los productos que no estan completos
    let temp = {
      ...miPresupuesto,
      productos: [
        ...miPresupuesto?.productos?.filter((e) => {
          return e?.descripcion && e?.cantidad && e?.excedente;
        }),
      ],
    };

    if (errorFields?.length === 0) {
      if (miPresupuesto?._id?.length > 0) {
        editInDatabase(
          db,
          miPresupuesto?._id,
          temp,
          setIsLoadingPresupuesto,
          setSentData,
          false
        );
      } else {
        let newId = useNewRandomId("presupuesto_");

        addInDatabase(
          true,
          db,
          {
            ...temp,
            titulo: temp.titulo
              ? temp.titulo
              : `Presupuesto Nro. ${misPresupuestos.length + 1}`,
            _id: newId,
          },
          setMiPresupuesto,
          "presupuesto",
          setSentData,
          false
        );
      }
    }
  };
  const router = useRouter();

  return (
    <div className="d-flex w-100 justify-between mt-60 mb-40">
      <div>
        <Steps steps={steps} run={router?.query?.id === undefined} />
        <button
          className="btn btn-lg btn-primary me-10"
          onClick={(e) => {
            setMuestraLista(true);
            redirect(e);
          }}
        >
          Cancelar
        </button>
        {miPresupuesto?._id?.length > 0 && (
          <button
            className="btn btn-lg btn-primary "
            data-toggle="modal"
            data-target="#myModal"
            onClick={(e) => {
              e.preventDefault();
              setShowModal(true);
            }}
          >
            Borrar
          </button>
        )}
      </div>
      <div>
        <button
          id="guardar"
          className="btn btn-lg btn-primary me-10"
          onClick={(e) => {
            try {
              handleAddPresupuesto();
            } finally {
              if (getErrorFields()?.length === 0) {
                setMuestraLista(true);
                redirect(e);
              }
            }
          }}
        >
          Guardar Cambios
        </button>
        <button
          id="vistaPrevia"
          className="btn btn-lg btn-primary"
          onClick={(e) => {
            if (getErrorFields()?.length === 0) {
              try {
                showPrintPresupuesto(
                  miPresupuesto,
                  totalPresupuesto,
                  misProductos,
                  totalCF,
                  totalRF,
                  misCV,
                  misRV,
                  subtotalPresupuesto,
                  setImprimir
                );
              } finally {
                setShowImprimir(true);
                setIsConfirmed(false);
                window.scrollTo(0, 0);
              }
            }
          }}
        >
          Vista previa
        </button>
      </div>
    </div>
  );
}

export default BotonesPresupuesto;
