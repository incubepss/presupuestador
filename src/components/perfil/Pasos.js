import React from "react";
import Link from "next/link";

export default function Pasos() {
  return (
    <div className="card">
      <h2 className="titulo-secundario">Paso a Paso</h2>
      <div className="d-flex justify-between column-min">
        <Link href="/miperfil/edita">
          <div className="bg-success-dk w-4 paso-perfil d-flex align-center flex-column justify-content-center text-white">
            <img src="/icons/icon-perfil.png" alt="perfil" />
            <h4 className="paso-text">Edita tu perfil</h4>
          </div>
        </Link>
        <Link href="/cliente">
          <div className="bg-primary-dk w-4 paso-perfil d-flex align-center flex-column justify-content-center text-white">
            <img src="/icons/icon-datos.png" alt="datos" />
            <h4 className="paso-text">Agrega tus clientes</h4>
          </div>
        </Link>
        <Link href="/remuneracion">
          <div className="bg-success2-lt w-4 paso-perfil d-flex align-center flex-column justify-content-center text-white">
            <img className="mt-30" src="/icons/icon-costos.png" alt="costos" />
            <h4 className="paso-text">Completá tus costos</h4>
          </div>
        </Link>
        <Link href="/presupuesto">
          <div className="bg-info-lt w-4 paso-perfil d-flex align-center flex-column justify-content-center text-white">
            <img
              className="mt-25"
              src="/icons/icon-presupuestos.png"
              alt="presupuestos"
            />
            <h4 className="paso-text">Enviá tus presupuestos</h4>
          </div>
        </Link>
      </div>
    </div>
  );
}
