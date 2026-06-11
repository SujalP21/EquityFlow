import React from "react";

import { positions } from "../data/data";

const Positions = () => {
  if (!positions.length) {
    return (
      <div className="empty-state">
        <h3>No active positions</h3>
        <p>Positions will appear here when available.</p>
      </div>
    );
  }

  return (
    <div className="order-table">
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg.</th>
            <th>LTP</th>
            <th>P&L</th>
            <th>Chg.</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((stock, index) => {
            const curValue = stock.price * stock.qty;
            const isProfit = curValue - stock.avg * stock.qty >= 0.0;
            const profClass = isProfit ? "profit" : "loss";
            const dayClass = stock.isLoss ? "loss" : "profit";

            return (
              <tr key={`${stock.name}-${index}`}>
                <td data-label="Product">{stock.product}</td>
                <td data-label="Instrument">{stock.name}</td>
                <td data-label="Qty.">{stock.qty}</td>
                <td data-label="Avg.">{stock.avg.toFixed(2)}</td>
                <td data-label="LTP">{stock.price.toFixed(2)}</td>
                <td data-label="P&L" className={profClass}>
                  {(curValue - stock.avg * stock.qty).toFixed(2)}
                </td>
                <td data-label="Chg." className={dayClass}>
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

export default Positions;
