import { useEffect } from "react";

export const getStatusConfig = (estado) => {
  const estados = {
    Confirmado: { color: "text-white", bgClass: "bg-info-lt" },
    Borrador: { color: "text-white", bgClass: "bg-warning-dk" },
    Aprobado: { color: "text-white", bgClass: "bg-success" },
    Rechazado: { color: "text-white", bgClass: "bg-danger-dk" },
    default: { color: "text-white", bgClass: "bg-primary-dk" },
  };

  return estados[estado] || estados.default;
};

export const estados = [
  "Todos",
  "Borrador",
  "Confirmado",
  "Aprobado",
  "Rechazado",
];

export const estadosCambio = ["Confirmado", "Aprobado", "Rechazado"];

export function useOutsideAlerter(ref, setMuestraSelect) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setMuestraSelect(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
