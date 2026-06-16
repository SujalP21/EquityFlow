const express = require("express");

const { authMiddleware } = require("../middleware/authMiddleware");
const {
  calculateOverview,
  calculateSectorExposure,
  calculateAllocation,
  calculatePortfolioPerformance,
  calculateTopMovers,
} = require("../services/analyticsService");

const analyticsRoutes = express.Router();

const handleAnalyticsError = (res, error) => {
  console.error("Analytics request failed:", error);
  return res.status(500).json({ message: "Unable to calculate analytics." });
};

analyticsRoutes.get("/analytics/overview", authMiddleware, async (req, res) => {
  try {
    return res.json(await calculateOverview(req.user.id));
  } catch (error) {
    return handleAnalyticsError(res, error);
  }
});

analyticsRoutes.get(
  "/analytics/sector-exposure",
  authMiddleware,
  async (req, res) => {
    try {
      return res.json(await calculateSectorExposure(req.user.id));
    } catch (error) {
      return handleAnalyticsError(res, error);
    }
  }
);

analyticsRoutes.get("/analytics/allocation", authMiddleware, async (req, res) => {
  try {
    return res.json(await calculateAllocation(req.user.id));
  } catch (error) {
    return handleAnalyticsError(res, error);
  }
});

analyticsRoutes.get("/analytics/top-movers", authMiddleware, async (req, res) => {
  try {
    return res.json(await calculateTopMovers(req.user.id));
  } catch (error) {
    return handleAnalyticsError(res, error);
  }
});

analyticsRoutes.get(
  "/analytics/portfolio-performance",
  authMiddleware,
  async (req, res) => {
    try {
      return res.json(
        await calculatePortfolioPerformance(req.user.id, req.query.range)
      );
    } catch (error) {
      return handleAnalyticsError(res, error);
    }
  }
);

module.exports = { analyticsRoutes };
