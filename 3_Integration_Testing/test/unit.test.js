import { describe, test } from "node:test";
import assert from "assert";
import { rgbToHex, hexToRgb } from "../utils/hex.js";

describe("Yksikkötestit", () => {
    describe("rgbToHex", () => {
        test("Muuntaa RGB-arvot heksadesimaaliksi", () => {
            const result = rgbToHex(255, 99, 71);
            assert.strictEqual(result, "#ff6347");
        });

        test("Heittää virheen negatiivisella arvolla", () => {
            assert.throws(
                () => rgbToHex(255, -5, 255),
                { message: "RGB-arvojen tulee olla välillä 0-255" }
            );
        });

        test("Heittää virheen liian suurella arvolla", () => {
            assert.throws(
                () => rgbToHex(255, 256, 255),
                { message: "RGB-arvojen tulee olla välillä 0-255" }
            );
        });

        test("Heittää virheen puuttuvalla arvolla", () => {
            assert.throws(
                () => rgbToHex(255, undefined, 255),
                { message: "RGB-arvojen tulee olla välillä 0-255" }
            );
        });

        test("Heittää virheen ei-numeerisella arvolla", () => {
            assert.throws(
                () => rgbToHex(255, "g", 255),
                { message: "RGB-arvojen tulee olla välillä 0-255" }
            );
        });
    });

    describe("hexToRgb", () => {
        test("Muuntaa #heksadesimaalin RGB-arvoiksi", () => {
            const result = hexToRgb("#FF6347");
            assert.deepStrictEqual(result, { r: 255, g: 99, b: 71 });
        });

        test("Muuntaa heksadesimaalin RGB-arvoiksi", () => {
            const result = hexToRgb("FF6347");
            assert.deepStrictEqual(result, { r: 255, g: 99, b: 71 });
        });

        test("Muuntaa pienet kirjaimet oikein", () => {
            const result = hexToRgb("#ff6347");
            assert.deepStrictEqual(result, { r: 255, g: 99, b: 71 });
        });

        test("Heittää virheen virheellisellä merkillä", () => {
            assert.throws(
                () => hexToRgb("ZZZZZZ"),
                { message: "Virheellinen HEX-värikoodi" }
            );
        });

        test("Heittää virheen liian pitkällä arvolla", () => {
            assert.throws(
                () => hexToRgb("#FFFFFFF"),
                { message: "Virheellinen HEX-värikoodi" }
            );
        });

        test("Heittää virheen liian lyhyellä arvolla", () => {
            assert.throws(
                () => hexToRgb("#FF"),
                { message: "Virheellinen HEX-värikoodi" }
            );
        });

        test("Toimii lyhennetyllä muodolla", () => {
            const result = hexToRgb("#FFF");
            assert.deepStrictEqual(result, { r: 255, g: 255, b: 255 });
        });
    });

});