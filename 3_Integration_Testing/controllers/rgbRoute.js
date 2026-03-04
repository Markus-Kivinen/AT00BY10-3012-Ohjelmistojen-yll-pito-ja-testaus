import { rgbToHex, hexToRgb } from '../utils/hex.js';
import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  res.json({ message: 'RGB API - käytä /toHex tai /toRGB endpointteja' })
})

router.post('/toHex', (req, res) => {
  let { rgb, r, g, b } = req.body

  // Jos body on array muunnos hoidetaan rgb iffissä
  if (Array.isArray(req.body))
  {
    if (req.body.length === 1) {
      rgb = req.body[0];
    } else {
      [r, g, b] = req.body;
    }
  }
  // Muunna rgb arvo eri muodoista r, g, b arvoiksi
  if (rgb) {
    // {rgb: [255, 99, 71]}
    if (Array.isArray(rgb)) {
      r = rgb[0];
      g = rgb[1];
      b = rgb[2];
    } 
    // {rgb: "255,99,71"} - comma separated string
    else if (typeof rgb === 'string' && rgb.includes(',')) {
      const parts = rgb.split(',').map(val => parseInt(val.trim()));
      r = parts[0];
      g = parts[1];
      b = parts[2];
    }
    // {rgb: "255099071"} tai {rgb: 255099071}
    else if (typeof rgb === 'number' || typeof rgb === 'string') {
      const rgbStr = String(rgb).padStart(9, '0');
      r = parseInt(rgbStr.slice(0, 3));
      g = parseInt(rgbStr.slice(3, 6));
      b = parseInt(rgbStr.slice(6, 9));
    }
  }
  // Muunna r, g, b string arvoista numeroiksi
  r = parseInt(r);
  g = parseInt(g);
  b = parseInt(b);

  let hex;
  try {
    hex = rgbToHex(r, g, b)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
  res.json({ hex })
})

router.post('/toRGB', (req, res) => {
  const hex = Array.isArray(req.body) ? req.body[0] : req.body["hex"];
  let rgb;
  try {
    rgb = hexToRgb(hex)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
  res.json(rgb)
})

export default router
