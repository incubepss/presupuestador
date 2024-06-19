import PouchDB from "pouchdb";
import { signIn } from "next-auth/react";

const pouchRemote = process.env.NEXT_PUBLIC_COUCH_URI;
const auth = {
  username: process.env.NEXT_PUBLIC_POUCH_USERNAME,
  password: process.env.NEXT_PUBLIC_POUCH_PASSWORD,
};

export function formatUserDoc(email) {
  var db = email;
  db = db.replace(/([^\w]+|\s+)/g, "");
  return db.split("").reverse().join("");
}

export async function set_usuario(user) {
  // Registra nuevo usuario en la base remota
  var userDoc = formatUserDoc(user.email);
  //const remoteUserDB = new PouchDB(remote + 'usuarios');
  const remoteUserDB = new PouchDB(pouchRemote + "usuarios", { auth });
  remoteUserDB.put({ ...user, _id: userDoc });
}

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
export async function GetUserStatus(email, emailExist) {
  if (email === "") {
    emailExist({
      status: true,
      msg: "El correo electrónico es obligatorio.",
    });
    return;
  }
  if (!validateEmail(email)) {
    emailExist({
      status: true,
      msg: "El correo ingresado no es válido.",
    });
    return;
  }
  const remoteUserDB = new PouchDB(pouchRemote + "usuarios", { auth });
  remoteUserDB
    .get(formatUserDoc(email))
    .then((success) => {
      emailExist({
        status: true,
        msg: "Ya existe un usuario con ese correo electrónico.",
      });
    })
    .catch((err) => {
      emailExist({
        status: false,
      });
    });
}

export async function get_usuario(email, setEmailError) {
  const remoteUserDB = new PouchDB(pouchRemote + "usuarios", { auth });
  remoteUserDB
    .get(formatUserDoc(email))
    .then((success) => {
      setEmailError({
        status: "success",
        msg: "Te hemos enviado un mail con el enlace de acceso. Revisá tu casilla de correo.",
      });
      signIn("email", {
        email: email,
      });
    })
    .catch((err) => {
      setEmailError({
        status: "danger",
        msg: "No tenemos registrada ninguna cuenta con ese correo electrónico.",
      });
    });
}

export async function get_session(setSession, local) {
  const localDB = new PouchDB(local);
  localDB.get("sesion").then((result) => {
    var userDoc = formatUserDoc(result.email);
    var user = {
      email: result.email,
      id: result.id,
      db: userDoc,
    };
    setSession(user);
  });
}

export async function setup_session(localDB, session) {
  if (session) {
    const email = session.user.email;
    var user = {
      email: email,
      id: formatUserDoc(email),
    };
    set_usuario(user);
    const remoteDB = new PouchDB(process.env.NEXT_PUBLIC_COUCH_URI + user.id, { auth });
    localDB.sync(remoteDB, { live: true, retry: true });
  }
}
