import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Menu from "./Menu";
import { useAuth } from "../../auth/AuthContext";
import { DASHBOARD_ROUTES } from "../../constants/routes";
import { PUBLIC_ROUTES } from "../../constants/routes";

const TopBar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate(PUBLIC_ROUTES.LOGIN, { replace: true });
  };

  return (
    <header className={isMenuOpen ? "topbar-container is-open" : "topbar-container"}>
      <Link
        className="dashboard-brand dashboard-brand--mobile"
        to={DASHBOARD_ROUTES.OVERVIEW}
        aria-label="EquityFlow overview"
        onClick={() => setIsMenuOpen(false)}
      >
        <span>EF</span>
        <strong>EquityFlow</strong>
      </Link>
      <button
        className="dashboard-nav-toggle"
        type="button"
        aria-expanded={isMenuOpen}
        aria-controls="dashboard-navigation"
        onClick={() => setIsMenuOpen((current) => !current)}
      >
        Menu
      </button>
      <Menu onNavigate={() => setIsMenuOpen(false)} />
      <div className="topbar-status">
        <span>{user?.name || "Investor"}</span>
        <button className="logout-button" type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default TopBar;
