import { useEffect, useState, useContext } from "react";
import Layout from "../../components/layout";
import { usePouch } from "use-pouchdb";
import Loader from "../../components/loader/Loader";
import { useRouter } from "next/router";
import UserDataContext from "../../context/UserDataContext";
import { firstAddInDatabase } from "../../hooks/useRepository";

import Paso0 from "../../components/mis-datos/Paso0";
import Paso1 from "../../components/mis-datos/Paso1";
import Paso2 from "../../components/mis-datos/Paso2";
import Paso3 from "../../components/mis-datos/Paso3";
import Paso4 from "../../components/mis-datos/Paso4";
import DetallePlantilla from "../../components/mis-datos/DetallePlantilla";

export default function MisDatos() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [misCostos, setMisCostos] = useState();
  const [porcentaje, setPorcentaje] = useState();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [currentStepText, setCurrentStepText] = useState("Registrarse");

  const { setSentData } = useContext(UserDataContext);

  const db = usePouch();

  const router = useRouter();

  // BOTON HABILITADO O DESHABILITADO
  useEffect(() => {
    if (currentStep === 0) {
      setIsButtonDisabled(formData?.tipo_org ? false : true);
    } else if (currentStep === 1) {
      // en paso 1 segun tipo de organizacion
      if (
        formData?.tipo_org === "Cooperativa" ||
        formData?.tipo_org === "Otro"
      ) {
        if (
          formData?.nombre &&
          formData?.telefono &&
          formData?.mail &&
          formData?.tipo
        ) {
          setIsButtonDisabled(false);
        } else {
          setIsButtonDisabled(true);
        }
      } else if (
        formData?.tipo_org !== "Cooperativa" ||
        formData?.tipo_org !== "Otro"
      ) {
        if (formData?.nombre && formData?.telefono && formData?.mail) {
          setIsButtonDisabled(false);
        } else {
          setIsButtonDisabled(true);
        }
      }
    } else if (currentStep === 2) {
      setIsButtonDisabled(formData?.rubro ? false : true);
    } else if (currentStep === 3) {
      setIsButtonDisabled(formData?.subrubro ? false : true);
    } else if (currentStep === 4) {
      setIsButtonDisabled(false);
    }
  }, [currentStep, formData]);

  // PORCENTAJES
  useEffect(() => {
    switch (currentStep) {
      case 0:
        setPorcentaje("20");
        setCurrentStepText("Siguiente >");
        break;
      case 1:
        setPorcentaje("40");
        setCurrentStepText("Siguiente >");
        break;
      case 2:
        setPorcentaje("60");
        setCurrentStepText("Siguiente >");
        break;
      default:
        setPorcentaje("80");
        setCurrentStepText("Guardar");
        break;
    }
  }, [currentStep]);

  const handleSubmit = (e) => {
    try {
      setIsLoading(true);
      firstAddInDatabase(
        true,
        db,
        formData,
        "misDatos",
        setSentData,
        misCostos
      );
    } finally {
      e.preventDefault();
      setIsLoading(false);
      router.push("/miperfil");
    }
  };

  return (
    <Loader isloading={isLoading}>
      <div className="mt-60">
        {/* elige tipo de organizacion */}
        {currentStep === 0 && <Paso0 data={formData} func={setFormData} />}
        {/* carga datos basicos  */}
        {currentStep === 1 && <Paso1 formData={formData} func={setFormData} />}
        {/*  elige rubro */}
        {currentStep === 2 && <Paso2 data={formData} func={setFormData} />}
        {/* elige subrubro si eligio textil */}
        {currentStep === 3 && <Paso3 data={formData} func={setFormData} />}
        {/* elige costos fijos */}
        {currentStep === 4 && (
          <Paso4
            formData={formData}
            costos={misCostos}
            setCostos={setMisCostos}
          />
        )}

        <div className="progress mt-20">
          <div
            className="progress-bar"
            role="progressbar"
            aria-valuenow={porcentaje}
            aria-valuemin="0"
            aria-valuemax="100"
            style={{
              width: `${porcentaje}%`,
            }}
          >
            {porcentaje}
          </div>
        </div>
        <hr className="mb-40" />
        <div className="mb-60 d-flex justify-between">
          <div>
            <button
              className="btn btn-lg btn-primary"
              onClick={(e) => {
                if (currentStep !== 0) {
                  if (
                    currentStep === 4 &&
                    formData?.rubro !== "Textil, Confección y Calzado"
                  ) {
                    setCurrentStep(2);
                  } else {
                    setCurrentStep((prevCurrentStep) => prevCurrentStep - 1);
                  }
                } else {
                  e.preventDefault();
                  router.push("/");
                }
              }}
            >
              {"<"} Anterior
            </button>
          </div>
          <div>
            <button
              className="btn btn-lg btn-primary"
              disabled={isButtonDisabled}
              onClick={(e) => {
                if (currentStep === 4) {
                  handleSubmit(e);
                } else {
                  if (
                    currentStep === 2 &&
                    formData?.rubro !== "Textil, Confección y Calzado"
                  ) {
                    setCurrentStep(4);
                  } else {
                    setCurrentStep((prevCurrentStep) => prevCurrentStep + 1);
                  }
                  setIsButtonDisabled(true);
                }
              }}
            >
              {currentStepText}
            </button>
          </div>
        </div>
      </div>
    </Loader>
  );
}

MisDatos.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
