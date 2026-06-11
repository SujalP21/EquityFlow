import React from "react";
import { NavLink } from "react-router-dom";
import { DASHBOARD_ROUTES } from "../../constants/routes";

const navItems = [
  { label: "Overview", to: DASHBOARD_ROUTES.OVERVIEW },
  { label: "Portfolio", to: DASHBOARD_ROUTES.PORTFOLIO },
  { label: "Watchlist", to: DASHBOARD_ROUTES.WATCHLIST },
  { label: "Insights", to: DASHBOARD_ROUTES.INSIGHTS },
  { label: "Settings", to: DASHBOARD_ROUTES.SETTINGS },
];

const Menu = () => {
  return (
    <div className="menu-container">
      <NavLink
        className="dashboard-brand"
        to={DASHBOARD_ROUTES.OVERVIEW}
        aria-label="EquityFlow"
      >
        <span>EF</span>
        <strong>EquityFlow</strong>
      </NavLink>

      <nav className="menus" aria-label="Dashboard navigation">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            end={item.to === DASHBOARD_ROUTES.OVERVIEW}
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
