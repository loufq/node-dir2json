var fs = require('fs');
var path = require('path');

var ParseDir = function() {
  this.rootDir = '';
  this.baseUrl = '';
  this.ignores = [];
  return this;
};

ParseDir.prototype.dir = function() {
  var obj = dirTree(this.rootDir, this.rootDir, this.ignores);
  obj.baseUrl = this.baseUrl;
  return obj;
}
//保存到同一目录
ParseDir.prototype.save = function() {
  var jsonObj = this.dir();
  var jsonContent = JSON.stringify(jsonObj, null, 4);
  var savePath = path.join(this.rootDir, 'dir2json.json');
  fs.writeFileSync(savePath, jsonContent, 'utf-8');
  return savePath;
}

function dirTree(rootDir, filename, ignores) {

  if (ignores.length > 0) {
    var shortPath = filename.replace(rootDir, '');
    var dirs = shortPath.split(path.sep);
    if (dirs.length != 0 && dirs[0] == '') {
      dirs = dirs.slice(1);
    }
    var hasIgnoresFolder = false;
    dirs.every(function(ele) {
      ignores.every(function(eleIg) {
        if (ele == eleIg) {
          hasIgnoresFolder = true;
          return false;
        }
      });
      if (hasIgnoresFolder) {
        return false;
      }
    });

    if (hasIgnoresFolder) {
      return null;
    }
  }
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
      return dirTree(rootDir, filename + '/' + child, ignores);
    });
    //filter null
    info.children = info.children.filter(function(child) {
      return child != null;
    });
  } else {
    info.type = "file";
  }

  info.path = info.path.replace(rootDir, '');

  return info;
}

//globel use
module.exports = ParseDir;
