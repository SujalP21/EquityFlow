import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  const previewRows = [
    ["Portfolio health", "82", "Stable"],
    ["Sector exposure", "Financials", "28%"],
    ["Top contributor", "INFY", "+15.18%"],
  ];

  return (
    <section className="hero-section">
      <div className="hero-section__copy">
        <p className="eyebrow">Investment analytics workspace</p>
        <h1>Understand what is driving your portfolio.</h1>
        <p className="hero-section__lead">
          EquityFlow turns holdings, watchlists, and market movement into a
          calm workspace for portfolio health, sector exposure, and actionable
          review signals.
        </p>
        <div className="hero-section__actions">
          <Link className="button button--primary" to="/signup">
            Start analyzing
          </Link>
          <Link className="button button--secondary" to="/product">
            View product
          </Link>
        </div>
      </div>

      <div className="product-preview" aria-label="EquityFlow dashboard preview">
        <div className="product-preview__header">
          <div>
            <span className="eyebrow">Overview</span>
            <h2>Portfolio Health</h2>
          </div>
          <strong>82</strong>
        </div>
        <div className="product-preview__meter">
          <span style={{ width: "82%" }} />
        </div>
        <div className="product-preview__grid">
          <div>
            <span>Current value</span>
            <strong>31.43k</strong>
          </div>
          <div>
            <span>Total return</span>
            <strong className="positive">+5.20%</strong>
          </div>
          <div>
            <span>Cash ready</span>
            <strong>3.74k</strong>
          </div>
        </div>
        <div className="mini-table">
          {previewRows.map((row) => (
            <div className="mini-table__row" key={row[0]}>
              <span>{row[0]}</span>
              <strong>{row[1]}</strong>
              <small>{row[2]}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
