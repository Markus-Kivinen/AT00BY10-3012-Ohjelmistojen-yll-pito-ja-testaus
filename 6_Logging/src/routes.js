/**
 * Counter API routes — increase, read, and reset.
 * All endpoints return { count: number }.
 * @module routes
 */
import express from "express";
import counter from "./counter.js";

const router = express.Router();

router.get("/counter-increase", (req, res) => {
  const count = counter.increase();
  res.json({ count });
});

router.get("/counter-read", (req, res) => {
  const count = counter.read();
  res.json({ count });
});

router.get("/counter-reset", (req, res) => {
  const count = counter.reset();
  res.json({ count });
});

export default router;
