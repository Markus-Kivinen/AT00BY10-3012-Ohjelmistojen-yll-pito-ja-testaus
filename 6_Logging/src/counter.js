/**
 * Counter module — increase, read, and reset, each logged via Winston.
 * @module counter
 */
import logger from "./logger.js";

let count = 0;

/**
 * Increases the counter by one and logs the new value.
 * @returns {number} New count.
 */
export const increase = () => {
  count++;
  logger.info(`[COUNTER] increase ${count}`);
  return count;
};

/**
 * Returns the current counter value and logs it.
 * @returns {number} Current count.
 */
export const read = () => {
  logger.info(`[COUNTER] read ${count}`);
  return count;
};

/**
 * Resets the counter to zero and logs it.
 * @returns {number} Always 0.
 */
export const reset = () => {
  count = 0;
  logger.info(`[COUNTER] reset ${count}`);
  return count;
};

export default {
  increase,
  read,
  reset,
};
