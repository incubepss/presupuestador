import React, { useContext } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import PresupuestosContext from "../../context/PresupuestosContext";

function BotonesImprimir({ image }) {
  const { isConfirmed, setShowConfirmar } = useContext(PresupuestosContext);

  const printDocument = () => {
    let imgWidth = 208;
    let imgHeight = (image.height * imgWidth) / image.width;
    const pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage(image.url, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("presupuesto.pdf");
  };

  const shareViaNavigator = async () => {
    // Crear un objeto 'File' a partir de la imagen en formato Blob
    const blob = await dataURItoBlob(image.url);
    const file = await new File([blob], "presupuesto.png", {
      type: "image/png",
    });

    // Compartir el archivo utilizando la API 'navigator.share' si está disponible
    if (navigator.share) {
      navigator
        .share({
          files: [file],
          title: "Presupuesto",
        })
        .then(() => {
          console.log("Contenido compartido con éxito");
        })
        .catch((error) => {
          console.error("Error al compartir el contenido:", error);
        });
    } else {
      console.log(
        "La API 'navigator.share' no está disponible en este navegador"
      );
    }
  };

  // Función auxiliar para convertir una URL de datos (data URL) en un objeto Blob
  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    return new Blob([arrayBuffer], { type: mimeString });
  };

  return (
    <div className="modal-footer">
      {!isConfirmed && (
        <button
          type="button"
          className="btn btn-primary btn-lg mb-10"
          onClick={() => {
            setShowConfirmar(true);
          }}
        >
          Confirmar
        </button>
      )}
      <br />
      <button
        disabled={!isConfirmed || !navigator.share}
        type="button"
        className="btn btn-primary btn-lg me-10"
        onClick={() => {
          shareViaNavigator();
        }}
      >
        Compartir
      </button>

      <button
        disabled={!isConfirmed}
        type="button"
        className="btn btn-primary btn-lg"
        onClick={() => {
          printDocument();
        }}
      >
        Descargar
      </button>
    </div>
  );
}

export default BotonesImprimir;
