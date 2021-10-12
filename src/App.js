import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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
  return (
    <header>
      <h1>Novanity</h1>
      <nav>
        <Link to="/home">
          <i className="fas fa-chevron-right"></i>Inicio
        </Link>
        <Link to="/users">
          <i className="fas fa-user"></i>Usuarios
        </Link>
        <Link to="/products">
          <i className="fas fa-people-carry"></i>Productos
        </Link>
        <Link to="/ventas">
          <i className="fas fa-hand-holding-usd"></i>Ventas
        </Link>
      </nav>
    </header>
  );
}

function Home() {
  return (
    <>
      <Header />
      <main>
        <section className="user_login">
          <i className="fas fa-bell"></i>
          <a href="">
            <h2>Steven Espejo</h2>
            <i className="fas fa-chevron-down"></i>
          </a>
        </section>
        <section className="category">
          <h2 className="title">Panel administrativo</h2>
          <div>
            <a href="usuario.html">
              <figure>
                <h2>Usuarios</h2>
                <p>18</p>
              </figure>
              <i className="fas fa-users"></i>
            </a>
          </div>
          <div>
            <a href="productos.html">
              <figure>
                <h2>Productos</h2>
                <p>17</p>
              </figure>
              <i className="fas fa-truck"></i>
            </a>
          </div>
          <div>
            <a href="ventas.html">
              <figure>
                <h2>Ventas</h2>
                <p>16</p>
              </figure>
              <i className="fas fa-chart-line"></i>
            </a>
          </div>
        </section>
      </main>
    </>
  );
}

function Users() {
  return (
    <>
      <Header />
      <main>
        <section className="user_login">
          <i className="fas fa-bell"></i>
          <a href="">
            <h2>Steven Espejo</h2>
            <i className="fas fa-chevron-down"></i>
          </a>
        </section>
        <h2 className="title2">Gestionar Usuarios</h2>
        <section className="table">
          <iframe src="jsgrid/tabla-usuario/basic.html"></iframe>
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
          <a href="">
            <h2>Steven Espejo</h2>
            <i className="fas fa-chevron-down"></i>
          </a>
        </section>

        <h2 className="title2">Gestionar Productos</h2>
        <section className="table">
          <iframe src="jsgrid/tabla-productos/basic.html"></iframe>
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
          <a href="">
            <h2>Steven Espejo</h2>
            <i className="fas fa-chevron-down"></i>
          </a>
        </section>
        <h2 className="title2">Gestionar Ventas</h2>
        <section className="table">
          <iframe src="jsgrid/tabla-ventas/basic.html"></iframe>
        </section>
      </main>
    </>
  );
}

function Login() {
  return (
    <section className="table">
      <iframe src="login.html"></iframe>
    </section>
  );
}
