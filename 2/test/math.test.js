import { assert } from "chai";
import { describe, it, before, after } from "mocha";
import * as math from "../math.js";

before(function () {
  console.log("Aloitetaan testit...");
});

after(function () {
  console.log("Testit suoritettu.");
});

describe("Aritmetiikka testit", function () {
  describe("add funktio", function () {
    it("Tulisi palauttaa 5 kun kutsutaan add(2, 3)", function () {
      assert.equal(math.add(2, 3), 5);
    });

    it("Tulisi heittää virhe kun kutsutaan add(2, '3')", function () {
      assert.throws(
        () => math.add(2, "3"),
        Error,
        "Molempien parametrien tulee olla numeroita."
      );
    });
  });

  describe("subtract funktio", function () {
    it("Tulisi palauttaa 1 kun kutsutaan subtract(3, 2)", function () {
      assert.equal(math.subtract(3, 2), 1);
    });

    it("Tulisi heittää virhe kun kutsutaan subtract('3', 2)", function () {
      assert.throws(
        () => math.subtract("3", 2),
        Error,
        "Molempien parametrien tulee olla numeroita."
      );
    });
  });

  describe("multiply funktio", function () {
    it("Tulisi palauttaa 6 kun kutsutaan multiply(2, 3)", function () {
      assert.equal(math.multiply(2, 3), 6);
    });

    it("Tulisi heittää virhe kun kutsutaan multiply(2, '3')", function () {
      assert.throws(
        () => math.multiply(2, "3"),
        Error,
        "Molempien parametrien tulee olla numeroita."
      );
    });
  });

  describe("divide funktio", function () {
    it("Tulisi palauttaa 2 kun kutsutaan divide(6, 3)", function () {
      assert.equal(math.divide(6, 3), 2);
    });

    it("Tulisi heittää virhe kun kutsutaan divide(6, 0)", function () {
      assert.throws(
        () => math.divide(6, 0),
        Error,
        "Nollalla jakaminen ei ole sallittua."
      );
    });

    it("Tulisi heittää virhe kun kutsutaan divide('6', 3)", function () {
      assert.throws(
        () => math.divide("6", 3),
        Error,
        "Molempien parametrien tulee olla numeroita."
      );
    });
  });

  describe("isEven funktio", function () {
    it("Tulisi palauttaa true kun kutsutaan isEven(4)", function () {
      assert.equal(math.isEven(4), true);
    });

    it("Tulisi palauttaa true kun kutsutaan isEven(-4)", function () {
      assert.equal(math.isEven(-4), true);
    });

    it("Tulisi palauttaa false kun kutsutaan isEven(5)", function () {
      assert.equal(math.isEven(5), false);
    });
  });

  describe("isOdd funktio", function () {
    it("Tulisi palauttaa true kun kutsutaan isOdd(5)", function () {
      assert.equal(math.isOdd(5), true);
    });

    it("Tulisi palauttaa true kun kutsutaan isOdd(-5)", function () {
      assert.equal(math.isOdd(-5), true);
    });

    it("Tulisi palauttaa false kun kutsutaan isOdd(4)", function () {
      assert.equal(math.isOdd(4), false);
    });
  });
});
