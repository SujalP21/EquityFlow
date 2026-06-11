import React, { useContext, useEffect, useMemo, useState } from "react";

import GeneralContext from "./GeneralContext";
import { getStocks } from "../../api/stocks";

import { Tooltip, Grow } from "@mui/material";

import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";

import { watchlist } from "../data/data";

const mapStockToWatchlistItem = (stock) => {
  const latestPrice = stock.latestPrice || {};
  const changePercent = Number(latestPrice.changePercent || 0);
  const price = Number(latestPrice.price || stock.price || 0);
  const symbol = stock.symbol || stock.name;

  return {
    symbol,
    name: symbol,
    displayName: stock.displayName || stock.companyName || stock.name || symbol,
    companyName: stock.companyName,
    sector: stock.sector,
    logoUrl: stock.logoUrl,
    price,
    percent: `${changePercent >= 0 ? "+" : ""}${changePercent.toFixed(2)}%`,
    isDown: changePercent < 0,
    signal: stock.sector ? `${stock.sector} exposure` : stock.signal,
  };
};

const fallbackWatchlist = watchlist.map((stock) =>
  mapStockToWatchlistItem({
    ...stock,
    symbol: stock.symbol || stock.name,
    displayName: stock.displayName || stock.name,
    latestPrice: {
      price: stock.price,
      changePercent: Number.parseFloat(stock.percent),
    },
  })
);

const WatchList = () => {
  const [query, setQuery] = useState("");
  const [stocks, setStocks] = useState(fallbackWatchlist);
  const [selectedAsset, setSelectedAsset] = useState(fallbackWatchlist[0]);
  const [didStocksRequestFail, setDidStocksRequestFail] = useState(false);

  useEffect(() => {
    getStocks({ limit: 50 })
      .then((res) => {
        const mappedStocks = res.data.data.map(mapStockToWatchlistItem);
        if (mappedStocks.length) {
          setStocks(mappedStocks);
          setSelectedAsset(mappedStocks[0]);
          setDidStocksRequestFail(false);
        }
      })
      .catch(() => {
        setStocks(fallbackWatchlist);
        setSelectedAsset(fallbackWatchlist[0]);
        setDidStocksRequestFail(true);
      });
  }, []);

  const filteredWatchlist = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return stocks;
    return stocks.filter((stock) =>
      [stock.symbol, stock.displayName, stock.companyName, stock.sector]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(term))
    );
  }, [query, stocks]);

  return (
    <section className="dashboard-page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Watchlist</p>
          <h1>Tracked assets and local signals</h1>
        </div>
        <span className="page-header__meta">
          {stocks.length} tracked{didStocksRequestFail ? " - local fallback" : ""}
        </span>
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
                  key={stock.symbol}
                  isSelected={selectedAsset?.symbol === stock.symbol}
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
          <strong className={stock.isDown ? "down" : "up"}>{stock.symbol}</strong>
          <span>{stock.displayName}</span>
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
          <h2>{stock.symbol}</h2>
          <p className="asset-detail__subtitle">{stock.displayName}</p>
        </div>
        <span className={stock.isDown ? "negative" : "positive"}>
          {stock.percent}
        </span>
      </div>

      <div className="asset-identity">
        {stock.logoUrl ? (
          <img src={stock.logoUrl} alt={`${stock.displayName} logo`} />
        ) : (
          <span>{stock.symbol.slice(0, 2)}</span>
        )}
        <div>
          <strong>{stock.companyName || stock.displayName}</strong>
          <p>{stock.sector || stock.signal}</p>
        </div>
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

      <WatchListActions uid={stock.symbol} price={stock.price} />
    </section>
  );
};

const WatchListActions = ({ uid, price }) => {
  const generalContext = useContext(GeneralContext);

  const handleBuyClick = () => {
    generalContext.openBuyWindow(uid, price);
  };

  const handleSellClick = () => {
    generalContext.openSellWindow(uid, price);
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
      <Tooltip
        title="Sell"
        placement="top"
        arrow
        TransitionComponent={Grow}
        onClick={handleSellClick}
      >
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
