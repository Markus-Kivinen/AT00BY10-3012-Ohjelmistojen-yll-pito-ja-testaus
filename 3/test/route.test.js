import request from "supertest";
import { describe, test } from "node:test";
import assert from "assert";
import app from "../app.js";


describe("Käyttöliittymä", () => {
    test("Palauttaa index.html sivun", async () => {
        const response = await request(app)
            .get("/")
            .expect(200)
            .expect("Content-Type", /html/);
        assert.ok(response.text.includes("<title>Hex ⇄ RGB Muunnin</title>"));
    });

    test("Palauttaa style.css tiedoston", async () => {
        await request(app)
            .get("/style.css")
            .expect(200)
            .expect("Content-Type", /css/);
    });

    test("Palauttaa script.js tiedoston", async () => {
        await request(app)
            .get("/script.js")
            .expect(200)
            .expect("Content-Type", /javascript/);
    });

    test("Näyttää muunnin lomakkeen", async () => {
        const response = await request(app)
            .get("/")
            .expect(200)
            .expect("Content-Type", /html/);
        assert.ok(response.text.includes('id="rgbToHexForm"'));
        assert.ok(response.text.includes('id="hexToRgbForm"'));
    });

});

describe("Integraatio testit", () => {
    describe("rgbToHex", () => {
        test("Muuntaa numeraalisen{r, g ,b} heksadesimaaliksi", async () => {
            const payload = { r: 255, g: 99, b: 71 };
            const response = await request(app)
                .post("/api/toHex").send(payload)
                .expect(200);
            assert.strictEqual(response.body.hex, "#ff6347");
        });

        test("Muuntaa tekstimuotoisen{r, g ,b} heksadesimaaliksi", async () => {
            const payload = { r: "255", g: "99", b: "71" };
            const response = await request(app)
                .post("/api/toHex").send(payload)
                .expect(200);
            assert.strictEqual(response.body.hex, "#ff6347");
        });

        test("Muuntaa numeraalisen[] heksadesimaaliksi", async () => {
            const payload = [255, 99, 71];
            const response = await request(app)
                .post("/api/toHex").send(payload)
                .expect(200);
            assert.strictEqual(response.body.hex, "#ff6347");
        });

        test("Muuntaa tekstimuotoisen[] heksadesimaaliksi", async () => {
            const payload = ["255", "99", "71"];
            const response = await request(app)
                .post("/api/toHex").send(payload)
                .expect(200);
            assert.strictEqual(response.body.hex, "#ff6347");
        });

        test("Muuntaa desimaaliluku []:n heksadesimaaliksi", async () => {
            const payload = [255099071];
            const response = await request(app)
                .post("/api/toHex").send(payload)
                .expect(200);
            assert.strictEqual(response.body.hex, "#ff6347");
        });

        test("Muuntaa tekstimuotoisen desimaaliluku []:n heksadesimaaliksi", async () => {
            const payload = ["255099071"];
            const response = await request(app)
                .post("/api/toHex").send(payload)
                .expect(200);
            assert.strictEqual(response.body.hex, "#ff6347");
        });

        test("Muuntaa numeraalisen{rgb:[]} heksadesimaaliksi", async () => {
            const payload = { rgb: [255, 99, 71] };
            const response = await request(app)
                .post("/api/toHex").send(payload)
                .expect(200);
            assert.strictEqual(response.body.hex, "#ff6347");
        });

        test("Muuntaa tekstimuotoisen{rgb:[]} heksadesimaaliksi", async () => {
            const payload = { rgb: ["255", "99", "71"] };
            const response = await request(app)
                .post("/api/toHex").send(payload)
                .expect(200);
            assert.strictEqual(response.body.hex, "#ff6347");
        });

        test("Muuntaa tekstimuotoisen{rgb:} heksadesimaaliksi", async () => {
            const payload = { rgb: "255099071" };
            const response = await request(app)
                .post("/api/toHex").send(payload)
                .expect(200);
            assert.strictEqual(response.body.hex, "#ff6347");
        });

        test("Muuntaa numeraalisen{rgb:} heksadesimaaliksi", async () => {
            const payload = { rgb: 255099071 };
            const response = await request(app)
                .post("/api/toHex").send(payload)
                .expect(200);
            assert.strictEqual(response.body.hex, "#ff6347");
        });

        test("Muuntaa pilkuilla erotellun tekstimuotoisen{rgb:} heksadesimaaliksi", async () => {
            const payload = { rgb: "255,99,71" };
            const response = await request(app)
                .post("/api/toHex").send(payload)
                .expect(200);
            assert.strictEqual(response.body.hex, "#ff6347");
        });

        test("Heittää virheen negatiivisella arvolla", async () => {
            const payload = { r: 255, g: -5, b: 255 };
            const response = await request(app)
                .post("/api/toHex").send(payload)
                .expect(400);
            assert.strictEqual(response.body.error, 'RGB-arvojen tulee olla välillä 0-255');
        });

        test("Heittää virheen liian suurella arvolla", async () => {
            const payload = { r: 255, g: 256, b: 255 };
            const response = await request(app)
                .post("/api/toHex").send(payload)
                .expect(400);
            assert.strictEqual(response.body.error, 'RGB-arvojen tulee olla välillä 0-255');
        });

        test("Heittää virheen puuttuvalla arvolla", async () => {
            const payload = { r: 255, b: 255 };
            const response = await request(app)
                .post("/api/toHex").send(payload)
                .expect(400);
            assert.strictEqual(response.body.error, 'RGB-arvojen tulee olla välillä 0-255');
        });

        test("Heittää virheen ei-numeerisella arvolla", async () => {
            const payload = { r: 255, g:"g", b: 255 };
            const response = await request(app)
                .post("/api/toHex").send(payload)
                .expect(400);
            assert.strictEqual(response.body.error, 'RGB-arvojen tulee olla välillä 0-255');
        });
    });


    describe("hexToRgb", () => {
        test("Muuntaa #heksadesimaalin RGB-arvoiksi", async () => {
            const payload = { hex: "#FF6347" };
            const response = await request(app)
                .post("/api/toRGB").send(payload)
                .expect(200);
            assert.deepStrictEqual(response.body, { r: 255, g: 99, b: 71 });
        });

        test("Muuntaa heksadesimaalin RGB-arvoiksi", async () => {
            const payload = { hex: "FF6347" };
            const response = await request(app)
                .post("/api/toRGB").send(payload)
                .expect(200);
            assert.deepStrictEqual(response.body, { r: 255, g: 99, b: 71 });
        });


        test("Muuntaa pienet kirjaimet oikein", async () => {
            const payload = { hex: "#ff6347" };
            const response = await request(app)
                .post("/api/toRGB").send(payload)
                .expect(200);
            assert.deepStrictEqual(response.body, { r: 255, g: 99, b: 71 });
        });

        test("Heittää virheen virheellisellä merkillä", async () => {
            const payload = { hex: "GHI" };
            const response = await request(app)
                .post("/api/toRGB").send(payload)
                .expect(400);
            assert.strictEqual(response.body.error, "Virheellinen HEX-värikoodi");
        });

        test("Heittää virheen liian pitkällä arvolla", async () => {
            const payload = { hex: "#FFFFFFF" };
            const response = await request(app)
                .post("/api/toRGB").send(payload)
                .expect(400);
            assert.strictEqual(response.body.error, "Virheellinen HEX-värikoodi");
        });

        test("Heittää virheen liian lyhyellä arvolla", async () => {
            const payload = { hex: "#FF" };
            const response = await request(app)
                .post("/api/toRGB").send(payload)
                .expect(400);
            assert.strictEqual(response.body.error, "Virheellinen HEX-värikoodi");
        });

        test("Toimii lyhennetyllä muodolla", async () => {
            const payload = { hex: "#FFF" };
            const response = await request(app)
                .post("/api/toRGB").send(payload)
                .expect(200);
            assert.deepStrictEqual(response.body, { r: 255, g: 255, b: 255 });
        });

        test("Toimii #taulukolla", async () => {
            const payload = ["#FF6347"];
            const response = await request(app)
                .post("/api/toRGB").send(payload)
                .expect(200);
            assert.deepStrictEqual(response.body, { r: 255, g: 99, b: 71 });
        });

        test("Toimii taulukolla", async () => {
            const payload = ["FF6347"];
            const response = await request(app)
                .post("/api/toRGB").send(payload)
                .expect(200);
            assert.deepStrictEqual(response.body, { r: 255, g: 99, b: 71 });
        });

        test("Toimii taulukolla lyhennetyssä muodossa", async () => {
            const payload = ["#FFF"];
            const response = await request(app)
                .post("/api/toRGB").send(payload)
                .expect(200);
            assert.deepStrictEqual(response.body, { r: 255, g: 255, b: 255 });
        });
    });
});