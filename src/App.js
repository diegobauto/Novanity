import React, { useEffect, useState } from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  crearUsuario,
  datosUsuario,
  loginUsuario,
  logOutUsuario,
  getRolUsuario,
  eventBus,
} from "./LoginDatabase";
import style from "./Login.module.css";
export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/products">
          <Productos />
        </Route>
        <Route path="/ventas">
          <Ventas />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

function Header() {
  const [esAdministrador, setEsAdministrador] = useState(false);

  useEffect(() => {
    cargarRole(window.usuario);

    eventBus.on("usuario cambio", async (user) => {
      cargarRole(user);
    });
  }, []);

  async function cargarRole(user) {
    if (user == null) return;
    let role = await getRolUsuario(user.email);
    if (role === 2) setEsAdministrador(true);
  }

  return (
    <header>
      <h1>Novanity</h1>
      <nav>
        <Link to="/home">
          <i className="fas fa-chevron-right"></i>Inicio
        </Link>
        {esAdministrador && (
          <Link to="/users">
            <i className="fas fa-user"></i>Usuarios
          </Link>
        )}
        <Link to="/products">
          <i className="fas fa-people-carry"></i>Productos
        </Link>
        <Link to="/ventas">
          <i className="fas fa-hand-holding-usd"></i>Ventas
        </Link>
        <Link to="/" onClick={logOutUsuario}>
          Cerrar Sesion
        </Link>
      </nav>
    </header>
  );
}

function Home() {
  const [email, setEmail] = useState(window.usuario?.email);

  useEffect(() => {
    eventBus.on("usuario cambio", async (user) => {
      if (user == null) return;
      setEmail(user.email);
    });
  }, []);

  const [esAdmin, setEsAdmin] = useState(false);

  useEffect(() => {
    cargarRole(window.usuario);

    eventBus.on("usuario cambio", async (user) => {
      cargarRole(user);
    });
  }, []);

  async function cargarRole(user) {
    if (user == null) return;
    let role = await getRolUsuario(user.email);
    if (role === 2) setEsAdmin(true);
  }

  return (
    <>
      <Header />
      <main>
        <section className="user_login">
          <i className="fas fa-bell"></i>
          <div>
            <h2 className={style.usuario}>{email || "Bienvenido"}</h2>

            <i className="fas fa-chevron-down"></i>
          </div>
        </section>
        <section className="category">
          <h2 className="title">Panel administrativo</h2>

          {esAdmin && (
            <div>
              <a href="#/users">
                <figure>
                  <h2>Usuarios</h2>
                  <p>18</p>
                </figure>
                <i className="fas fa-users"></i>
              </a>
            </div>
          )}

          <div>
            <a href="#/products">
              <figure>
                <h2>Productos</h2>
                <p>17</p>
              </figure>
              <i className="fas fa-truck"></i>
            </a>
          </div>
          <div>
            <a href="#/ventas">
              <figure>
                <h2>Ventas</h2>
                <p>9</p>
              </figure>
              <i className="fas fa-chart-line"></i>
            </a>
          </div>
        </section>
        <div />
      </main>
    </>
  );
}

function Users() {
  const presuntoUsuario = datosUsuario();
  return (
    <>
      <Header />
      <main>
        <section className="user_login">
          <i className="fas fa-bell"></i>
          <div>
            <h2 className={style.usuario}>{window.usuario?.email}</h2>
            <i className="fas fa-chevron-down"></i>
          </div>
        </section>
        <h2 className="title2">Gestionar Usuarios</h2>
        <section className="table">
          <iframe
            title="usuarios"
            src="jsgrid/tabla-usuario/basic.html"
          ></iframe>
        </section>
      </main>
    </>
  );
}

function Productos() {
  return (
    <>
      <Header></Header>
      <main>
        <section className="user_login">
          <i className="fas fa-bell"></i>
          <div>
            <h2 className={style.usuario}>{window.usuario?.email}</h2>
            <i className="fas fa-chevron-down"></i>
          </div>
        </section>

        <h2 className="title2">Gestionar Productos</h2>
        <section className="table">
          <iframe
            title="productos"
            src="jsgrid/tabla-productos/basic.html"
          ></iframe>
        </section>
      </main>
    </>
  );
}

function Ventas() {
  return (
    <>
      <Header></Header>
      <main>
        <section className="user_login">
          <i className="fas fa-bell"></i>
          <div>
            <h2 className={style.usuario}>{window.usuario?.email}</h2>
            <i className="fas fa-chevron-down"></i>
          </div>
        </section>
        <h2 className="title2">Gestionar Ventas</h2>
        <section className="table">
          <iframe title="ventas" src="jsgrid/tabla-ventas/basic.html"></iframe>
        </section>
      </main>
    </>
  );
}

function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleClick = async () => {
    console.log("entro");
    //crearUsuario("maricelacoral033@gmail.com", "123456");
    try {
      setError(false);
      const usuario = await loginUsuario(login, password);
      console.log("autenticado", usuario);
      window.location.hash = "/home";
    } catch (err) {
      setError(true);
      console.log("esta fallando", err);
    }
  };
  return (
    <>
      <main className={style.main}>
        <div className={style.card}></div>
        <section className={style.login}>
          <h1 className={style.h1}>Control de Ventas</h1>
          <p className={style.p}>Bienvenidos</p>
          <div>
            <form className={style.form}>
              <input
                className={style.fill}
                type="text"
                placeholder="Correo"
                onChange={(e) => setLogin(e.target.value)}
              />
            </form>
            <form className={style.form}>
              <input
                className={style.fill}
                type="password"
                placeholder="Contraseña"
                onChange={(e) => setPassword(e.target.value)}
              />
            </form>
            {error && <div>Autenticacion no valida</div>}
            <button
              className={style.button}
              value="Ingresar"
              onClick={handleClick}
            >
              Ingresar
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
