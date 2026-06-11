import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Positions from "./Positions";
import { holdings as fallbackHoldings, sectorExposure } from "../data/data";
import { VerticalGraph } from "./VerticalGraph";

const formatNumber = (value) =>
  value.toLocaleString("en-IN", { maximumFractionDigits: 2 });

const HoldingsTable = ({ holdings }) => {
  if (!holdings.length) {
    return (
      <div className="empty-state">
        <h3>No holdings yet</h3>
        <p>Add holdings to see value, returns, and sector exposure.</p>
      </div>
    );
  }

  return (
    <div className="order-table">
      <table>
        <thead>
          <tr>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg. cost</th>
            <th>LTP</th>
            <th>Cur. val</th>
            <th>P&L</th>
            <th>Net chg.</th>
            <th>Day chg.</th>
          </tr>
        </thead>
        <tbody>
          {holdings.map((stock, index) => {
            const curValue = stock.price * stock.qty;
            const pnl = curValue - stock.avg * stock.qty;
            const isProfit = pnl >= 0.0;
            const profClass = isProfit ? "profit" : "loss";
            const dayClass = stock.isLoss ? "loss" : "profit";

            return (
              <tr key={`${stock.name}-${index}`}>
                <td data-label="Instrument">{stock.name}</td>
                <td data-label="Qty.">{stock.qty}</td>
                <td data-label="Avg. cost">{stock.avg.toFixed(2)}</td>
                <td data-label="LTP">{stock.price.toFixed(2)}</td>
                <td data-label="Cur. val">{curValue.toFixed(2)}</td>
                <td data-label="P&L" className={profClass}>
                  {pnl.toFixed(2)}
                </td>
                <td data-label="Net chg." className={profClass}>
                  {stock.net}
                </td>
                <td data-label="Day chg." className={dayClass}>
                  {stock.day}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const Holdings = () => {
  const [activeTab, setActiveTab] = useState("holdings");
  const [remoteHoldings, setRemoteHoldings] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3002/allHoldings")
      .then((res) => {
        setRemoteHoldings(res.data);
      })
      .catch(() => {
        setRemoteHoldings([]);
      });
  }, []);

  const allHoldings = remoteHoldings.length ? remoteHoldings : fallbackHoldings;

  const totals = useMemo(() => {
    const invested = allHoldings.reduce(
      (sum, stock) => sum + stock.avg * stock.qty,
      0
    );
    const current = allHoldings.reduce(
      (sum, stock) => sum + stock.price * stock.qty,
      0
    );
    const pnl = current - invested;
    return { invested, current, pnl };
  }, [allHoldings]);

  const chartData = {
    labels: allHoldings.map((stock) => stock.name),
    datasets: [
      {
        label: "Current value",
        data: allHoldings.map((stock) => stock.price * stock.qty),
        backgroundColor: "#285e4d",
        borderRadius: 6,
      },
    ],
  };

  return (
    <section className="dashboard-page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Portfolio</p>
          <h1>Holdings and positions in one workspace</h1>
        </div>
      </div>

      <div className="metric-grid">
        <article className="metric-card">
          <span>Total investment</span>
          <strong>{formatNumber(totals.invested)}</strong>
          <p>Cost basis</p>
        </article>
        <article className="metric-card">
          <span>Current value</span>
          <strong>{formatNumber(totals.current)}</strong>
          <p>Marked to latest price</p>
        </article>
        <article className="metric-card">
          <span>Unrealized P&L</span>
          <strong className={totals.pnl >= 0 ? "positive" : "negative"}>
            {totals.pnl >= 0 ? "+" : ""}
            {formatNumber(totals.pnl)}
          </strong>
          <p>{((totals.pnl / totals.invested) * 100).toFixed(2)}% return</p>
        </article>
      </div>

      <section className="panel">
        <div className="panel__header">
          <div>
            <p className="eyebrow">Sector exposure</p>
            <h2>Summary cards</h2>
          </div>
        </div>
        <div className="sector-grid">
          {sectorExposure.map((sector) => (
            <article className="sector-card" key={sector.name}>
              <div>
                <strong>{sector.name}</strong>
                <span>{sector.value}</span>
              </div>
              <div className="sector-card__bar">
                <span style={{ width: `${sector.weight}%` }} />
              </div>
              <p>{sector.weight}% - {sector.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="tabs" role="tablist" aria-label="Portfolio tabs">
          <button
            className={activeTab === "holdings" ? "tab active" : "tab"}
            onClick={() => setActiveTab("holdings")}
            type="button"
          >
            Holdings
          </button>
          <button
            className={activeTab === "positions" ? "tab active" : "tab"}
            onClick={() => setActiveTab("positions")}
            type="button"
          >
            Positions
          </button>
        </div>

        {activeTab === "holdings" ? (
          <>
            <HoldingsTable holdings={allHoldings} />
            <div className="chart-panel">
              <VerticalGraph data={chartData} />
            </div>
          </>
        ) : (
          <Positions />
        )}
      </section>
    </section>
  );
};

export default Holdings;
