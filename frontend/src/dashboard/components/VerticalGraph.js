import React from "react";

export function VerticalGraph({ data }) {
  const values = data?.datasets?.[0]?.data || [];
  const labels = data?.labels || [];
  const maxValue = Math.max(...values, 1);

  return (
    <div className="static-chart" aria-label="Holdings distribution">
      {values.map((value, index) => (
        <div className="static-chart__item" key={`${labels[index]}-${index}`}>
          <span
            className="static-chart__bar"
            style={{ height: `${Math.max((value / maxValue) * 100, 8)}%` }}
          />
          <small>{labels[index]}</small>
        </div>
      ))}
    </div>
  );
}
