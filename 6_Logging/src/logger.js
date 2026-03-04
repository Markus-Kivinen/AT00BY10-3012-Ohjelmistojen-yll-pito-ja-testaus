/**
 * Winston logger with console, error file, and combined file transports.
 * Format: JSON with timestamps.
 * @module logger
 */
import { createLogger, transports, format } from "winston";

const logger = createLogger({
  level: "info",
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    // names are added to transports for easier identification in tests
    new transports.Console({ name: "console" }),
    new transports.File({
      name: "error",
      filename: "logs/error.log",
      level: "error",
    }),
    new transports.File({ name: "combined", filename: "logs/combined.log" }),
  ],
});

export default logger;
