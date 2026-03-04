/**
 * Tests for the Winston logger module.
 * Verifies message routing to correct transports and logger configuration.
 * Log output captured with LogCapture (no files written during tests).
 * @module tests/logger
 */
import logger from "../src/logger.js";
import assert from "assert";
import { before, describe, it, beforeEach } from "node:test";
import { transports } from "winston";
import LogCapture from "./helpers/LogCapture.js";

const capture = new LogCapture(logger);

describe("Logger", () => {
  before(() => capture.start());
  beforeEach(() => capture.reset());

  it("should log info message to the combined log", () => {
    logger.info("test message");

    assert(capture.allLines[0].includes("test message"));
    assert.strictEqual(capture.allLines.length, 1);
    assert.strictEqual(capture.errorLines.length, 0);
  });

  it("should log error message to the combined/error log", () => {
    logger.error("test error message");

    assert(capture.errorLines[0].includes("test error message"));
    assert.strictEqual(capture.errorLines.length, 1);

    // Error should also appear in combined log
    assert(capture.allLines[0].includes("test error message"));
    assert.strictEqual(capture.allLines.length, 1);
  });

  it("should log multiple messages correctly", () => {
    logger.info("first message");
    logger.error("second message");

    assert(capture.allLines[0].includes("first message"));
    assert(capture.allLines[1].includes("second message"));
    assert.strictEqual(capture.allLines.length, 2);

    // Only the error should be in the error log
    assert(capture.errorLines[0].includes("second message"));
    assert.strictEqual(capture.errorLines.length, 1);
  });

  it("should contain all necessary transports and functions", () => {
    assert(logger.level === "info", "Logger should have level 'info'");

    assert(
      logger.transports.some(
        (t) =>
          t.name === "console" &&
          t.level === undefined &&
          t instanceof transports.Console,
      ),
      "Logger should have a console transport with undefined level",
    );

    assert(
      logger.transports.some(
        (t) =>
          t.name === "error" &&
          t.level === "error" &&
          t instanceof transports.File,
      ),
      "Logger should have an error file transport with level 'error'",
    );

    assert(
      logger.transports.some(
        (t) =>
          t.name === "combined" &&
          t.level === undefined &&
          t instanceof transports.File,
      ),
      "Logger should have a combined file transport with undefined level",
    );

    for (const method of ["info", "warn", "error"]) {
      assert(
        typeof logger[method] === "function",
        `Logger method ${method} is missing`,
      );
    }
  });
});
