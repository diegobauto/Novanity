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
import { getFirestore } from "firebase/firestore";

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
    console.log(user);

    if (user) {
      console.log(user);
      return user;
    } else {
      console.log("datos usuario:", user);
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
  } else {
    window.usuario = null;
    window.location.hash = "/";
  }
});
