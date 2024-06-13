import React, { useState } from "react";
import { get_usuario } from "../../hooks/session";

export default function Introduccion() {
  const [emailStatus, setEmailStatus] = useState({});

  const handleSignIn = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    get_usuario(email, setEmailStatus);
  };

  return (
    <div className="row">
      <div className="col col-sm-7">
        <p className="p-home">
          Esta herramienta permite construir los presupuestos para sus clientes,
          calcular correctamente los costos de su trabajo y desarrollar precios
          justos que garanticen la rentabilidad de su negocio.
        </p>
        <p className="p-home">
          La herramienta estará dividida en secciones para:
        </p>
        <ul className="p-home">
          <li>La edición de tu perfil </li>
          <li>La carga de los datos de sus clientes </li>
          <li>La identificación de insumos y costos</li>
          <li>El armado de presupuestos para sus clientes</li>
        </ul>
      </div>
      <div className="col col-sm-5">
        <h2 className="titulo-secundario mt-0">Iniciar sesión</h2>
        <p className="mb-20">
          Si ya tenés un perfil, ingresá tu correo electrónico, te enviaremos un
          enlace para que puedas iniciar sesión.
        </p>
        <form onSubmit={handleSignIn}>
          <input
            id="email"
            name="email"
            className="form-control"
            type="email"
            placeholder="Ingresar correo electrónico"
          />
          <button className="mt-10 mb-10 btn btn-lg btn-primary" type="submit">
            Enviar correo electrónico
          </button>
        </form>
        {emailStatus != {} && (
          <div className={`alert alert-${emailStatus?.status}`}>
            {emailStatus?.msg}
          </div>
        )}
      </div>
    </div>
  );
}
