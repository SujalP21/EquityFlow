import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  const previewRows = [
    ["INFY", "BUY", "EXECUTED"],
    ["ADANIGREEN", "SELL", "REJECTED"],
    ["TCS", "BUY", "EXECUTED"],
  ];

  return (
    <section className="hero-section">
      <div className="hero-section__copy">
        <p className="eyebrow">Investment analytics workspace</p>
        <h1>A professional portfolio desk for holdings, orders, and signals.</h1>
        <p className="hero-section__lead">
          EquityFlow brings portfolio health, watchlists, stock details, order
          history, and trading analytics into one warm-light workspace built for
          daily review.
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

      <div className="product-preview product-preview--terminal" aria-label="EquityFlow dashboard preview">
        <div className="product-preview__topbar">
          <span>Overview</span>
          <span>Portfolio</span>
          <span>Orders</span>
        </div>
        <div className="product-preview__header">
          <div>
            <span className="eyebrow">Live workspace</span>
            <h2>Portfolio Value</h2>
          </div>
          <strong>₹3.42L</strong>
        </div>
        <div className="product-preview__meter">
          <span style={{ width: "76%" }} />
        </div>
        <div className="product-preview__grid">
          <div>
            <span>Health score</span>
            <strong>82</strong>
          </div>
          <div>
            <span>Total return</span>
            <strong className="positive">+5.20%</strong>
          </div>
          <div>
            <span>Orders</span>
            <strong>18</strong>
          </div>
        </div>
        <div className="preview-chart" aria-hidden="true">
          <span style={{ height: "42%" }} />
          <span style={{ height: "58%" }} />
          <span style={{ height: "51%" }} />
          <span style={{ height: "74%" }} />
          <span style={{ height: "67%" }} />
          <span style={{ height: "86%" }} />
          <span style={{ height: "79%" }} />
        </div>
        <div className="mini-table">
          <div className="mini-table__head">
            <span>Symbol</span>
            <span>Side</span>
            <span>Status</span>
          </div>
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
