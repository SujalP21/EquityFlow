const express = require("express");

const { OrdersModel } = require("../model/OrdersModel");
const { authMiddleware } = require("../middleware/authMiddleware");
const { TradeValidationError, executeTrade } = require("../services/tradingEngine");

const orderRoutes = express.Router();

orderRoutes.post("/newOrder", authMiddleware, async (req, res) => {
  try {
    const result = await executeTrade(req.user.id, req.body);
    const statusCode = result.rejected ? 422 : 201;

    return res.status(statusCode).json({
      message: result.rejected ? "Order rejected" : "Order executed",
      order: result.order,
      holding: result.holding,
      position: result.position,
      summary: result.summary,
      rejectionReason: result.rejectionReason,
    });
  } catch (error) {
    if (error instanceof TradeValidationError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    console.error("Order execution failed:", error);
    return res.status(500).json({ message: "Order execution failed." });
  }
});

orderRoutes.get("/orders", authMiddleware, async (req, res) => {
  try {
    const orders = await OrdersModel.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    return res.json(orders);
  } catch (error) {
    console.error("Orders fetch failed:", error);
    return res.status(500).json({ message: "Unable to fetch orders." });
  }
});

module.exports = { orderRoutes };
