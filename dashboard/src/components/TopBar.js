import React from "react";

import Menu from "./Menu";

const TopBar = () => {
  return (
    <header className="topbar-container">
      <Menu />
      <div className="topbar-status">
        <span>Light analytics workspace</span>
        <strong>Health score enabled</strong>
      </div>
    </header>
  );
};

export default TopBar;
