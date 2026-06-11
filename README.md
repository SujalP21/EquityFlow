<div align="center">
  <h1>EquityFlow</h1>
  <p>A light investment analytics workspace for portfolio health, sector exposure, watchlists, and insights.</p>

  <p>
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white" alt="Chart.js" />
  </p>
</div>

## About

EquityFlow is a full-stack prototype for investment analytics. The product is
organized around a calm dashboard experience: Overview, Portfolio, Watchlist,
Insights, and Settings.

The redesign positions EquityFlow as its own analytics platform instead of a
broker-terminal clone. It keeps the existing React and Express structure while
introducing a new light visual identity, Portfolio Health Score, Sector Exposure
cards, tabbed Holdings and Positions, a dedicated Watchlist page, and an
Insights workspace.

## Features

- Portfolio Health Score on Overview and Insights
- Sector Exposure summary cards
- Portfolio page with Holdings and Positions tabs
- Dedicated Watchlist page with local watchlist search
- Insight cards for concentration, contributors, and review prompts
- Light, sober design system without dark mode, glassmorphism, or flashy gradients

## Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- CORS and dotenv

### Dashboard

- React 18
- React Router
- Material UI icons
- Chart.js and react-chartjs-2
- Axios

### Landing Site

- React 18
- React Router
- CSS-based responsive layout

## Project Structure

```text
EquityFlow/
├── backend/    # Express API serving holdings, positions, and orders
├── dashboard/  # React dashboard for analytics workflows
└── frontend/   # React landing site
```

## Getting Started

### Backend

```bash
cd backend
npm install
npm start
```

Create `backend/.env` with:

```env
PORT=3002
MONGO_URL=your_mongodb_connection_string_here
```

### Dashboard

```bash
cd dashboard
npm install
npm start
```

### Landing Site

```bash
cd frontend
npm install
npm start
```

## Notes

EquityFlow is a prototype. Demo data is illustrative and should not be treated
as financial advice.
