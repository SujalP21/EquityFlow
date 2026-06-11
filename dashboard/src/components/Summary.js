import React from "react";
import { holdings, sectorExposure, watchlist } from "../data/data";

const formatCurrency = (value) =>
  value.toLocaleString("en-IN", { maximumFractionDigits: 0 });

const Summary = () => {
  const invested = holdings.reduce((sum, stock) => sum + stock.avg * stock.qty, 0);
  const current = holdings.reduce((sum, stock) => sum + stock.price * stock.qty, 0);
  const pnl = current - invested;
  const returnPercent = (pnl / invested) * 100;
  const healthScore = 82;
  const topMovers = [...watchlist]
    .sort((a, b) => Math.abs(parseFloat(b.percent)) - Math.abs(parseFloat(a.percent)))
    .slice(0, 4);

  const metrics = [
    {
      label: "Current value",
      value: formatCurrency(current),
      detail: "Across tracked holdings",
    },
    {
      label: "Total P&L",
      value: `${pnl >= 0 ? "+" : ""}${formatCurrency(pnl)}`,
      detail: `${returnPercent.toFixed(2)}% overall`,
      tone: pnl >= 0 ? "positive" : "negative",
    },
    {
      label: "Cash ready",
      value: "3.74k",
      detail: "Available for allocation",
    },
    {
      label: "Largest exposure",
      value: sectorExposure[0].name,
      detail: `${sectorExposure[0].weight}% of portfolio`,
    },
  ];

  return (
    <section className="dashboard-page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Overview</p>
          <h1>Portfolio clarity at a glance</h1>
        </div>
        <span className="page-header__meta">Last refreshed today</span>
      </div>

      <div className="overview-grid">
        <article className="health-card">
          <div>
            <p className="eyebrow">Portfolio Health Score</p>
            <h2>{healthScore}</h2>
            <p>
              Stable score supported by positive return, cash availability, and
              a manageable sector mix.
            </p>
          </div>
          <div className="health-card__meter">
            <span style={{ width: `${healthScore}%` }} />
          </div>
        </article>

        <div className="metric-grid">
          {metrics.map((metric) => (
            <article className="metric-card" key={metric.label}>
              <span>{metric.label}</span>
              <strong className={metric.tone || ""}>{metric.value}</strong>
              <p>{metric.detail}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="dashboard-grid dashboard-grid--two">
        <section className="panel">
          <div className="panel__header">
            <div>
              <p className="eyebrow">Sector exposure</p>
              <h2>Capital by theme</h2>
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
                <p>
                  {sector.weight}% - {sector.note}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="panel__header">
            <div>
              <p className="eyebrow">Top movers</p>
              <h2>What changed today</h2>
            </div>
          </div>
          <div className="data-table data-table--compact">
            <div className="data-table__head">
              <span>Symbol</span>
              <span>Price</span>
              <span>Day</span>
            </div>
            {topMovers.map((stock) => (
              <div className="data-table__row" key={stock.name}>
                <strong>{stock.name}</strong>
                <span>{stock.price.toFixed(2)}</span>
                <span className={stock.isDown ? "negative" : "positive"}>
                  {stock.percent}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};

export default Summary;
