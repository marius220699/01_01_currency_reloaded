/*
 * CURRENCY CONVERTER RELOADED
 * Author: <your name here>
 * ---------------------------
 *
 * This converts currencies...somehow.
 *
 * A list of ressources you used, for example links:
 * [JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference).
 */

/*
 *  Aufgabe: Baut einen neuen Währungsumrechner. Nachfolgend findet ihr Code der die 
 *  dafür notwendingen Eingabewerte von der Konsole entgegennimmt.
 * 
 *  Dafür müsst ihr das Script wie folgt aufrufen:
 *  npm start -- <Ausgangssumme> <Ausgangswährung-Code> <Zielwährung-Code>
 *  also z.B.
 *  npm start -- 10.0 USD EUR
 * 
 *  Die erwartete Ausgabe ist ein Text in folgender Form:
 *  "Ergebnis: <Ausgangssumme> <Ausgangswährung> = <Ergebnis> <Zielwährung>"
 *  also z.B.
 *  Ergebnis: 10.00 USD = 11.00 EUR
 *  
 *  Das Script soll mindestens drei verschiedene Währungen in beide Richtungen unterstützen
 */

let args = process.argv.slice(2);

let amount, originalCurrency, targetCurrency;

if (args.length < 3) {
  console.log('Error: Not enough input arguments given!');
} else {
  amount = args[0];
  originalCurrency = args[1];
  targetCurrency = args[2];
}
let output;

const currencies = {
  EUR: {rate:1, symbol:'€'},
  USD: {rate:1.107, symbol:'$'}, 
  CAD: {rate:1.4616, symbol: 'C$'}, //Canadischer Dollar
  IDR: {rate:15600.62, symbol: 'Rp'}, //Indonesische Rupiah Rp
  AFN: {rate:87.41, symbol: '؋'},//Afghanischer Afghani ؋
  EGP: {rate:17.89, symbol: 'E£'}, //Ägypticher Pfund 
  BOB: {rate:7.74, symbol:'Bs'} //Bolivianischer Boliviano

}



const amountInEUR = amount / currencies[originalCurrency].rate;

output = amountInEUR * currencies[targetCurrency].rate;

console.log('Der Wert ist', output + currencies[targetCurrency].symbol)

const request = require('request');

request('https://api.exchangeratesapi.io/latest', function (error, response, body) {
  console.error('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
  let bodyObj = JSON.parse(body);


  try {
    for (const field in bodyObj.rates) {
      if (currencies.hasOwnProperty(field) == true) {
        currencies[field].rate = bodyObj.rates[field];
      } else if (currencies.hasOwnProperty(field) == false) {
        currencies[field] = {};
        currencies[field].rate = bodyObj.rates[field];
      }
    }
  }
  // eslint-disable-next-line brace-style
  catch (error) {
    //console.log ("error");
  }

  //console.log(bodyObj);
  // eslint-disable-next-line no-unused-vars



}
);
