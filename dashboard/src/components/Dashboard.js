import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Apps from "./Apps";
import Funds from "./Funds";
import Holdings from "./Holdings";
import Summary from "./Summary";
import WatchList from "./WatchList";
import { GeneralContextProvider } from "./GeneralContext";

const Dashboard = () => {
  return (
    <GeneralContextProvider>
      <div className="dashboard-container">
        <div className="content">
          <Routes>
            <Route path="/" element={<Summary />} />
            <Route path="/portfolio" element={<Holdings />} />
            <Route path="/watchlist" element={<WatchList />} />
            <Route path="/insights" element={<Apps />} />
            <Route path="/settings" element={<Funds />} />
            <Route path="/orders" element={<Navigate to="/portfolio" replace />} />
            <Route path="/holdings" element={<Navigate to="/portfolio" replace />} />
            <Route path="/positions" element={<Navigate to="/portfolio" replace />} />
            <Route path="/funds" element={<Navigate to="/settings" replace />} />
            <Route path="/apps" element={<Navigate to="/insights" replace />} />
          </Routes>
        </div>
      </div>
    </GeneralContextProvider>
  );
};

export default Dashboard;
