import React from "react";
import { Link } from "react-router-dom";
import "../css/NavBar.css";

function NavBar() {
  const navbarMenu = ["Travel Updates", "Reviews", "About", "Contact"];
  return (
    <nav className="nav">
      <ul className="nav__container">
        {navbarMenu.map((item, i) => (
          <li key={i} className="nav__item">
            <Link to="/" className="nav__link">
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavBar;
