import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Overview", to: "/" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Watchlist", to: "/watchlist" },
  { label: "Insights", to: "/insights" },
  { label: "Settings", to: "/settings" },
];

const Menu = () => {
  return (
    <div className="menu-container">
      <NavLink className="dashboard-brand" to="/" aria-label="EquityFlow">
        <span>EF</span>
        <strong>EquityFlow</strong>
      </NavLink>

      <nav className="menus" aria-label="Dashboard navigation">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              isActive ? "menu selected" : "menu"
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="profile" aria-label="User profile">
        <div className="avatar">EF</div>
        <p className="username">Investor</p>
      </div>
    </div>
  );
};

export default Menu;
