#!/usr/bin/env node

console.log('Welcome2Use dir2json tool');

if (module.parent) {
  module.exports = require('./bin/index.js')
}
else {
  var dir2json = require('./bin/index.js');
  var input = process.argv[2];
  if (!input) {
    return console.log('must given dir path.');
  }
  var f2j = new dir2json();
  f2j.rootDir = input;
  f2j.baseUrl = process.argv[3] ? process.argv[3] : '';
  f2j.ignores = [];
  var savePath = f2j.save();
  console.log('Done!SavePath:' + savePath);

}
