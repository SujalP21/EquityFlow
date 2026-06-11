import React from "react";
import { holdings, insightCards, sectorExposure } from "../data/data";

const Apps = () => {
  const healthScore = 82;
  const winners = holdings
    .map((stock) => ({
      name: stock.name,
      contribution: stock.price * stock.qty - stock.avg * stock.qty,
    }))
    .sort((a, b) => b.contribution - a.contribution)
    .slice(0, 5);

  return (
    <section className="dashboard-page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Insights</p>
          <h1>Signals for the next portfolio review</h1>
        </div>
      </div>

      <div className="overview-grid">
        <article className="health-card">
          <div>
            <p className="eyebrow">Portfolio Health Score</p>
            <h2>{healthScore}</h2>
            <p>
              Score reflects diversification, total return, cash readiness, and
              concentration risk.
            </p>
          </div>
          <div className="health-card__meter">
            <span style={{ width: `${healthScore}%` }} />
          </div>
        </article>

        <div className="metric-grid">
          {sectorExposure.slice(0, 3).map((sector) => (
            <article className="metric-card" key={sector.name}>
              <span>{sector.name}</span>
              <strong>{sector.weight}%</strong>
              <p>{sector.note}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="dashboard-grid dashboard-grid--two">
        <section className="panel">
          <div className="panel__header">
            <div>
              <p className="eyebrow">Insight feed</p>
              <h2>What deserves attention</h2>
            </div>
          </div>
          <div className="insight-list">
            {insightCards.map((insight) => (
              <article className="insight-card" key={insight.title}>
                <span>{insight.severity}</span>
                <h3>{insight.title}</h3>
                <p>{insight.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="panel__header">
            <div>
              <p className="eyebrow">Contributors</p>
              <h2>Return leaders</h2>
            </div>
          </div>
          <div className="data-table data-table--compact">
            <div className="data-table__head">
              <span>Asset</span>
              <span>Contribution</span>
            </div>
            {winners.map((stock) => (
              <div className="data-table__row" key={stock.name}>
                <strong>{stock.name}</strong>
                <span className={stock.contribution >= 0 ? "positive" : "negative"}>
                  {stock.contribution >= 0 ? "+" : ""}
                  {stock.contribution.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};

export default Apps;
