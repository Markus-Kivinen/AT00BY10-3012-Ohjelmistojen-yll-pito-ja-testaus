# Versioning and Licensing

## Versionti
Esimerkkinä omaa projektini [PhotoMode](https://github.com/MakeMods/PhotoMode/releases), joka on tällä hetkellä versiossa 1.4.2

Ensimmäinen julkaisu alkoi versiosta 1.0.0, siitä eteenpäin olen julkaissut uusia ominaisuuksia, nostaen "minor" version numeroa, ja korjannut bugeja, nostaen "patch" version numeroa.  

Joskus kun on aikaa siirryn käyttäään matriiseja kameran sijainnin ja suunnann määrittämiseen, mikä luultavasti tarkoittaa siirtymistä versioon 2.0.0

## Semver

### New feature is added to the project without breaking backwards compatibility
Versio numeron toista numeroa kasvatetaan, esim. 1.0.0 -> 1.1.0. huomaa että toinen luku voi olla yli 9, esim. 1.9.0 -> 1.10.0

### Bug is fixed without changing the API
Versio numeron kolmatta numeroa kasvatetaan, esim. 1.0.0 -> 1.0.1

### Change API in a way it breaks backwards compatibility
Versio numeron ensimmäistä numeroa kasvatetaan, esim. 1.0.0 -> 2.0.0  
Todellisuudessa ensimmäistä numeroa saatetaan kasvatetaan myös silloin, jos uusi ominaisuus on merkittävä ja vaatii paljon työtä, vaikka se ei rikkoisi taaksepäin yhteensopivuutta.


## Lisenssi
Valitsin lisenssiksi MIT-lisenssin: [LICENSE](./LICENSE). 
Olen käyttänyt sitä lähes jokaisessa projektissani, koska se on hyvin salliva ja hyvin tunnettu, joten oletan että monet ihmiset myös ymmärtävät sen ehdot. Pidän myös siitä että MIT-lisenssi vaatii että tekijänoikeusilmoitus ja lisenssiteksti on säilytettävä, joten se varmistaa että ihmiset tietävät kuka on alkuperäinen tekijä.  

Koitan kuitenkin pitää mielessä että kuka tahansa voi käyttää koodiani kaupallisiin tarkoituksiin minulta kysymättä, joten minun kannattaa miettiä lisenssi tarkkaan ennen kuin julkaisen projektin,  lisenssin vaihtaminen jälkikäteen ei estä jo julkaistujen versioiden käyttöä.  