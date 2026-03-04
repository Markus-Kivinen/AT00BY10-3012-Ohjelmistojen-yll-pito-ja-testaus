/**
 * Request-logging middleware.
 * @module middleware
 */
import logger from "./logger.js";

/**
 * Logs every incoming request (method + URL) at info level.
 * @param {import('express').Request} req
 * @param {import('express').Response} _res
 * @param {import('express').NextFunction} next
 */
export const requestLogger = (req, _res, next) => {
  logger.info(`[ENDPOINT] ${req.method} ${req.url}`);
  next();
};
