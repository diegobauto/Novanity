//Configuracioon inical
import { initializeApp } from "firebase/app";
//referencia a la utenticacion
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
//referencia a la base de datos
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { createNanoEvents } from "nanoevents";

export const eventBus = createNanoEvents();

const firebaseConfig = {
  apiKey: "AIzaSyDYsAy0a7WHRoKqfyyfCyVI-i6gcKfSPbY",
  authDomain: "novanity-database.firebaseapp.com",
  projectId: "novanity-database",
  storageBucket: "novanity-database.appspot.com",
  messagingSenderId: "338645901597",
  appId: "1:338645901597:web:0993088c629e20625d81f4",
  measurementId: "G-5CWW74XN6J",
};

initializeApp(firebaseConfig);

const database = getFirestore();

const auth = getAuth();

//crear usuario
export const crearUsuario = async (email, password) => {
  try {
    const credencialesUsuario = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(credencialesUsuario);
    console.log(credencialesUsuario.user);
    console.log(credencialesUsuario.user.uid);
    const user = {
      id: credencialesUsuario.user.uid,
      email: credencialesUsuario.user.email,
    };
    //guardarDatabase("listaUsuarios", user);
    return user;
  } catch (e) {
    throw new Error(e);
  }
};

// Login Usuarios
export const loginUsuario = async (email, password) => {
  try {
    const credencialesUsuario = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    window.usuario = credencialesUsuario.user;
    eventBus.emit("usuario cambio", credencialesUsuario.user);
    return credencialesUsuario.user;
  } catch (e) {
    throw new Error(e);
  }
};

// LogOut -> salir
export const logOutUsuario = async () => {
  try {
    const respuesta = await signOut(auth);
    console.log(respuesta);
    console.log("Me sali...!");
    window.usuario = null;
  } catch (e) {
    throw new Error(e);
  }
};

//  datos usuario
export const datosUsuario = () => {
  try {
    const user = auth.currentUser;

    if (user) {
      return user;
    } else {
      return undefined;
    }
  } catch (e) {
    throw new Error(e);
  }
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    window.usuario = user;
    window.location.hash = "/home";
    eventBus.emit("usuario cambio", user);
  } else {
    window.usuario = null;
    window.location.hash = "/";
    eventBus.emit("usuario cambio", null);
  }
});

//base de datos

export async function getRolUsuario(email) {
  const rolRef = collection(database, "usuarios");
  const q = query(rolRef, where("Correo", "==", email));
  const docs = await getDocs(q);
  const role = docs.docs[0].data().Rol;
  return role;
}

export async function getEstadoUsuario(email) {
  const rolRef = collection(database, "usuarios");
  const q = query(rolRef, where("Correo", "==", email));
  const docs = await getDocs(q);
  let estado = docs.docs.length > 0 ? docs.docs[0].data().Estado : 2;

  return estado;
}
