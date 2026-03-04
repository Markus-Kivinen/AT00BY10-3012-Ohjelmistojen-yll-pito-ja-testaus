/**
 * Express app setup with JSON parsing, request logging, and counter routes.
 * @module app
 */
import express from "express";
import { requestLogger } from "./middleware.js";
import counterRouter from "./routes.js";

const app = express();

app.use(express.json());
app.use(requestLogger);
app.use("/", counterRouter);

// Serve the HTML front page
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "./src" });
});

export default app;
