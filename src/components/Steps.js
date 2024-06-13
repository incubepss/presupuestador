import Joyride from "react-joyride";

export default function Step({ steps, run, showProgress = true }) {
  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showProgress={showProgress}
      locale={{
        back: "Anterior",
        close: "Cerrar",
        last: "Finalizar",
        next: "Próximo",
        open: "Abrir",
        skip: "Saltear",
      }}
      styles={{
        options: {
          primaryColor: "#2ebc98",
        },
      }}
    />
  );
}
