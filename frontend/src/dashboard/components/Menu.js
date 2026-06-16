import React from "react";
import { NavLink } from "react-router-dom";
import { DASHBOARD_ROUTES } from "../../constants/routes";

const navItems = [
  { label: "Overview", to: DASHBOARD_ROUTES.OVERVIEW },
  { label: "Portfolio", to: DASHBOARD_ROUTES.PORTFOLIO },
  { label: "Watchlist", to: DASHBOARD_ROUTES.WATCHLIST },
  { label: "Orders", to: "/orders" },
  { label: "Insights", to: DASHBOARD_ROUTES.INSIGHTS },
];

const Menu = ({ onNavigate }) => {
  return (
    <div className="menu-container" id="dashboard-navigation">
      <NavLink
        className="dashboard-brand"
        to={DASHBOARD_ROUTES.OVERVIEW}
        aria-label="EquityFlow"
        onClick={onNavigate}
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
            onClick={onNavigate}
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

      <NavLink
        to={DASHBOARD_ROUTES.SETTINGS}
        onClick={onNavigate}
        className={({ isActive }) =>
          isActive ? "menu menu--utility selected" : "menu menu--utility"
        }
      >
        Settings
      </NavLink>
    </div>
  );
};

export default Menu;
