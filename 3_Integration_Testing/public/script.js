document
  .getElementById("rgbToHexForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const r = parseInt(document.getElementById("r").value);
    const g = parseInt(document.getElementById("g").value);
    const b = parseInt(document.getElementById("b").value);

    try {
      const response = await fetch("/api/toHex", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ r, g, b }),
      });

      const data = await response.json();
      const resultDiv = document.getElementById("hexResult");
      const previewDiv = document.getElementById("hexPreview");

      if (response.ok) {
        resultDiv.textContent = `Hex: ${data.hex}`;
        resultDiv.className = "result success";
        previewDiv.style.backgroundColor = data.hex;
        previewDiv.style.display = "block";
      } else {
        resultDiv.textContent = `Virhe: ${data.error}`;
        resultDiv.className = "result error";
        previewDiv.style.display = "none";
      }
      resultDiv.style.display = "block";
    } catch (error) {
      const resultDiv = document.getElementById("hexResult");
      resultDiv.textContent = `Virhe: ${error.message}`;
      resultDiv.className = "result error";
      resultDiv.style.display = "block";
    }
  });

document
  .getElementById("hexToRgbForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const hex = document.getElementById("hex").value;

    try {
      const response = await fetch("/api/toRGB", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hex }),
      });

      const data = await response.json();
      const resultDiv = document.getElementById("rgbResult");
      const previewDiv = document.getElementById("rgbPreview");

      if (response.ok) {
        resultDiv.textContent = `RGB: (${data.r}, ${data.g}, ${data.b})`;
        resultDiv.className = "result success";
        previewDiv.style.backgroundColor = `rgb(${data.r}, ${data.g}, ${data.b})`;
        previewDiv.style.display = "block";
      } else {
        resultDiv.textContent = `Virhe: ${data.error}`;
        resultDiv.className = "result error";
        previewDiv.style.display = "none";
      }
      resultDiv.style.display = "block";
    } catch (error) {
      const resultDiv = document.getElementById("rgbResult");
      resultDiv.textContent = `Virhe: ${error.message}`;
      resultDiv.className = "result error";
      resultDiv.style.display = "block";
    }
  });
