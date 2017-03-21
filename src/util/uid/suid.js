/**
 * Created by keep on 2016/11/2.
 */

var short = require('short-uuid');
var translator = short(); // Defaults to flickrBase58
var decimalTranslator = short("0123456789"); // Provide a specific alphabet for translation
var cookieTranslator = short(short.constants.cookieBase90); // Use a constant for translation

// Generate a shortened v4 UUID
var a = translator.new();

// Generate plain UUIDs
var b = short.uuid(); // From the constructor without creating a translator
var c = translator.uuid(); // Each translator provides the uuid.v4() function

console.log(decimalTranslator)
// console.log(cookieTranslator)
console.log(a)
console.log(b)
console.log(c)
