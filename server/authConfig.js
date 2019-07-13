var sha256 = require('sha256');

var seed = Math.random();
var apikey = "_CCNRG8P057641stN1S07KhdQs1L7bMU"
var apipin = "1010"
var prehash = apikey + seed + apipin;
var apihash = 's2/' + seed + '/' + sha256(prehash);
var authKey = Buffer.from(apikey + ":" + apihash).toString('base64')

console.log("Authorization: Basic " + authKey);

module.exports.authKey = authKey;