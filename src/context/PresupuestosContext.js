import { createContext, useState } from "react";

const PresupuestosContext = createContext({});

const PresupuestosProvider = ({ children }) => {
  const [index, setIndex] = useState("Todos");
  const [editPresupuesto, setEditPresupuesto] = useState({});
  const [misPresupuestos, setMisPresupuestos] = useState();
  const [sentData, setSentData] = useState(false);
  const [muestraLista, setMuestraLista] = useState(true);
  const [showImprimir, setShowImprimir] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [showConfirmar, setShowConfirmar] = useState(false);
  const [hasConfirmed, setHasConfirmed] = useState(false);
  const [miPresupuesto, setMiPresupuesto] = useState({});

  const state = {
    index,
    setIndex,
    editPresupuesto,
    setEditPresupuesto,
    misPresupuestos,
    setMisPresupuestos,
    sentData,
    setSentData,
    muestraLista,
    setMuestraLista,
    showImprimir,
    setShowImprimir,
    isConfirmed,
    setIsConfirmed,
    showConfirmar,
    setShowConfirmar,
    hasConfirmed,
    setHasConfirmed,
    miPresupuesto,
    setMiPresupuesto,
  };

  return (
    <PresupuestosContext.Provider value={state}>
      {children}
    </PresupuestosContext.Provider>
  );
};
export { PresupuestosProvider };
export default PresupuestosContext;
