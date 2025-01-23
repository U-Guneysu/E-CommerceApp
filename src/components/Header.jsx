import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <>
      <nav className="navbar navbar-dark bg-black sticky-top navbar-expand-md">
        <Link to="/hemen" className="navbar-brand">
          <span className="brand-text">E-Market</span>
        </Link>
        <div className="menu-container d-flex justify-content-end w-100">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/hemen">
                Ana Sayfa
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/checkout">
                Sepet
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
