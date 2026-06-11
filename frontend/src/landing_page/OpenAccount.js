import React from "react";
import { Link } from "react-router-dom";

function OpenAccount() {
  return (
    <section className="cta-section">
      <p className="eyebrow">Ready for a cleaner dashboard?</p>
      <h2>Start with portfolio health, then go deeper.</h2>
      <p>
        Move from scattered market rows to a structured review of performance,
        exposure, and watchlist signals.
      </p>
      <Link className="button button--primary" to="/signup">
        Start analyzing
      </Link>
    </section>
  );
}

export default OpenAccount;
