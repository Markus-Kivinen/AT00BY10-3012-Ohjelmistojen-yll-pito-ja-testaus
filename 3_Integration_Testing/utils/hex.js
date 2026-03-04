/**
 * Muuntaa RGB-väriarvot heksadesimaalimuotoon.
 * @param {number} r - Punainen arvo (0-255)
 * @param {number} g - Vihreä arvo (0-255)
 * @param {number} b - Sininen arvo (0-255)
 * @returns {string} Heksadesimaalimuotoinen värikoodi (esim. "#ff5733")
 */
function rgbToHex(r, g, b) {
  if (
    typeof r !== 'number' || r < 0 || r > 255 || isNaN(r) ||
    typeof g !== 'number' || g < 0 || g > 255 || isNaN(g) ||
    typeof b !== 'number' || b < 0 || b > 255 || isNaN(b)
  ) {
    throw new Error('RGB-arvojen tulee olla välillä 0-255');
  }
    const toHex = (c) => {
        const hex = c.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Muuntaa heksadesimaalimuotoisen värikoodin RGB-arvoiksi.
 * @param {string} hex - Heksadesimaalimuotoinen värikoodi ('#' etuliitteellä tai ilman)
 * @returns {{r: number, g: number, b: number}} Objekti, joka sisältää RGB-arvot
 * @throws {Error} Jos heksadesimaaliväri on virheellinen
 */
function hexToRgb(hex) {
    if (hex.startsWith('#')) {
        hex = hex.slice(1);
    }
    // lyhennetyt muodot, esim. #FFF
    if (hex.length === 3) {
        hex = hex.split('').map(char => char + char).join('');
    }
    if (hex.length !== 6) {
        throw new Error('Virheellinen HEX-värikoodi');
    }
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    if (isNaN(r) || isNaN(g) || isNaN(b)) {
        throw new Error('Virheellinen HEX-värikoodi');
    }
    return { r, g, b };
}

export { rgbToHex, hexToRgb };