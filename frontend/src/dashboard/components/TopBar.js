import React from "react";
import { useNavigate } from "react-router-dom";

import Menu from "./Menu";
import { useAuth } from "../../auth/AuthContext";
import { PUBLIC_ROUTES } from "../../constants/routes";

const TopBar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate(PUBLIC_ROUTES.LOGIN, { replace: true });
  };

  return (
    <header className="topbar-container">
      <Menu />
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
