# WEB GUI Testing

## Kuvat sovelluksesta
![Kuva sovelluksesta](img/muunnin.png)  
![alt text](img/image.png)
![  ](img/image-1.png)

## Testitapaukset
1. RGB -> Hex
2. Hex -> RGB
3. Liian korkea ja matala RGB-arvo
4. Kirjaimia RGB-arvoissa
5. Lyhennetty Hex-koodi
6. Hex ilman #
7. liian pitkä Hex-koodi
8. Hex-koodi jossa on ei-hex-kirjaimia
9. Tyhjä RGB-syöte
10. Tyhjä Hex-syöte

Backendi hyväksyy RGB/Hex syötteitä muissakin muodoissa, mutta frontissa ei ole keinoja syöttää näitä muotoja.

## Odotetut tulokset

| Testi | RGB-syöte | Hex-syöte | Odotettu tulos | Testitulos |
|--|:-:|:-:|:-:|:-:|
|#1| RGB (255, 0, 0) | | #ff0000 | PASS |
|#2| | Hex #00FF00 | RGB (0, 255, 0) | PASS |
|#3| RGB (300, -10, 0) | | Virheilmoitus | PASS |
|#4| RGB (255, 0, A) | | Virheilmoitus | PASS |
|#5| | Hex #F00 | RGB (255, 0, 0) | PASS |
|#6| | Hex 00FF00 | RGB (0, 255, 0) | PASS |
|#7| | Hex #1234567 | Virheilmoitus | PASS |
|#8| | Hex #GGHHII | Virheilmoitus | PASS |
|#9| - | | Virheilmoitus | PASS |
|#10| | - | Virheilmoitus | PASS |  


## Testitulokset
HTML5:n input-typet rajoittavat syötteitä mukavasti, ja vain muutamat virheelliset syötteet pääsivät frontin validoinnin läpi. Backend käsitteli nämä virheelliset syötteet odotetusti, ja kaikki testitapaukset onnistuivat.

### Testi1 & Testi2
![Testi1](img/image-5.png)

### Testi3
Virheilmoitus: "Please select a value that is no more than 255 / no less than 0", tarkka virheviesti riippuu selaimesta ja kielestä.  
![Testi3](img/image-2.png)  

### Testi4
Virheilmoitus: "Please enter a number", tarkka virheviesti riippuu selaimesta ja kielestä.  
![Testi4](img/image-3.png)  

### Testi5
Sovellus hyväksyy lyhennetyn Hex-koodin ja muuntaa sen RGB-muotoon.  
![Testi5](img/image-4.png)

### Testi6
Sovellus hyväksyy Hex-koodin ilman # ja muuntaa sen RGB-muotoon.  
![Testi6](img/image-6.png)

### Testi7 & Testi8
Virheilmoitus: "Virhe: Virheellinen HEX-värikoodi", nyt pääsimme frontin validoinnin läpi, joten backend antaa oman virheilmoituksensa.  
![Testi7 & Testi8](img/image-7.png)

### Testi9 & Testi10
![Testi9](img/image-8.png)  
![Testi10](img/image-9.png)  