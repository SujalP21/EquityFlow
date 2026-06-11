import React, { useContext, useMemo, useState } from "react";

import GeneralContext from "./GeneralContext";

import { Tooltip, Grow } from "@mui/material";

import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";

import { watchlist } from "../data/data";

const WatchList = () => {
  const [query, setQuery] = useState("");
  const [selectedAsset, setSelectedAsset] = useState(watchlist[0]);

  const filteredWatchlist = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return watchlist;
    return watchlist.filter((stock) => stock.name.toLowerCase().includes(term));
  }, [query]);

  return (
    <section className="dashboard-page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Watchlist</p>
          <h1>Tracked assets and local signals</h1>
        </div>
        <span className="page-header__meta">{watchlist.length} tracked</span>
      </div>

      <div className="watchlist-layout">
        <section className="panel watchlist-panel">
          <label className="field-label" htmlFor="watchlist-search">
            Search this watchlist
          </label>
          <input
            type="text"
            name="search"
            id="watchlist-search"
            placeholder="Search symbols"
            className="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />

          <div className="watchlist-tabs" aria-label="Saved watchlists">
            <button type="button" className="active">
              Core
            </button>
            <button type="button">Review</button>
            <button type="button">Long term</button>
          </div>

          {filteredWatchlist.length ? (
            <ul className="list">
              {filteredWatchlist.map((stock) => (
                <WatchListItem
                  stock={stock}
                  key={stock.name}
                  isSelected={selectedAsset?.name === stock.name}
                  onSelect={setSelectedAsset}
                />
              ))}
            </ul>
          ) : (
            <div className="empty-state">
              <h3>No matching assets</h3>
              <p>Clear the local watchlist search to see all tracked symbols.</p>
            </div>
          )}
        </section>

        <AssetDetail stock={selectedAsset} />
      </div>
    </section>
  );
};

export default WatchList;

const WatchListItem = ({ stock, isSelected, onSelect }) => {
  return (
    <li className={isSelected ? "selected" : ""}>
      <button className="watchlist-row" type="button" onClick={() => onSelect(stock)}>
        <div>
          <strong className={stock.isDown ? "down" : "up"}>{stock.name}</strong>
          <span>{stock.signal}</span>
        </div>
        <div className="item-info">
          <span className={stock.isDown ? "negative" : "positive"}>
            {stock.percent}
          </span>
          {stock.isDown ? (
            <KeyboardArrowDown className="negative" />
          ) : (
            <KeyboardArrowUp className="positive" />
          )}
          <strong>{stock.price.toFixed(2)}</strong>
        </div>
      </button>
    </li>
  );
};

const AssetDetail = ({ stock }) => {
  if (!stock) {
    return (
      <section className="panel asset-detail">
        <div className="empty-state">
          <h3>Select an asset</h3>
          <p>Choose a watchlist row to review price, signal, and actions.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="panel asset-detail">
      <div className="panel__header">
        <div>
          <p className="eyebrow">Asset detail</p>
          <h2>{stock.name}</h2>
        </div>
        <span className={stock.isDown ? "negative" : "positive"}>
          {stock.percent}
        </span>
      </div>

      <div className="asset-price-card">
        <span>Last traded price</span>
        <strong>{stock.price.toFixed(2)}</strong>
        <p>{stock.signal}</p>
      </div>

      <div className="mini-chart" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <WatchListActions uid={stock.name} />
    </section>
  );
};

const WatchListActions = ({ uid }) => {
  const generalContext = useContext(GeneralContext);

  const handleBuyClick = () => {
    generalContext.openBuyWindow(uid);
  };

  return (
    <div className="asset-actions">
      <Tooltip
        title="Buy"
        placement="top"
        arrow
        TransitionComponent={Grow}
        onClick={handleBuyClick}
      >
        <button className="buy" type="button">
          Buy
        </button>
      </Tooltip>
      <Tooltip title="Sell" placement="top" arrow TransitionComponent={Grow}>
        <button className="sell" type="button">
          Sell
        </button>
      </Tooltip>
      <Tooltip title="Analytics" placement="top" arrow TransitionComponent={Grow}>
        <button className="action" type="button">
          <BarChartOutlined className="icon" />
        </button>
      </Tooltip>
      <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
        <button className="action" type="button">
          <MoreHoriz className="icon" />
        </button>
      </Tooltip>
    </div>
  );
};
