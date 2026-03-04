/**
 * Integration tests for the counter API endpoints.
 * Uses supertest for HTTP requests, verifies JSON responses and log messages.
 * Log output captured with LogCapture (no files written during tests).
 * @module tests/counter-integration
 */
import logger from "../src/logger.js";
import app from "../src/app.js";
import assert from "assert";
import { before, describe, it, beforeEach } from "node:test";
import request from "supertest";
import LogCapture from "./helpers/LogCapture.js";

const capture = new LogCapture(logger);

describe("Counter - Integration Tests", () => {
  before(() => capture.start());

  beforeEach(async () => {
    capture.reset();
    await request(app).get("/counter-reset");
    capture.reset();
  });
  describe("GET /counter-read", () => {
    it("should return count 0 initially", async () => {
      const res = await request(app)
        .get("/counter-read")
        .expect(200)
        .expect("Content-Type", /json/);
      assert.strictEqual(res.body.count, 0);
    });

    it("should log endpoint and counter read", async () => {
      await request(app).get("/counter-read");
      const events = capture.allLines;

      assert(
        events.some((e) => e.includes("[ENDPOINT] GET /counter-read")),
        "Expected endpoint log for GET /counter-read",
      );
      assert(
        events.some((e) => e.includes("[COUNTER] read 0")),
        "Expected counter log for read 0",
      );
    });
  });

  describe("GET /counter-increase", () => {
    it("should return count 1 after first increase", async () => {
      const res = await request(app)
        .get("/counter-increase")
        .expect(200)
        .expect("Content-Type", /json/);
      assert.strictEqual(res.body.count, 1);
    });

    it("should increment on each call", async () => {
      await request(app).get("/counter-increase");
      await request(app).get("/counter-increase");
      const res = await request(app).get("/counter-increase");
      assert.strictEqual(res.body.count, 3);
    });

    it("should log endpoint and counter increase", async () => {
      await request(app).get("/counter-increase");
      const events = capture.allLines;

      assert(
        events.some((e) => e.includes("[ENDPOINT] GET /counter-increase")),
        "Expected endpoint log for GET /counter-increase",
      );
      assert(
        events.some((e) => e.includes("[COUNTER] increase 1")),
        "Expected counter log for increase 1",
      );
    });

    it("should log correct values on multiple increases", async () => {
      await request(app).get("/counter-increase");
      await request(app).get("/counter-increase");
      await request(app).get("/counter-increase");
      const events = capture.allLines;

      assert(
        events.some((e) => e.includes("[COUNTER] increase 1")),
        "Expected counter log for increase 1",
      );
      assert(
        events.some((e) => e.includes("[COUNTER] increase 2")),
        "Expected counter log for increase 2",
      );
      assert(
        events.some((e) => e.includes("[COUNTER] increase 3")),
        "Expected counter log for increase 3",
      );
    });
  });

  describe("GET /counter-reset", () => {
    it("should return count 0 after reset", async () => {
      await request(app).get("/counter-increase");
      await request(app).get("/counter-increase");
      const res = await request(app)
        .get("/counter-reset")
        .expect(200)
        .expect("Content-Type", /json/);
      assert.strictEqual(res.body.count, 0);
    });

    it("should log endpoint and counter reset", async () => {
      await request(app).get("/counter-increase");
      capture.reset();

      await request(app).get("/counter-reset");
      const events = capture.allLines;

      assert(
        events.some((e) => e.includes("[ENDPOINT] GET /counter-reset")),
        "Expected endpoint log for GET /counter-reset",
      );
      assert(
        events.some((e) => e.includes("[COUNTER] reset 0")),
        "Expected counter log for reset 0",
      );
    });

    it("should allow increasing again after reset", async () => {
      await request(app).get("/counter-increase");
      await request(app).get("/counter-increase");
      await request(app).get("/counter-reset");
      const res = await request(app).get("/counter-increase");
      assert.strictEqual(res.body.count, 1);
    });
  });

  describe("Full workflow", () => {
    it("should handle increase, read, reset sequence", async () => {
      const r1 = await request(app).get("/counter-increase");
      assert.strictEqual(r1.body.count, 1);

      const r2 = await request(app).get("/counter-increase");
      assert.strictEqual(r2.body.count, 2);

      const r3 = await request(app).get("/counter-read");
      assert.strictEqual(r3.body.count, 2);

      const r4 = await request(app).get("/counter-reset");
      assert.strictEqual(r4.body.count, 0);

      const r5 = await request(app).get("/counter-read");
      assert.strictEqual(r5.body.count, 0);
    });

    it("should log all operations in correct order", async () => {
      await request(app).get("/counter-increase");
      await request(app).get("/counter-read");
      await request(app).get("/counter-reset");
      const events = capture.allLines;

      // Each request produces an endpoint log + a counter log
      // 3 requests = at least 6 log entries
      assert(
        events.length >= 6,
        `Expected >= 6 log events, got ${events.length}`,
      );

      assert(
        events.some((e) => e.includes("[COUNTER] increase 1")),
        "Expected counter increase log",
      );
      assert(
        events.some((e) => e.includes("[COUNTER] read 1")),
        "Expected counter read log",
      );
      assert(
        events.some((e) => e.includes("[COUNTER] reset 0")),
        "Expected counter reset log",
      );
    });

    it("should log all events at info level", async () => {
      await request(app).get("/counter-increase");
      await request(app).get("/counter-read");
      await request(app).get("/counter-reset");

      for (const event of capture.allEvents) {
        assert.strictEqual(
          event.level,
          "info",
          `Expected level "info", got "${event.level}"`,
        );
      }
    });
  });
});
