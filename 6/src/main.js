/**
 * Entry point — starts the server and handles graceful shutdown.
 * @module main
 */
import app from "./app.js";
import logger from "./logger.js";

logger.info("[MAIN] Starting");

// logger.log('info', 'This is an informational message.');
// logger.log('warn', 'This is a warning message.');
// logger.log('error', 'This is an error message.');

// logger.info('This is another informational message.');
// logger.warn('This is another warning message.');
// logger.error('This is another error message.');

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});

// Graceful shutdown
process.on("SIGINT", () => {
  logger.info("[MAIN] Stopping");
  server.close(() => process.exit(0));
});

process.on("SIGTERM", () => {
  logger.info("[MAIN] Stopping");
  server.close(() => process.exit(0));
});
