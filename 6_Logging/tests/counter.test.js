/**
 * Unit tests for the counter module.
 * Verifies return values and [COUNTER] log messages for each operation.
 * Log output captured with LogCapture (no files written during tests).
 * @module tests/counter
 */
import logger from "../src/logger.js";
import counter from "../src/counter.js";
import assert from "assert";
import { before, describe, it, beforeEach } from "node:test";
import LogCapture from "./helpers/LogCapture.js";

const capture = new LogCapture(logger);

describe("Counter - Unit Tests", () => {
  before(() => capture.start());

  beforeEach(() => {
    capture.reset();
    counter.reset();
    capture.reset();
  });
  describe("increase", () => {
    it("should return 1 after first increase", () => {
      const result = counter.increase();
      assert.strictEqual(result, 1);
    });

    it("should increment correctly on multiple calls", () => {
      counter.increase();
      counter.increase();
      const result = counter.increase();
      assert.strictEqual(result, 3);
    });

    it("should log correct text on increase", () => {
      counter.increase();
      const events = capture.allLines;

      assert.strictEqual(events.length, 1);
      assert(
        events[0].includes("[COUNTER] increase 1"),
        `Expected log to contain "[COUNTER] increase 1", got: ${events[0]}`,
      );
    });

    it("should log incrementing values on multiple increases", () => {
      counter.increase();
      counter.increase();
      counter.increase();
      const events = capture.allLines;

      assert.strictEqual(events.length, 3);
      assert(events[0].includes("[COUNTER] increase 1"));
      assert(events[1].includes("[COUNTER] increase 2"));
      assert(events[2].includes("[COUNTER] increase 3"));
    });
  });

  describe("read", () => {
    it("should return 0 when counter has not been increased", () => {
      const result = counter.read();
      assert.strictEqual(result, 0);
    });

    it("should return current value after increases", () => {
      counter.increase();
      counter.increase();
      const result = counter.read();
      assert.strictEqual(result, 2);
    });

    it("should not modify the counter value", () => {
      counter.increase();
      counter.read();
      counter.read();
      const result = counter.read();
      assert.strictEqual(result, 1);
    });

    it("should log correct text on read", () => {
      counter.increase();
      capture.reset(); // isolate the read log

      counter.read();
      const events = capture.allLines;

      assert.strictEqual(events.length, 1);
      assert(
        events[0].includes("[COUNTER] read 1"),
        `Expected log to contain "[COUNTER] read 1", got: ${events[0]}`,
      );
    });

    it("should log 0 when reading initial value", () => {
      counter.read();
      const events = capture.allLines;

      assert.strictEqual(events.length, 1);
      assert(
        events[0].includes("[COUNTER] read 0"),
        `Expected log to contain "[COUNTER] read 0", got: ${events[0]}`,
      );
    });
  });

  describe("reset", () => {
    it("should return 0", () => {
      counter.increase();
      counter.increase();
      const result = counter.reset();
      assert.strictEqual(result, 0);
    });

    it("should reset counter to 0 after increases", () => {
      counter.increase();
      counter.increase();
      counter.increase();
      counter.reset();
      const result = counter.read();
      assert.strictEqual(result, 0);
    });

    it("should log correct text on reset", () => {
      counter.increase();
      capture.reset();

      counter.reset();
      const events = capture.allLines;

      assert.strictEqual(events.length, 1);
      assert(
        events[0].includes("[COUNTER] reset 0"),
        `Expected log to contain "[COUNTER] reset 0", got: ${events[0]}`,
      );
    });

    it("should allow increasing again after reset", () => {
      counter.increase();
      counter.increase();
      counter.reset();
      const result = counter.increase();
      assert.strictEqual(result, 1);
    });
  });

  describe("combined operations logging", () => {
    it("should log all operations in correct order", () => {
      counter.increase();
      counter.increase();
      counter.read();
      counter.reset();
      const events = capture.allLines;

      assert.strictEqual(events.length, 4);
      assert(events[0].includes("[COUNTER] increase 1"));
      assert(events[1].includes("[COUNTER] increase 2"));
      assert(events[2].includes("[COUNTER] read 2"));
      assert(events[3].includes("[COUNTER] reset 0"));
    });

    it("should log info level for all counter operations", () => {
      counter.increase();
      counter.read();
      counter.reset();

      for (const event of capture.allEvents) {
        assert.strictEqual(
          event.level,
          "info",
          `Expected level "info", got "${event.level}"`,
        );
      }
    });

    it("should include timestamp in all log entries", () => {
      counter.increase();
      counter.read();
      counter.reset();

      for (const event of capture.allEvents) {
        assert(
          event.timestamp,
          "Expected log entry to have a timestamp",
        );
      }
    });
  });
});
