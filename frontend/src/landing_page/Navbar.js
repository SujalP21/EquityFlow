import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { DASHBOARD_ROUTES, PUBLIC_ROUTES } from "../constants/routes";

function Navbar() {
  const { isAuthenticated } = useAuth();
  const dashboardTarget = isAuthenticated
    ? DASHBOARD_ROUTES.OVERVIEW
    : PUBLIC_ROUTES.LOGIN;
  const navItems = [
    { label: "Product", to: PUBLIC_ROUTES.PRODUCT },
    { label: "Analytics", to: PUBLIC_ROUTES.HOME },
    { label: "Pricing", to: PUBLIC_ROUTES.PRICING },
    { label: "Support", to: PUBLIC_ROUTES.SUPPORT },
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
          <Link className="site-nav__link" to={PUBLIC_ROUTES.ABOUT}>
            About
          </Link>
          <Link className="button button--primary" to={dashboardTarget}>
            {isAuthenticated ? "Dashboard" : "Login"}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
