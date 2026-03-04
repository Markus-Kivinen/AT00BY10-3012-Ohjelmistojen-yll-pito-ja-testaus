/**
 * Captures Winston logger output during tests by silencing default transports
 * and redirecting to in-memory streams (all-level and error-only).
 *
 * @see https://github.com/winstonjs/winston/issues/809#issuecomment-598966499
 * @module tests/helpers/LogCapture
 * @example
 * const capture = new LogCapture(logger);
 * before(() => capture.start());
 * beforeEach(() => capture.reset());
 *
 * logger.info("hello");
 * capture.allEvents;   // parsed JSON objects
 * capture.errorEvents; // error-level only
 */
import { Writable } from "stream";
import { transports } from "winston";

class LogCapture {
  /** @type {import('winston').Logger} The logger instance being captured. */
  #logger;

  /** @type {string} Raw output buffer for all log events. */
  #allOutput = "";

  /** @type {string} Raw output buffer for error-level log events. */
  #errorOutput = "";

  /**
   * Creates a new LogCapture instance for the given logger.
   * @param {import('winston').Logger} logger - The Winston logger to capture.
   */
  constructor(logger) {
    this.#logger = logger;
  }

  /**
   * Silences default transports and attaches in-memory capture streams.
   * Call once in a `before()` hook.
   */
  start() {
    // Silence the default transports (console, file)
    this.#logger.transports.forEach((t) => (t.silent = true));

    // Transport that captures all events (info+)
    const allStream = new Writable();
    allStream._write = (chunk, encoding, next) => {
      this.#allOutput += chunk.toString();
      next();
    };
    this.#logger.add(
      new transports.Stream({ stream: allStream, level: "info" }),
    );

    // Transport that captures error-level events only
    const errorStream = new Writable();
    errorStream._write = (chunk, encoding, next) => {
      this.#errorOutput += chunk.toString();
      next();
    };
    this.#logger.add(
      new transports.Stream({ stream: errorStream, level: "error" }),
    );
  }

  /**
   * Clears both output buffers. Call this in a `beforeEach()` hook.
   */
  reset() {
    this.#allOutput = "";
    this.#errorOutput = "";
  }

  /**
   * Returns all captured log lines as an array of raw strings.
   * @returns {string[]} Non-empty log lines from the all-level buffer.
   */
  get allLines() {
    return this.#allOutput.trim().split("\n").filter(Boolean);
  }

  /**
   * Returns error-level captured log lines as an array of raw strings.
   * @returns {string[]} Non-empty log lines from the error-level buffer.
   */
  get errorLines() {
    return this.#errorOutput.trim().split("\n").filter(Boolean);
  }

  /**
   * Returns all captured log entries parsed as JSON objects.
   * @returns {object[]} Parsed log entries from the all-level buffer.
   */
  get allEvents() {
    return this.allLines.map((line) => JSON.parse(line));
  }

  /**
   * Returns error-level captured log entries parsed as JSON objects.
   * @returns {object[]} Parsed log entries from the error-level buffer.
   */
  get errorEvents() {
    return this.errorLines.map((line) => JSON.parse(line));
  }
}

export default LogCapture;
