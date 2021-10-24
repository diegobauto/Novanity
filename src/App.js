import React, { useEffect, useState } from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  crearUsuario,
  loginUsuario,
  logOutUsuario,
  getRolUsuario,
  eventBus,
  getEstadoUsuario,
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
        <Route path="/add-user">
          <AddUser />
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
  const [usuario, setUsuario] = useState(!!window.usuario);

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
    setUsuario(!!user);
  }

  return (
    <header>
      {usuario && (
        <>
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
        </>
      )}
    </header>
  );
}

function Home() {
  const [email, setEmail] = useState(window.usuario?.email);
  console.log(window.usuario);
  const [usuario, setUsuario] = useState(!!window.usuario);

  useEffect(() => {
    eventBus.on("usuario cambio", async (user) => {
      if (user == null) return;
      setEmail(user.email);
      setUsuario(!!user);
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
      {usuario && (
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
      )}
    </>
  );
}

function Users() {
  const [usuario, setUsuario] = useState(!!window.usuario);
  useEffect(() => {
    cargarRole(window.usuario);

    eventBus.on("usuario cambio", async (user) => {
      cargarRole(user);
    });
  }, []);

  async function cargarRole(user) {
    setUsuario(!!user);
  }
  return (
    <>
      <Header />
      {usuario && (
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
      )}
    </>
  );
}

function Productos() {
  const [usuario, setUsuario] = useState(!!window.usuario);
  useEffect(() => {
    cargarRole(window.usuario);

    eventBus.on("usuario cambio", async (user) => {
      cargarRole(user);
    });
  }, []);

  async function cargarRole(user) {
    setUsuario(!!user);
  }
  return (
    <>
      <Header></Header>
      {usuario && (
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
      )}
    </>
  );
}

function Ventas() {
  const [usuario, setUsuario] = useState(!!window.usuario);
  useEffect(() => {
    cargarRole(window.usuario);

    eventBus.on("usuario cambio", async (user) => {
      cargarRole(user);
    });
  }, []);

  async function cargarRole(user) {
    setUsuario(!!user);
  }
  return (
    <>
      <Header></Header>
      {usuario && (
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
            <iframe
              title="ventas"
              src="jsgrid/tabla-ventas/basic.html"
            ></iframe>
          </section>
        </main>
      )}
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

            <p className={style.link}>
              No tienes cuenta?{" "}
              <Link to="/add-user">
                <span>Registrate</span>
              </Link>
            </p>

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

function AddUser() {
  const [correo, setCorreo] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmarPassword, setconfirmarPassword] = useState(null);
  const [correoAutorizado, setCorreoAutorizado] = useState(true);
  const [igualPassword, setigualPassword] = useState(true);
  const [error, setError] = useState(false);
  const [longPassword, setLongPassword] = useState(true);

  const handleClick = async () => {
    console.log(password.length);
    if (!correo) return;
    if (!password) return;
    if (password !== confirmarPassword) {
      setigualPassword(false);
      return;
    } else {
      setigualPassword(true);
    }

    let estadoUsuario = await getEstadoUsuario(correo);
    console.log(estadoUsuario);
    if (estadoUsuario !== 1) {
      setCorreoAutorizado(false);
      return;
    } else {
      setCorreoAutorizado(true);
    }
    if (password.length < 6) {
      setLongPassword(false);
      return;
    } else {
      setLongPassword(true);
    }

    try {
      setError(false);
      await crearUsuario(correo, password);
    } catch (err) {
      setError(true);
      console.log("esta fallando", err);
    }
  };
  return (
    <>
      <section className={style.formRegister}>
        <h4 className={style.h4}>Registrar Nuevo Usuario</h4>
        <input
          className={style.controls}
          type="email"
          name="correo"
          id="correo"
          placeholder="Correo"
          onChange={(e) => {
            setCorreo(e.target.value);
          }}
        />
        <input
          className={style.controls}
          type="password"
          name="password"
          id="password"
          placeholder="Contraseña"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          className={style.controls}
          type="password"
          name="ConfirmarPassword"
          id="ConfirmarPassword"
          placeholder="Confirmar contraseña"
          onChange={(e) => {
            setconfirmarPassword(e.target.value);
          }}
        />

        {!correoAutorizado && <h4>El correo no se encuentra autorizado</h4>}
        {!igualPassword && <h4>No coincide la contraseña </h4>}
        {error && <h4> Error: Se requiere una cuenta de gmail </h4>}
        {!longPassword && (
          <h4> Error: La contraseña debe tener 6 o mas caracteres </h4>
        )}

        <button className={style.buttons} onClick={handleClick}>
          Crear Registro
        </button>
        <p>
          Ya tienes cuenta?{" "}
          <Link to="/">
            <span>Inicia Sesion</span>
          </Link>
        </p>
      </section>
    </>
  );
}
