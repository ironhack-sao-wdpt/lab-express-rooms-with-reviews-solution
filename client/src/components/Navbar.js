import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";

import { AuthContext } from "../contexts/authContext";

function Navbar() {
  // Extraindo o state global de usuário logado e a função para fazer logout
  const { loggedInUser, handleLogout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Navbar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse d-flex justify-content-between"
          id="navbarNav"
        >
          {loggedInUser.user._id ? (
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  className={(isActive) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={(isActive) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                  to="/room/create"
                >
                  Nova Acomodação
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={(isActive) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                  to="/profile"
                >
                  Perfil
                </NavLink>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  className={(isActive) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                  to="/signup"
                >
                  Cadastre-se
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={(isActive) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                  to="/login"
                >
                  Entrar
                </NavLink>
              </li>
            </ul>
          )}

          {loggedInUser.user._id && (
            <div className="text-light">
              <span>Bem-vindo, {loggedInUser.user.name}</span>
              <button
                className="btn btn-link text-light"
                onClick={handleLogout}
              >
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
