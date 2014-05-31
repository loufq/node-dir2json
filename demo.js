//indclude core
var dir2json = require('./bin/index.js');

var input = process.argv[2];

if (!input) {
  return console.log('must given dir path.');
}

//init
var f2j = new dir2json();
f2j.rootDir = input;
f2j.baseUrl = 'http://www.github.com';
//get JSON Object
var jsonObj = f2j.dir();
console.log(jsonObj);

//save file
var savePath = f2j.save();
console.log('Done!SavePath:' + savePath);
