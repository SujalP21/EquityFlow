import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <Link className="brand-mark" to="/">
            <span className="brand-mark__glyph">EF</span>
            <span>EquityFlow</span>
          </Link>
          <p>
            A focused analytics workspace for investors who want to understand
            allocation, performance, and portfolio health without terminal noise.
          </p>
        </div>

        <div className="site-footer__grid">
          <div>
            <h3>Product</h3>
            <Link to="/product">Analytics workspace</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/signup">Start analyzing</Link>
          </div>
          <div>
            <h3>Company</h3>
            <Link to="/about">About</Link>
            <Link to="/support">Support</Link>
          </div>
          <div>
            <h3>Resources</h3>
            <a href="#portfolio-health">Portfolio health</a>
            <a href="#sector-exposure">Sector exposure</a>
            <a href="#insights">Insight workflow</a>
          </div>
        </div>

        <p className="site-footer__note">
          EquityFlow is a product prototype for investment analytics. Data shown
          in demos is illustrative and should not be treated as financial advice.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
