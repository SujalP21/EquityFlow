import React from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const navItems = [
    { label: "Product", to: "/product" },
    { label: "Analytics", to: "/" },
    { label: "Pricing", to: "/pricing" },
    { label: "Support", to: "/support" },
  ];

  return (
    <nav className="site-nav" aria-label="Primary navigation">
      <div className="site-nav__inner">
        <Link className="brand-mark" to="/" aria-label="EquityFlow home">
          <span className="brand-mark__glyph">EF</span>
          <span>EquityFlow</span>
        </Link>

        <div className="site-nav__links">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                isActive ? "site-nav__link is-active" : "site-nav__link"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="site-nav__actions">
          <Link className="site-nav__link" to="/about">
            About
          </Link>
          <Link className="button button--primary" to="/signup">
            Start analyzing
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
