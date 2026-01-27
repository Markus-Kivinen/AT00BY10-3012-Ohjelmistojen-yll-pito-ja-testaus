# Math - Yksinkertainen laskukirjasto

Tämä on yksinkertainen JavaScript-kirjasto, joka tarjoaa peruslaskutoimituksia,  
kuten yhteen-, vähennys-, kerto- ja jakolasku, sekä parillisuuden ja parittomuuden tarkistuksen.
 Kirjasto on suunniteltu käytettäväksi Node.js-ympäristössä.

## Vaatimukset
- Node.js (v24 tai uudempi)

## Käytetyt kirjastot
- Mocha (testaus)(dev)
- Chai (testaus)(dev)
- eslint (koodin laadun tarkistus)(dev)


## Asennus
```bash
npm install
```
## Käyttö
```javascript
import * as math from './math.js';
console.log("2 + 3 =", math.add(2, 3));
console.log("5 - 2 =", math.subtract(5, 2));
console.log("3 * 4 =", math.multiply(3, 4));
console.log("10 / 2 =", math.divide(10, 2));
console.log("Is 4 even? ", math.isEven(4));
console.log("Is 5 odd? ", math.isOdd(5));
``` 

## Testaus
Testit on kirjoitettu Mocha- ja Chai-kirjastoilla. Voit suorittaa testit seuraavalla komennolla:
```bash
npm test
```
-->
```
Aloitetaan testit...
  Aritmetiikka testit
    add funktio
      ✔ Tulisi palauttaa 5 kun kutsutaan add(2, 3)
      ✔ Tulisi heittää virhe kun kutsutaan add(2, '3')
    subtract funktio
      ✔ Tulisi palauttaa 1 kun kutsutaan subtract(3, 2)
      ✔ Tulisi heittää virhe kun kutsutaan subtract('3', 2)
    multiply funktio
      ✔ Tulisi palauttaa 6 kun kutsutaan multiply(2, 3)
      ✔ Tulisi heittää virhe kun kutsutaan multiply(2, '3')
    divide funktio
      ✔ Tulisi palauttaa 2 kun kutsutaan divide(6, 3)
      ✔ Tulisi heittää virhe kun kutsutaan divide(6, 0)
      ✔ Tulisi heittää virhe kun kutsutaan divide('6', 3)
    isEven funktio
      ✔ Tulisi palauttaa true kun kutsutaan isEven(4)
      ✔ Tulisi palauttaa true kun kutsutaan isEven(-4)
      ✔ Tulisi palauttaa false kun kutsutaan isEven(5)
    isOdd funktio
      ✔ Tulisi palauttaa true kun kutsutaan isOdd(5)
      ✔ Tulisi palauttaa true kun kutsutaan isOdd(-5)
      ✔ Tulisi palauttaa false kun kutsutaan isOdd(4)

Testit suoritettu.

  15 passing (9ms)
```

## Ominaisuudet
- Yhteenlasku
- Vähennyslasku
- Kertolasku
- Jakolasku (nollalla jakaminen heittää virheen)
- Parillisuuden tarkistus
- Parittomuuden tarkistus

## Lisenssi
Tämä projekti on lisensoitu MIT-lisenssillä. Katso lisätietoja juurikansion LICENSE-tiedostosta.