var fs = require('fs');
var path = require('path');

var ParseDir = module.exports = function() {
  this.rootDir = '';
  this.baseUrl = '';
  return this;
};

ParseDir.prototype.dir = function() {
  var obj = dirTree(this.rootDir, this.rootDir);
  obj.baseUrl = this.baseUrl;
  return obj;
}
//保存到同一目录
ParseDir.prototype.save = function() {
  var jsonObj = this.dir();
  var jsonContent = JSON.stringify(jsonObj, null, 4);
  var savePath = path.join(this.rootDir, 'dir2json.json');
  fs.writeFileSync(savePath, jsonContent, 'utf-8');
}

function dirTree(rootDir, filename) {
  var stats = fs.lstatSync(filename),
    info = {
      path: filename,
      name: path.basename(filename)
    };
  if (stats.isDirectory()) { //文件夹
    info.type = "folder";
    info.children = fs.readdirSync(filename).filter(function(child) {
      return child.slice(0, 1) != '.';
    });
    info.children = info.children.map(function(child) {
      return dirTree(rootDir, filename + '/' + child);
    });
  } else {
    info.type = "file";
  }

  info.path = info.path.replace(rootDir, '');

  return info;
}

//module.exports = dirTree;
if (module.parent == undefined) {
  // node dirTree.js ~/foo/bar
  var util = require('util');
  console.log(util.inspect(dirTree(process.argv[2]), false, null));
}
