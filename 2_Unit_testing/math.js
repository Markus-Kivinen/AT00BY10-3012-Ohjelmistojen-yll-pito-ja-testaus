// math.js
/**
 * Yksinkertainen laskukirjasto
 * Tämä kirjasto tarjoaa peruslaskutoimituksia, kuten yhteen-, vähennys-, kerto- ja jakolasku,
 * sekä parillisuuden ja parittomuuden tarkistuksen.
*/

/**
    * Lisää kaksi lukua
    * @param {number} a - Ensimmäinen luku
    * @param {number} b - Toinen luku
    * @returns {number} Summa
    * @throws {Error} Jos jompikumpi parametreista ei ole numero
*/
let add = (a, b) => {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error("Molempien parametrien tulee olla numeroita.");
    }
    return a + b;
}

/**
    * Vähentää toisen luvun ensimmäisestä
    * @param {number} a - Ensimmäinen luku
    * @param {number} b - Toinen luku
    * @returns {number} Erotus
    * @throws {Error} Jos jompikumpi parametreista ei ole numero
*/
let subtract = (a, b) => {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error("Molempien parametrien tulee olla numeroita.");
    }
    return a - b;
}

/**
    * Kertoo kaksi lukua
    * @param {number} a - Ensimmäinen luku
    * @param {number} b - Toinen luku
    * @returns {number} Tulo
    * @throws {Error} Jos jompikumpi parametreista ei ole numero
*/
let multiply = (a, b) => {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error("Molempien parametrien tulee olla numeroita.");
    }
    return a * b;
}

/**
    * Jakaa ensimmäisen luvun toisella
    * @param {number} a - Ensimmäinen luku
    * @param {number} b - Toinen luku
    * @returns {number} Osamäärä
    * @throws {Error} Jos jompikumpi parametreista ei ole numero tai jos yritetään jakaa nollalla
*/
let divide = (a, b) => {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error("Molempien parametrien tulee olla numeroita.");
    }

    if (b === 0) {
        throw new Error("Nollalla jakaminen ei ole sallittua.");
    }
    return a / b;
}

/**
    * Tarkistaa onko luku parillinen
    * @param {number} num - Luku
    * @returns {boolean} True jos luku on parillinen, muuten false
    * @throws {Error} Jos parametri ei ole numero
*/
let isEven = (num) => {
    if (typeof num !== 'number') {
        throw new Error("Parametrin tulee olla numero.");
    }
    return num % 2 === 0;
}

/**
    * Tarkistaa onko luku pariton
    * @param {number} num - Luku
    * @returns {boolean} True jos luku on pariton, muuten false
    * @throws {Error} Jos parametri ei ole numero
*/
let isOdd = (num) => {
    if (typeof num !== 'number') {
        throw new Error("Parametrin tulee olla numero.");
    }
    return num % 2 !== 0;
}



export { add, subtract, multiply, divide , isEven, isOdd };