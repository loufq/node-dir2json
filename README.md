# dir2json

## Use 2 CLI
### install globel
```javascript
npm install dir2json-lite -g
```
#### use 2 output
```javascript
dir2json path/to/dir
```
####  dir2json.json output sample
```javascript
{
    "path": "path/to/dir",
    "name": "folder2json",
    "type": "folder",
    "children": [
        {
            "path": "/bin",
            "name": "bin",
            "type": "folder",
            "children": [
                {
                    "path": "/bin/index.js",
                    "name": "index.js",
                    "type": "file"
                }
            ]
        },
        {
            "path": "/package.json",
            "name": "package.json",
            "type": "file"
        }
    ],
    "baseUrl": ""
}
```

## Quick Examples
### install
```javascript
npm install dir2json-lite --save
```
```javascript
//indclude core
var dir2json = require('dir2json-lite');

var input = process.argv[2];

if (!input) {
  return console.log('must given dir path.');
}

//init
var f2j = new dir2json();
f2j.rootDir = input;
f2j.baseUrl = 'http://www.github.com';
f2j.ignores = ['node_modules'];//ignore folder
//get JSON Object
var jsonObj = f2j.dir();
console.log(jsonObj);

//save file
var savePath = f2j.save();
console.log('Done!SavePath:' + savePath);
```
### ref
* [command-line-utilities-with-nodejs](http://shapeshed.com/command-line-utilities-with-nodejs/)
* [How I make models in Node.js](http://forrst.com/posts/How_I_make_models_in_Node_js_using_Redis_as_dat-90W)
* [ cross-platform build in Node.js](https://gist.github.com/domenic/2790533)
