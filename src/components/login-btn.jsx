import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react"
import { useDoc, usePouch } from "use-pouchdb";
import { GetUserStatus } from "../hooks/session";

export default function LoginBtn() {
  const { data: session } = useSession()
  const { doc: docMisDatos, loadingDoc } = useDoc("misDatos");
  const [sendMail, setSendMail] = useState(false);
  const [emailExist, SetEmailExist] = useState({status:undefined});
  const db = usePouch();
  const [sentData, setSentData] = useState(false);
  const [data, setData] = useState();
  const [datosPerfil, setDatosPerfil] = useState({});
  
  const ingresar = (e) => {
    e.preventDefault();
    GetUserStatus(datosPerfil.mail, SetEmailExist);
  }
  
  const salir = () => {
    signOut();
    db.destroy()
      .then(function (response) {
        setSentData((prevSentData) => !prevSentData);
        setData();
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  const handleChange = (e, id) => {
    setDatosPerfil({ ...datosPerfil, [id]: e.target.value });
  };

  useEffect(() => {
    if (!loadingDoc && docMisDatos?._id) {
      setDatosPerfil(docMisDatos);
    }
  }, [loadingDoc, docMisDatos]);
  
  useEffect(() => {
    if(!emailExist.status && emailExist.status != undefined) {
      db?.put(datosPerfil);
      setTimeout(
        signIn("email", {
          email: datosPerfil.mail,
        }), 5000);
        setSendMail(true);
    }
  }, [emailExist]);

  if (session) {
    return (
      <div className="card">
        <button className="btn btn-md btn-primary pull-right ml-10" onClick={() => salir()}>Cerrar sesión</button>
        <h5>Te identificaste como <strong>{session.user.email}</strong></h5>
      </div>
    )
  }
  return (
    <div className="card form-inline">
      <h4 className="titulo-secundario mt-0">Iniciar sesión</h4>
      {!session && (
        
        <p className="bajadas mb-20">
          Para tener un respaldo de tu información, debés verificar tu cuenta
          iniciando sesión.
        </p>
        
      )}
      <form onSubmit={ingresar}>
      <input
              className="form-control mr-15 mb-10"
              onChange={(e) => handleChange(e, "mail")}
              value={datosPerfil?.mail}
              type="email"
            /><button className="btn btn-primary mb-10">Iniciar sesión</button></form>
      {sendMail && (
        <div className="alert alert-success mt-10">
          Te enviamos un correo electrónico a <strong>{datosPerfil?.mail}</strong> para verificar tu identidad.
        </div>
      )}
      {emailExist?.status && (
        <div className="alert alert-danger mt-10">
          {emailExist.msg}
        </div>
      )}
    </div>
  )
}